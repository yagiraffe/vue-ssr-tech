// cnpm run dev
// cnpm run build

const path = require('path')
const webpack = require('webpack') // 引入webpack
// webpack-merge插件可以合并不同webpack配置
// 需要安装 cnpm install webpack-merge -D
const merge = require('webpack-merge')
const HTMLPlugin = require('html-webpack-plugin')
const ExtractPlugin = require('extract-text-webpack-plugin')
const baseConfig = require('./webpack.config.base.js')
const VueClientPlugin = require('vue-server-renderer/client-plugin')

const isDev = process.env.NODE_ENV === 'development'

// 配置这个以后打开cnpm run dev 会直接进入页面，而不是进入目录结构页面
const defaultPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  new HTMLPlugin({
    template: path.join(__dirname, 'template.html')
  }),
  new VueClientPlugin() // vue-ssr-client-manifest.json是该句自动生成的默认文件名
]

const devServer = {
  port: 8000,
  // host: 'localhost',
  host: 'localhost',
  overlay: {
    errors: true
  },
  headers: {'Access-Control-Allow-Origin': '*'},
  // 使用history路由时，当手动刷新浏览器时，完整的url会请求到服务端，服务端若没有做处理会返回404错误。解决方法就是在webpack配置里使用historyApiFallback配置
  historyApiFallback: {
    index: '/public/index.html' // 这个是HTMLPlugin生成的index.html的路径，它依赖于output配置里的publicPach（访问文件时的路径）
  },
  proxy: {
    '/api': 'http://127.0.0.1:3333',
    '/user': 'http://127.0.0.1:3333'
  },
  hot: true // 热加载，也就是只刷新局部更新的，整体不刷新
}

let config

// 开发环境打包
if (isDev) {
  config = merge(baseConfig, {
    devtool: '#cheap-module-eval-source-map',
    module: {
      rules: [
        {
          test: /\.styl$/,
          use: [
            // 使用vue开发时，style-loader要改成vue-style-loader
            'vue-style-loader',
            'css-loader',
            // {
            //     loader: 'css-loader',
            //     options: {
            //         module: true,
            //         localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
            //     }
            // },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'stylus-loader'
          ]
        }
      ]
    },
    devServer,
    plugins: defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ])
  })
} else {
  // 正式环境配置
  config = merge(baseConfig, {
    entry: {
      // app: path.join(__dirname, '../client/index.js'),
      app: path.join(__dirname, '../client/client-entry.js'),
      vendor: ['vue']
    },
    output: {
      filename: '[name].[chunkhash:8].js',
      publicPath: '/public/'
    },
    module: {
      rules: [
        {
          test: /\.styl$/,
          use: ExtractPlugin.extract({
            fallback: 'vue-style-loader',
            use: [
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              'stylus-loader'
            ]
          })
        }
      ]
    },
    plugins: defaultPlugins.concat([
      new ExtractPlugin('styles.[contentHash:8].css'),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'runtime'
      })
    ])
  })
}

module.exports = config
