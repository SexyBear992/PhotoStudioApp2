  let base_dress = 'http://192.168.5.220/pro/api/dress'
  let base_message = 'http://192.168.5.220/dev/api/message'
  let base_user = 'http://192.168.5.220/dev/api/account'
  let base_goods = 'http://192.168.5.220/dev/api/goods'
  let base_common = 'http://192.168.5.220/dev/api/base'
  let base_store = 'http://192.168.5.220/dev/api/store'
  let base_auth = 'http://192.168.5.220/dev/api/auth'
	
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

	
	getCustomerMobileList: `${base_store}/customer/list/customerGroupPersonnelVo`, // 查找-通过手机查找客户组人员

}

export default baseUrl
