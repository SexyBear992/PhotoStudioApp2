import base64url from 'base64url'
export default{
	namespaced: true,
	state:{
		// access_tokenֵ值
		token:null,
		// token解析参数
		tokenParsing:null,
		// 商店ID
		shopId:null
	},
	getters:{
		token:state => state.token,
		shopId:state => state.shopId
	},
	mutations:{
		token(state,data){
			state.token = data
		},
		tokenParsing(state,data){
			state.shopId = data.defaultShopId
		}
	},
  actions: {
		setToken({ commit }, data){
			let userInfo = JSON.parse(base64url.toBuffer(data.split('.')[1], 'utf8'))
			commit('token', data)
			commit('tokenParsing', userInfo)
		},
  }
}