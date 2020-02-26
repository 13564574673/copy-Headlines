<template>
  <div class="hm-nav" @click="handleClick">
    <div class="left">{{name}}</div>
    <div class="center">{{info}}</div>
    <div class="right">
      <i class="iconfont iconjiantou1"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    info: {
      type: String,
      default: null
    }
  },
  methods: {
    handleClick (e) {
      // console.log(e)
      this.$emit('click', e)
    }
  }
}
</script>

<style lang="scss" scoped>
.hm-nav{
  padding: 0 20px;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #ccc;
  display: flex;
  .left{
    font-size: 14px;
    color: #000;
  }
  .center{
    flex: 1;
    text-align: right;
    font-size: 12px;
    color: rgba(148, 148, 148, 0.866666666666667);
  }
  .right{
    width: 30px;
    text-align: center;
  }
}
</style>
