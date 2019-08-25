// concurrently工具用于在一个命令行窗口启动两个服务

// 需先安装koa，koa是node端流行的服务端的框架 cnpm install koa@2.4.1 -S
// 看koa文档

// 下面就是koa的中间件，用来记录server的请求、以及出现的错误然后返回错误信息

// "dev:server": "cross-env NODE_ENV=development node server/server.js",

const Koa = require('koa')
const send = require('koa-send')
const path = require('path')

const koaBody = require('koa-body')
const koaSession = require('koa-session')

const staticRouter = require('./routers/static')
const apiRouter = require('./routers/api')
const userRouter = require('./routers/user')
const createDb = require('./db/db')
const config = require('../app.config')

const db = createDb(config.db.appId, config.db.appKey)

const app = new Koa()

app.keys = ['vue ssr tech']
app.use(koaSession({
  key: 'v-ssr-id',
  maxAge: 2 * 60 * 60 * 1000
}, app))

const isDev = process.env.NODE_ENV === 'development'

// koa的中间件
app.use(async (ctx, next) => {
  try {
    console.log(`request with path ${ctx.path} `)
    await next()
  } catch (err) {
    console.log(err)
    ctx.status = 500
    if (isDev) {
      ctx.body = err.message
    } else {
      ctx.body = 'please try again later'
    }
  }
})

app.use(async (ctx, next) => {
  ctx.db = db
  await next()
})

app.use(async (ctx, next) => {
  if (ctx.path === '/favicon.ico') {
    await send(ctx, '/favicon.ico', { root: path.join(__dirname, '../') })
  } else {
    await next()
  }
})

app.use(koaBody())
app.use(userRouter.routes()).use(userRouter.allowedMethods())
app.use(staticRouter.routes()).use(staticRouter.allowedMethods())
app.use(apiRouter.routes()).use(apiRouter.allowedMethods())

let pageRouter
if (isDev) {
  pageRouter = require('./routers/dev-ssr')
  // pageRouter = require('./routers/dev-ssr-no-bundle')
} else {
  pageRouter = require('./routers/ssr')
  // pageRouter = require('./routers/ssr-no-bundle')
}

app.use(pageRouter.routes()).use(pageRouter.allowedMethods())

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3333

app.listen(PORT, HOST, () => {
  console.log(`server is listening on ${HOST}:${PORT}`)
})
