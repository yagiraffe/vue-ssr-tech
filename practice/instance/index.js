// 主要讲解的是Vue的实例

import Vue from 'vue'

// vue对象
// new Vue创建Vue实例，传入el和template就可以渲染出html代码
// new Vue({
//   el: '#root', // 挂载到某个节点的方式1：加el。指定el指的是把下面的template要渲染的内容挂载到哪个地方，挂载过程是把整个节点替换掉，挂载完就没有<div id="root"></div>了
//   template: '<div>{{text}}</div>',
// })

// 挂载到某个节点的方式2：
// const app = new Vue({
//   template: '<div>this is content</div>'
// })
// app.$mount('#root') // (.$mount用于声明挂载到html的哪个节点)

const app = new Vue({
  template: '<div>{{text}}</div>', // {{xx}}是变量传递的方法
  data: {
    text: 0
  } // 用于声明数据
})
app.$mount('#root')

// app.text = 'text1' // 用于修改变量text的值

setInterval(() => {
  app.text += 1
  // app.$options.data.text += 1 // 页面上的text并不会改变，app.$options.data和new Vue({data: {text: 0}})里的data不是同一个对象
  // app.$data.text += 1 // 页面上的text会改变.说明挂载到页面的data里的数据和$data里的text是相通的
}, 1000)

// 一. VUE实例的相关的属性
// console.log(app.$data)
// console.log(app.$props) // 若没有在app里声明props，则输出undefined
// console.log(app.$el) // <div>0</div>
// console.log(app.$options) // 就是创建vue实例的里面的选项，包含传进去的和new Vue实例的里面的默认的参数值
// render是个函数方法
// app.$options.render = (h) => {
//   return h('div', {}, 'new render function')
// }
// console.log(app.$root) // 是个Vue的对象，Vue是以树状结构往下渲染的，其最上层的根节点就是创建出来的Vue实例，此处是app
// console.log(app.$root === app) 输出是true
// console.log(app.$children) // 每个.vue文件就是一个组件，有个item组件，<item><div></div></item>里的div就是作为item的children
// console.log(app.$slots)
// console.log(app.$scopedSlots)
// console.log(app.$refs) // 可快速找到某个节点，或者某个组件
// console.log(app.$isServer)

// 二. VUE实例上的方法
// .$watch用于监听某个值
// app.$watch('text', (newText, oldText) => {
//   console.log(`${newText} : ${oldText}`) // Tab上面的那个``
// })  // 其和在new Vue({})里加watch: {
//   text (newText, oldText) => {
//     console.log(`${newText} : ${oldText}`)
//   }
// } 效果是一样的
// 注销$watch方法是 const unWatch = app.$watch('text', (newText, oldText) => {
//   console.log(`${newText} : ${oldText}`)
// unWatch()
//
// .$on用于监听事件，.$emit用于触发被监听的事件，.$once只监听一次
// app.$on('test', (a, b) => {
//   console.log(`test emited ${a} ${b}`)
// })
// app.$emit('test', 1, 2) // $on和$emit要同时作用在一个vue对象上才会触发被监听的事件
//
// app.$forceUpdate()
