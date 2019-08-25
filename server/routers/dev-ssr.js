// 该文件是用于处理开发时的服务端渲染情况

// 需安装koa的中间件koa-router，它是一个帮助koa去处理路由的工具： cnpm install koa-router@7.4.0 -S
// 需安装工具axios，它是用于在node端发送请求的，也可以在浏览器端用：cnpm install axios@0.17.1 -S （由于在业务代码里会用到axious，所以 -S安装）
// 需安装memory-fs： cnpm install memory-fs@0.4.1 -D（由于我们只有在开发时才用到memory-fs，所以用-D去安装）

// 写nodejs的时候要使用require，而不是用import，因为在目前node版本里它还不支持直接写import。在写前端代码的时候可以使用import，因为我们的代码是经过babel编译的，而在服务端代码不经过babel处理，所以直接写可以运行的代码就可以了。

const Router = require('koa-router')
const axios = require('axios')
const path = require('path')
const fs = require('fs')
const MemoryFS = require('memory-fs') // memory-fs和nodejs里的fs的api是一模一样的，两者区别是memory-fs不把文件写入到磁盘上面（写入到磁盘上面就会在左边会看到一个个文件夹，从磁盘读取文件时很浪费时间且效率低），而是写在内存里面。因此，我们把所有的文件输出都放到memory-fs里面，这样读取文件和输出文件就很快
const webpack = require('webpack')
const VueServerRender = require('vue-server-renderer')

const serverRender = require('./server-render')
const serverConfig = require('../../build/webpack.config.server')

const serverCompiler = webpack(serverConfig) // 执行webpack打包，方法是 webpack(传入一个webpack的配置)
const mfs = new MemoryFS()
serverCompiler.outputFileSystem = mfs // 指定serverCompiler的输出目录是在MemoryFS里

let bundle // 用来记录webpack每次打包生成的文件
serverCompiler.watch({}, (err, stats) => { // watch作用就是只要改了文件就会重新打包
  if (err) throw err // err是webpack打包错误
  stats = stats.toJson()
  stats.errors.forEach(err => console.log(err)) // 不是打包错误，而是其他错误比如eslint报错
  stats.warnings.forEach(warn => console.warn(err))

  // webpack打包生成的文件所在的路径，在webpack.config.server.js里配置了输出的文件名和路径，所以只需要连接起来就可以了
  const bundlePath = path.join(
    serverConfig.output.path,
    'vue-ssr-server-bundle.json' // 这是webpack.config.server.js里的VueServerPlugin插件生成的json文件
  )
  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8')) // mfs.readFileSync(bundlePath, 'utf-8')读出的是字符串，需要再转成json
  console.log('new bundle generated')
})

const handleSSR = async (ctx) => {
  if (!bundle) {
    ctx.body = '你等一会，别着急......'
    return
  }

  const clientManifestResp = await axios.get(
    'http://127.0.0.1:8000/public/vue-ssr-client-manifest.json'
  )

  const clientManifest = clientManifestResp.data

  const template = fs.readFileSync(
    path.join(__dirname, '../server.template.ejs'),
    'utf-8'
  )

  const renderer = VueServerRender
    .createBundleRenderer(bundle, {
      inject: false,
      clientManifest
    })

  await serverRender(ctx, renderer, template)
}

const router = new Router()
router.get('*', handleSSR)

module.exports = router
