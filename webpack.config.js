const path = require('path');
const webpack = require('webpack');//引入webpack
const HTMLPlugin = require('html-webpack-plugin');
const ExtractPlugin = require('extract-text-webpack-plugin')

const isDEV = process.env.NODE_ENV === 'development' 

const config = {
    target: 'web',
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        filename: 'bundle.[hash:8].js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                // \.是对.转义
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
            // {
            //     test : /\.css$/, 
            //     loader : ['style-loader', 'css-loader']
            // },
            
            {
                test : /\.(gif|png|jpg|jpeg|woff|svg|eot|ttf)$/,
                use: [
                    {
                        loader : 'url-loader',
                        options: {
                            // 文件小于1024字节，转换成base64编码，写入文件里面
                            limit: 1024,
                            name: '[name]-aaa.[ext]'
                        } 
                    }
                ]   
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDEV ? '"development"' : '"production"'
            }
        }),
        new HTMLPlugin()
    ]

}

if(isDEV){
    // 开发环境打包
    config.module.rules.push({
        test: /\.styl$/,
        use: [
            'style-loader', 
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
    config.devtool = '#cheap-module-eval-source-map'
    config.devServer = {
        port: 8000,
        // host: 'localhost',
        host: 'localhost',
        overlay: {
            errors: true
        },

        // historyFallback: {

        // },
        // open: true,
        hot: true //热加载，也就是只刷新局部更新的，整体不刷新
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}else{
    // 正式环境打包
    config.entry = {
        app: path.join(__dirname, 'src/index.js'),
        vendor: ['vue']//或['vue','vue-router]等，用于单独打包vue框架的类库里的代码
    }
    config.output.filename = '[name].[chunkhash:8].js'
    config.module.rules.push(
        {
            test: /\.styl$/,
            use: ExtractPlugin.extract({
                fallback: 'style-loader',
                use: [
                    'css-loader', //由于要把样式写到一个单独的css文件里，所以只写css-loader,stylus-loader
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    'stylus-loader'
                ]//从右向左执行loader的，也就是先stylus-loader，后css-loader
            })
        }
    )
    config.plugins.push(
        new ExtractPlugin('styles.[contentHash:8].css'),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime'
        })
    )
}

module.exports = config;