<template>
  <div class="home">
    <!-- 头部 -->
    <div class="header">
      <div class="logo">
        <i class="iconfont iconnew"></i>
      </div>
      <div class="search">
        <i class="iconfont iconsearch"></i>
        <span>搜索新闻</span>
      </div>
      <div class="right" >
        <i class="iconfont iconwode" @click="$router.push('/profile')"></i>
      </div>
    </div>
    <!-- Tab 标签页
         1.v-model="active" 绑定一个值，就是当前激活的tab栏的下标，下标次0开始
         2.sticky 吸顶粘性布局
         3.animated 切换时添加动画
         4.swipeable 添加滑动切换效果
         list 组件
         1.loading标记是否正在加载中，loading为true表示正在加载中，false不在加载中(可以加载下一次)
         2.finished标记是否数据全部加载完成，finished为true，就表示没有更多数据了
         3.@load="onLoad"，触底时触发执行的函数

         每个tab，应该有自己的一个loading 和 finished
     -->
    <!-- 栏目 -->
    <van-tabs v-model="active" sticky background="#e4e4e4">
      <van-tab :title="item.name" v-for="item in tabList" :key="item.id">
        <!-- 下拉刷新 -->
        <van-pull-refresh :success-duration="500" :animation-duration="500" success-text="最新数据获取成功" v-model="item.refreshing" @refresh="onRefresh">
          <!-- 需要用van-list将文章列表包裹 -->
          <van-list
            :offset="50"
            :immediate-check="false"
            v-model="item.loading"
            :finished="item.finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <hm-post v-for="post in item.posts" :key="post.id" :post="post"></hm-post>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: localStorage.getItem('token') ? 1 : 0,
      tabList: [],
      pageSize: 5
    }
  },
  async created () {
    await this.getTabList()
    this.getPostList()
  },
  methods: {
    async getTabList () {
      const res = await this.$http.get('/category')
      // console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        // this.tabList = data
        // this.tabList.forEach(item => {
        //   item.posts = []
        // })
        data.forEach(item => {
          // 当前tab栏已经加载的文章的数据
          item.posts = []
          // 当前tab栏的当前页，每个tab栏都有自己的当前页
          item.pageIndex = 1
          // 每个tab栏，要有自己的 finished 和 loading
          item.finished = false
          item.loading = false
          item.refreshing = false
        })
        this.tabList = data
      }
      // console.log(this.tabList)
    },
    async getPostList () {
      const index = this.active
      const id = this.tabList[index].id

      const res = await this.$http.get('/post', {
        params: {
          category: id,
          pageIndex: this.tabList[index].pageIndex,
          pageSize: this.pageSize
        }
      })
      // console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        // debugger 调试
        // debugger
        this.tabList[index].posts = [...this.tabList[index].posts, ...data]
        // 使用一个临时变量存储进行 调试
        // const arr = this.tabList[index].posts
        // console.log(arr)
        // onLoad()方法会把loading改为true，所以发送新的ajax请求时要把loading重新改为false
        this.tabList[index].loading = false

        // 数据加载完, 也要将refreshing改成false
        this.tabList[index].refreshing = false
        // 判断请求回来的data数据长度，如果小于一页的页数，把finished改为true 表示页面已经加载到底部
        if (data.length < this.pageSize) {
          this.tabList[index].finished = true
        }
      }
      console.log(data)
    },
    onLoad () {
      console.log('触底了,需要加载更多了')
      // 发送ajax请求，请求下一页的数据，让对应tab的当前页++
      const index = this.active
      this.tabList[index].pageIndex++
      this.getPostList()
    },
    async onRefresh () {
      const index = this.active
      console.log('下拉刷新时触发')
      // 清空列表数据
      this.tabList[index].finished = false
      this.tabList[index].pageIndex = 1
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.tabList[index].loading = true
      this.tabList[index].posts = []
      await this.getPostList()
    }
  },
  watch: {
    active (index) {
      this.tabList[index].finished = false
      this.tabList[index].loading = false
      if (this.tabList[index].posts.length > 0) return
      this.getPostList()
    }
  }
}
</script>
<style lang="scss" scoped>
.home{
  .header{
    height: 50px;
    display: flex;
    line-height: 50px;
    background-color: #ff0000;
    color: #fff;
    text-align: center;
    .logo{
      width: 70px;
      .iconnew{
        font-size: 50px;
      }
    }
    .search{
      flex: 1;
      height: 36px;
      line-height: 36px;
      margin-top: 7px;
      border-radius: 18px;
      background-color: rgba(255, 255, 255, 0.5);
      span{
        font-size: 14px;
        margin-left: 5px;
      }
    }
    .right{
      width: 70px;

    }
  }
}
</style>
