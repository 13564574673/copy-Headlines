<template>
  <div class="profile">
    <!-- 头部信息 -->
    <div class="user-info">
      <!-- 头像 -->
      <div class="avatar">
        <img :src="headImg" alt="">
      </div>
      <!-- 信息 -->
      <div class="info">
        <p class="name">
          <!-- 根据性别，显示对应的图标 -->
          <i v-if="profile.gender === 1" class="iconfont iconxingbienan"></i>
          <i v-else class="iconfont iconxingbienv"></i>

          <span>{{profile.nickname}}</span>
        </p>
        <!-- 使用全局过滤器 -->
        <p class="time">{{profile.create_date | time}}</p>
      </div>
      <!-- 右箭头 -->
      <div class="icon">
        <i class="iconfont iconjiantou1" @click="$router.push('/edit-profile')"></i>
      </div>
    </div>
    <!-- 底部列表 -->
    <div class="list">
      <hm-nav name="我的关注" info="关注的用户" @click="$router.push('/follow')"></hm-nav>
      <hm-nav name="我的跟帖" info="跟帖/回复" @click="$router.push('/my-comments')"></hm-nav>
      <hm-nav name="我的收藏" info="文字/视频" ></hm-nav>
      <hm-nav name="设置" @click="$router.push('/edit-profile')"></hm-nav>
    </div>
    <!-- 退出按钮 -->
    <div class="logout-btn">
      <van-button type="info" round size="large" @click="logout">退出</van-button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 存放个人信息的对象
      profile: {}
    }
  },
  async created () {
    // 从本读取出需要的id 和 token
    const userId = localStorage.getItem('user-id')
    // 发送请求获取到个人信息的数据,需要携带tonken令牌
    // 只要是需要权限认证的，都需要带上令牌(如何携带令牌，有规范的 => 放在请求头Authorization字段中)
    const res = await this.$http.get(`/user/${userId}`)
    // console.log(res)
    // 判断响应,请求成功往profile空对象中进行存储
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.profile = data
      // console.log(this.profile)
    }
    // if (statusCode === 401 && res.data.message === '用户信息验证失败') {
    //   // 说明用户的token已失效，需要拦截到登录页
    //   this.$toast.fail('登录状态失效，请重新登录')
    //   this.$router.push('/login')
    // }
  },
  computed: {
    headImg () {
      return this.$http.defaults.baseURL + this.profile.head_img
    }
  },
  methods: {
    async logout () {
      // 确认消息的提示
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '亲！你确认要退出么？'
        })
        // console.log('点了确认')
        // 销毁本地存储的登录状态
        localStorage.removeItem('user-id')
        localStorage.removeItem('token')
        // 跳转到登录
        this.$router.push('/login')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.profile{
  .user-info{
    padding: 20px;
    display: flex;
    border-bottom: 3px solid #ccc;
    padding-bottom: 20px;
    .avatar{
      width: 70px;
      img{
        width: 70px;
        height: 70px;
        border-radius: 50%;
        overflow: hidden;
      }
    }
    .info{
      flex: 1;
      padding: 10px;
      p{
        height: 25px;
        line-height: 25px;
        // left: 25px;
      }
      .name{
        .iconxingbienan{
          color: #83c0ed;
          margin-right: 5px;
        }
        .iconxingbienv{
          color: pink;
          margin-right: 5px;
        }
        span{
          font-size: 14px;
          color: #333333;
        }
      }
      .time{
        color: rgba(148, 148, 148, 0.866666666666667);
        font-size: 14px;
      }
    }
    .icon{
      width: 30px;
      height: 70px;
      line-height: 70px;
      text-align: center;
    }
  }
  .logout-btn{
    padding: 20px;
  }
}
</style>
