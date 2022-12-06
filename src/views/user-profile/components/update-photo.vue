<template>
        <img class="img" :src="img" >
  </template>

<script>
export default {
  name: 'UpdatePhoto', // 最好用你这个组件的名字来命名
  components: {},
  props: {
    img: {
      type: [String, Object],
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

  <style scoped lang="less">
.img{
    max-width: 100%;
}
  </style>
