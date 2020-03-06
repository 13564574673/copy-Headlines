<template>
  <div class="hm-comment">
    <div class="title">
      <img :src="comment.user.head_img | fixUrl" alt="">
      <div class="info">
        <div class="name">{{comment.user.nickname}}</div>
        <div class="time">{{comment.create_date | time1}}</div>
      </div>
      <div class="reply" @click="reply(comment.id,comment.user.nickname)">回复</div>
    </div>
    <hm-floor  @reply="reply" :index="index" v-if="comment.parent" :comment="comment.parent"></hm-floor>
    <!-- 内容 -->
    <div class="content">{{comment.content}}</div>
  </div>
</template>

<script>
import HmFloor from 'components/hm-floor.vue'
export default {
  data () {
    return {
      index: 0
    }
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  components: {
    HmFloor
  },
  created () {
    let list = this.comment
    console.log(list)
    while (list.parent) {
      this.index++
      list = list.parent
    }
  },
  methods: {
    reply (id, nickname) {
      // console.log('点击了')
      // 获取到id和name传递给父组件
      this.$emit('reply', id, nickname)
    }
  }
}
</script>

<style lang="scss" scoped>
.hm-comment{
  padding: 10px;
  border-bottom: 1px solid #ccc;
  .title{
    display: flex;
    img{
      width: 35px;
      height: 35px;
      border-radius: 50%;
      margin-left: 10px;
    }
    .info{
      flex: 1;
      padding-left: 8px;
      .name{
        font-size: 14px;
      }
      .time{
        font-size: 12px;
        color: rgba(0, 0, 0, 0.537254901960784);
      }
    }
    .reply{
      margin-right: 10px;
    }
  }
  .content{
    padding: 10px 0;
    font-size: 12px;
  }
  .hm-floor{
    margin-top: 10px;
    border: 1px solid #ccc;
    border-bottom: none;
  }
}
</style>
