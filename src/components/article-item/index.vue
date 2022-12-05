<template>
    <!--
    Cell单元格中的to和vuerouter相同
    :to="('/article/'+article.art_id)" 此拼接语法为老语法
    :to=`/article/${article.art_id}`  该为es6新语法-->
    <van-cell
    :to="{
        //根据路由名称进行跳转
        name:'article',
        //传递路由动态参数
        params:{
            //属性名：路由路径中射击的动态参数名称
            articleId:article.art_id
        }
    }"
    class="article-item">
    <!-- 使用插槽对该组件进行定制 -->
    <div slot="title" class="title van-multi-ellipsis--l2">{{ article.title }}</div>
    <div slot="label">
        <div v-if="(article.cover.type===3)" class="cover-warp">
            <div class="cover-item"
            v-for="(img,index) in article.cover.images"
            :key="index">
                <van-image
                class="cover-item-img"
                fit="cover"
                :src="img"
                />
            </div>
            <!-- <div class="cover-item"></div> -->
        </div>
        <div class="label-info-wrap">
            <span>{{ article.aut_name }}</span>
            <span>{{ article.comm_count }}评论</span>
            <span>{{ article.pubdate | relativeTime }}</span>
        </div>
    </div>
    <van-image
        v-if="(article.cover.type===1)"
        slot="default"
        class="right-cover"
        fit="cover"
        :src="article.cover.images[0]"
        />
    </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  components: {},
  props: {
    article: {
      type: Object,
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
.article-item{
    .title{
        font-size: 32px;
        color: #3a3a3a;
    }
    .van-cell__value{
        flex: unset;
        width: 232px;
        height: 146px;
        padding-left: 25px;
    }
    .right-cover{
        width: 232px;
        height: 146px;
    }
    .label-info-wrap span{
        font-size: 22px;
        color: #b4b4b4;
        margin-right: 25px;
    }
    .cover-warp{
        display: flex;
        padding: 30px 0;
        .cover-item{
            flex: 1;
            height: 146px;
            &:not(:last-child){
                padding-right: 4px;
            }
            .cover-item-img{
                width: 100%;
                height: 146px;
            }
        }
    }
}
</style>
