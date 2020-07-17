import baseUrl from './index.js'
import { get, post, put, remove, postObj, } from './methos.js'

// 获得所有门店
export const getAllShopQY = (params) => {
  return get(baseUrl.getAllShopQY, params)
}