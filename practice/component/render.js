// 主要讲解的是Vue的组件之render function

import Vue from 'vue'

const component = {
  props: ['props1'],
  name: 'comp',
  // template: `
  //   <div :style="style">
  //     <slot></slot>
  //   </div>
  // `,
  render (createElement) {
    return createElement('div', {
      style: this.style
      // on: {
      //   click: () => { this.$emit('click') }
      // }
    }, [
      this.$slots.header, // this.$slots.default是用于把插槽显示出来，若slot里没有name时，就是default，若假设有name="header"，这一句就是this.$slots.header
      this.props1
    ])
  },
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

    Object.defineProperty(data, 'value', {
      get: () => this.value,
      enumerable: true
    })

    return {
      yeye: this,
      data
    }
  },
  el: '#root',
  data () {
    return {
      value: '123'
    }
  },

  mounted () {
    console.log(this.$refs.comp, this.$refs.span)
  },
  methods: {
    handleClick () {
      console.log('clicked')
    }
  },
  // template: `
  //   <div>
  //     <comp-one ref="comp">
  //       <span ref="span">{{value}}</span>
  //     </comp-one>
  //   </div>
  // `

  // template只是一个字符串，真正的显示html上面，这个过程如下：template会经过vue生命周期里的一个过程也就是编译，它被编译成js的函数，也就是render方法，render方法里做的事情如下：

  render (createElement) { // $createElement是vue提供的创建节点的函数，在每个vue的实例上面都会有这个函数。在使用render方法时，在调用render时会传入一个createElement函数。
    return createElement(
      'comp-one', // 传入节点的名字，可以是个组件也可以是dom节点
      {
        ref: 'comp',
        props: {
          props1: this.value
        },

        // on: {
        //   click: this.handleClick
        // },

        nativeOn: {
          click: this.handleClick
        } // 若是个组件，naiveOn会自动绑定到组件的原生的根节点上。若本身就是原生的dom节点，就直接绑定到这个dom上面。
      }, // 传入节点的属性
      [
        createElement('span', {
          ref: 'span',
          slot: 'header', // 这儿的slot指这部分的内容是要放到哪个slot里面
          // domProps: {
          //   innerHTML: '<span>345</span>'
          // },
          attrs: {
            id: 'test-id'
          }
        }, this.value)
      ] // 上一个节点里的内容，若是子节点则需要使用数组去传递，若是字符串则不需要使用数组传递
    )
  }
})
// render () {
//  this.$createElement()
// }
