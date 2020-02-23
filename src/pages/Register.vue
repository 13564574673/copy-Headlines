<template>
  <div class="register">
    <div class="close">
      <i class="iconfont iconicon-test"></i>
    </div>
    <div class="logo">
      <i class="iconfont iconnew"></i>
    </div>
    <div class="username">
      <hm-input :rules="userRule"  err-msg="请输入正确的手机号" v-model="username" placeholder="请输入用户名(手机号)"></hm-input>
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
    register (event) {
      console.log(event)
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
