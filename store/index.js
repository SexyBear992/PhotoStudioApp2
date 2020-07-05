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
		// 订单介绍人
		references:'介绍人',
		// 介绍人电话
		sourcePhone:'介绍人电话',
		// 子订单增加List
		addList:'addList'
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
		addList(state){
			return state.addList
		},
		references(state){
			return state.references
		},
		sourcePhone(state){
			return state.sourcePhone
		}
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
		addList(state,i){
			return state.addList = i
		},
		references(state,i){
			return state.references = i
		},
		sourcePhone(state,i){
			return state.sourcePhone = i
		}
	}
})