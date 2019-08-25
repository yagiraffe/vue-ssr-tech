// 主要讲解的是Vue的组件之高级属性

import Vue from 'vue'

const ChildComponent = {
  template: '<div>child component {{data.value}}</div>',
  inject: ['yeye', 'data'],
  mounted () {
    console.log(this.$parent.$options.name, this.yeye, this.value)
  }
}

const component = {
  name: 'comp',
  components: {
    ChildComponent
  },

  // template: `
  //   <div :style="style">
  //     <div class="header">
  //       <slot name="header"></slot>
  //     </div>
  //     <div class="body">
  //       <slot name="body"></slot>
  //     </div>
  //   </div>
  // `, // slot是插槽，其是vue的内置组件
  template: `
    <div :style="style">
      <slot :value="value" aaa="111"></slot>
      <child-component></child-component>
    </div>
  `,
  data () {
    return {
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid #aaa'
      },
      value: 'component value'
    }
  }
}

new Vue({
  components: {
    CompOne: component
  },
  provide () {
    const data = {}

    Object.defineProperty(data, 'value', { // 给data指定value属性，而value有一些属性get方法
      get: () => this.value,
      enumerable: true // 可被读取
    })

    return {
      yeye: this,
      data
      // value: this.value // // 默认情况下provide不提供vue的reactive的属性的，比如这儿提供了一次value值，假设父级value值变了并不会导致子组件value的变化。若一定要实现value的reactive特性的话，我们要自己给指定的属性提供一个get方法。
    }
  }, // 在父级的组件上面提供provide之后，在孙子级上面就可以引用到父级上面提供的东西
  // provide: {
  //   yeye: this,
  //   value: this.value
  // }, // 直接这样些的话引用this会报错，在provide初始化时，vue对象还没有真正的初始化成功，如果要进行一些和对象上挂钩的值的传递，要提供函数 provide () {}。这和data () {}一样，vue对象在初始化过程中去调用provide方法去得到相应的值。孙子级要加inject属性
  el: '#root',
  data () {
    return {
      value: '123'
    }
  },

  mounted () {
    console.log(this.$refs.comp, this.$refs.span)
  }, // 前面输出的是VueComponent，后面输出的是 <span>component value 111 123</span> // 这就是在组件上加ref和在原生html上面加ref的区别。我们可以用this.$refs.comp去调用组件上的变量和方法 this.$refs.comp.value 输出 component value

  // template: `
  //   <div>
  //     <comp-one>
  //       <span slot="header">this is header</span>
  //       <span slot="body">this is body</span>
  //     </comp-one>
  //   </div>
  // `
  // template: `
  //   <div>
  //     <comp-one>
  //       <span>{{value}}</span>
  //     </comp-one>
  //   </div>
  // ` // 在使用组件的地方定义了value，同时在子组件内部也有value，此时页面会显示 123 ，也就是{{value}}是跟着使用组件的地方里的value值变化的

  template: `
    <div>
      <comp-one ref="comp">
        <span slot-scope="props" ref="span">{{props.value}} {{props.aaa}} {{value}}</span>
      </comp-one>
      <input type="text" v-model="value">
    </div>
  ` // 在使用组件的地方我们想使用子组件里面的属性时，可以使用作用域插槽slot-scope，首先给slot-scope取个名字，然后用 名字.属性名 去调用子组件里面定义在slot上面的属性
  // 最后的 {{value}} 是本地的value
})
// <comp-one>
//  <span>this is content</span>
// </comp-one> // vue组件是组件并不是传统的html节点，我们可以在使用组件的时候在组件里面可以写其他html代码，但是若要里面的html内容显示，必须告诉组件这些节点是在哪显示的，也就是要在组件的模板里写<slot></slot>
// 组件里面写的html代码就会被放到写<slot></slot>的位置
// 具名插槽 <slot> 元素可以用一个特殊的属性 name 来配置如何分发内容。多个 slot 可以有不同的名字。具名 slot 将匹配内容片段中有对应 slot 特性的元素
// 在自定义组件内容的时候，组件template里的有些内容可以写在外面。

// 不是父子组件关系，而是跨层级的组件关系之间沟通需要用到provide和inject属性，
