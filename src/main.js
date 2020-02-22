import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 导入 rem 的 js, 动态的设置了, 不同屏幕的html根元素的 font-size
import 'lib-flexible'
// 导入重置默认样式的base.css
import './styles/base.css'
// 导入字体图标的css(使用的字体是在线字体)
import './styles/iconfont.css'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
