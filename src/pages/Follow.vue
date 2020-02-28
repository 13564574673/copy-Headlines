<template>
  <div class="foll">
    <hm-header>我的关注</hm-header>
    <div class="item" v-for="item in list" :key="item.id">
      <div class="left">
        <img :src="$http.defaults.baseURL + item.head_img" alt="">
      </div>
      <div class="center">
        <div class="name">{{item.nickname}}</div>
        <div class="time">{{item.create_date | time}}</div>
      </div>
      <div class="right" @click="cancelFollow(item.id)">
        取消关注
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  created () {
    // for (let i = 1; i < 10; i++) {
    //   this.follow(i)
    // }
    this.gteFollowList()
  },
  methods: {
    // 封装页面初始化发送的ajax请求
    async gteFollowList () {
      const res = await this.$http.get('/user_follows')
      // console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
        console.log(this.list)
      }
    },
    // 取消关注
    async cancelFollow (id) {
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '亲！你确定要取消关注么?'
        })
        const res = await this.$http.get(`/user_unfollow/${id}`)
        console.log(res)
        const { statusCode, message } = res.data
        if (statusCode === 200 && message === '取消关注成功') {
          this.$toast.success('取消关注成功')
          this.gteFollowList()
        }
      } catch (e) {
        console.log(e)
      }
    },
    // 用于测试的添加关注方法
    async follow (id) {
      const res = await this.$http.get(`/user_follows/${id}`)
      console.log(res)
      const { statusCode } = res.data
      if (statusCode === 200) {
        this.$toast.success('关注成功')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
 .foll{
   .item{
    display: flex;
    padding: 20px;
    border-bottom: 1px solid #ccc;
    align-items: center;
    .left{
      width: 40px;
      height: 40px;
      margin-right: 10px;
      border-radius: 50%;
      overflow: hidden;
    }
    .center{
      flex: 1;
      line-height: 20px;
      .name{
        font-size: 16px;
        color: #000;
      }
      .time{
        font-size: 14px;
        color: #666;
      }
    }
    .right{
      height: 30px;
      line-height: 30px;
      padding:0 15px;
      border: 1px solid #ccc;
      border-radius: 15px;
      background-color: #e1e1e1;
      font-weight: 600;
      color: #000;
    }
   }
 }
</style>
