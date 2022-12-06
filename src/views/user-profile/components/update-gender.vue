<template>
    <div>
        <van-picker
        title="标题"
        show-toolbar
        :columns="columns"
        :default-index="value"
        @cancel="$emit('close')"
        @confirm = "onConfirm()"
        @change="onPickChange"
        />
    </div>
  </template>

<script>
import { updateUserProfile } from '@/api/user'

export default {
  name: 'UpdateGender', // 最好用你这个组件的名字来命名
  components: {},
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      columns: ['男', '女'],
      loacalGender: 0
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 持续展示
      })
      try {
        const loacalGender = this.loacalGender

        await updateUserProfile({
          gender: loacalGender
        })
        // 更新视图
        this.$emit('input', loacalGender)
        // 关闭弹层
        this.$emit('close')
        // 提示成功
        this.$toast.success('更新完成')
      } catch (err) {
        this.$toast.fail('更新失败')
      }
    },
    onPickChange (picker, value, index) {
      this.loacalGender = index
    }
  }
}
</script>

  <style scoped lang="less">

  </style>
