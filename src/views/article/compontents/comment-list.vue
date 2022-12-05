<template>
    <div class="comment-list">
        <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <CommentItem
        v-for="(item,index) in list"
        :key="index"
        :comment="item"
        />
      </van-list>
    </div>
  </template>

<script>
import { getComments } from '@/api/comment'
import CommentItem from './comment-item.vue'

export default {
  name: 'CommentList', // 最好用你这个组件的名字来命名
  components: {
    CommentItem
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10
    }
  },
  computed: {},
  watch: {},
  created () {
    // 一打开文章就获得评论总数
    this.onLoad()
  },
  mounted () {},
  methods: {
    async onLoad () {
      try {
      // 1. 请求获取数据
        const { data } = await getComments({
          type: 'a', // 评论类型,a-对文章的评论 c-对评论的评论
          source: this.source, // 源id,文章id或评论id
          offset: this.offset, //
          limit: this.limit
        })
        // 2. 将数据添加到列表中
        const { results } = data.data
        // console.log(results)
        this.list.push(...results)

        // 把文章评论的总数量传递到外部
        this.$emit('onload-success', data.data)

        // 3. 将loading设置为false
        this.loading = false

        // 4. 判断是否还有数据
        if (results.length) {
          // 有就更新下一页的数据页码
          this.offset = data.data.last_id
        } else {
          // 没有就将finished设置结束
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

  <style scoped lang="less">

  </style>
