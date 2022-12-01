import axios from 'axios'
// 加载token容器
import store from '@/store'
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net/'
})

// 请求拦截器 为需要token的请求添加上token！
// Add a request interceptor
request.interceptors.request.use(function (config) {
  // 请求发起会经过这里
  // config：配置对象本次请求的配置对象
  // console.log(config)
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }

  // 这里务必要返回config配置对象 否则请求出不去
  return config
}, function (error) {
  // 如果请求出错（还没发出去）会进入这里
  return Promise.reject(error)
})
// 相应拦截器

export default request
