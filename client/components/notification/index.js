// 该文件就是把notification.vue弄成全局性通用的组件

// 我们要使用notificaition.vue组件，基本上是写一个xx.vue组件，在里面引用notificaition.vue组件，并写在模板里面显示出来
// 但是，如果是自定义的一个组件，并且想作为全局性通用的组件，而且可以被发布到第三方去使用的组件的做法就是给这个组件提供一个类似于插件的使用方法
// 具体做法如下：把自定义的组件在全局注册下

import Notification from './notification.vue'
import notify from './function'

export default (Vue) => {
  Vue.component(Notification.name, Notification) // 这句是把Notification注册成全局组件。Vue.component(组件名, 要注册成全局组件的组件)
  // 在写组件的时候最好都在组件的内部的script里给组件加name属性
  Vue.prototype.$notify = notify
}
