<template>
  <div class="my-favorite">
    <hm-header>我的收藏</hm-header>
    <hm-post @click="$router.push(`/post-detail/${post.id}`)" v-for="post in list" :key="post.id" :post="post"></hm-post>
    <!-- <div class="item" v-for="item in list" :key="item.id">
      <div class="info">
        <div class="title txt-cut">{{item.title}}</div>
        <div class="bottom">
          <span>{{item.user.nickname}}</span>
          <span>{{item.comments.length}}跟帖</span>
        </div>
      </div>
      <div class="img-box">
        <img :src="item.cover[0].url" alt="">
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  async created () {
    const res = await this.$http.get('/user_star')
    const { statusCode, data } = res.data
    // console.log(res)
    if (statusCode === 200) {
      data.forEach(item => {
        item.comment_length = item.comments.length
      })
      this.list = data
    }
    console.log(this.list)
  }
}
</script>

<style lang="scss" scoped>
// .my-favorite{
  // .item{
  //   display: flex;
  //   padding: 10px;
  //   border-bottom: 1px solid #ccc;
  //   .info{
  //     flex: 1;
  //     display: flex;
  //     // 默认主轴水平的，希望是往下排布，需要修改主轴的方向
  //     flex-direction: column;
  //     // 控制主轴的对齐方式
  //     justify-content: space-between;
  //     .title{
  //       font-size: 14px;
  //       color: #000;
  //     }
  //     .bottom{
  //       color: #888;
  //       span:first-child{
  //         margin-right: 10px;
  //       }
  //     }
  //   }
  //   .img-box{
  //     width: 120px;
  //     height: 75px;
  //     img{
  //       width: 100%;
  //       height: 100%;
  //       // object-fit:cover / contain
  //       // 作用:可以保证图片在定死宽高的情况下，还不失去其宽高比 (类似于background-size)
  //       // cover 铺满，contain包含，可以完整的显示所有的图片内容，但是可以能会留白
  //       object-fit: cover;
  //     }
  //   }
  // }
// }
</style>
