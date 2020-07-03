import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default  new Vuex.Store({
	state:{
		// 接单
		pickOrder:'接单人员',
		// 客服
		CustomerService:'专服人员',
		// 网销
		NetSales:'网销人员',
	},
	getters:{
		pickOrder(state){
			return state.pickOrder
		},
		CustomerService(state){
			return state.CustomerService
		},
		NetSales(state){
			return state.NetSales
		},
	},
	mutations:{
		pickOrder(state,i){
			return state.pickOrder = i
		},
		CustomerService(state,i){
			return state.CustomerService = i
		},
		NetSales(state,i){
			return state.NetSales = i
		},
	}
})