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
    <!-- 栏目 -->
    <van-tabs v-model="active" sticky>
      <van-tab title="标签 1">内容 1</van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
      <van-tab title="标签 5">内容 5</van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0
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
