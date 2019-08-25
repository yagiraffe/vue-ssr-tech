<template>
<!-- v-model=""是vue的双向绑定，此处绑定了一个数据是todo.completed-->
<!-- checkbox被选中时，input中v-model绑定的值如果是boolean值，选中时会变成true，再次取消勾选会变false -->
    <div :class="['todo-item', todo.completed ? 'completed' : '']">
        <input
            type="checkbox"
            class="toggle"
            :checked="todo.completed"
            @click="handleToggle"
        >
        <label>{{todo.content}}</label>
        <button class="destory" @click="deleteTodo"></button>
    </div>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      // 必须传入的
      required: true
    }
  },
  methods: {
    // 在item组件里是删不掉要做的事的，因删掉是要把数组里的删掉，所以这儿要触发todo.vue，这其实就是
    // 父组件和子组件数据交互的关系，todo.vue是父组件，item.vue是子组件，父组件和子组件数据连通和交互的方式就是：
    // 父组件通过props传进来，那么子组件通过事件的方式告诉父组件我要做什么操作
    // this.$emit用于触发事件del
    // 父组件可以监听所有子组件里面会触发的事件，一旦触发这个事件，父组件就可以做对应的操作
    // 在vue里，子组件内实现的任何事件触发的操作，在父组件里都可以用  @xx="子组件触发的事件"  去监听，这样就实现了父子组件之间的事件的解耦
    deleteTodo () {
      this.$emit('del', this.todo.id)
    },
    handleToggle (e) {
      e.preventDefault()
      this.$emit('toggle', this.todo)
    }
  }
}
</script>

<style lang="stylus" scoped>
    .todo-item{
        position relative
        background-color #fff
        font-size 24px
        border-bottom 1px solid rgba(0,0,0,0.06)
        &:hover{
            .destory:after{
                content: '×'
            }
        }
        label{
            white-space: pre-line;
            word-break: break-all;
            padding: 15px 60px 15px 15px;
            margin-left: 45px;
            display: block;
            line-height: 1.2;
            transition: color 0.4s;
        }
        &.completed{
            label{
                color: #d9d9d9;
                text-decoration line-through
            }
        }
    }
    .toggle{
        text-align: center;
        width: 40px;
        height: 40px;
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto 0;
        border: none;
        appearance: none;
        outline none
        &:after{
            content url('../../assets/images/round.svg')
        }
        &:checked:after{
            content url('../../assets/images/done.svg')
        }
    }
    .destory{
        position: absolute;
        top: 0;
        right: 10px;
        bottom: 0;
        width: 40px;
        height: 40px;
        margin: auto 0;
        font-size: 30px;
        color: #cc9a9a;
        margin-bottom: 11px;
        transition: color 0.2s ease-out;
        background-color transparent
        appearance none
        border-width 0
        cursor pointer
        outline none
    }
</style>


