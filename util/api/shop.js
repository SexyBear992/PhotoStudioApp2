import baseUrl from './index.js'
import { get, post, put, remove, postObj, } from './methos.js'

// 获得所有门店
export const getAllShopQY = (params) => {
  return get(baseUrl.getAllShopQY, params)
}
export const getCategoryList = (params) => {
  return get(baseUrl.getCategoryList, params)
}
// 获取套系名称
export const getSystemNameList = (params) => {
	return get(baseUrl.getSystemNameList, params)
}
