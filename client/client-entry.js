import createApp from './create-app'
import bus from './util/bus'

const { app, router } = createApp()

// if (window.__INITIAL_STATE__) {
//   store.replaceState(window.__INITIAL_STATE__)
// }

// 在bus里新创建了一个vue实例bus，我们就可以用bus在任何地方进行vue的事件操作，例如$on
bus.$on('auth', () => {
  router.push('/login') // 路由跳转到login
})

router.onReady(() => {
  app.$mount('#root')
})
