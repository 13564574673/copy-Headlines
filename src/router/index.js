import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from 'pages/Home.vue'
import Login from '@/pages/Login.vue'
import Register from 'pages/Register.vue'
import Profile from 'pages/Profile.vue'
import EditProfile from 'pages/EditProfile.vue'
import Follow from 'pages/Follow.vue'
import MyComments from 'pages/MyComments.vue'
import MyFavorite from 'pages/MyFavorite.vue'
import PostDetail from 'pages/PostDetail.vue'
import Test2 from 'pages/Test2.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/home', redirect: '/' },
    { path: '/', component: Home, name: 'home' },
    { path: '/login', component: Login, name: 'login' },
    { path: '/register', component: Register, name: 'register' },
    { path: '/profile', component: Profile, name: 'profile' },
    { path: '/edit-profile', component: EditProfile, name: 'edit-profile' },
    { path: '/follow', component: Follow, name: 'follow' },
    { path: '/my-comments', component: MyComments, name: 'my-comments' },
    { path: '/my-favorite', component: MyFavorite, name: 'my-favorite' },
    { path: '/post-detail', component: PostDetail, name: 'post-detail' },
    { path: '/test2', component: Test2, name: 'test2' }
  ]
})
// 全局前置守卫：所有的路由在被真正访问之前，都会经过全局前置守卫
// 只有全局前置首尾放行了才能真正的访问到你需要访问的路由
// to 到哪去
// from 从哪来
// next 是一个函数，决定是否放行，next()放行，next('/login')拦截到登录
// 将来的页面两种情况：
// 1.需要授权才能访问 个人中心页，我的收藏，我的关注...
// 2.不需要授权，可以直接访问的 首页 登录页 注册页
// 添加一个数组，专门存放所有需要授权的路径
const AuthUrls = [
  '/profile',
  '/edit-profile',
  '/follow',
  '/my-comments',
  '/my-favorite'
]
router.beforeEach((to, from, next) => {
  if (AuthUrls.includes(to.path)) {
    // 需要授权访问的路径，判断有没有token令牌
    // 有token放行，没有token，拦截到登录
    // console.log(to)
    const token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      // next('/login')
      router.push('/login')
    }
  } else {
    // 不需要授权访问的路径，放行
    next()
  }
})
export default router
