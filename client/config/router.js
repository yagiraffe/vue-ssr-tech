// vue-router是路由的功能，例如一个链接点击后跳转到后端进行模板渲染，产生一个新的html然后返回给浏览器端，然后浏览器把这个内容显示出来，这就是一次路由跳转。
import Router from 'vue-router'

import routes from './routes'

// const router = new Router ({
//   routes
// })
// export default router // 若直接new Router，然后这样export，则在全局每个地方去import的router都是同一个router，所以这边做法如下

// 这样每次import的时候都去创建一个新的router
export default () => {
  // 函数返回的是创建的Router实例，里面涉及到Router实例里面的一些配置项
  return new Router({
    routes,
    mode: 'history', // 默认是hash对应的路由就是/#/ // 值为history时就是history路由
    // base: '/base/',
    linkActiveClass: 'active-link',
    linkExactActiveClass: 'extract-active-link',
    // 不同页面之间的跳转可以理解为不同路由的跳转
    scrollBehavior (to, from, savedPosition) { // 在页面路径跳转的时候，页面要不要滚动的问题，to是路由跳转的时候要去到的路由，from是从哪个路由跳转到下个路由，若之前有进入到这个路由则savedPosition会记录这个路由的滚动条所滚动到的位置
      if (savedPosition) { // 若路由之前产生过滚动行为，则下一次再跳到这个路由的时候滚动条还会在滚动条之前滚动到的位置
        return savedPosition
      } else {
        return {x: 0, y: 0} // 若之前没有这个滚动，则把页面滚动到最上面以及最左边
      }
    }
    // fallback: true // vue提供

    // // 页面网址url里的 ?a=xxx&b=ccc 就叫做query，是作为页面进来的时候的参数的，拿到的query是字符串
    // // parseQuery就是把拿到的query字符串需要转成json object的方法
    // parseQuery (query) {

    // },
    // // 相反的，stringifyQuery就是把对象转成query字符串
    // stringifyQuery (obj) {

    // }
  })
} // export出去的是个函数
