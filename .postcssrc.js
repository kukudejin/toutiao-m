module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue ({ file }) {
        // 如果是 Vant 的样式就按照 37.5 处理转换
        // 如果是我们自己的样式就按照 75 处理转换
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      propList: ['*'],

      // 排除不要转换的样式资源
      exclude: 'github-markdown'
    }
  }
}
