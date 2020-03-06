<template>
  <div class="post-detail">
    <!-- 头部 -->
    <div class="header" >
      <div class="left" @click="$router.push('/')">
        <i class="iconfont iconjiantou2"></i>
        <i class="iconfont iconnew"></i>
      </div>
      <div class="right">
        <div class="btn-followed" v-if="post.has_follow" @click="unfollow">已关注</div>
        <div class="btn-follow" v-else @click="follow" >关注</div>
      </div>
    </div>
    <!-- 主体 -->
    <div class="main">
      <div class="post-title">{{post.title}}</div>
      <div class="post-info">
        <span>{{post.user.nickname}}</span>
        <span>{{post.user.create_date | time}}</span>
      </div>
      <div class="video" v-if="post.type ===2 ">
        <video :src="post.content" controls></video>
      </div>
      <!-- 新闻内容 -->
      <div class="content" v-else v-html="post.content"></div>
    </div>
    <!-- 按钮 -->
    <div class="btns">
      <!-- 根据用户是否点赞来判断是否有like的类名" -->
      <div class="good" @click="like" :class="{like:post.has_like}">
        <i class="iconfont icondianzan"></i>
        <span>{{post.like_length}}</span>
      </div>
      <div class="share">
        <i class="iconfont iconweixin"></i>
        <span>微信</span>
      </div>
    </div>
    <!-- 评论区内容 -->
    <div class="post-comment">
      <div class="title">精彩跟帖</div>
      <p class="no-comment" v-if="commentList.length === 0">暂无跟帖，抢占沙发</p>
      <!-- 评论区组件 -->
      <hm-comment @reply='reply' v-for="item in commentList" :key="item.id" :comment="item" ></hm-comment>
    </div>
    <!-- 底部区域 -->
    <div class="footer">
      <div class="comment-input" v-if="isFocus">
        <input @focus="handelFocus" type="text" placeholder="写跟帖">
        <van-icon class-prefix="iconfont iconpinglun-" :info="commentList.length"/>
        <van-icon name="star" color="#ffd91e" @click="star" v-if="post.has_star"/>
        <van-icon name="star-o" @click="star" v-else/>
        <i class="iconfont iconfenxiang"></i>
      </div>
      <div class="comment-textare" v-else >
        <textarea v-model="content" v-focus rows="3" :placeholder="placeholder" @blur="handelBlur"></textarea>
        <div class="send" @click="send">发送</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      post: {
        user: {}
      },
      isFocus: true,
      commentList: [],
      content: '',
      placeholder: '发布评论',
      parentId: ''
    }
  },
  created () {
    this.getPostDetail()
    // 评论渲染
    this.getCommentList()
  },
  methods: {
    async getPostDetail () {
      const id = this.$route.params.id
      const res = await this.$http.get(`/post/${id}`)
      // console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.post = data
      }
      // console.log(this.post)
    },
    async follow () {
      // 关注功能，需要拿到被关注用户的id
      // 关注
      const id = this.post.user.id
      // console.log(id)
      // 根据 id 发送关注的 ajax 请求，完成关注功能
      const res = await this.$http.get(`/user_follows/${id}`)
      console.log(res)
      const { statusCode } = res.data
      if (statusCode === 200) {
        this.$toast.success('关注成功')
        this.getPostDetail()
      }
    },
    async unfollow () {
      // 关注功能，需要拿到被关注用户的id
      // 取消关注
      // 添加取消关注提示
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '亲！你确定要取消关注么?'
        })
        const id = this.post.user.id
        // console.log(id)
        // 根据 id 发送关注的 ajax 请求，完成关注功能
        const res = await this.$http.get(`/user_unfollow/${id}`)
        console.log(res)
        const { statusCode } = res.data
        if (statusCode === 200) {
          this.$toast.success('取消关注')
          this.getPostDetail()
        }
      } catch (e) {
        console.log(e)
      }
    },
    async like () {
      const id = this.$route.params.id
      const res = await this.$http.get(`/post_like/${id}`)
      // console.log(res)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.getPostDetail()
        this.$toast.success(message)
      }
    },
    async star () {
      const id = this.$route.params.id
      const res = await this.$http.get(`/post_star/${id}`)
      console.log(res)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getPostDetail()
      }
    },
    handelFocus () {
      this.isFocus = false
    },
    handelBlur () {
      if (this.content) return
      this.isFocus = true
      // 清空文本域 和parentId
      this.parentId = ''
      this.placeholder = '评论'
    },
    async getCommentList () {
      const id = this.$route.params.id
      const res = await this.$http.get(`/post_comment/${id}`)
      // console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.commentList = data
      }
    },
    async send () {
      if (this.content.trim() === '') return
      const id = this.$route.params.id
      const res = await this.$http.post(`/post_comment/${id}`, {
        content: this.content,
        parent_id: this.parentId
      })
      // console.log(res)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        // 成功提示
        this.$toast.success(message)
        // 清空评论
        this.content = ''
        // 清空文本域 和parentId
        this.parentId = ''
        this.placeholder = '评论'
        // 关闭文本域
        this.isFocus = true
        // 重新渲染评论
        this.getCommentList()
      }
    },
    reply (id, nickname) {
      // 接收到子组件传递过来的id 和 nickname 进行处理
      // 显示文本域
      this.isFocus = false
      // 动态控制placeholder显示内容
      this.placeholder = `回复:@${nickname}`
      this.parentId = id
    }
  },
  watch: {
    $route () {
      // 监听当前路由的变化，只要地址变化了，就要重新获取数据
      this.getPostDetail()
    }
  }

}
</script>

