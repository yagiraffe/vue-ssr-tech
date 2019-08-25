
<template>
<!-- vue中添加事件的方式：v-on:事件名称="xx" 等价于 @事件名称="xx" -->
<!-- .enter指回车执行后面的操作 -->
  <section class="real-app">
    <div class="tab-container">
      <tabs :value="filter" @change="handleChangeTab">
        <tab :label="tab" :index="tab" v-for="tab in stats" :key="tab" />
      </tabs>
    </div>
    <input
        type="text"
        class="add-input"
        autofocus="autofocus"
        placeholder="接下去要做什么？"
        @keyup.enter="handleAdd"
    >
    <!-- <item :todo="todo"></item>由于<item>里面没有内容，所以可写成如下形式 -->
    <!-- @del="deleteTodo" 是用于监听子组件item.vue要触发的事件 -->
    <item
        :todo="todo"
        v-for="todo in filteredTodos"
        :key="todo.id"
        @del="deleteTodo"
        @toggle="toggleTodoState"
    />
      <!-- 也就是<Item></Item> -->
      <!-- 在这里把filter数据传给子组件tabs -->
    <helper
        :filter="filter"
        :todos="todos"
        @clearAllCompleted="clearAllCompleted"
    />
    <!-- <helper
        :filter="filter"
        :todos="todos"
        @toggle="toggleFilter"
        @clearAllCompleted="clearAllCompleted"
    /> -->
    <!-- 也就是<Tabs></Tabs> -->
    <!-- <router-view /> -->
  </section>
</template>

<script>
import {
  mapState, mapActions
} from 'vuex'
import Item from './item.vue'
import Helper from './helper.vue'
// let id = 0
export default {
  metaInfo: {
    title: 'The Todo App'
  },
  // 在组件内部加路由钩子
  // 可用于做数据获取然后塞到对象中
  beforeRouteEnter (to, from, next) {
    console.log('todo before enter', this) // 是拿不到组件的this的，因为这时候组件还没被创建
    next(vm => { // vm是组件被创建后的this对象
      console.log('afer enter vm.id is ', vm.id)
    }) // 有next就执行next，否则路由被终止,next里可接收回调
  },

  beforeRouteUpdate (to, from, next) {
    console.log('todo update enter')
    next()
  }, // 只有在param路由的时候，同样的路由形式进行切换的时候才会被触发，这时就不会触发beforeRouteEnter

  beforeRouteLeave (to, from, next) {
    console.log('todo leave enter')
    next()
  },
  // beforeRouteLeave (to, from, next) {
  //   console.log('todo leave enter')
  //   if (global.confirm('are you sure?')) {
  //     next()
  //   }
  // },
  props: ['id'],
  mounted () {
    if (this.todos && this.todos.length < 1) {
      this.fetchTodos()
    }
    // console.log(this.id)
    // console.log('todo mounted')
    // setTimeout(() => {
    //   this.tabValue = '2'
    // }, 1000)
  }, // 在app/123和app/456下面，显示的是同一个组件的时候，则第二次的mounted不会被触发，也就是说mounted方法里的数据不会更新，这时要使用beforeRouteUpdate
  data () {
    return {
      // todos: [],
      filter: 'all',
      stats: ['all', 'active', 'completed']
    }
  },
  components: {
    Item,
    Helper
  },
  computed: {
    ...mapState(['todos']),
    filteredTodos () {
      if (this.filter === 'all') {
        return this.todos
      }
      const completed = this.filter === 'completed'
      // filter()函数用于找出符合条件的所有元素
      return this.todos.filter(todo => completed === todo.completed)
    }
  },
  methods: {
    ...mapActions([
      'fetchTodos',
      'addTodo',
      'deleteTodo',
      'updateTodo',
      'deleteAllCompleted'
    ]),

    handleAdd (e) {
      const content = e.target.value.trim()
      if (!content) {
        this.$notify({
          content: '必须输入要做的内容'
        })
        return
      }
      const todo = {
        content,
        completed: false
      }
      this.addTodo(todo)
      e.target.value = ''
    },
    // deleteTodo (id) {
    //   this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
    // },
    toggleTodoState (todo) {
      this.updateTodo({
        id: todo.id,
        todo: Object.assign({}, todo, {
          completed: !todo.completed
        })
      })
    },
    clearAllCompleted () {
      // this.todos = this.todos.filter(todo => !todo.completed)
      this.deleteAllCompleted()
    },
    handleChangeTab (value) {
      this.filter = value
    }
    // addTodo (e) {
    //   this.todos.unshift({
    //     id: id++,
    //     content: e.target.value.trim(),
    //     completed: false
    //   })
    //   e.target.value = ''
    // },
    // deleteTodo (id) {
    //   this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
    // },
    // // toggleFilter (state) {
    // //   this.filter = state
    // // },
    // clearAllCompleted () {
    //   // 就是把没完成的显示出来
    //   this.todos = this.todos.filter(todo => !todo.completed)
    // },
    // handleChangeTab (value) {
    //   this.filter = value
    // }
  }
}
</script>

<style lang="stylus" scoped>
    .real-app{
        width 600px
        margin 0 auto
        box-shadow 0 0 5px #666
    }
    .add-input{
        position: relative;
        margin: 0;
        width: 100%;
        font-size: 24px;
        font-family: inherit;
        line-height: 1.4em;
        border: 0;
        outline: none;
        color: inherit;
        padding: 6px;
        border: 1px solid #999;
        box-shadow: inset 0 -1px 5px 0 rgba(0,0,0,0.2);
        box-sizing: border-box;
        font-smoothing: antialiased;
        padding: 16px 16px 16px 60px;
        border: none;
        box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
    }
    .tab-container
      background-color #fff
      padding 0 15px
</style>

