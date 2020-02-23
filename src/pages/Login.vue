<template>
  <div class="login">
    <div class="close">
      <i class="iconfont iconicon-test"></i>
    </div>
    <div class="logo">
      <i class="iconfont iconnew"></i>
    </div>
    <div class="username">
      <hm-input :rules="userRule" err-msg="请输入正确的账号(5-11位的数字)" v-model="username" placeholder="请输入用户名(手机号)"></hm-input>
    </div>
    <div class="password">
      <hm-input :rules="passRule" err-msg="请输入正确的密码(必须3-12位的字符)" v-model="password" type="password" placeholder="请输入密码"></hm-input>
    </div>
    <div class="login-btn">
      <hm-button @click="login">登录</hm-button>
    </div>
    <div class="go-register">
      没有账号？立即<router-link to="./register">注册</router-link>
    </div>
  </div>
</template>

<script>
import HmInput from 'components/hm-input.vue'

export default {
  data () {
    return {
      username: '',
      password: '',
      userRule: /^1\d{4,10}$/,
      passRule: /^\w{3,12}$/
    }
  },
  components: {
    HmInput
  },
  methods: {
    async login () {
      // console.log('123')
      if (!this.userRule.test(this.username)) {
        alert('请输入正确的手机号')
        return
      }
      if (!this.passRule.test(this.password)) {
        alert('请输入正确的密码')
      }
      const res = await this.$http.post('http://localhost:3000/login', {
        username: this.username,
        password: this.password
      })
      const { statusCode } = res.data
      if (statusCode === 200) {
        console.log('登录成功')
        console.log(res)
        this.$router.push({
          name: 'center',
          params: {
            username: this.username,
            password: this.password
          }
        })
      } else {
        console.log('登录失败')
        alert('账号或密码错误！')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  body{
    background-color: #f2f2f2;
  }
  .login{
    padding: 20px;
    .close{
      i{
        font-size: 27px;
        color: #040404;
      }
    }
    .logo{
      text-align: center;
      i{
        font-size: 126px;
        color: #d81e06;
      }
    }
    .login-btn{
      margin-top: 15px;
    }
    .go-register{
      text-align: center;
      font-size: 18px;
      padding-top: 10px;
      a{
        color: blue;
      }
    }
  }
</style>
