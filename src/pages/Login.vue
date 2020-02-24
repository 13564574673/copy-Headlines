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
    <div class="remember-pd">
      <!-- <label for="remember">
        <input type="checkbox" id="remember" :checked="flag===ture">记住密码
      </label> -->
      <van-checkbox v-model="checked">记住密码</van-checkbox>
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
      passRule: /^\w{3,12}$/,
      checked: false,
      list: []
    }
  },
  created () {
    // 加载本地存储的数据
    this.list = JSON.parse(localStorage.getItem('hm-Ttname')) || []
    console.log(this.list)
    // 判断存储的数据长度为零直接return
    if (this.list.length === 0) return
    // 把list中的数据分别赋值给username,password,checked
    this.username = this.list[0].username
    this.password = this.list[0].password
    this.checked = this.list[0].flag

    const { username, password } = this.$route.params
    console.log(username)
    if (username) {
      this.username = username
      this.password = password
      this.checked = false
    }
  },
  components: {
    HmInput
  },
  methods: {
    async login () {
      // 发送ajax请求之前，也要对用户名密码校验
      if (!this.userRule.test(this.username)) {
        // alert('请输入正确的账号(手机号)')
        this.$toast('请输入正确的账号(手机号)')
        return
      }
      if (!this.passRule.test(this.password)) {
        // alert('请输入正确的密码')
        this.$toast('请输入正确的密码')
        return
      }
      const res = await this.$http.post('/login', {
        username: this.username,
        password: this.password
      })
      // console.log(res)
      const { statusCode } = res.data
      if (statusCode === 200) {
        // console.log('登录成功！')
        this.$toast.success('登录成功')
        console.log(this.checked)

        // 判断checked的状态，如果等于true，那么就往list数组进行添加，本地进行存储
        if (this.checked) {
          this.list.unshift({
            username: this.username,
            password: this.password,
            flag: this.checked
          })
          console.log(this.list)
          // 存储到本地
          localStorage.setItem('hm-Ttname', JSON.stringify(this.list))
        } else {
          // checked的状态为false，清除本地存储的数据
          localStorage.removeItem('hm-Ttname')
        }
        this.$router.push({
          name: 'center'
        })
      } else {
        console.log('登录失败！')
        this.$toast.fail('用户名或者密码错误')
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
    .remember-pd{
      label{
        font-size: 16px;
        input{
          vertical-align: middle;
          width: 18px;
          height: 18px;
        }
      }
    }
  }
</style>
