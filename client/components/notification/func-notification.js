import Notification from './notification.vue'

export default {
  extends: Notification, // 继承Notification
  computed: {
    style () {
      return {
        position: 'fixed',
        right: '20px',
        bottom: `${this.verticalOffset}px`
      }
    }
  },
  // 设置通知的自动关闭
  mounted () {
    this.createTimer()
  },
  methods: {
    createTimer () {
      if (this.autoClose) {
        this.timer = setTimeout(() => {
          this.visible = false // 在notification组件里设了v-show，把组件隐藏掉
        }, this.autoClose) // setTimeout方法是用来设定一个时间, 时间到了, 就会执行一个指定的 method
      }
    },
    clearTimer () {
      if (this.timer) {
        clearTimeout(this.timer) // 清除时间设定
      }
    },
    afterEnter () {
      // debugger // eslint-disable-line
      this.height = this.$el.offsetHeight
    }
  },
  beforeDestory () {
    this.clearTimer()
  },
  data () {
    return {
      verticalOffset: 0,
      autoClose: 3000, // 时间是3000毫秒
      height: 0,
      visible: false
    }
  }
}
