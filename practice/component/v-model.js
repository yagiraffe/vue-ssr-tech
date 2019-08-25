// 主要讲解的是Vue的组件之自定义双向绑定

import Vue from 'vue'

const component = {
  model: {
    prop: 'value1',
    event: 'change'
  }, // 用于定义v-model时变量的名称
  props: ['value1'],
  template: `
    <div>
      <input type="text" @input="handleInput" :value="value1">
    </div>
  `,
  methods: {
    handleInput (e) {
      this.$emit('change', e.target.value) // e.target.value 把输入框里的值放给父组件
    }
  }
}

new Vue({
  components: {
    CompOne: component
  },
  el: '#root',
  data () {
    return {
      value: '123'
    }
  },
  template: `
    <div>
      <comp-one v-model="value"></comp-one>
    </div>
  `
}) // arguments就是通过$emit传出来的参数
// 首先你要知道 input 元素本身有个 oninput 事件，这是 HTML5 新增加的，类似 onchange ，每当输入框内容发生变化，就会触发 oninput ，把最新的value传递给 sth。进而实现了数据双向绑定。
// 在给元素添加v-model属性时，默认会把value作为元素的属性，然后把input 事件作为实时传递value的触发事件。
// <comp-one :value="value" @input="value = arguments[0]"></comp-one>
// 等价于
// <comp-one v-model="value"></comp-one>
