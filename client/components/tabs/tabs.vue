<script>
import TabContainer from './tab-container.vue'

export default {
  name: 'Tabs',
  components: {
    TabContainer
  },
  // provide () {
  //   return {
  //     value: this.value
  //   }
  // }, // 使用provide的话，这个value不是reactive的
  props: {
    value: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      panes: []
    }
  },
  render () {
    // map(函数) 方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。
    // map() 方法按照原始数组元素顺序依次处理元素。
    // 注意： map() 不会对空数组进行检测。
    // 注意： map() 不会改变原始数组。

    // const contents = this.panes.map(pane => {
    //   return pane.active ? pane.$slots.default : null
    // })

    // jsx语法中，插槽的写法：{this.$slots.default}
    return (
      <div class="tabs">
        <ul class="tabs-header">
          {this.$slots.default}
        </ul>
        <tab-container panes={this.panes}></tab-container>
      </div>
    )
  },
  methods: {
    onChange (index) {
      this.$emit('change', index)
    }
  }
}
</script>

<style lang="stylus" scoped>
.tabs-header
  display flex // 容器内元素的排列方向(默认横向排列)
  list-style none
  margin 0
  padding 0
  border-bottom 2px solid #ededed
</style>
