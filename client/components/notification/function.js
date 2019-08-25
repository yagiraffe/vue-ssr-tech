import Vue from 'vue'
import Component from './func-notification'

const NotificationCoonstructor = Vue.extend(Component) // 将Component扩展成vue类的子类。这样就可以通过 new 子类 创建组件

const instances = []
let seed = 1

const removeInstance = (instance) => {
  if (!instance) return
  const len = instances.length
  const index = instances.findIndex(inst => instance.id === inst.id)

  instances.splice(index, 1)

  if (len <= 1) return
  const removeHeight = instance.vm.height
  for (let i = index; i < len - 1; i++) {
    instances[i].verticalOffset =
      parseInt(instances[i].verticalOffset) - removeHeight - 16
  }
}

// 声明notify方法
const notify = (options) => {
  if (Vue.prototype.$isServer) return // 由于服务端没有dom运行环境的，所以不能在服务端进行dom操作

  const {
    autoClose,
    ...rest
  } = options

  const instance = new NotificationCoonstructor({
    propsData: {
      ...rest // 剩下的键值对写到propsData里。ES6语法
    }, // propsData: options,
    data: {
      autoClose: autoClose === undefined ? 3000 : autoClose
    }
  })

  const id = `notification_${seed++}`
  instance.id = id
  instance.vm = instance.$mount() // xx.$mount()不传节点的时候只是生成$el对象，这时候还没有真正插入到dom里边去，但是节点已经生成好了
  document.body.appendChild(instance.vm.$el) // 全局性的提醒放在body下面
  instance.vm.visible = true
  // 第一个在最底下，最后进去的在最上面
  let verticalOffset = 0
  instances.forEach(item => {
    verticalOffset += item.$el.offsetHeight + 16 // 元素的offsetHeight是一种元素CSS高度的衡量标准，包括元素的边框、内边距和元素的内容区高度。
  })
  verticalOffset += 16
  instance.verticalOffset = verticalOffset
  instances.push(instance)
  // 把自动关闭后的通知从数组里删掉
  // 在组件的模板里时，当监听子组件触发的del事件，@del="deleteTodo" 是用于监听子组件item.vue要触发的事件del
  // $on也是用于监听子组件触发的事件

  // 这个就是在离开的动画结束后，执行下面的操作
  instance.vm.$on('closed', () => {
    removeInstance(instance)
    document.body.removeChild(instance.vm.$el) // 删除dom里的节点
    instance.vm.$destroy() // 把vm对象销毁，但是不会删除dom节点
  })
  instance.vm.$on('close', () => {
    instance.vm.visible = false
  })
  return instance.vm
}

export default notify
