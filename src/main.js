import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import moment from 'moment'
// 导入 rem 的 js, 动态的设置了, 不同屏幕的html根元素的 font-size
import 'lib-flexible'
// 导入重置默认样式的base.css
import '@/styles/base.css'
// 导入字体图标的css(使用的字体是在线字体)
import '@/styles/iconfont.css'
// 全局button组件
import HmButton from 'components/hm-button.vue'
import HmNav from 'components/hm-nav.vue'
import HmHeader from 'components/hm-header.vue'

// 引入vant Toast轻提示
import { Toast, Checkbox, CheckboxGroup, Button, Dialog, Field, Icon, RadioGroup, Radio, Uploader, List } from 'vant'
Vue.use(Toast)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Button)
Vue.use(Dialog)
Vue.use(Field)
Vue.use(Icon)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(Uploader)
Vue.use(List)

// 将组件注册成全局组件
Vue.component('HmButton', HmButton)
Vue.component('HmNav', HmNav)
Vue.component('HmHeader', HmHeader)

// axios优化一：将axios 绑定到原型上，vue组件就是可服用的vue实例，可以访问到原型上的方法
//    用法:this.$http.xxx(...)
Vue.prototype.$http = axios
// axios优化二：配置好基准路径，将来axios请求时，会自动拼上前缀
// axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.baseURL = 'http://192.168.1.12:3000'
// axios优化三：配置拦截器，进行统一拦截token失效的用户

// 添加请求拦截器：在请求真正发送出去之前，都会经过请求拦截器
axios.interceptors.request.use(function (config) {
  // 设置全局的 Authorization token验证
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  // console.log(config)
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
// 添加响应拦截器：在响应正在被处理之前，都会先经过响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么，这里可以写一些对响应的统一处理
  if (response.data.statusCode === 401 && response.data.message === '用户信息验证失败') {
    // token过期了，或者是伪造的假 token
    // 将失效的token信息，uer-id清除
    localStorage.removeItem('user-id')
    localStorage.removeItem('token')

    // 提示用户登录失效
    Toast.fail('登录状态失效，请重新登录')
    router.push('/login')
  }

  if (response.data.statusCode === 500) {
    Toast.fail('当前服务器繁忙')
  }
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})
// ----------------------------------------------------
// 定义全局 时间处理过滤器(moment)
Vue.filter('time', function (value, str = 'YYYY-MM-DD') {
  return moment(value).format(str)
})
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
