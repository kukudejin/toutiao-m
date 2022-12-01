<template>
  <div class="layout-container">
    <!-- 子路由出口 -->
    <router-view />
    <!-- 子路由出口 -->
    <!-- 标签栏导航 -->
    <!-- route 开启路由模式 -->
<van-tabbar class="layout-tabbar" route>
  <van-tabbar-item to="/home">
    <template #icon>
      <div class="toutiao toutiao-shouye"></div>
    </template>
    <span class="text">首页</span>
  </van-tabbar-item>

  <van-tabbar-item to="/qa">
    <template #icon>
      <div class="toutiao toutiao-wenda"></div>
    </template>
    <span class="text">问答</span>
  </van-tabbar-item>

  <van-tabbar-item to="/video">
    <template #icon>
      <div class="toutiao toutiao-shipin"></div>
    </template>
    <span class="text">视频</span>
  </van-tabbar-item>

  <van-tabbar-item to="/my">
    <template #icon>
      <div class="toutiao toutiao-wode"></div>
    </template>
    <span class="text">{{$store.state.user ?'我的':'未登录' }}</span>
  </van-tabbar-item>
</van-tabbar>
    <!-- /标签栏导航 -->
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  components: {},
  props: {},
  data () {
    return {
      active: 0
    }
  },
  computed: {},
  watch: {},
  activate () {
    this.$router.push('/home')
  },
  methods: {}
}
</script>

<style scoped lang="less">
.layout-container{
  .layout-container{
    .layout-tabbar{
      i.toutiao{
        font-size: 40px;
      }
      span.text{
        font-size: 20px;
      }
    }
  }
}
</style>
