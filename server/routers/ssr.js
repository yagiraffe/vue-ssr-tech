// 该文件是用于处理在正式环境下服务端渲染情况

const Router = require('koa-router')
const path = require('path')
const fs = require('fs')
const VueServerRender = require('vue-server-renderer')

const serverRender = require('./server-render')

// 正式环境中，服务端渲染需要的客户端打包的文件时从磁盘上读取。在运行正式环境的npm run start时，需先执行npm run build 先打包好下面所需的文件
const clientManifest = require('../../public/vue-ssr-client-manifest.json')
const renderer = VueServerRender.createBundleRenderer(
  path.join(__dirname, '../../server-build/vue-ssr-server-bundle.json'),
  {
    inject: false,
    clientManifest
  }
)

const template = fs.readFileSync(
  path.join(__dirname, '../server.template.ejs'),
  'utf-8'
)

const pageRouter = new Router()

pageRouter.get('*', async (ctx) => {
  await serverRender(ctx, renderer, template)
})

module.exports = pageRouter
