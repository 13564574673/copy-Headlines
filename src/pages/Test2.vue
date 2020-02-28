<template>
  <div class="test2">
    <!-- 专门用于文件裁剪的测试 -->
    <vueCropper
      ref="cropper"
      :img="option.img"
      :autoCrop="option.autoCrop"
      :autoCropWidth="option.autoCropWidth"
      :autoCropHeight="option.autoCropHeight"
      :fixed="option.fixed"
      :fixedNumber="option.fixedNumber"
    ></vueCropper>
    <van-button class="crop" type="primary" @click="crop">确认裁剪</van-button>
    <van-button class="cancel" type="danger">取消选择</van-button>
  </div>
</template>

<script>
// 全局导入  main.js中
// 局部导入 组件中
import { VueCropper } from 'vue-cropper'
import img from 'assets/02.jpg'
export default {
  components: {
    VueCropper
  },
  data () {
    return {
      option: {
        img: img, // 这个img应该要是上传的那张图片，只不过现在我写死了 ------ 必填
        autoCrop: true, // 是否默认生成截图框 ------- 需要
        autoCropWidth: 150, // 默认生成截图框宽度
        autoCropHeight: 150, // 默认生成截图框高度
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [4, 4] // 截图框的宽高比例
      }
    }
  },
  methods: {
    crop () {
      console.log('要健健啦 => 需要获取截图框内的图片信息')
      // 获取截图的base64 数据
      this.$refs.cropper.getCropData((data) => {
        // do something
        console.log(data)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.test2{
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  .crop{
    position: absolute;
    left: 30px;
    bottom:10px;
    border-radius: 10px;
  }
  .cancel{
    position: absolute;
    right: 30px;
    bottom:10px;
    border-radius: 10px;
  }
}
</style>
