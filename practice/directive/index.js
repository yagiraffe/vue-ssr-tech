// 主要讲解的是Vue的原生指令

// 注意：vue的template必须只包含一个根节点，不允许有并列的节点作为根节点

// Vue的所有指令都是以 v-xx 开头的， v-xx="变量名"
// v-text 标签里面要显示的内容是什么 <div v-text="text"></div> // 输出是：0 // 和 <div>{{text}}</div> 是一样的
// v-html 将变量的内容以html插入进去
// v-show 节点是否显示，值为false则节点不显示，也就是在节点里加了style="display:none"，但是该节点还是在dom流里。推荐使用v-show
// v-if 节点是否显示，值为false则节点不显示，同时该节点不在dom流里，也就是节点不存在了。
// 和v-if搭配使用的有v-else-if，v-else // 若要使用v-else则这个节点的上一个兄弟节点必须加v-if，若没有v-if则报错
// v-for  1.遍历数组用于循环显示，写法 v-for="(item, index) in 数组名"，item就是数组里的值的变量，index变量是item在数组里的索引。2.遍历对象，(对象是键值对的数据格式也就是key:val)，写法是 v-for="(val, key) in 对象名"。val是值，key是变量的名称，其实也有index变量
// 注意：在使用v-for的时候，需要给对应的标签加 :key="变量名"也就是v-bind:key="变量名"，:key="item"这样key的值是随item变量所对应的值变化的，以下面的为例，第一次循环时item的值是1，则此时key就是1，第二次时item的值是2，则此时key就是2，若写key="item"则循环后每个标签的key的值都是item。不要以index变量作为key
// v-on:xx="xxx"(缩略写法是 @xx="xxx") 绑定事件
// v-bind:xx(缩略写法是 :xx="")  绑定数据 xx可以是id(标签的id)，class(标签的类名)外还可以是其他的名称
// v-bind:id="xx" 缩略写法是 :id="xx" ，v-bind就是绑定数据，绑定数据的名称是id，内容是变量xx对应的值
// v-model  数据的双向绑定，一般使用在输入标签上，例如 input，也就是说input上输入的值会反应到绑定数据上面，也就会更新
// v-model还有一个功能就是有修饰符，v-model.number就是让input输入里的内容变成正确的数字。v-model.trim用于去除input输入框里内容的首尾的空格
// 默认v-model给input上绑定的事件是input事件，也就是每次有输入就会重新触发这个事件。v-model.lazy就是绑定了change事件，change事件在input失去焦点才会触发，v-model.lazy就是让其只在 change 事件中再加载输入框中的数据。
// v-pre 就是标签里面的表达式都不会被解析，得到的结果就是标签里面写什么就显示什么 <div v-pre>Text: {{text}}</div>
// v-once 就是数据绑定的内容只执行一次 <div v-once>Text: {{text}}</div>

import Vue from 'vue'

new Vue({
  el: '#root',
  template: `
    <div>
      <div v-once>Text: {{text}}</div>
      <div v-if="active">Text: {{text}}</div>
      <div v-else-if="text === 0">ElseText: {{text}}</div>
      <div v-else>else content</div>
      <div v-html="html"></div>
      <input type="text" v-model.lazy="text"></input>
      <input type="checkbox" v-model="active"></input>
      <div>
        <input type="checkbox" :value="1" v-model="arr"></input>
        <input type="checkbox" :value="2" v-model="arr"></input>
        <input type="checkbox" :value="3" v-model="arr"></input>
      </div>
      <div>
        <input type="radio" value="one" v-model="picked">
        <input type="radio" value="two" v-model="picked">
      </div>
      <ul>
        <li v-for="(item, index) in arr" :key="item">{{item}}:{{index}}</li>
      </ul>
      <ul>
        <li v-for="(val, key, index) in obj">{{val}}:{{key}}:{{index}}</li>
      </ul>
    </div>
  `,
  data: {
    arr: [1, 2, 3],
    obj: {
      a: '123',
      b: '456',
      c: '789'
    },
    picked: '',
    text: 0,
    active: false,
    html: '<span>this is html</span>'
  }
})

// Chrome浏览器里可以安装一个插件Vue，这个插件可以让我们看到Vue组件和实例里的数据情况

// <input type="checkbox" :value="1" v-model="arr"></input> 若写成value="1"，则value所对应的值就是字符串 "1"，若用v-bind绑定写，也就是 :value="1" 则此时value的值就是数字 1
