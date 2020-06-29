import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default  new Vuex.Store({
	state:{
		// 接单
		pickOrder:'张三/李四/王五',
		// 客服
		CustomerService:'张六/李七/王八',
		// 网销
		NetSales:'张九/李十/王十一',
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