<template>
  <div class="hm-input">
    <input class="inp" :class="[status]" :type="type" :placeholder="placeholder" :value="value" @input="handlInput">
    <span v-show="isShowTips" class="tips">{{errMsg}}</span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      status: ''
    }
  },
  props: {
    placeholder: {
      type: String,
      default: '请输入内容'
    },
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: String,
      default: ''
    },
    rules: {
      type: RegExp
    },
    errMsg: {
      type: String
    }
  },
  methods: {
    handlInput (event) {
      // 需要将修改后的值，传递给父组件，更新父组件的值
      // 子传父
      const value = event.target.value
      this.$emit('input', value)

      if (!this.rules) return
      if (this.rules.test(value)) {
        this.status = 'success'
      } else {
        this.status = 'error'
      }
    }
  },
  computed: {
    isShowTips () {
      return this.status === 'error' && this.errMsg
    }
  }
}
</script>

<style lang="scss" scoped>
.hm-input{
  position: relative;
  padding-bottom: 20px;
  .inp{
    width: 100%;
    height: 40px;
    background-color: transparent;
    border-bottom: 1px solid #666;
    font-size: 18px;
    &.success{
      border-color: green;
    }
    &.error{
      border-color: red;
    }
  }
  .tips{
    color: red;
    position: absolute;
    left: 0;
    bottom: 0;
    font-size: 14px;
    // display: none;
  }
}
</style>
