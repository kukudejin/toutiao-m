<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
      class="search-btn"
      slot="title"
      type="info"
      size="small"
      round
      icon="search"
      >搜索
      </van-button>
    </van-nav-bar>
      <!-- 导航栏 -->

      <!-- 频道列表 -->
      <!--
        通过v-model绑定激活标签对应的索引值 默认第一个标签
        通过animated属性可以开启切换标签内容转场动画
        通过swipeable属性可以开启华东切换标签页
       -->
       <van-tabs class="channel-tabs" v-model="active" animated swipeable>
        <van-tab
         :title="channel.name"
         v-for="channel in channels"
         :key="channel.id"
         >
        <article-list :channel="channel"/>
        </van-tab>
        <!-- 插槽内容 -->
        <div slot="nav-right" class="placeholder"></div>
        <!-- 右插槽 汉堡按钮 -->
        <div slot="nav-right" class="hamburger-btn"
        @click="(isCancelEditShow=true)">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
      </van-tabs>
      <!-- 频道列表 -->

      <!-- 频道编辑弹出层 -->
      <van-popup
        v-model="isCancelEditShow"
        closeable
        close-icon-position="top-left"
        position="bottom"
        :style="{ height: '100%' }"
      >
      <channel-edit
      :active="active"
      :my-channels="channels"
      @update-active="onUpdateActive"
      />
      </van-popup>
      <!-- /频道编辑弹出层 -->
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list.vue'
import ChannelEdit from './components/channel-edit.vue'
export default {
  name: 'HomeIndex',
  components: { ArticleList, ChannelEdit },
  props: {},
  data () {
    return {
      // 激活频道的索引
      active: 0,
      // 频道列表
      channels: [],
      isCancelEditShow: false // 控制编辑频道弹框的展示与否
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadChannels()
  },
  mounted () {},
  methods: {
    async loadChannels () {
      try {
        const { data } = await getUserChannels()
        this.channels = data.data.channels
      } catch (err) {
        this.$toast('获取频道列表失败')
      }
    },
    // 父子联动 更新激活选项
    onUpdateActive (index, isCancelEditShow = true) {
      this.active = index
      this.isCancelEditShow = false
    }
  }
}
</script>

<style scoped lang="less">
.home-container{
  padding-top: 174px;
  padding-bottom: 100px;
  .search-btn{
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon{
      font-size: 32px;
    }
  }
}

/deep/ .channel-tabs{
  .van-tabs__wrap{
    position: fixed;
    top: 92px;
    z-index: 1;
    left: 0;
    right: 0;
    height: 82px;
  }
  .van-tab{
    min-width: 200px;
    border-right: 1px solid #edeff3;
    font-size: 30px;
    color: #777;
  }
  .van-tab--active{
    color: #333333;
  }
  .van-tabs__nav--line{
    padding-bottom: 0;
  }
  .van-tabs__line{
    bottom: 8px;
    width: 31px;
    height: 6px;
    background-color: #3296fa;
  }
  .placeholder{
    width:  66px;
    height: 82px;
    flex-shrink: 0;
  }
  .hamburger-btn{
    position: fixed;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 66px;
    height: 82px;
    background-color: #fff;
    opacity: 0.902;
    i.toutiao{
      font-size: 33px;
    }
    &:before{
      content: "";
      position: absolute;
      left: 0;
      width: 1px;
      height: 100%;
      background-image: url(../../assets/gradient-gray-line.png);
      background-size: contain;
    }
  }
}
</style>
