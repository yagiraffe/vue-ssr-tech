<template>
  <form class="login-form" @submit="doSubmit">
    <h1>
      <span>Login</span>
      <span class="error-msg" v-show="errorMsg">{{errorMsg}}</span>
    </h1>
    <input
      type="text"
      class="login-input"
      placeholder="User Name"
      v-model="username"
    >
    <!-- 把表单的自动填充内容给取消是用autocomplete="off"，但是在chrome浏览器里用autocomplete="off"是没用的，要在password的输入框用autocomplete="new-password" -->
    <input
      type="password"
      class="login-input"
      placeholder="Password"
      autocomplete="new-password"
      v-model="password"
    >
    <button type="submit" class="login-btn">登 录</button>
  </form>
</template>

<script>
import {
  mapActions
} from 'vuex'
export default {
  metaInfo: {
    title: 'Login Page'
  },
  data () {
    return {
      username: '',
      password: '',
      errorMsg: ''
    }
  },
  methods: {
    ...mapActions(['login']),
    doSubmit (e) {
      e.preventDefault()
      if (this.validate()) {
        // 调用接口
        this.login({
          username: this.username,
          password: this.password
        })
          .then(() => {
            this.$router.replace('/app')
          })
      }
    },
    validate () {
      if (!this.username.trim()) {
        this.errorMsg = '姓名不能为空'
        return false
      }
      if (!this.password.trim()) {
        this.errorMsg = '密码不能为空'
        return false
      }
      this.errorMsg = ''
      return true
    }
  }
}
</script>

<style lang="stylus" scoped>
.login-form
  display flex
  flex-direction column
  align-items flex-start
  width 350px
  margin 0 auto
  padding 20px
  background-color #fff
  h1
    font-weight 100
    color #3d3d3d
.login-input
// -webkit-box-sizing: border-box 为元素设定的宽度和高度决定了元素的边框盒。
// 就是说，为元素指定的任何内边距和边框都将在已设定的宽度和高度内进行绘制。
// 通过从已设定的宽度和高度分别减去边框和内边距才能得到内容的宽度和高度。
  -webkit-box-sizing border-box
  appearance none
  padding 0 10px
  line-height 30px
  margin-bottom 20px
  border 1px solid #aaa
  width 100%
  border-radius 0
  box-shadow 0 0 0
.login-btn
  appearance none
  width 100%
  line-height 30px
  text-align center
  background-color #0d60c7
  color #eaeaea
  cursor pointer
  border-color #0d60c7
  transition all .3s
  &:hover
    color #fff
    background-color darken(#0d60c7, 10)
.error-msg
  font-size 12px
  color red

// 响应式布局 @media screen and (max-width: 某某px) {}
// 当浏览器的可视区域改变到某个值（假如为600px）的时候，页面的结构元素根据Media Query预设的层叠样式表来进行相对应的调整。
// 下面的意思就是：当浏览器的宽度小于等于600时，表单的宽度就是 此时浏览器宽度的90%
@media screen and (max-width: 600px) {
  .login-form {
    width 90%
  }
  .login-input{
    line-height 40px
  }
}
</style>
