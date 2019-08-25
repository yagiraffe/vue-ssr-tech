// vue-loader的配置项
// 是个函数，因为要根据不同的环境来生成不同的配置
module.exports = (isDev) => {
  return {
    preserveWhitepace: true,
    extractCSS: !isDev, // 在正式环境会单独打包到css文件的，在开发环境不需要
    cssModules: {
      // 为了节省正式环境下加载文件的大小，此处区分开发环境和正式环境使用哪一种
      localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
      camelCase: true
      // localIdentName: '[path]-[name]-[hash:base64:5]',//把css对应的className编译成这样格式
      // camelCase: true//标签中的类名习惯上是用xx-xx方式命名，该配置可以把css中用xx-xx方式命名的类名转化成js中调用变量的camelCase形式，也就是两个单词连接的时候第二个单词首字母是大写，
      // 用法是加module
    }
    // hotReload: false,//根据环境变量生成
  }
}
// vue-loader中可以自定义.vue文件中的模块的loader。
// .vue文件中，有<template>（用html-loader处理）、<script>（用bable-loader）、<style>（用style-loader）三个模块
// const docsLoader=require.resolve('./docs-loader)由于webpack加载loader的方式是以字符串
