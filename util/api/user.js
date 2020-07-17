import baseUrl from './index.js'
import { get, post, put, remove, postObj, } from './methos.js'


// 
export const getToken = (params) => {
	return post(baseUrl.getToken, params)
}
export const getUserInfo = (params) => {
  return get(baseUrl.getUserInfo, params)
}
export const getAllShopQY = (params) => {
	return get(baseUrl.getAllShopQY, params)
}