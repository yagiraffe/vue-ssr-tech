
<!-- app.vue只是一个组件 -->

<!-- vue要显示的内容 -->
<template>
<!-- 注意vue组件一定要有一个独立的外部结点，也就是template里的内容必需有一个div包裹着-->
    <div id="app">
        <div id="cover"></div>
        <!-- <Header>{{count}}</Header> 这样是显示不出count的，因为Header的template里没有插槽-->
        <Header></Header>
        <!-- <p>{{fullName}} {{counter}}</p> -->
        <!-- <p>{{textC}} {{textPlus}}</p> -->
        <!-- router-link是个a标签 -->
        <!-- 可根据路由的name进行路由跳转方法就是传入的是json对象，若想让"{name: 'app'}"不被当成字符串处理，就使用v-bind绑定数据 -->
        <!-- <router-link to="/app/123">app123</router-link>
        <router-link to="/app/456">app456</router-link>
        <router-link to="/login">login</router-link> -->
        <!-- <todo></todo> -->

        <!-- vue里的组件显示的过渡的动画 -->
        <transition name="fade">
          <router-view /> <!-- 路由声明里所匹配的组件是通过router-view占位符显示进去的 -->
        </transition>
        <!-- <button @click="notify">click me</button> -->
        <!-- <notification content="test notify" /> -->
        <Footer></Footer>
        <!-- <router-view name="a" /> -->
    </div>
</template>

<!-- 控制显示的内容的变化 -->
<script>
import {
  mapState,
  mapGetters,
  mapActions,
  mapMutations
} from 'vuex'
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
// import Todo from './views/todo/todo.vue'
export default {
  metaInfo: {
    title: 'Jokcy\'s Todo App'
  },
  // 用于声明app.vue里要使用的vue组件
  components: {
    Header,
    Footer
    // Todo
  },
  mounted () {

    // console.log(this.$store) // Vuex会处理在每个组件内部都会加一个.$store对象，它就指向应用入口传入的store对象
    // // let i = 1
    // this.updateCountAsync({
    //   num: 5,
    //   time: 2000
    // }) // dispatch 就是专门用来触发actions的
    // this.updateText('123')
    // this['a/updateText']('123')
    // this['a/add']()
    // this['b/textAction']()
    // setInterval(() => {
    //   this.updateCount({
    //     num: i++,
    //     num2: 2
    //   }) // 用于修改count的值，用commit去触发mutations，即this.$store.commit去调用mutations里的方法，即 this.$store.commit('mutations方法名', 值)
    // }, 1000)
  },
  methods: {
    ...mapActions(['updateCountAsync']), // ...mapActions(['updateCountAsync', 'a/add', 'b/textAction']), 若在b模块里并没有声明namespaced:r: true，所以b模块的mutations是在全局命名空间下，所以此时就不需要加模块名
    ...mapMutations(['updateCount']) // ...mapMutations(['updateCount', 'a/updateText']) 若mutations在全局的命名空间下，则可直接...mapMutations(['mutations方法名'])，调用方式是this.mutations方法名(值)
    // 否则则需要使用命名空间，...mapMutations(['a/updateText'])，调用的方式就是this['a/updateText']('123')
    // notify () {
    //   this.$notify({
    //     content: 'test $notify',
    //     btn: 'close'
    //   })
    // }
  },
  computed: {
    // textA () {
    //   return this.$store.state.b.text
    // },
    ...mapState({
      counter: (state) => state.count
      // textA: state => state.a.text,
      // textC: state => state.c.text
    }), // 需安装 cnpm install babel-preset-stage-1@6.24.1 -D 才能使用...这个语法
    // count () {
    //   return this.$store.state.count
    // },
    ...mapGetters({
      fullName: 'fullName'
      // textPlus: 'a/textPlus'
    })
  //   fullName () {
  //     return this.$store.getters.fullName
  //   }
  }
  // mounted () {
  //   console.log(this.$route) // $route对应的是当前的路由里面包含的信息
  // } // 在路由设置里设置了path: '/app/:id'，在网址是http://localhost:8000/app/123?a=456&b=789，console.log(this.$route)输出是下面的对象：
// {name: "app", meta: {…}, path: "/app/123", hash: "", query: {…}, …}
// fullPath: "/app/123?a=456&b=789"
// hash: ""
// matched: [{…}]
// meta: {title: "this is app", discription: "asdasd"}
// name: "app"
// params: {id: "123"}
// path: "/app/123"
// query: {a: "456", b: "789"} // ?后面的就是query
// __proto__: Object
}
</script>

<!-- 控制显示的内容如何展示 -->
<style lang="stylus" scoped>
// lang="stylus"指明使用stylus-loader处理下面的样式
// 下面的样式是用.styl的格式写的
    #app{
        position absolute
        left 0
        right 0
        top 0
        bottom 0
    }
    #cover{
        position absolute
        left 0
        right 0
        top 0
        bottom: 0
        background-color #999
        opacity .9
        z-index -1
    }
</style>