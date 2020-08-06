import baseUrl from './index.js'
import { get, post, put, remove, postObj, } from './methos.js'


// 通过手机号查找客户组
export const getCustomerMobileList = (params) => {
	return get(baseUrl.getCustomerMobileList, params)
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
// 下属订单
export const getSubordinatesOrder = (params) => {
	return get(baseUrl.getSubordinatesOrder, params)
}
// 查看我部门的订单
export const getTeamOrder = (params) => {
	return get(baseUrl.getTeamOrder, params)
}
// 查看所有订单
export const getAllOrder = (params) => {
	return get(baseUrl.getAllOrder, params)
}

// 订单详情
export const getOrderDetails = (params) => {
	return get(baseUrl.getOrderDetails, params)
}
// 子订单包
export const getOrderItem = (params) => {
	return get(baseUrl.getOrderItem, params)
}

// 更新-订单信息
export const updataOrderInfo = (params) => {
	return put(baseUrl.updataOrderInfo, params)
}
// 更新-客户组来源信息
export const updataSource = (params) => {
	return put(baseUrl.updataSource, params)
}
// 更新-客户组区域信息
export const updataArea = (params) => {
	return put(baseUrl.updataArea, params)
}
//更新-订单套系信息
export const updataSystem = (params) => {
	return put(baseUrl.updataSystem, params)
}
//更新-子订单信息
export const updataItemInfo = (params) => {
	return put(baseUrl.updataItemInfo, params)
}
//更新-订单人员
export const updataActor = (params) => {
	return put(baseUrl.updataActor, params)
}
//更新-客户组人员
export const updataPersonnel = (params) => {
	return put(baseUrl.updataPersonnel, params)
}

//删除-子订单商品
export const deletOrderGoods = (params) => {
	return remove(baseUrl.deletOrderGoods, params)
}
//删除-子订单服装
export const deletOrderDress = (params) => {
	return remove(baseUrl.deletOrderDress, params)
}
//删除-子订单景点
export const deletOrderPlace = (params) => {
	return remove(baseUrl.deletOrderPlace, params)
}
//删除-子订单服务
export const deletOrderService = (params) => {
	return remove(baseUrl.deletOrderService, params)
}
// 新增-子订单商品
export const addOrderGoods = (params) => {
	return postObj(baseUrl.addOrderGoods, params)
}
// 新增-子订单服装
export const addOrderDress = (params) => {
	return postObj(baseUrl.addOrderDress, params)
}
// 新增-子订单服务
export const addOrderService = (params) => {
	return postObj(baseUrl.addOrderService, params)
}
// 新增-子订单景点
export const addOrderPlace = (params) => {
	return postObj(baseUrl.addOrderPlace, params)
}
// 更新-子订单商品
export const updataOrderGoods = (params) => {
	return put(baseUrl.updataOrderGoods, params)
}
// 更新-子订单服装
export const updataOrderDress = (params) => {
	return put(baseUrl.updataOrderDress, params)
}
// 更新-子订单景点
export const updataOrderPlace = (params) => {
	return put(baseUrl.updataOrderPlace, params)
}	
// 更新-子订单服务
export const updataOrderService = (params) => {
	return put(baseUrl.updataOrderService, params)
}

//查找-所有订单子订单
export const getAllOrderItem = (params) => {
	return get(baseUrl.getAllOrderItem, params)
}
// 查找-预约拍照列表
export const getOrdetItemList = (params) => {
	return get(baseUrl.getOrdetItemList, params)
}
// 查找-预约日历
export const getCalendar =  (params) => {
	return postObj(baseUrl.getCalendar, params)
}
// 新增-拍照记录
export const addPhotoInfo = (params) => {
	return postObj(baseUrl.addPhotoInfo, params)
}
// 删除-拍照记录
export const deletPhotoInfo = (params) => {
	return remove(baseUrl.deletPhotoInfo, params)
}
	