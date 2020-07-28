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
// 获取礼包名称
export const getGiftName = (params) => {
	return get(baseUrl.getGiftName, params)
}
// 获取礼包详情
export const getGiftDetail = (params) => {
	return get(baseUrl.getGiftDetail, params)
}

// 婚庆开单
export const openWedding = (params) => {
	return postObj(baseUrl.openWedding, params)
}
// 儿童开单
export const openBaby = (params) => {
	return postObj(baseUrl.openBaby, params)
}
// 写真开单
export const openPortray = (params) => {
	return postObj(baseUrl.openPortray, params)
}
// 孕妈开单
export const openPregnant = (params) => {
	return postObj(baseUrl.openPregnant, params)
}
// 服务开单
export const openService = (params) => {
	return postObj(baseUrl.openService, params)
}
// 婚纱开单
export const openWeddingDress = (params) => {
	return postObj(baseUrl.openWeddingDress, params)
}
// 查看我的订单
export const getMyOrder = (params) => {
	return get(baseUrl.getMyOrder, params)
}
// 查看我部门的订单
export const getTeamOrder = (params) => {
	return get(baseUrl.getTeamOrder, params)
}
// 查看所有订单
export const getAllOrder = (params) => {
	return get(baseUrl.getAllOrder, params)
}