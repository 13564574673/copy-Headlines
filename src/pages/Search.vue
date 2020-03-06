<template>
  <div class="search">
    <!-- 头部 -->
    <div class="header">
      <div class="left" @click="back">
        <i class="iconfont iconjiantou2"></i>
      </div>
      <div class="searchs">
          <van-field
            v-model="keyword"
            clearable
            left-icon="search"
            placeholder="请输入搜索关键字"
            ref="field"
          />
      </div>
      <div class="right" @click="search">搜索</div>
    </div>
    <!-- 展示的列表 -->
    <div class="post-list" v-if="postList.length > 0">
      <hm-post v-for="item in postList" :key="item.id" :post="item" @click="$router.push(`/post-detail/${item.id}`)"></hm-post>
    </div>
    <!-- 结构 -->
    <div class="content" v-else>
      <div class="history">
        <h3>历史记录</h3>
        <ul>
          <li @click="hotSearch(item)" v-for="(item,index) in history" :key="index">{{item}}</li>
        </ul>
      </div>
      <div class="hot-searc">
        <h3>热门搜索</h3>
        <ul>
          <li @click="hotSearch(item)" v-for="(item,index) in hotkeys" :key="index">{{item}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      keyword: '',
      // 用于存放搜索得到的文章结果
      postList: [],
      // 存放热门搜索
      hotkeys: ['说好不哭', '关晓彤', '性感女歌手', '最适合学外语的7部动画'],
      history: []
    }
  },
  mounted () {
    // console.log(this.$refs.field)
    // 页面渲染完成后input框获取焦点
    this.$refs.field.focus()
  },
  created () {
    const history = JSON.parse(localStorage.getItem('history'))
    if (history) {
      this.history = history
    }
  },
  methods: {
    async search () {
      const res = await this.$http.get('/post_search', {
        params: {
          keyword: this.keyword
        }
      })
      console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        // 进行data数组长度判断，如果为空给出提示信息
        if (data.length) {
          this.postList = data
          // 添加前，应该先将历史数组中，重复的项移出，保留和关键字不同的内容
          this.history = this.history.filter(item => item !== this.keyword)
          // 将搜索的关键字，添加到搜索历史中去
          // 判断，如果this.history长度大于等于10，删除最后一项，固定历史记录最多只能有10项
          if (this.history.length >= 10) {
            this.history.pop()
          }
          this.history.unshift(this.keyword)
          console.log(this.history)
          localStorage.setItem('history', JSON.stringify(this.history))
          // console.log(this.postList)
        } else {
          this.$toast('未找到内容')
        }
      }
    },
    back () {
      // console.log('11')
      // 如果有搜索结果展示，按返回，应该显示成搜索历史的状态
      if (this.postList.length > 0) {
        this.keyword = ''
      } else {
      // 如果没有搜索结果展示，本身就是搜索历史状态，按返回就是真的返回了
        this.$router.go(-1)
      }
    },
    hotSearch (item) {
      this.keyword = item
      this.search()
    }
  },
  watch: {
    keyword (value) {
      if (value.trim() === '') {
        this.postList = []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.search{
  .header{
    display: flex;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #ccc;
    .left{
      width: 50px;
      height: 50px;
      text-align: center;
      i{
        font-size: 16px;
        display: block;
      }
    }
    .searchs{
      flex: 1;
      padding-top: 7px;
      .van-field{
        height: 36px;
        line-height: 36px;
        padding: 0 10px;
        border-radius: 18px;
        font-size: 12px;
      }
    }
    .right{
      width: 50px;
      text-align: center;
      font-size: 14px;
    }
  }
  .content{
    padding: 10px;
    .history,
    .hot-searc{
      h3{
        font-size: 16px;
        font-weight: 700;
        color: black;
        padding: 10px 0;
      }
      ul{
        display: flex;
        flex-wrap: wrap;
        li{
          font-size: 14px;
          padding: 5px 10px;
        }
      }
    }
  }
}
</style>
