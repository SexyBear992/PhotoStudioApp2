import { getAllShopQY, getToken } from '@/util/api/user.js'
export default{
	namespaced: true,
	state:{
		// 门店数组
		shopAllArr: []
	},
	getters:{
		get_shopAllArr: state => state.shopAllArr
	},
	mutations:{
		mut_shopAllArr (state, data) {
			state.shopAllArr = data
		}
	},
	actions:{
		act_shopAllArr ({ commit }) {
			getAllShopQY().then(res => {
				// let shopIdMap = new Map(res.data.data.map(item => [item.shopId, item.shopName]))
				commit('mut_shopAllArr', res.data.data)
			})
		}
	}
}