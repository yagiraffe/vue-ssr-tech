// 主要讲解的是Vue实例的生命周期方法

import Vue from 'vue'

const app = new Vue({
  // el: '#root',
  // template: '<div>{{text}}</div>',
  data: {
    text: 0
  },
  render (h) { // h是vue里的createElement方法
    // throw new TypeError('render error')
    console.log('render function invoked')
    return h('div', {}, this.text)
  }, // h(一个标签, 包含props或事件等的一个对象, 内容)。在上面没有template:时，写render效果是一样的
  // render函数是在beforeMount和mounted中间执行的

  renderError (h, err) {
    // 只有在开发的时候本组件render函数报错才会被调用
    return h('div', {}, err.stack)
  },
  errorCaptured () {

  }, // 会向上冒泡，并且正式环境可以使用

  // 下面都是Vue实例的生命周期方法
  beforeCreate () {
    console.log(this.$el, 'beforeCreate')
  }, // 输出： undefined "beforeCreate"
  created () {
    console.log(this.$el, 'created')
  }, // 输出： undefined "created"
  beforeMount () {
    console.log(this.$el, 'beforeMount')
  }, // 输出： <div id="root"></div> "beforeMount"
  mounted () {
    console.log(this.$el, 'mounted')
  }, // 输出： <div>0</div> "mounted"          // 注意：渲染出来的html把要挂载的html覆盖掉
  beforeUpdate () {
    console.log(this, 'beforeUpdate')
  },
  updated () {
    console.log(this, 'updated')
  },
  activated () { // 在组件章节讲解
    console.log(this, 'activated')
  },
  deactivated () { // 在组件章节讲解
    console.log(this, 'deactivated')
  },
  beforeDestroy () {
    console.log(this, 'beforeDestroy')
  },
  destroyed () {
    console.log(this, 'destroyed')
  }
})
app.$mount('#root')
// setInterval(() => {
//   app.text = app.text += 1
// }, 1000)

setTimeout(() => {
  app.$destroy() // 用于主动销毁生成的vue实例
}, 1000)
// beforeCreate，created在new Vue实例的时候必定执行
// 若没有指定el: '#root'，或没有执行.$mount方法，则在new Vue实例的时候只执行beforeCreate，created方法
// 若没有指定el: '#root'，或没有执行.$mount方法(用于声明挂载到html哪个节点)，则不知道挂载到哪里去这样也就不会执行相关的操作beforeMount和mounted方法
// beforeMount和mounted 两个生命周期方法和挂载到页面上的节点有关
// beforeUpdate和updated在有数据更新的时候才会执行
// beforeDestroy和destroyed
