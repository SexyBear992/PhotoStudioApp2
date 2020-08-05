 // http://192.168.5.220.dev  napi.lyfz.net/pro
	let test = true
	let base_dress = test ? 'http://192.168.5.220/pro/api/dress' : 'https://napi.lyfz.net/proapi/dress'
  let base_message = test ?  'http://192.168.5.220/dev/api/message' : 'https://napi.lyfz.net/pro/api/message'
  let base_user = test ?  'http://192.168.5.220/dev/api/account' : 'https://napi.lyfz.net/pro/api/account'
  let base_goods = test ?  'http://192.168.5.220/dev/api/goods' : 'https://napi.lyfz.net/pro/api/goods'
  let base_common = test ?  'http://192.168.5.220/dev/api/base' : 'https://napi.lyfz.net/pro/api/base'
  let base_store = test ?  'http://192.168.5.220/dev/api/store' : 'https://napi.lyfz.net/pro/api/store'
  let base_auth = test ? 'http://192.168.5.220/dev/api/auth' : 'https://napi.lyfz.net/pro/api/auth'
	
let baseUrl = {
	getToken: `${base_auth}/oauth/token` ,// post 获取token
	getUserInfo: `${base_user}/account/list/shopIds`, // get 获得用户信息
	getAccountAllArr: `${base_user}/account/getEnterpriseAll`, // 查找-全部员工

	
	getAllShopQY: `${base_common}/shop/list/shopNameVo`, // 查找-所有门店
	getCategoryList: `${base_common}/category/list/`, // get     根据类型Type获取所有类别
	
	getSystemNameList: `${base_goods}/assembly/getAssemblyName`, // 获取套系名称列表
  getSystemDetail:`${base_goods}/assembly/detail`,  // 获取套系详情
	getCallName:`${base_goods}/callName/list/basis`,  // 获得昵称
  getOrderAssembly: `${base_goods}/assembly/detail`, // 开单 获得套系详情
	getGoodsToolList: `${base_goods}/goods/toolList`, // 获取商店工具箱
	getPlaceToolList: `${base_goods}/place/toolList`, // 获取景点工具箱
	getServicesToolList: `${base_goods}/services/toolList`, // 获取服务工具箱
	getDressInfoToolList: `${base_goods}/dressInfo/toolList`, // 获取服装工具箱
	getGiftName: `${base_goods}/gift/getGiftName`, // 获取礼包名称
	getGiftDetail: `${base_goods}/gift/detail`, // 获取礼包详情
	
	getCustomerMobileList: `${base_store}/customer/list/customerGroupPersonnelVo`, // 查找-通过手机查找客户组人员
	
	openWedding: `${base_store}/order/add/Wedding`, // 新增-婚庆开单
	openBaby: `${base_store}/order/add/baby`, // 新增-儿童开单
	openPortray: `${base_store}/order/add/portray`, // 新增-写真开单
	openPregnant: `${base_store}/order/add/pregnant`, // 新增-孕妈开单
	openService: `${base_store}/order/add/service`, // 新增-服务开单
	openWeddingDress: `${base_store}/order/add/weddingDress`, // 新增-婚纱开单

	getMyOrder: `${base_store}/orderList/page/myOrder` ,// 查找-我的订单
	getTeamOrder: `${base_store}/orderList/page/myDepartmentOrder`, //查找-我部门的订单
	getAllOrder: `${base_store}/orderList/page/allOrder`, //查找-所有订单
	getSubordinatesOrder: `${base_store}/orderList/page/myDepartmentSubordinateOrder`, //查找-我部门下属的订单
	
	getOrderDetails: `${base_store}/order/details`,// 订单详情
	getOrderItem: `${base_store}/order/item/find/orderItemPackageVo` ,//查询-子订单包
	
	updataOrderInfo: `${base_store}/order/update/orderInfoDto`,// 更新-订单信息
	updataSource: `${base_store}/customer/update/customerGroupSource`, //更新-客户组来源信息
	updataArea: `${base_store}/customer/update/customerGroupCategory`, //更新-客户组区域信息
	updataSystem: `${base_store}/order/update/orderAssemblyDto` ,//更新-订单套系信息
	updataItemInfo: `${base_store}/order/item/update/orderItemInfo`, //更新-子订单信息
	updataActor: `${base_store}/order/update/orderActor`, //更新-订单人员
	updataPersonnel: `${base_store}/customer/update/customerGroupPersonnel`, //更新-客户组人员
	
	deletOrderGoods: `${base_store}/order/item/goods/delete`,//删除-子订单商品
	deletOrderDress: `${base_store}/order/item/dress/delete`,//删除-子订单服装
	deletOrderPlace: `${base_store}/order/item/place/delete`,// 删除-子订单景点
	deletOrderService: `${base_store}/order/item/service/delete`,// 删除-子订单服务
	
	addOrderGoods: `${base_store}/order/item/goods/add`, //新增-子订单商品
	addOrderDress: `${base_store}/order/item/dress/add`,// 新增-子订单服装
	addOrderPlace: `${base_store}/order/item/place/add`,// 新增-子订单景点
	addOrderService: `${base_store}/order/item/service/add`, //新增-子订单服务
	
	updataOrderGoods: `${base_store}/order/item/goods/update`,// 更新-子订单商品
	updataOrderDress: `${base_store}/order/item/dress/update`,// 更新-子订单服装
	updataOrderPlace: `${base_store}/order/item/place/update`,// 更新-子订单景点
	updataOrderService: `${base_store}/order/item/service/update`,// 更新-子订单服务
	
	// 摄控
	getAllOrderItem: `${base_store}/orderList/page/allOrderItem` ,//查找-所有订单子订单
	getOrdetItemList: `${base_store}/order/item/process/photo/reservation/list`, // 查找-预约拍照列表
	deletPhotoInfo: `${base_store}/order/item/process/photo/delete`// 删除-拍照记录
}

export default baseUrl
