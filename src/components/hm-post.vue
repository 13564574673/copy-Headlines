<template>
  <div class="hm-post">
    <!-- type为2，说明是视频类 -->
    <div class="video-post" v-if="post.type===2">
      <div class="title txt-cut">{{post.title}}</div>
      <div class="video">
        <img :src="post.cover[0].url" alt="">
        <i class="iconfont iconshipin"></i>
      </div>
      <div class="bottom">
        <span>{{post.user.nickname}}</span>
        <span>{{post.comment_length}}跟帖</span>
      </div>
    </div>
    <!-- 单图片的文章展示 -->
    <div class="single-img-post" v-else-if="post.cover.length < 3">
      <div class="info">
        <div class="title txt-cut">{{post.title}}</div>
        <div class="bottom">
          <span>{{post.user.nickname}}</span>
          <span>{{post.comment_length}}跟帖</span>
        </div>
      </div>
      <div class="img-box">
        <img :src="post.cover[0].url" alt="">
      </div>
    </div>
      <!-- 三张图片的文章展示 -->
    <div v-else class="multiple-img-post">
      <div class="info">
        <div class="title txt-cut">{{post.title}}</div>
        <div class="imgs">
          <img :src="item.url" alt="" v-for="item in post.cover" :key="item.id">
        </div>
        <div class="bottom">
          <span>{{post.user.nickname}}</span>
          <span>{{post.comment_length}}跟帖</span>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  props: {
    post: {
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
.hm-post{
  .title{
    font-size: 14px;
    color: #000;
  }
  .bottom{
    color: #888;
    span:first-child{
      margin-right: 10px;
    }
  }
}
.single-img-post{
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  .info{
    flex: 1;
    display: flex;
    // 默认主轴水平的，希望是往下排布，需要修改主轴的方向
    flex-direction: column;
    // 控制主轴的对齐方式
    justify-content: space-between;

  }
  .img-box{
    width: 120px;
    height: 75px;
    img{
      width: 100%;
      height: 100%;
      // object-fit:cover / contain
      // 作用:可以保证图片在定死宽高的情况下，还不失去其宽高比 (类似于background-size)
      // cover 铺满，contain包含，可以完整的显示所有的图片内容，但是可以能会留白
      object-fit: cover;
    }
  }
}
.multiple-img-post{
  padding: 10px;
  border-bottom: 1px solid #ccc;
  .imgs{
    display: flex;
    justify-content: space-around;
    padding: 10px 0;
    img{
      width: 112px;
      height: 74px;
      object-fit: cover;
    }
  }
}
.video-post{
  padding: 10px;
  border-bottom: 1px solid #ccc;
  .video{
    position: relative;
    padding: 10px 0;
    i{
      width: 50px;
      height: 50px;
      line-height: 50px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      text-align: center;
      background-color: rgba(0,0,0,0.4);
      color: rgba(255,255,255,0.75);
      border-radius: 50%;
      font-size: 50px;
    }
  }
}
</style>
