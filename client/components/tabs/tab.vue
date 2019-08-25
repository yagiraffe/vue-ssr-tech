<script>
export default {
  name: 'Tab',
  props: {
    index: {
      required: true,
      type: [String, Number]
    },
    label: {
      type: String,
      default: 'tab'
    }
  },
  // inject: ['value'],
  mounted () {
    this.$parent.panes.push(this)
  },
  // 判断是否选中的方法是：tabs里的value和tab里的index一样，说明这个index所对应的tab是被选中的
  computed: {
    active () {
      return this.$parent.value === this.index // 拿到父组件的属性值方法1：this.$parent。方法2：父组件里面写一个provide方法，返回某个属性值，然后子组件inject这个值。若是拿到子组件所在的祖父组件的值就只能使用方法2。
    }
  },
  methods: {
    handleClick () {
      this.$parent.onChange(this.index)
    }
  },
  render () {
    const tab = this.$slots.label || <span>{this.label}</span>
    const classNames = {
      tab: true,
      active: this.active
    }
    // 用jsx语法写的，不能用@click
    return (
      <li class={classNames} on-click={this.handleClick}>
        {tab}
      </li>
    )
  }
}
</script>
<style lang="stylus" scoped>
.tab
  list-style none
  line-height 40px
  margin-right 30px
  position relative
  bottom -2px
  cursor pointer
  &.active
    border-bottom 2px solid blue
  &:last-child
    margin-right 0
</style>
