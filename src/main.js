import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

// 导入 rem 的 js, 动态的设置了, 不同屏幕的html根元素的 font-size
import 'lib-flexible'
// 导入重置默认样式的base.css
import '@/styles/base.css'
// 导入字体图标的css(使用的字体是在线字体)
import '@/styles/iconfont.css'
// 全局button组件
import HmButton from 'components/hm-button.vue'

// 引入vant Toast轻提示
import { Toast, Checkbox, CheckboxGroup } from 'vant'
Vue.use(Toast)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)

Vue.component('HmButton', HmButton)
// axios优化一：将axios 绑定到原型上，vue组件就是可服用的vue实例，可以访问到原型上的方法
//    用法:this.$http.xxx(...)
Vue.prototype.$http = axios
// axios优化二：配置好基准路径，将来axios请求时，会自动拼上前缀
axios.defaults.baseURL = 'http://localhost:3000'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
