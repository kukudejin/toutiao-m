<template>
  <div class="my-container">
    <!-- 已登录 -->
    <div v-if="user" class="header user-info">
      <!-- 基本信息 -->
      <div class="base-info">
        <div class="left">
          <!-- 头像 -->
          <van-image
            round
            class="avatar"
            fit="cover"
            :src="userinfo.photo"
          />
          <!-- 用户名 -->
          <span class="name">{{userinfo.name}}</span>
        </div>
        <div class="right">
          <van-button
          to="/user/profile"
          size="mini"
          round>编辑资料</van-button>
        </div>
      </div>

      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{userinfo.art_count}}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{userinfo.follow_count}}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{userinfo.fans_count}}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{userinfo.like_count}}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- 已登录 -->

    <!-- 没有登录 -->
    <div v-else class="header not-login">
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="~@/assets/mobile.png" alt="">
        <span class="text">登录 / 注册</span>
      </div>
    </div>
    <!-- 没有登录 -->

    <!-- 导航 -->
    <van-grid class="grid-nav mb-4" :column-num="2" clickable>
      <!-- 子宫格 收藏-->
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <!-- 子宫格 历史-->
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <!-- 导航 -->

    <van-cell title="消息通知" is-link to="/" />
    <van-cell class="mb-4" title="小智同学" is-link to="/" />
    <van-cell v-if="user"
    class="logout-cell"
    title="退出登录"
    clickable
    @click="onLogout()"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'MyIndex',
  components: {},
  props: {},
  data () {
    return {
      userinfo: {} // 用户信息
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {
    // 如果用户登录了则请求用户信息
    if (this.user) {
      this.loadUserInfor()
    }
  },
  mounted () {},
  methods: {
    onLogout () {
      // 退出提示
      // 组件中需要使用this.$dialog
      this.$dialog.confirm({
        title: '确认退出吗'
      }).then(() => {
        // on confirm
        // console.log('确认执行这里')
        // 确认退出：清除登录状态（容器中的user + 本地储存中的 user）
        this.$store.commit('setUser', null)
      })
        .catch(() => {
          // on cancel
          console.log('取消执行这里')
        })
    },
    async loadUserInfor () {
      try {
        const { data } = await getUserInfo()
        this.userinfo = data.data
        // console.log(data)
      } catch (err) {
        this.$toast('获取数据失败，请稍后重试')
      }
    }
  }
}
</script>

<style scoped lang="less">
.my-container{
  .header{
    height: 361px;
    background: url("~@/assets/banner.png");
    background-size: cover;
  }

  .not-login{
    display: flex;
    justify-content:center;
    align-items: center;
    .login-btn{
      display: flex;
      flex-direction: column;
      justify-content:center;
      align-items: center;
      .mobile-img{
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text{
        font-size: 28px;
        color: #fff;
      }
    }
  }
  .user-info{
    .base-info{
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left{
        display: flex;
        align-items: center;
        .avatar{
          width: 132px;
          height: 132px;
          border:4px solid #fff;
          margin-right: 23px;
        }
        .name{
          font-size: 30px;
          color: #fff;
        }
      }
    }
    .data-stats{
      display: flex;
      .data-item{
        height: 130px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        .count{
          font-size: 36px;
        }
        .text{
          font-size: 23px;
        }
      }
    }
  }
  /deep/.grid-nav{
    .grid-item{
      height: 141px;
      i.toutiao{
        font-size: 45px;
      }
      .toutiao-shoucang{
        color: #eb5253;
      }
      .toutiao-lishi{
        color: #ff9d1d;
      }
      span.text{
        font-size: 28px;
      }
    }
  }
  .logout-cell{
    text-align: center;
    color: #d86262;
  }
  .mb-4{
    margin-bottom: 4px;
  }
}
</style>
