<template>
    <div class="search-container">
      <!-- 顶部搜索栏 -->
      <!-- Search 组件提供了 search 和 cancel 事件，
        search 事件在点击键盘上的搜索/回车按钮后触发，
        cancel 事件在点击搜索框右侧取消按钮时触发。 -->
      <form class="search-form" action="/">
        <van-search
          v-model="searchText"
          show-action
          placeholder="请输入搜索关键词"
          background="#3296fa"
          @search="onSearch"
          @cancel="onCancel"
          @focus="(isResultShow=false)"
        />
      </form>
      <!-- 顶部搜索栏 -->

      <!-- 搜索结果 -->
      <SearchResult
      v-if="isResultShow"
      :search-text="searchText"
      />
      <!-- 搜索结果 -->

      <!-- 联想建议 -->
      <SearchSuggestion
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
      />
      <!-- 联想建议 -->

      <!-- 搜索历史记录 -->
      <SearchHistory  v-else/>
      <!-- 搜索历史记录 -->

    </div>
  </template>

<script>
import SearchHistory from './components/search-history.vue'
import SearchSuggestion from './components/search-suggestion.vue'
import SearchResult from './components/search-result.vue'
import { Toast } from 'vant'
export default {
  name: 'SearchIndex', // 最好用你这个组件的名字来命名
  components: { SearchHistory, SearchSuggestion, SearchResult },
  props: {},
  data () {
    return {
      searchText: '',
      isResultShow: false // 控制搜索结果的展示
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onSearch (val) {
      this.searchText = val
      this.isResultShow = true
    },
    onCancel () {
      Toast('取消')
    }
  }
}
</script>

<style scoped lang="less">
.search-container{
    padding-top: 108px;
    .van-search__action{
        color: #fff;
    }
}
.search-form{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
}
</style>
