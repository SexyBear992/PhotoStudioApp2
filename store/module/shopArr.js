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
	},
	getters:{
		get_shopAllArr: state => state.shopAllArr,
		get_orderTypeArr: state => state.orderTypeArr,
		get_orderGroup: state => state.orderGroup,
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
	}
}