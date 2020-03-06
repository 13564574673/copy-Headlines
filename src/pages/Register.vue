<template>
  <div class="register">
    <div class="close" @click="$router.push('/')">
      <i class="iconfont iconicon-test"></i>
    </div>
    <div class="logo">
      <i class="iconfont iconnew"></i>
    </div>
    <div class="username">
      <hm-input :rules="userRule"  err-msg="请输入正确的账号(5-11位的数字)" v-model="username" placeholder="请输入用户名(手机号)"></hm-input>
    </div>
    <div class="nickname">
      <hm-input :rules="nicknameRules" err-msg="昵称必须是2-6位的中文" v-model="nickname" placeholder="请输入昵称"></hm-input>
    </div>
    <div class="password">
      <hm-input :rules="passRule" err-msg="请输入正确的密码(必须3-12位的字符)" v-model="password" type="password" placeholder="请输入密码"></hm-input>
    </div>
    <div class="register-btn">
      <hm-button @click="register">注册</hm-button>
    </div>
    <div class="go-register">
      已有账号？<router-link to="./login">登录</router-link>
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
      nickname: '',
      userRule: /^1\d{4,10}$/,
      passRule: /^\w{3,12}$/,
      nicknameRules: /^[\u4E00-\u9FA5]{2,6}$/
    }
  },
  components: {
    HmInput
  },
  methods: {
    async register () {
      if (!this.userRule.test(this.username)) {
        this.$toast('用户名必须是(5-11位的数字)')
        return
      }
      if (!this.passRule.test(this.password)) {
        this.$toast('密码必须是(3-12位的字符)')
        return
      }
      if (!this.nicknameRules.test(this.nickname)) {
        this.$toast('昵称必须是(2-6位汉字)')
        return
      }
      // console.log(event)
      const res = await this.$http.post('/register', {
        username: this.username,
        nickname: this.nickname,
        password: this.password
      })
      // console.log(res)
      const { statusCode } = res.data
      if (statusCode === 200) {
        this.$toast.success('注册成功')
        // 注册成功，把注册数据传给登录页面
        this.$router.push({
          name: 'login',
          params: {
            username: this.username,
            password: this.password
          }
        })
      } else {
        // console.log(res)
        this.$toast.fail(res.data.message)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.register{
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
