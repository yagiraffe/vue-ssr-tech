const Router = require('koa-router')

const apiRouter = new Router({ prefix: '/api' })

const validateUser = async (ctx, next) => {
  if (!ctx.session.user) {
    ctx.status = 401
    ctx.body = 'need login'
  } else {
    await next()
  }
}

apiRouter.use(validateUser)

const successResponse = (data) => {
  return {
    success: true,
    data
  }
}

apiRouter
  // 获取所有todo的路由，要获取某个todo应该是/todo/:id
  .get('/todos', async (ctx) => { // 路由要跳转到/todos，需要调用getAllTodos接口
    const todos = await ctx.db.getAllTodos()
    ctx.body = successResponse(todos)
  })
  // 创建一个todo
  .post('/todo', async (ctx) => {
    const data = await ctx.db.addTodo(ctx.request.body)
    ctx.body = successResponse(data)
  })
  .put('/todo/:id', async (ctx) => {
    const data = await ctx.db.updateTodo(ctx.params.id, ctx.request.body)
    ctx.body = successResponse(data)
  })
  .delete('/todo/:id', async (ctx) => {
    const data = await ctx.db.deleteTodo(ctx.params.id)
    ctx.body = successResponse(data)
  })
  .post('/delete/completed', async (ctx) => {
    const data = await ctx.db.deleteCompleted(ctx.request.body.ids)
    ctx.body = successResponse(data)
  })

module.exports = apiRouter
