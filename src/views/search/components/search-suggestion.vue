<template>
    <div class="search-suggestion">
        <van-cell
        icon="search"
        v-for="(text,index) in suggestions"
        :key="index"
        @click="$emit('search',text)"
        >
        <div
        slot="title"
        v-html="highLight(text)"></div>
        </van-cell>
    </div>
</template>

<script>
import { getSearchSuggestion } from '@/api/search'
// 引入第三方包的防抖函数，按需加载有好处
import { debounce } from 'lodash'

export default {
  name: 'SearchSuggestion', // 最好用你这个组件的名字来命名
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestions: [] // 联想建议数据列表
    }
  },
  computed: {},
  watch: {
    searchText: {
      // 当 searchText 发生改变的时候就会调用handler函数
      // 注意：handler函数名称是固定的
    //   handler (value) {
    //     this.loadSearchSuggestions(value)
    //   },
    // 防抖后
      handler: debounce(function (value) {
        this.loadSearchSuggestions(value)
      }, 1000),
      immediate: true // 该回调会在侦听开始后立即被调用
    }
  },
  created () {},
  mounted () {},
  methods: {
    async loadSearchSuggestions (q) {
      try {
        const { data } = await getSearchSuggestion(q)
        this.suggestions = data.data.options
      } catch (err) {
        this.$toast('数据获取失败请稍后再试')
      }
    },
    highLight (text) {
      const highlightStr = `<span class="active">${this.searchText}</span>`
      // 正则表达式中的// 中间的内容都会当作匹配字符串来使用，而不是数据变量
      // 如果需要根据数据变量动态的创建正则 则手动new RegExp
      // RegExp正则表达式构造函数
      //    参数一 ：匹配模式字符串，他会根据字符串创建正则对象
      //    参数二 ：匹配模式，要写到字符串中
      const reg = new RegExp(this.searchText, 'gi')
      //   console.log(text.replace(reg, highlightStr))
      return text.replace(reg, highlightStr)
    }
  }
}
</script>

<style scoped lang="less">
    .search-suggestion{
    /deep/span.active{
        color: #3296fa;
    }
}
</style>
