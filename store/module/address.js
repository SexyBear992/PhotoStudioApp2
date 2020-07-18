export default{
	namespaced: true,
	state:{
		// 接单人员
		RECEPTION:null,
		// 客服人员
		SERVICE:null,
		// 网销人员
		NETWORK_SALES:null,
	},
	getters:{
		get_RECEPTION : state =>state.RECEPTION,
		get_SERVICE : state =>state.SERVICE,
		get_NETWORK_SALES : state =>state.NETWORK_SALES,
	},
	mutations:{
		mut_RECEPTION (state,data){
			state.RECEPTION = data
		},
		mut_SERVICE (state,data){
			state.SERVICE = data
		},
		mut_NETWORK_SALES (state,data){
			state.NETWORK_SALES = data
		},
	},
	actions:{
		act_RECEPTION ({ commit }, data) {
			commit('mut_RECEPTION', data)
		},
		act_SERVICE ({ commit }, data) {
			commit('mut_SERVICE', data)
		},
		act_NETWORK_SALES ({ commit }, data) {
			commit('mut_NETWORK_SALES', data)
		},
	}
}