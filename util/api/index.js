const baseApi = process.env.NODE_ENV === 'production' ? 'https://erpapi.lyfz.net:9443/pro/api' : 'http://192.168.5.220/test/api'


// 登录测试

let base_user = 'http://192.168.5.220/dev/api/account'
let base_auth = 'http://192.168.5.220/dev/api/auth' // 登录

let baseUrl = {
	getToken: `${base_auth}/oauth/token` // 登录
}

export default baseUrl
