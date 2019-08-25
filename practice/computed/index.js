// 主要讲解的是computed和watch使用场景和方法

import Vue from 'vue'

// 选中多行操作：Alt+鼠标左键

new Vue({
  el: '#root',
  template: `
    <div>
      <p>Name: {{name}}</p>
      <p>Name: {{getName()}}</p>
      <p>Number: {{number}}</p>
      <p>FullName: {{fullName}}</p>
      <p><input type="text" v-model="number"></p>
      <p>FirstName: <input type="text" v-model="firstName"></p>
      <p>LastName: <input type="text" v-model="lastName"></p>
      <p>Name: <input type="text" v-model="name"></p>
      <p>Obj.a: <input type="text" v-model="obj.a"></p>
    </div>
`,
  // v-model 双向绑定数据，这里的数据变化时对应的数据也变化

  // 把名字显示出来方法：
  // 1.做字符串的拼接 template: `<div><span>Name: {{firstName+ ' ' + lastName}}</span></div>`,
  // 2.若计算比较多，要用到computed: {}，在里面写方法函数

  data: {
    firstName: 'Jocky',
    lastName: 'Lou',
    number: 0,
    fullName: '',
    obj: {
      a: '123'
    }
  },
  // computed: {}用于声明方法，这些方法返回的数据可以像调用变量一样在模板里调用，在Vue对象里也可以直接通过computed里的方法名直接调用返回的值，即写 {{方法名}} 调用
  // computed里的方法实际上是在定义类的时候的get方法，是通过Object.defineProperty给它设置get和set方法，此时get方法可以通过变量的名字去调用，实际上是调用这个方法。
  // computed可以缓存计算后的数据，
  // computed: {
  //   name () {
  //     console.log('new name')
  //     return `${this.firstName} ${this.lastName}`
  //   }
  // },
  // 上面的computed等同于下面的computed // 下面的name是个属性数据 // 通过改变 name 的值，也可以改变 computed 属性 name 所改变的 firstName 和 lastName 的值。
  // 不推荐这样做，一般 computed 属性数据是根据多重数据组合成的新的数据，组合容易，但拆开重新设置并不容易
  computed: {
    name: {
      get () {
        console.log('new name')
        return `${this.firstName} ${this.lastName}`
      },
      set (name) {
        const names = name.split(' ')
        this.firstName = names[0]
        this.lastName = names[1]
      }
    }
  },

  // watch: { // watch的方法若没有声明属性immediate: true，其在最初绑定的时候，是不会执行的，只有当监听数据变化，才会执行。
  //   // 要监听的数据 方法函数
  //   firstName (newName, oldName) {
  //     this.fullName = newName + ' ' + this.lastName
  //   }
  // },

  // watch: {
  //   // 下面的firstName是要监听的数据
  //   firstName: {
  //     handler (newName, oldName) {
  //       this.fullName = newName + ' ' + this.lastName
  //     },
  //     immediate: true, // 声明这个属性后，watch立马会先执行一遍hander
  //     deep: true // 默认是false，
  //   }
  // },

  watch: {
    // 若obj是要监听的，不使用deep属性时，由于obj是个对象，对象里有很多属性，当我们改变 obj.a 的值时，watch不能监听到数据变化，默认情况下，handler 只监听属性引用的变化，也就是只监听了一层，但改对象内部的属性是监听不到的。
    // 通过使用 deep: true 进行深入观察，这时，我们监听 obj，会把 obj 下面的属性层层遍历，都加上监听事件，这样做，性能开销也会变大，只要修改 obj 中任意属性值，都会触发 handler。
    // 优化就是使用字符串 'obj.a'，写 obj 深入的属性调用，vue 会层层解析，找到 a，并进行监听。
    'obj.a': {
      handler () {
        console.log('obj.a changed')
      },
      immediate: true // 声明这个属性后，watch立马会先执行一遍hander
      // deep: true
    }
  },
  // mounted () {
  //   this.obj = {
  //     a: '345'
  //   }
  // }, // 直接改obj是可以触发handler的

  // 要监听firstName和lastName时代码要写两个handler，因此watch并不适用于去显示做数据拼装后的数据，这时就用computed。
  // watch的应用场景就是如果我们要监听到某个数据的变化，监听到变化后做某个指定的操作时就用watch
  methods: {
    getName () {
      console.log('getName invoked')
      return `${this.firstName} ${this.lastName}`
    }
  }
})
// ES6的多行字符串用反引号``包围。
// ES6中组合字符串时有字符串变量的拼接方式是 `模板字符串 ${变量名1} ${变量名2}`  （放在反引号里）（中间的空格起作用）

// 通过input框和双向绑定改变number的时候，整个应用会重新渲染，vue会把数据重新渲染到dom中。
// 这时，如果我们使用methods: {}里的 getName 方法，随着渲染，这个方法也会被重新调用，也就是说它会重新经过计算，
// 而 computed 不会重新调用方法，也就是说它不会重新进行计算，从而性能开销比较小。当新的值需要大量计算才能得到，缓存的意义就非常大。
// 如果 computed 所依赖的数据发生改变时，计算属性才会重新计算，并进行缓存；当改变其他数据时，computed 属性 并不会重新计算，从而提升性能。
// 当我们拿到的数据需要进行一定处理然后显示时，就可以使用 computed。

// 注意：不要在 computed 或 watch 中，去修改所依赖的数据的值，尤其是 computed；如果这样做，可能导致一个无线循环的触发。
