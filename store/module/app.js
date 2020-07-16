export default{
	namespaced: true,
	state:{
		// access_token值
		token:null,
	},
	getters:{
		token:state => state.token
	},
	mutations:{
		token(state,data){
			state.token = data
		}
	},
  actions: {
		setToken({ commit }, data){
			commit('token', data)
		},
  }
}