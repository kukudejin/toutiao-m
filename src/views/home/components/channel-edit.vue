<template>
    <div class="channel-edit">
      <!-- 我的频道 -->
      <van-cell :border="false">
        <div slot="title" class="title-text">我的频道</div>
        <van-button
        type="danger"
        plain
        round
        size="small"
        class="edit-btn"
        @click="(isEdit = !isEdit)"
        >{{isEdit ? '完成' :'编辑'}}</van-button>
      </van-cell>
      <van-grid class="my-grid" :gutter="10">
        <van-grid-item
        class="grid-item"
        v-for="(channel,index) in myChannels"
        :key="index"
        @click="onMyChannelClick(channel,index)">
        <van-icon slot="icon" name="clear"
        v-show="(isEdit && !flexChannels.includes(channel.id))"></van-icon>
        <span
        class="text"
        :class="{ active:index === active }"
        slot="text"
        >{{ channel.name }}</span>
        </van-grid-item>
      </van-grid>

      <!-- 频道推荐 -->
      <van-cell :border="false">
        <div slot="title" class="title-text">频道推荐</div>
      </van-cell>
      <van-grid class="recommend-grid" :gutter="10">
        <van-grid-item
        class="grid-item"
        v-for="(channel,index) in recommendChannels"
        :key="index"
        icon="plus"
        :text="channel.name"
        @click="onAddChannel(channel)" />
      </van-grid>

    </div>
  </template>

<script>
import { getAllChannels } from '@/api/channel'
export default {
  name: 'ChannelEdit', // 最好用你这个组件的名字来命名
  components: {},
  props: {
    myChannels: {
      type: Array,
      require: true
    },
    active: {
      type: Number,
      require: true
    }
  },
  data () {
    return {
      allChannels: [], // 所有频道
      isEdit: false, // 控制编辑状态的显示
      flexChannels: [0] // 固定频道不允许删除
    }
  },
  // 计算属性
  computed: {
    // 数组的filter方法：遍历数组把符合条件的元素储存到新数组中并返回
    recommendChannels () {
      return this.allChannels.filter(channel => {
        // const channels = []

        // 数组的find方法遍历数组 把符合条件的第一个元素返回
        return !this.myChannels.find(myChannel => {
          return myChannel.id === channel.id
        })
      })
    }

    // recommendChannels () {
    //   const channels = []
    //   this.allChannels.forEach(channel => {
    //     const ret = this.myChannels.find(myChannel => {
    //       return myChannel.id === channel.id
    //     })
    //     // 如果我的频道中不包括该频道项，则收集到推荐频道中
    //     if (!ret) {
    //       channels.push(channel)
    //     }
    //   })
    //   // 把计算结果返回
    //   return channels
    // }
  },
  watch: {},
  created () {
    this.loadAllChannels()
  },
  mounted () {},
  methods: {
    async loadAllChannels () {
      try {
        const { data } = await getAllChannels()
        this.allChannels = data.data.channels
      } catch (err) {
        this.$toast('数据获取失败')
      }
    },
    onAddChannel (channel) {
      // eslint-disable-next-line vue/no-mutating-props
      this.myChannels.push(channel)
    },
    onMyChannelClick (channel, index) {
      // 1. 如果是编辑状态 执行删除操作
      if (this.isEdit) {
        // 对删除的index进行判断查看是否为固定频道
        if (this.flexChannels.includes(index)) {
          return
        }
        // 2. 编辑状态删除频道
        if (index <= this.active) {
          // 让激活频道的索引 -1
          this.$emit('update-active', this.active - 1, true)
        }
        // eslint-disable-next-line vue/no-mutating-props
        this.myChannels.splice(index, 1)
      } else {
        // 非编辑状态选择频道
        // 子组件不能改变props 的数据
        this.$emit('update-active', index, false)
      }
    }
  }
}
</script>

  <style scoped lang="less">
  .channel-edit{
    padding: 85px 0;
  }
  .title-text{
    font-size: 32px;
    color: #333333;
  }
  .edit-btn{
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
  }
  /deep/.grid-item{
    width: 160px;
    height: 86px;
    .van-grid-item__content{
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text,.text{
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }
      .active{
        color: red;
      }
      .van-grid-item__icon-wrapper{
        position: unset;
      }
    }
  }
  /deep/ .recommend-grid{
    .grid-item{
      .van-grid-item__content{
        flex-direction: row;
      }
      .van-icon-plus{
        font-size: 28px;
        margin-right: 6px;
      }
      .van-grid-item__text{
        margin-top: 0;
      }
    }
  }
  /deep/ .my-grid{
    .grid-item{
      .van-icon-clear{
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }
  </style>
