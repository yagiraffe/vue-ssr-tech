// 主要讲解的是Vue的组件之组件的继承

import Vue from 'vue'

const component = {
  props: {
    active: Boolean,
    propOne: String
  },
  template: `
    <div>
      <input type="text" v-model="text">
      <span @click="handleChange">{{propOne}}</span>
      <span v-show="active">see me if active is true</span>
    </div>
  `,
  data () {
    return {
      text: 0
    }
  },
  mounted () {
    console.log('comp mounted')
  },
  methods: {
    handleChange () {
      this.$emit('change')
    }
  }
} // 只是一个对象

const parent = new Vue({
  name: 'parent'
})

const component2 = {
  parent: parent,
  extends: component, // 继承对象component
  data () {
    return {
      text: 1
    }
  }, // 在new里声明数据用data: {} ，但是在vue的用其他方式生成的组件里声明数据用data () {return {xx: xxx}}
  mounted () {
    // console.log('comp2 mounted')
    // console.log(this.$parent.$options.name) // 输出是 Root
    // this.$parent.text = '12345' // 在实际应用中不要用this.$parent修改父组件的内容
    console.log(this.$parent.$options.name)
    // this.$parent指的是子组件所在的父组件，也就是引用这个组件的组件
  }
}

// 通过 Vue.extend(对象名) 将这个对象扩展成Vue类的子类，也就是继承了Vue类。Vue类的子类的名字命名和Vue的组件名命名方式一样
// const CompVue = Vue.extend(component) // CompVue是Vue类的子类，在extend之前，对象component里预先指定了子类的一些属性。

// new CompVue({
//   el: '#root',
//   propsData: {
//     propOne: 'xxx'
//   }, // 通过 propsData: {} 将props里的参数传进去
//   data: {
//     text: 123
//   }, // 通过new CompuVue({})里的data: {}写数据会在将子类里默认的data覆盖掉。但是props不能这样做，只能通过 propsData: {} 方式传，才能在new的时候拿到propsData
//   mounted () {
//     console.log('instance mounted')
//   } // component里和new里都有mounted方法，此时执行后component里的mounted方法先被调用，new里的后被调用
// })

new Vue({
  parent: parent,
  name: 'Root', // 在new Vue时候name会被转化成$options里的东西，所以要调用这个name要通过$options.name调用
  el: '#root',
  mounted () {
    console.log(this.$parent.$options.name)
  },
  components: {
    Comp: component2
  }, // 将component2注册成组件Comp
  data: {
    text: 2333
  },
  template: `
    <div>
      <span>{{text}}</span>
      <comp></comp>
    </div>
  `
})
