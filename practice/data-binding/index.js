// 主要讲解的是Vue的数据绑定：就是把Vue里的data绑定到template上面，让它去显示出要显示的内容，用{{xx}}进行绑定
// template: <div>{{显示在这的数据名}}</div>
// 在template: ''里，可以访问的如下：
// 可以在绑定数据的时候对数据做操作，只能做简单的二元运算，<div>{{isActive ? 'active' : 'no active'}}</div>
// 或对数组简单操作， <div>{{arr.join(' ')}}</div>
// 不能写if..else语句
// 可以调用js的原生的对象的，{{Date.now()}}
// 可以访问Vue实例对象上绑定在this上面的所有值
// 自己定义在外面的全局变量，在template里是访问不到的

// 在template里，要把一段html代码以html节点显示，要用到Vue指令：<标签 v-html="变量名"></标签>
// 若以 <div>{{html}}</div> // 则在页面上会显示：<span>123</span>

// Vue的指令：
// v-html=""  将html代码以html节点显示
// v-bind:xx=""  用于绑定一些动态数据的，可简写成 :xx=""
// v-bind:id="变量名" 其简写是  :id=""  指定标签的id（这样写标签的id可以随变量的值变化）。   id="xx" 这样标签的id不能动态变化
// v-on:事件="" 缩略写法是 @事件=""   绑定事件 eg: v-on:click="handleClick"或@click="handleClick"
// :class="{}"  动态绑定class，具体写法如下例子 :class="{active: isActive}"
// :class="[]"  eg：:class="[isActive ? active : '']"
// :class="[{active: isActive}]"
// :style="style1" 或 :style="[style1, style2]"(这样会自动合并样式)   绑定样式

import Vue from 'vue'

var globalvar = '111' // eslint-disable-line
// 在一个语句后面注释写eslint-disable-line，这样eslint就不会检查这一行的eslint错误
// template: `<div>{{globalvar}}</div>` 是不能访问到globalvar，挂载完后是 <div></div>
new Vue({
  el: '#root', // el: '#节点的id' // 要挂载到哪个节点
  // template: `
  //   <div :id="aaa" @click="handleClick">
  //     <p v-html="html"></p>
  //   </div>
  // `,
  // 用'xx'表示字符串时候，后面的'不能换行，否则报错。若想换行的话用``，后面的`可以换行，如下所示
  // `
  // xx
  // `

  template: `
    <div
      :class="[{active: isActive}]"
      :style="[styles, styles2]"
    >
      <p>{{getJoinedArr(arr)}}</p>
    </div>
  `,
  // 若对数据有个复杂操作，操作后的数据要写在template里，方法是：在 computed: {} 里声明一个方法返回结果，在template里写 {{方法名}}
  // data:{}用于声明数据
  data: {
    isActive: false,
    arr: [1, 2, 3],
    html: '<span>123</span>',
    aaa: 'main',
    styles: {
      color: 'red',
      appearance: 'none' // 消除浏览器默认的样式：-webkit-appearance属性，vue会根据浏览器自动加上前缀-webkit
    },
    styles2: {
      color: 'black'
    } // 若有相同的属性，会用后面的替代前面的
  },
  // methods:{}用于声明方法
  methods: {
    handleClick () {
      alert('clicked') // eslint-disable-line
    },
    getJoinedArr (arr) {
      return arr.join(' ')
    } // 此方法也可以写在computed:{}里，因为computed里的计算只有在arr里有数据变化时，computed才会重新去计算
  }

})
// 数组.join('连接符')
