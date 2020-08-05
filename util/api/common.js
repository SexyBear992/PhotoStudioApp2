import baseUrl from './index.js'
import { get, post, put, remove, postObj, } from './methos.js'

// 获得所有门店
export const getAllShopQY = (params) => {
  return get(baseUrl.getAllShopQY, params)
}
// 根据类型Type获取所有类别
export const getCategoryList = (params) => {
  return get(baseUrl.getCategoryList, params)
}