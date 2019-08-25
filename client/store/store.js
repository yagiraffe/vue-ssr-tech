import Vuex from 'vuex'

import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'

const isDev = process.env.NODE_ENV === 'development'

// 函数返回的是创建Store实例
export default () => {
  const store = new Vuex.Store({
    strict: isDev, // strict: true 这样无法从外部修改数据，可以在开发环境用，但是不要在正式环境用。这样可以保证修改store里的数据时尽量放在mutations里操作，在其他地方直接修改数据会报警告。
    state: defaultState,
    mutations, // ES6特性 mutations: mutations
    getters,
    actions
    // plugins: [
    //   (store) => {
    //     console.log('my plugin invoked')
    //   }
    // ]
    // 模块
    // modules: {
    //   a: {
    //     namespaced: true, // 默认情况下vuex会把所有的mutations都放到全局的命名空间里，若想让a模块里的mutations的命名空间在a模块，则需要在a模块里加属性namespaced: true
    //     state: {
    //       text: 1
    //     },
    //     mutations: {
    //       updateText (state, text) { // 此处的state是a模块里的state
    //         console.log('a.state', state)
    //         state.text = text
    //       }
    //     },
    //     getters: {
    //       textPlus (state, getters, rootState) { // 在模块下的getters会接收到全局的state的，第一个参数是a模块的state，第二个参数是所有的getters，也就是get方法，第三个参数是全局的state
    //         return state.text + rootState.b.text // rootState.b.text是拿到b模块的text，rootState.count是拿到全局的count
    //       }
    //     },
    //     actions: {
    //       add ({state, commit, rootState}) { // 参数ctx是这个模块的store对象，里面有模块的state，和模块的commit方法，和全局的state
    //         // commit('updateText', rootState.count) // 此处调用的updateText是a模块里的mutations里的updateText方法
    //         // 在此处调用全局的mutations里的updateCount方法如下
    //         commit('updateCount', {num: 56789}, {root: true}) // {root: true}代表调用其他模块或全局的mutations
    //       }
    //     }
    //   },
    //   b: {
    //     namespaced: true,
    //     state: {
    //       text: 2
    //     },
    //     actions: {
    //       // 若调用模块间的mutations，也需要写{root: true}，同时要把命名空间写清楚
    //       // 是调用a模块里的mutations里的updateText方法，命名空间写法就是 'a/updateText'
    //       textAction ({commit}) {
    //         commit('a/updateText', 'test text', {root: true})
    //       }
    //     }
    //   }
    // }
  })
  // 给vuex加热更新
  if (module.hot) {
    module.hot.accept([
      './state/state',
      './mutations/mutations',
      './actions/actions',
      './getters/getters'
    ], () => {
      // import只能写在一个文件的最外层，所以不能在内层写import，所以在内层引入的时候只能用require
      const newState = require('./state/state').default
      const newMutations = require('./mutations/mutations').default
      const newActions = require('./actions/actions').default
      const newGetters = require('./getters/getters').default

      store.hotUpdate({
        state: newState,
        mutations: newMutations,
        actions: newActions,
        getters: newGetters
      })
    })
  }

  return store
}
