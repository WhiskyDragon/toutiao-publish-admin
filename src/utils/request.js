/**
 * 基于 axios 请求的封装模块
*/
import axios from 'axios'
// 创建一个 axios 实例
// 通过这个实例发请求，请求结果交给这个实例处理
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn' // 请求的基础路径
})

// 到处请求
export default request
