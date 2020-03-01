<template>
  <div class="my-comments">
    <hm-header>我的跟帖</hm-header>
    <!-- 跟帖 -->
    <div v-if="commentList.length > 0">
      <van-list
        v-model="loading"
        :finished="finished"
        :immediate-check="false"
        :offset="50"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="item" v-for="item in commentList" :key="item.id">
          <div class="time">{{item.create_date | time('YYYY-MM-DD HH:mm:ss')}}</div>
          <!-- 父评论 -->
          <div class="parent" v-if="item.parent">
            <p>回复：{{item.parent.user.nickname}}</p>
            <p>{{item.parent.content}}</p>
          </div>
          <div class="content">{{item.content}}</div>
          <div class="orgin" >
            <p class="one-txt-cut">原文：{{item.post.title}}</p>
            <i class="iconfont iconjiantou1"></i>
          </div>
        </div>
      </van-list>
    </div>
    <div v-else class="No-time">暂无跟帖</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      commentList: [],
      finished: false,
      loading: false,
      pageIndex: 1,
      pageSize: 5
    }
  },
  created () {
    this.getCommentList()
  },
  methods: {
    async getCommentList () {
      const res = await this.$http.get('/user_comments', {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      // console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.commentList = [...this.commentList, ...data]
        this.loading = false

        if (data.length < this.pageSize) {
          this.finished = true
        }
      }
      console.log(this.commentList)
    },
    // 当用户滚动到底部时，触发，用于加载更多的数据(会自动将loading状态改成true)
    onLoad () {
      console.log('正在加载更多...')
      this.pageIndex++
      this.getCommentList()
    }
  }
}
</script>
<style lang="scss" scoped>
.my-comments{
  .item{
    padding: 10px;
    border-bottom: 1px solid #ccc;
    line-height: 30px;
    .time{
      font-size: 12px;
      color: #888;
    }
    .content{
      font-size: 14px;
      color: #000;
    }
    .orgin{
      color: #888;
      font-size: 12px;
      display: flex;
      .iconjiantou1{
        margin-left: 15px;
      }
    }
    .parent{
      background-color: #ddd;
      padding: 10px;
      border-radius: 5px;
      p:last-child{
        font-size: 14px;
      }
    }
  }
  .No-time{
    font-size: 16px;
  }
}
</style>
