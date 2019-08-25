// 快速访问文件 ctrl+p

// 引入vue类库
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './app.vue'

import './assets/styles/global.styl'
import createRouter from './config/router'
import createStore from './store/store'

import Notification from './components/notification' // ////////////第五章看完后要写在create-app里

import Tabs from './components/tabs'

Vue.use(VueRouter)
Vue.use(Vuex)

Vue.use(Notification) // //这样在其他组件里都可以使用Notification组件////////////第五章看完后要写在create-app里

Vue.use(Tabs)

const router = createRouter() // 创建Router实例
const store = createStore() // 创建Store实例

// 动态给store里加模块
store.registerModule('c', {
  state: {
    text: 3
  }
})
// // 将模块解绑
// store.unregisterModule('c')

// store.watch((state) => state.count + 1, (newCount) => {
//   console.log('new count watched:', newCount)
// })

// 每次mutaions被调用，就会调用这儿的回调函数
// store.subscribe((mutation, state) => {
//   console.log(mutation.type)
//   console.log(mutation.payload) // mutaion接收的值
// })

store.subscribe((action, state) => {
  console.log(action.type)
  console.log(action.payload)
})

// 在全局的路由的导航守卫
router.beforeEach((to, from, next) => {
  console.log('before each invoked')
  next()
  // if (to.fullPath === '/app') {
  //   next('/login')
  // } else {
  //   next()
  // }
})

router.beforeResolve((to, from, next) => {
  console.log('before resolve invoked')
  next()
})

router.afterEach((to, from) => {
  console.log('after each invoked')
})

// const root = document.createElement('div')
// document.body.appendChild(root)

// new一个vue对象
new Vue({
  router,
  store,
  // => 是ES6语法中的箭头函数,左边是参数，右边是函数体
  render: (h) => h(App)
}).$mount('#root')
