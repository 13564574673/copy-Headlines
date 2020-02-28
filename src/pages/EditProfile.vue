<template>
  <div class='edit-profile'>
    <hm-header>编辑资料</hm-header>
    <!-- 头像 -->
    <div class="img-box">
      <img :src="headImg" alt="">
      <van-uploader :after-read="afterRead"/>
    </div>
    <!-- 操作列表 -->
    <hm-nav @click="showNickname" name="昵称" :info="Profile.nickname"></hm-nav>
    <hm-nav @click="showPassword" name="密码" info="******"></hm-nav>
    <hm-nav @click="showGender" name="性别" :info="gender" ></hm-nav>

    <!-- 修改昵称 -->
    <van-dialog :before-close="beforeNickClose" v-model="isShowNickname" title="修改昵称" show-cancel-button>
        <van-field v-model="nickname" placeholder="请输入昵称" />
    </van-dialog>
    <!-- 修改密码 -->
    <van-dialog :before-close="beforePassClose" v-model="isShowPassword" title="修改密码" show-cancel-button>
        <van-field
          :type="isShowPassType? 'password':'text'"
          v-model="password"
          placeholder="请输入密码"
          :right-icon="isShowPassType? 'closed-eye':'eye-o'"
          @click-right-icon="changePassType"/>
    </van-dialog>
    <!-- 修改性别 -->
    <van-dialog @confirm="editGender" v-model="isShowGender" title="修改性别" show-cancel-button>
      <van-radio-group v-model="navgender" direction="horizontal">
        <van-radio :name="1">男</van-radio>
        <van-radio :name="0">女</van-radio>
      </van-radio-group>
    </van-dialog>
    <!-- 图片裁剪功能 截图的蒙层 -->
    <div class="mask" v-show="isShowMask">
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
      <van-button class="cancel" type="danger" @click="cancel">取消选择</van-button>
    </div>
  </div>
</template>
<script>
// 图标裁剪功能 局部导入 组件中
import { VueCropper } from 'vue-cropper'
export default {
  components: {
    VueCropper
  },
  data () {
    return {
      Profile: {},
      isShowNickname: false,
      nickname: '',
      isShowPassword: false,
      password: '',
      isShowPassType: true,
      isShowGender: false,
      navgender: 1,
      isShowMask: false,
      option: {
        img: '', // 这个img应该要是上传的那张图片，只不过现在我写死了 ------ 必填
        autoCrop: true, // 是否默认生成截图框 ------- 需要
        autoCropWidth: 150, // 默认生成截图框宽度
        autoCropHeight: 150, // 默认生成截图框高度
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [4, 4] // 截图框的宽高比例
      }
    }
  },
  created () {
    this.getProfile()
  },
  methods: {
    // 封装页面初始渲染
    async getProfile () {
      const userId = localStorage.getItem('user-id')
      const res = await this.$http.get(`/user/${userId}`)
      // console.log(res)
      // 判断请求的信息
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.Profile = data
        // console.log(this.Profile)
      }
    },
    // 封装一个方法，专门用于修改
    async editProfile (data) {
      const userId = localStorage.getItem('user-id')
      const res = await this.$http.post(`/user_update/${userId}`, data)
      // console.log(res)
      const { statusCode } = res.data
      if (statusCode === 200) {
        this.$toast.success('修改成功')
        this.getProfile()
      }
    },
    // 修改昵称点击事件处理 显示模态框
    showNickname () {
      this.isShowNickname = true
      this.nickname = this.Profile.nickname
    },
    // 修改昵称 正则校验,发送ajax请求
    beforeNickClose (action, done) {
      // 模态框关闭前的回调函数
      // 调用 done() 后关闭弹窗，
      // 调用 done(false) 阻止弹窗关闭
      // console.log(123)
      if (action === 'confirm') {
        // 点了确认
        // 通过校验，发送ajax请求，进行修改，关闭框
        if (/^[\u4E00-\u9FA5]{2,6}$/.test(this.nickname)) {
          this.editProfile({ nickname: this.nickname })
          done()
        } else {
          // 如果没通过校验，阻止框的关闭
          this.$toast('昵称必须是2-6位的中文')
          done(false)
        }
      }
      if (action === 'cancel') {
        // 点击了取消肯定就是直接关闭即可
        done()
      }
    },
    // 修改密码点击事件处理 显示模态框
    showPassword () {
      this.isShowPassword = true
      this.password = this.Profile.password
    },
    // 修改密码 icon 图标事件处理
    changePassType () {
      this.isShowPassType = !this.isShowPassType
    },
    // 修改密码 正则校验,发送ajax请求
    beforePassClose (action, done) {
      // 模态框关闭前的回调函数
      // 调用 done() 后关闭弹窗，
      // 调用 done(false) 阻止弹窗关闭
      // console.log(123)
      if (action === 'confirm') {
        // 点了确认
        // 通过校验，发送ajax请求，进行修改，关闭框
        if (/^\w{3,12}$/.test(this.password)) {
          this.editProfile({ password: this.password })
          done()
        } else {
          // 如果没通过校验，阻止框的关闭
          this.$toast('密码必须是3-12位的字符')
          done(false)
        }
      }
      if (action === 'cancel') {
        // 点击了取消肯定就是直接关闭即可
        done()
      }
    },
    // 修改性别点击事件处理 显示模态框
    showGender () {
      this.isShowGender = true
      this.navgender = this.Profile.gender
    },
    // 修改性别 发送axios
    editGender () {
      this.editProfile({ gender: this.navgender })
    },
    // 上传头像
    // 文件裁剪时，读完文件后
    // 1.显示裁剪的盒子(蒙层)
    // 2.将读到的文件地址，给到文件裁剪插件
    afterRead (file) {
      this.isShowMask = true
      this.option.img = file.content
      // 用于上传的文件对象是 file.file
      // formData，异步文件上传
      // console.log(file)
    },
    crop () {
      console.log('要裁剪啦 => 需要获取截图框内的图片信息')
      // 获取截图的base64 数据
      this.$refs.cropper.getCropBlob(async (imgData) => {
        const fd = new FormData()
        // fd.append(参数1,参数2)
        // 参数1：name值，后台用于接收的值
        // 参数2：值，提交的值(可以是文件对象)
        fd.append('file', imgData)
        const res = await this.$http.post('/upload', fd)
        console.log(res)
        const { statusCode, data } = res.data
        if (statusCode === 200) {
          this.editProfile({ head_img: data.url })
        } else {
          this.$toast('文件上传失败，请稍后再试！')
        }
        this.isShowMask = false
      })
    },
    cancel () {
      this.isShowMask = false
    }
  },
  computed: {
    headImg () {
      return this.$http.defaults.baseURL + this.Profile.head_img
    },
    gender () {
      return this.Profile.gender === 1 ? '男' : '女'
    }
  }
}
</script>

<style lang="scss" scoped>
.edit-profile{
  .img-box{
    padding: 30px;
    position: relative;
    img{
      width: 70px;
      height: 70px;
      border-radius: 50%;
      margin:0 auto;
      overflow: hidden;
    }
    .van-uploader{
      position: absolute;
      width: 70px;
      height: 70px;
      left: 50%;
      transform: translateX(-50%);
      top: 30px;
      opacity: 0;
    }
  }
  .van-dialog{
    padding: 0 20px;
    .van-field{
      border:1px solid #ccc;
      margin: 20px 0;
    }
  }
  .van-dialog{
    .van-radio-group{
      padding: 20px 0;
      justify-content: space-around;
    }
  }
  .mask{
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
}
</style>
