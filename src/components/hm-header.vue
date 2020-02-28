<template>
  <div class='hm-header'>
    <div class="left">
      <slot name="left">
        <i class="iconfont iconjiantou2" @click="$router.go(-1)"></i>
      </slot>
    </div>
    <div class="center">
      <!-- 如果传了，用传过来的，如果没有，就用默认值 -->
      <slot>大标题</slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='scss' scoped>
.hm-header{
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #ccc;
  display: flex;
  .center{
    flex: 1px;
    text-align: center;
    font-weight: 700;
    font-size: 16px;
  }
  .left,.right{
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    i{
      display: block;
    }
  }
}
</style>
