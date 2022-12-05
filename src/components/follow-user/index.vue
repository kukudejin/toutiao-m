<template>
        <van-button
        v-if="isFollowed"
        class="follow-btn"
        round
        size="small"
        :loading ="loading"
        @click="onFollow"
      >已关注</van-button>
      <van-button
        v-else
        class="follow-btn"
        type="info"
        color="#3296fa"
        round
        size="small"
        icon="plus"
        :loading ="loading"
        @click="onFollow"
      >关注</van-button>
  </template>

<script>
import { addFollow, deleteFollow } from '@/api/user'

export default {
  name: 'followUser', // 最好用你这个组件的名字来命名
  components: {},
  model: {
    prop: 'isFollowed',
    event: 'update-is_followed'
  },
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    userId: {
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
    async onFollow () {
      this.loading = true // 展示关注按钮的loading状态
      try {
        if (this.isFollowed) {
          // 已关注取消关注
          await deleteFollow(this.userId)
        } else {
          // 没有关注添加关注
          await addFollow(this.userId)
        }
        // $emit通知父元素修改值
        this.$emit('update-is_followed', !this.isFollowed)
        // 对按钮的状态进行改变
        // this.article.is_followed = !this.isFollowed
      } catch (err) {
        console.log(err)
        let message = '操作失败，请重试'
        if (err.response && err.response.status === 400) {
          message = '你不能关注你自己！'
        }
        this.$toast(message)
      }
      this.loading = false // 关闭关注按钮的Loading状态
    }
  }
}
</script>

  <style scoped lang="less">

  </style>
