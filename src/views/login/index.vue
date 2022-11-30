<template>
  <div class="login-continer">
    <!-- 当前页面导航栏 -->
  <van-nav-bar title="登录" class="page-nav-bar"/>
  <!-- /当前页面导航栏 -->
  <!-- 表单-->
  <!--
    表单验证：
    1.给van-field组件配置rules验证规则
     参考文档：https://vant-contrib.gitee.io/vant/v2/#/zh-CN/form#rule-shu-ju-jie-gou
    2.当表单提交的时候会自动触发表单验证
      如果验证通过，会触发submit事件
      如果验证失败不会触发 submit
   -->
  <van-form ref="loginForm" @submit="onSubmit">
    <van-field
      v-model="user.mobile"
      name="mobile"
      placeholder="请输入手机号"
      :rules="userFormRules.mobile"
      type="number"
      maxlength="11"
    >
    <template #left-icon>
      <div class="toutiao toutiao-shouji"></div>
    </template>
    </van-field>

    <van-field
      v-model="user.code"
      name="code"
      placeholder="请输入验证码"
      :rules="userFormRules.code"
      type="number"
      maxlength="6"
    >
    <template #left-icon>
      <div class="toutiao toutiao-yanzhengma"></div>
    </template>
    <template #button>
      <!--
        time倒计时时间
       -->
       <van-count-down
       v-if="isCountDownShow"
       :time="(1000 * 60)"
       format="ss s"
       @finish="isCountDownShow = false"
       />
      <van-button
      v-else
      class="send-sms-btn"
      round size="small" type="default"
      native-type="button"
      @click="onSendSms">发送验证码
      </van-button>
    </template>
    </van-field>
    <div class="login-btn-warp">
      <van-button  class="login-btn" block type="info" native-type="submit">登录</van-button>
    </div>
  </van-form>
  <!-- /表单-->
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
import { Toast } from 'vant'
export default {
  props: {},
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      userFormRules: {
        mobile: [{ required: true, message: '手机号不能为空' },
          {
            pattern: /^[1][3,4,5,6,7,8,9][0-9]{9}$/,
            message: '手机号格式错误'
          }
        ],
        code: [{ required: true, message: '验证码不能为空' },
          {
            pattern: /\d{6}$/,
            message: '验证码格式错误'
          }
        ]
      },
      isCountDownShow: false // 是否展示倒计时
    }
  },
  computed: {},
  methods: {
    async onSubmit () {
      // 1.获取表单数据
      const user = this.user
      // 2.表单验证
      Toast.loading({
        message: '登录中...',
        forbidClick: true, // 禁用背景点击
        duration: 0
      })
      // 3.提交表单数据请求登录
      try {
        const { data } = await login(user)
        this.$store.commit('setUser', data.data)
        Toast.success('登录成功')
      } catch (err) {
        if (err.response.status === 400) {
          console.log('手机号或验证码错误')
          Toast.fail('手机号或验证码错误')
        } else {
          console.log('登录失败，请稍后重试', err)
          Toast.fail('登录失败，请稍后重试')
        }
      }
      // 4.根据请求相应结果做后续处理
    },
    async onSendSms () {
      // 1.校验手机号
      try {
        await this.$refs.loginForm.validate('mobile')
        console.log('验证通过')
      } catch (err) {
        return console.log('验证失败', err)
      }
      // 2.验证通过 显示倒计时
      this.isCountDownShow = true
      // 3. 请求发送验证码
      try {
        const res = await sendSms(this.user.mobile)
        console.log('发送成功', res)
        this.$toast('发送成功')
      } catch (err) {
        // 发送失败关闭倒计时
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast('发送太频繁了，请稍后重试')
        } else {
          this.$toast('发送失败，请稍后重试')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
  .login-continer{
    .toutiao{
      font-size: 37px;
    }
    .send-sms-btn{
      width: 152px;
      height: 46px;
      line-height: 46px;
      background-color: #ededed;
      font-size: 22px;
      color: #666;
    }

    .login-btn-warp{
      padding: 53px 33px;
      .login-btn{
        background-color: #6db4fb;
      }
    }
  }
</style>
