<template>
  <div class="article-list">
    <!-- 下拉刷新组件 -->
    <van-pull-refresh
    v-model="isreFreshLoading"
    @refresh="onRefresh"
    :success-text="refreshSuccessText"
    success-duration="1000">
        <!-- 文章列表组件 -->
    <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    :error.sync="error"
    error-text="请求失败，点击重新加载"
    @load="onLoad"
    >
    <article-item
    v-for="(article,index) in list"
    :key="index"
    :article="article"/>
    <!-- 原先遍历样例单元格 -->
    <!-- <van-cell v-for="(article,index) in list"
    :key="index" :title="article.title" /> -->
</van-list>
</van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item/index.vue'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [], // 存储列表数组
      loading: false, // 控制加载中loading状态
      finished: false, // 控制数据加载结束的状态
      timestamp: null, // 请求获取下一页数据的时间戳
      error: false, // 控制列表失败的提示状态
      isreFreshLoading: false, // 控制下拉刷新的loading
      refreshSuccessText: '刷新成功 ' // 下拉刷新成功提示文本
    }
  },
  methods: {
    // 初始化或滚动到底部的时候会调用onload
    // onLoad () {
    // //   console.log('onLoad')
    //   // 异步更新数据
    //   // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    //   // 1. 请求数据
    //   setTimeout(() => {
    //     // 2. 把请求结果数据放到list数组中
    //     for (let i = 0; i < 10; i++) {
    //       this.list.push(this.list.length + 1)
    //     }

    //     // 加载状态结束
    //     this.loading = false

    //     // 数据全部加载完成
    //     if (this.list.length >= 40) {
    //       this.finished = true
    //     }
    //   }, 1000)
    // }
    async onLoad () {
      try {
        // 1. 请求数据
        const { data } = await getArticles({
          channel_id: this.channel.id, // 频道ID
          timestamp: this.timestamp || Date.now()
        })
        // 使用随机数模拟报错测试失败功能模块
        // if (Math.random() > 0.5) {
        //   JSON.parse('dsnajjjs')
        // }
        // 2. 把请求结果数据放到list数组中
        const { results } = data.data
        // 数组的展开操作符 他会把元素一个一个拿出来
        this.list.push(...results)
        // 3. 加载状态结束之后要把状态设置为结束
        this.loading = false
        // 4.判断数据是否全部加载完成
        if (results.length) {
        // 更新获取下一页时间戳
          this.timestamp = data.data.pre_timestamp
        } else {
        // 没有数据了，将finished设置为true
          this.finished = true
        }
      } catch (err) {
        // 展示错误提示状态
        this.error = true
        // 请求失败关闭loading
        this.loading = false
      }
    },
    // 下拉刷新时触发该函数
    async onRefresh () {
      try {
        // 1. 请求数据
        const { data } = await getArticles({
          channel_id: this.channel.id, // 频道ID
          timestamp: Date.now() // 下拉刷新获取最新数据 所以选择获得当前时间戳
        })
        // 使用随机数模拟报错测试失败功能模块
        // if (Math.random() > 0.2) {
        //   JSON.parse('dsnajjjs')
        // }
        // 将数据追加到列表顶部
        const { results } = data.data
        this.list.unshift(...results)
        // 更新下拉刷新成功提示的文本
        this.refreshSuccessText = `更新成功,更新了${results.length}条数据`
        // 关闭下拉刷新的loading状态
        this.isreFreshLoading = false
      } catch (err) {
        this.refreshSuccessText = '刷新失败'
        this.isreFreshLoading = false
      }

      // 请求获取数据
      // 将数据放到列表的顶部
    }
  }

}
</script>

<style scoped lang="less">
.article-list{
    //记住列表滚动位置 和body有关
    //百分比单位是相对父元素的
    height: 79vh;
    overflow-y: auto;
}
</style>
