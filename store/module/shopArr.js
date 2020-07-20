import { getAllShopQY, getCategoryList } from '@/util/api/shop.js'
export default{
	namespaced: true,
	state:{
		// 门店数组
		shopAllArr: [],
		// 订单分类 
		orderTypeArr: [],
		// 订单分组
		orderGroup: [],
		// 客户来源
		origin: [],
		// 客户区域
		category: [],
		// 服务等级
		serviceCategory: [],
		// 教师等级 
		teacherCategory: [],
		// 套系数组
		piceList: [],
	},
	getters:{
		get_shopAllArr: state => state.shopAllArr,
		get_orderTypeArr: state => state.orderTypeArr,
		get_orderGroup: state => state.orderGroup,
		get_origin: state => state.origin,
		get_category: state => state.category,
		get_serviceCategory: state => state.serviceCategory,
		get_teacherCategory: state => state.teacherCategory,
		get_piceList: state => state.piceList,
	},
	mutations:{
		mut_shopAllArr (state, data) {
			state.shopAllArr = data
		},
		mut_orderTypeArr (state, data) {
			state.orderTypeArr = data
		},
		mut_orderGroup (state, data) {
			state.orderGroup = data
		},
		mut_origin (state,data) {
			state.origin = data
		},
		mut_category (state,data) {
			state.category = data
		},
		mut_serviceCategory (state,data) {
			state.serviceCategory = data
		},
		mut_teacherCategory (state,data) {
			state.teacherCategory = data
		},
		mut_piceList (state,data) {
			state.piceList = data
		}
	},
	actions:{
		act_shopAllArr ({ commit }) {
			getAllShopQY().then(res => {
				// let shopIdMap = new Map(res.data.data.map(item => [item.shopId, item.shopName]))
				commit('mut_shopAllArr', res.data.data)
			})
		},
		act_orderTypeArr ({ commit }) {
			getCategoryList({type:'ORDER_TYPE'}).then(res => {
				commit('mut_orderTypeArr', res.data.data)
			})
		},
		act_orderGroup ({ commit }) {
			getCategoryList({type:'ORDER_GROUP'}).then(res => {
				// let shopIdMap = new Map(res.data.data.map(item => [item.shopId, item.shopName]))
				commit('mut_orderGroup', res.data.data)
			})
		},
		act_origin ({ commit }) {
			getCategoryList({type:'CUSTOMER_SOURCE'}).then(res => {
				commit('mut_origin', res.data.data)
			})
		},
		act_category ({ commit }) {
			getCategoryList({type:'CUSTOMER_REGION'}).then(res => {
				commit('mut_category', res.data.data)
			})
		},
		act_serviceCategory ({ commit }) {
			getCategoryList({type:'PACKAGE_SERVICE'}).then(res => {
				commit('mut_serviceCategory', res.data.data)
			})
		},
		act_teacherCategory ({ commit }) {
			getCategoryList({type:'PACKAGE_TEACHER'}).then(res => {
				commit('mut_teacherCategory', res.data.data)
			})
		},
		act_piceList ({ commit }) {
			getCategoryList({type:'PACKAGE'}).then(res => {
				commit('mut_piceList', res.data.data)
			})
		},
		
	}
}