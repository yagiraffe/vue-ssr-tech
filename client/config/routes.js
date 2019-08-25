// import Todo from '../views/todo/todo.vue'
// import Login from '../views/login/login.vue'
// 配置路由
export default [
  {
    path: '/', // 这时默认路由路径
    redirect: '/app'
  },
  {
    path: '/app',
    // path: '/app/:id', // 路径是 页面url的根目录下的app 的时候才把todo应用显示出来 // /app/xxx 后面的xxx都会变成id的变量
    props: true, // 设置这个后，会把上面 path: '/app/:id' 里的 :id 作为Todo组件的props里的内容传进组件里，而在组件里不需要使用this.$route这个对象去获取id
    // 还可以在props指定传的id的值
    // props: (route) => ({id: route.query.b}), // id就是789
    // 需要安装插件 cnpm install babel-plugin-syntax-dynamic-import@6.18.0 -D
    component: () => import('../views/todo/todo.vue'),
    // components: {
    //   default: Todo,
    //   a: Login
    // },
    name: 'app', // 给路由命名，这个名字和path可以没有关系 // 可根据name进行路由的跳转
    meta: {
      title: 'this is app',
      discription: 'asdasd'
    },
    // 在路由配置里加钩子，其调用顺序是beforeEach和beforeResolve之间
    beforeEnter (to, from, next) {
      console.log(('app route before enter'))
      next()
    }
    // children: [ // 子路由
    //   {
    //     path: 'test',
    //     component: Login
    //   }
    // ]
  },
  {
    path: '/login', // /login路由
    component: () => import('../views/login/login.vue')
  }
] // 每个路由都是作为一个数组去配置，每个router项都使用对象表示
