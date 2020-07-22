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
// 获取套系详情
export const getSystemDetail = (params) => {
	return get(baseUrl.getSystemDetail, params)
}
// 获取昵称
export const getCallName = (params) => {
	return get(baseUrl.getCallName, params)
}
// 通过手机号查找客户组
export const getCustomerMobileList = (params) => {
	return get(baseUrl.getCustomerMobileList, params)
}
// 获得套系详情
export const getOrderAssembly = (params) => {
	return get(baseUrl.getOrderAssembly, params)
}
// 获取商店工具箱
export const getGoodsToolList = (params) => {
	return get(baseUrl.getGoodsToolList, params)
}
// 获取景点工具箱
export const getPlaceToolList = (params) => {
	return get(baseUrl.getPlaceToolList, params)
}
// 获取服务工具箱
export const getServicesToolList = (params) => {
	return get(baseUrl.getServicesToolList, params)
}
// 获取服装工具箱
export const getDressInfoToolList = (params) => {
	return get(baseUrl.getDressInfoToolList, params)
}
