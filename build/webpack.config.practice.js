const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HTMLPlugin = require('html-webpack-plugin')
const baseConfig = require('./webpack.config.base.js')

const defaultPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"development"'
    }
  }),
  new HTMLPlugin({
    template: path.join(__dirname, 'template.html')
  })
]

const devServer = {
  port: 8080,
  // host: 'localhost',
  host: 'localhost',
  overlay: {
    errors: true
  },
  hot: false // 热加载，也就是只刷新局部更新的，整体不刷新
}

let config

config = merge(baseConfig, {
  entry: path.join(__dirname, '../practice/index.js'),
  devtool: '#cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: [
          'vue-style-loader',
          'css-loader',
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
  // import Vue from 'vue'中'vue'通过下面的alias可以指定要引入的vue的文件在哪里,也就是vue的版本
  // 默认情况下引入的vue的版本是vue.runtime.xxx.js，
  // 有runtime和没有runtime的版本区别是：有runtime时，不能在vue对象里写<template>,即不能在new Vue({})里写<template>
  resolve: {
    alias: {
      'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
      // 写入这个以后，就可以在new Vue({})里写<template>
    }
  },
  plugins: defaultPlugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ])
})

module.exports = config
