<template>
    <div class="user-profile">
      <!-- 导航栏 -->
      <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
      >
      </van-nav-bar>
      <!-- 导航栏-->

      <input
      type="file"
      hidden
      ref="file"
      @change="onFileChange"
      >

      <!-- 个人信息-->
      <van-cell
      title="头像"
      center
      is-link
      @click="$refs.file.click()"
      >
        <van-image
          class="avatar"
          width="30"
          height="30"
          fit="cover"
          round
          :src="user.photo"
        />
      </van-cell>
      <van-cell title="昵称"
      :value="user.name"
      is-link
      @click="(isUpdateNameShow = true)"
      />
      <van-cell
      title="性别"
      :value="(user.gender===0 ? '男' : '女')"
      @click="(isUpdateGenderShow = true)"
      is-link/>
      <van-cell title="生日"
      @click="(isUpdateBirthdayShow = true)"
      :value="user.birthday"
      is-link/>
      <!-- 个人信息-->

      <!-- 编辑昵称 -->
      <van-popup
      v-model="isUpdateNameShow"
      style="height:100%"
      position="bottom"
      >
      <updateName
      v-if="isUpdateNameShow"
      v-model="user.name"
      @close="(isUpdateNameShow =false)"
      />
      </van-popup>
      <!-- 编辑昵称 -->

      <!-- 编辑性别 -->
      <van-popup
      v-model="isUpdateGenderShow"
      position="bottom"
      >
      <UpdateGender
      v-if="isUpdateGenderShow"
      v-model="user.gender"
      @close ="(isUpdateGenderShow = false)"
      />
      </van-popup>
      <!-- 编辑性别 -->

      <!-- 编辑生日 -->
      <van-popup
      v-model="isUpdateBirthdayShow"
      position="bottom"
      >
      <UpdateBirthday
      v-if="isUpdateBirthdayShow"
      v-model="user.birthday"
      @close ="(isUpdateBirthdayShow = false)"
      />
      </van-popup>
      <!-- 编辑生日 -->

      <!-- 编辑头像 -->
      <van-popup
      v-model="isUpdatePhotoShow"
      position="bottom"
      style="height:100%"
      >
      <UpdatePhoto :img="img"/>
      </van-popup>
      <!-- 编辑头像 -->
    </div>
  </template>

<script>
import { getUserProfile } from '@/api/user'
import updateName from './components/update-name.vue'
import UpdateGender from './components/update-gender.vue'
import UpdateBirthday from './components/update-birthday.vue'
import UpdatePhoto from './components/update-photo.vue'

export default {
  name: 'UserProfile', // 最好用你这个组件的名字来命名
  components: { updateName, UpdateGender, UpdateBirthday, UpdatePhoto },
  props: {},
  data () {
    return {
      user: {},
      isUpdateNameShow: false,
      isUpdateGenderShow: false,
      isUpdateBirthdayShow: false,
      isUpdatePhotoShow: false,
      img: null // 预览的图片
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUserProfile()
  },
  mounted () {},
  methods: {
    async loadUserProfile () {
      try {
        const { data } = await getUserProfile()
        this.user = data.data
      } catch (err) {
        this.$toast('数据获取失败')
      }
    },
    onFileChange () {
      // 获取文件对象
      const file = this.$refs.file.files[0]
      // 基于文章对象获取blob图片
      this.img = window.URL.createObjectURL(file)
      this.isUpdatePhotoShow = true

      // file-input如果旋律同一个文件不会触发change事件
      // 解决方法就是每次使用完毕把它的value清空
      this.$refs.file.value = ''
    }
  }
}
</script>

  <style scoped lang="less">
  .user-profile{
    .avatar{
      width: 60px;
      height: 60px;
    }
    .van-popup{
      background-color: #f5f7f9;
    }
  }
  </style>
