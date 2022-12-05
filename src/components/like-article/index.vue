<template>
    <div class="collect-article">
        <van-button
          :icon="value === 1 ?'good-job' :'good-job-o'"
          :class="{
            liked:value ===1
          }"
          :loading="loading"
          @click="onLiked"
        />
    </div>
  </template>

<script>
import { addLike, deleteLike } from '@/api/article'

export default {
  name: 'LikeArticle', // 最好用你这个组件的名字来命名
  components: {},
  props: {
    value: {
      type: Number,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLiked () {
      this.loading = true
      let status = -1
      try {
        if (this.value === 1) {
          // 已点赞 取消点赞
          deleteLike(this.articleId)
        } else {
          // 未点赞 添加点赞
          status = 1
          addLike(this.articleId)
        }

        this.$emit('input', status)
        this.$toast.success(status === 1 ? '点赞成功' : '取消点赞')
        // 更新视图
      } catch (err) {
        console.log(err)
        this.$toast.fail('操作失败请重试')
      }

      this.loading = false
    }
  }
}
</script>

<style scoped lang="less">
.liked{
    .van-icon{
        color: #e5645f;
    }
}
</style>