<style lang="scss" scoped>
.post-detail{
  padding-bottom: 90px;
  // 头部样式
  .header{
    display: flex;
    height: 50px;
    line-height: 50px;
    justify-content: space-between;
    padding: 0 10px;
    border-bottom: 1px solid #ccc;
    align-items: center;
    .left{
      i{
        vertical-align: middle;
      }
      .iconnew{
        font-size: 50px;
      }
    }
    .right{
      .btn-followed,
      .btn-follow{
        border: 1px solid #ccc;
        height: 30px;
        line-height: 28px;
        width: 65px;
        text-align: center;
        border-radius: 15px;
        font-size: 12px;
        font-weight: 500;
      }
      .btn-follow{
        background-color: red;
        color: #fff;
      }
    }
  }
  // 主体样式
  .main{
    padding: 10px;
    .post-title{
      font-size: 18px;
      color: black;
      font-weight: 700;
      padding-bottom: 5px;
    }
    .post-info{
      font-size: 14px;
      color: #868686;
      padding-bottom: 10px;
      span:first-child{
        margin-right: 10px;
      }
    }
    .content{
      font-size: 14px;
      color: #333333;
    }
    .video{
      video{
        width: 100%;
      }
    }
  }
  // 按钮样式
  .btns{
    display: flex;
    justify-content: space-evenly;
    padding: 10px 0;
    border-bottom: 3px solid #ccc;
    .good,
    .share{
      width: 80px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border: 1px solid #ccc;
      border-radius: 15px;
      font-size: 12px;
      .iconfont{
        margin-right: 5px;
        font-size: 14px;
      }
      .iconweixin{
        color: #01c801;
      }
    }
  }
  // 点赞变红样式
  .like{
    background-color: red;
    color: white;
  }
  // 评论区样式
  .post-comment{
    padding: 20px 0;
    .title{
      text-align: center;
      font-size: 18px;
      color: black;
    }
    .no-comment{
      text-align: center;
      font-size: 16px;
      color: #aeaeae;
      margin-top: 30px;
    }
  }
  // 底部样式
  .footer{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 10px 0;
    padding-top: 20px;
    align-items: center;
    background-color: #f7f7f7;
    border-top: 1px solid #ccc;
    vertical-align: middle;
    .comment-input{
      display: flex;
      justify-content: space-around;
      input{
        width: 180px;
        height: 30px;
        border-radius: 15px;
        padding: 0 10px;
        background-color: #d7d7d7;
        font-size: 14px;
      }
      .van-icon{
        font-size: 24px;
      }
      .iconfont{
        font-size: 20px;
        color: black;
      }
      .iconpinglun-{
        position: relative;
      }
    }
    .comment-textare{
      display: flex;
      justify-content: space-around;
      align-items: flex-end;
      textarea{
        background-color: #d7d7d7;
        padding: 10px;
        width: 260px;
        height: 90px;
        border-radius: 10px;
        font-size: 14px;
      }
      .send{
        width: 60px;
        height: 26px;
        text-align: center;
        border: 1px solid #ccc;
        line-height: 25px;
        border-radius: 13px;
        background-color: #ff0000;
        color: #fff;
      }
    }
  }
}
</style>
