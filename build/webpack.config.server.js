// 服务端打包配置

// Node.js path 模块提供了一些用于处理文件路径的小工具，我们可以通过以下方式引入该模块：
// var path = require("path")
const path = require('path')
const ExtractPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base.js')
const VueServerPlugin = require('vue-server-renderer/server-plugin') // vue-server-renderer下的server-plugin

let config

config = merge(baseConfig, {
  target: 'node', // 服务端的打包配置里一定要写target属性，用于指定打包好的js的执行环境是node环境。因为打包出来的程序是在node端运行的，不是在浏览器端运行的
  entry: path.join(__dirname, '../client/server-entry.js'),
  devtool: '#source-map',
  output: {
    libraryTarget: 'commonjs2', // 类型是commonjs2，用来指定写的代码它export出去的入口是怎样的，是使用commonjs2打包出来的整个应用的入口是通过module.exports给它放出去。比如用jquery写代码的时候，整个js文件都是自调用的方法(function () {})()，这就是一种模块的方式，，在nodejs里使用的模块的方式是module.exports = xxx。
    filename: 'server-entry.js',
    path: path.join(__dirname, '../server-build')
  },
  // npm install xxx -S 则这个 xxx 就是在package.json的dependencies里，在dependencies里的依赖，这些依赖的类库的代码是在应用跑起来后需要的 ，如果npm install xxx -D就是装在package.json的"devDependencies"
  // 声明externals，就是把package.json的dependencies里的"vue","vue-router","vuex"这些依赖文件不要被打包
  externals: Object.keys(require('../package.json').dependencies), // 得到的是个数组，webpack打包的时候会把我们依赖的js文件都打包到同一个js文件里，这是在浏览器端要执行的情况，因为浏览器无法通过require的方式去加载一个单独的文件，所以要把用到的js文件里的内容全部打包到一个新的js文件里，一次性加载到浏览器端。由于我们这个程序打包后是要跑在node端的，node端如果我们依赖vue，则我们只需要在导出的文件里面去require需要的vue就可以了，这样做后它是可以直接引用到我们node_modules文件夹里的文件的，所以我们没必要把vue代码打包到输出的文件里，这样就会有两份vue的依赖，会导致内存使用的浪费。我们安装的依赖都是装在node_modules文件夹里的，就不需要在把vue或其他依赖打包出来。
  module: {
    rules: [
      // 在打包.styl文件时，要单独打包到css文件里，若使用style-loader，style-loader会把css通过javascript去引用dom的方式插入到html里面，这时style-loader会有dom操作的代码在里面，由于我们的打包文件是执行在node环境，这样会在node端执行的时候报错，因为node端是没有dom的执行环境的。
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
  plugins: [
    // 声明插件
    new ExtractPlugin('styles.[contentHash:8].css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    }),
    new VueServerPlugin() // 这儿可以指定filename: 'vue-ssr-server-bundle.json'
  ]
})

module.exports = config
