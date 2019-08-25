<template>
<!-- filter标识代表被选中的是哪一个 -->
    <div class="helper">
        <span class="left">{{unFinishedTodoLength}} items left</span>
        <!-- <span class="tabs">
            <span
                v-for="state in states"
                :key="state"
                :class="[state, filter === state ? 'actived' : '']"
                @click="toggleFilter(state)"
            >
                {{state}}
            </span>
        </span> -->
        <span class="clear" @click="clearAllCompleted">Clear completed</span>
    </div>
</template>

<script>
export default {
  // 由于filter数据是由上层组件传来的，所以需要用props声明，否则vue会报错
  // 在子组件里通过props这个属性把父组件要传过来的数据声明下
  props: {
    filter: {
      type: String,
      required: true
    },
    todos: {
      type: Array,
      required: true
    }
  },
  // data () {
  //   return {
  //     states: ['all', 'active', 'completed']
  //   }
  // },
  computed: {
    unFinishedTodoLength () {
      // array.filter(function(currentValue,index,arr), thisValue)
      return this.todos.filter(todo => !todo.completed).length
    }
  },
  methods: {
    clearAllCompleted () {
      this.$emit('clearAllCompleted')
    }
    // toggleFilter (state) {
    //   this.$emit('toggle', state)
    // }
  }
}
</script>

<style lang="stylus" scoped>
    .helper{
        font-weight 100
        display flex
        justify-content space-between
        padding 5px 0
        line-height 30px
        background-color #fff
        font-size 14px
        font-smoothing: antialiased
    }
    .left, .clear, .tabs{
        padding 0 10px
        box-sizing border-box
    }
    .left, .clear{
        width 150px
    }
    .left{
        text-align left
    }
    .clear{
        text-align right
        cursor pointer
    }
    .tabs{
        // width 200px
        display flex
        justify-content space-around
        * {
            display inline-block
            padding 0 10px
            cursor pointer
            border 1px solid rgba(175,47,47,0)
            &.actived{
                border-color rgba(175,47,47,0.4)
                border-radius 5px
            }
        }
    }
</style>
