<template>
  <div class="hm-floor">
    <!-- 预留父评论的位置 递归 -->
    <hm-floor @reply="reply" :index="index-1" v-if="comment.parent" :comment="comment.parent"></hm-floor>
    <div class="main">
      <div class="title">
        <div class="floor" >{{index}}楼</div>
        <div class="name">{{comment.user.nickname}}</div>
        <div class="time">{{comment.user.create_date | time1}}</div>
        <div class="reply" @click="reply(comment.id,comment.user.nickname)">回复</div>
      </div>
      <!-- 内容 -->
      <div class="content">{{comment.content}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hm-floor',
  props: {
    comment: Object,
    index: Number
  },
  methods: {
    reply (id, nickname) {
      // console.log('点击了')
      this.$emit('reply', id, nickname)
    }
  }
}
</script>

<style lang="scss" scoped>
.hm-floor{
  .main{
    padding: 10px;
    background: #eee;
    border-bottom: 1px solid #ccc;
    .title{
      display: flex;
      align-items: flex-end;
      .floor{
        margin-top: 0;
        margin-right: 5px;
        font-size: 12px;
      }
      .name{
        font-size: 14px;
      }
      .time{
        flex: 1;
        margin-left: 8px;
        color: #888;
      }
    }
    .content{
      padding: 10px 0;
      font-size: 12px;
    }
  }
}
</style>
