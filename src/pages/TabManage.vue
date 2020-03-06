<template>
  <div class="tab-manage">
    <hm-header>栏目管理</hm-header>
    <div class="cotent">
      <div class="title">点击删除以下频道</div>
      <div class="list">
        <div class="item" @click="del(index)" v-for="(item,index) in activeTabs" :key="item.id">{{item.name}}</div>
      </div>
      <div class="title">点击添加以下频道</div>
      <div class="list">
        <div class="item" @click="add(index)" v-for="(item,index) in deactiveTabs" :key="item.id">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 用于存放激活的栏目，默认情况下所有的栏目都是激活的
      activeTabs: [],
      // 用于存放未激活的栏目
      deactiveTabs: []
    }
  },
  created () {
    const activeTabs = JSON.parse(localStorage.getItem('activeTabs'))
    const deactiveTabs = JSON.parse(localStorage.getItem('deactiveTabs'))
    if (activeTabs && deactiveTabs) {
      this.activeTabs = activeTabs
      this.deactiveTabs = deactiveTabs
    } else {
      // 获取栏目的数据，获取到所有的栏目
      this.getTabList()
    }
  },
  methods: {
    async getTabList () {
      const res = await this.$http.get('/category')
      // console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.activeTabs = data
        console.log(this.activeTabs)
      }
    },
    del (index) {
      // console.log(index)
      if (this.activeTabs.length <= 5) {
        this.$toast('栏目不能少于5个')
        return
      }
      // 1. 给deactiveTabs添加对应的那个数据
      this.deactiveTabs.push(this.activeTabs[index])
      // 2. 删除activeTabs中对应下标的那项数据
      this.activeTabs.splice(index, 1)
    },
    add (index) {
      // 1.给activeTabs添加对应的那个数据
      this.activeTabs.push(this.deactiveTabs[index])
      // 2.删除deactiveTabs中对应下标的那项数据
      this.deactiveTabs.splice(index, 1)
    }
  },
  watch: {
    activeTabs () {
      // console.log('变了')
      localStorage.setItem('activeTabs', JSON.stringify(this.activeTabs))
      localStorage.setItem('deactiveTabs', JSON.stringify(this.deactiveTabs))
    }
  }
}
</script>

<style lang="scss" scoped>
  .tab-manage{
    background-color: #f8f8f8;
    .cotent{
      padding: 10px;
      .title{
        font-size: 12px;
        color: #888;
        padding: 10px 0;
      }
      .list{
        display: flex;
        flex-wrap: wrap;
        .item{
          width: 60px;
          height: 30px;
          border:1px solid #ccc;
          text-align: center;
          line-height: 30px;
          font-size: 14px;
          margin-right: 8px;
          margin-bottom: 10px;
          background-color: #ddd;
        }
      }
    }
  }
</style>
