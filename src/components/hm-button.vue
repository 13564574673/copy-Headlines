<template>
  <div class="hm-button" @click="handleClick">
      <!-- 组件插槽 -->
      <slot></slot>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick (event) {
      // console.log(event)
      this.$emit('click', event)
    }
  }
}
</script>

<style lang="scss" scoped>
.hm-button{
  text-align: center;
  height: 50px;
  line-height: 50px;
  background-color: #cc3300;
  border-radius: 25px;
  font-size: 20px;
  color: #f6dbd2;
}
</style>
