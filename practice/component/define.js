// 主要讲解的是Vue的组件之组件的定义

// 使用.vue文件开发时，这个.vue文件实际是export出去一个对象

import Vue from 'vue' // 引入这个后，Vue就是一个全局的类

const component = {
  // 在定义组件的时候，props是定义这个组件在被外部使用的时候，这个组件的可配置的行为的，例如定义变量的类型，用于类型检查
  // 子组件里的props是用于定义父组件在用这个组件时传递过来的参数的类型，这些参数是用来约束这个子组件的展示行为的。
  // props的第一种写法是：props：{
  // 变量名1: {
  //  type: 类型,
  //  required: true // 指定required: true后这个参数是一定要传到子组件的
  // },
  // 变量名2: 类型
  // }
  props: {
    active: {
      // type: Boolean, // 控制变量的类型
      // required: true // 指这个参数active是一定要传到子组件的
      default: true, // 用于指定这个参数的默认值是什么，若默认值是个对象则需要需要写成方法即default () { return {}}  // required: true 和 default: true 不会同时出现在一起
      validator (value) {
        return typeof value === 'boolean'
      }
    },
    propOne: String // 在props里命名变量的写法是第一个单词全部用小写，第二个单词首字母大写。使用这个变量的写法是用-连接符连接两个单词，单词字母都是小写，prop-one
    // onChange: Function
  }, // 我们不能在组件里主动修改组件的props里变量的值，props里的变量是外部组件传来的，用来约束这个组件的展示行为的。
  // props的第二种写法是：props: ['变量名1', '变量名2']，这种写法不严谨。推荐使用第一种写法。
  // props: ['active', 'propOne'],
  template: `
    <div>
      <input type="text" v-model="text">
      <span @click="handleChange">{{propOne}}</span>
      <span v-show="active">see me if active</span>
    </div>
  `,
  data () {
    return {
      text: 0
    } // data(){}里return 的内容必须是一个唯一的新建的对象，不能使用一个全局的对象去return，
    // 这样的话<div><comp-one></comp-one><comp-one></comp-one></div>里的两个组件的数据text的值就不会互相影响
  }, // 在使用data: {}在定义组件内数据的时候，如果这个组件不是通过new Vue方式生成出来的，而是通过注册到全局或注册到某个vue实例里面去使用的话，则这个组件一定要使用函数的方式定义数据，而且要return想要的数据结构，即 data () { return xx }  并且return 的内容必须是一个唯一的新建的对象同时不能使用一个全局的对象去return。不能使用 data:{}方式声明数据
  methods: {
    handleChange () {
      this.$emit('change') // 用于触发事件change
      // this.onChange()
    }
  }
} // 在全局声明一个component对象，这个对象里面就是组件里要定义的东西
// 把一个全局对象注册成Vue组件的方式：
// 1.在全局使用Vue类的component方法把要变成组件的对象定义成一个组件放到全局，这样定义的组件是全局的，即Vue.component('组件的名字', 对象)。这样在其他组件的template里就可以使用这个组件。使用方式： <组件名></组件名>
// Vue.component('CompOne', component) // 这样就定义了一个comp组件
// 2.若想把这个全局对象定义成一个只在Vue实例里面使用的组件，方法就是在Vue实例里即new Vue({})里加一个配置components: {组件名: 对象名}
// 其实new Vue({})时也可以看作一个组件，其实就是Root组件
new Vue({
  components: {
    CompOne: component
  },
  data: {
    prop1: 'text1'
  },
  methods: {
    handleChange () {
      this.prop1 += 1
    }
  },
  // mounted方法：html加载完成后执行。
  mounted () {
    console.log(this.$refs.comp1)
  },
  el: '#root',
  // 使用v-bind方式绑定active时，内容是true或false时，vue通过v-bind会去解析的
  template: `
    <div>
      <comp-one ref="comp1" :active="true" :prop-one="prop1" @change="handleChange"></comp-one>
      <comp-one propOne="text2"></comp-one>
    </div>
  `
}) // template里必须只有一个根节点 // // @change="handleChange" 是用于监听子组件的事件change，也就是绑定了change事件v-on:change

// 组件命名规则：
// 定义组件名的时候，最好是大写开头，并且当使用有两个单词及以上命名的时候，要以每个单词都要大写开头的方式直接放到一起定义组件名，例如CompOne
// 当使用组件的时候，只需要使用名字的小写就可以了，而且使用连接符-连接两个单词，例如comp-one

// 从Chrome浏览器里的Vue插件可以看到页面所使用的vue组件的数据内容的变化情况
