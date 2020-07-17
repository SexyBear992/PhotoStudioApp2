/******
	获取ticket值
*******/


let ticketUrl = 'https://api.27yn.cn/sso/v1/ticket/login'
export const getTicket = (options) => {
	uni.showLoading({
	    title: '加载中',
	});
	return new Promise((resolve,reject)=>{
		uni.request({
			url:ticketUrl,
			method:'POST',
			data:options,
			header: {
				'content-type': 'application/json',
			},
			success :(res)=>{
				uni.hideLoading();
				if(res.data.code === 500){
					uni.showToast({
						title:'请输入账号或者密码',
						icon:'none',
						duration:2000
					})
				}else if(res.data.code === 3101){
					uni.showToast({
						title:'请输入验证码',
						icon:'none'
					})
				}else if(res.data.code !== 1000){
					uni.showToast({
						title:res.data.msg,
						icon:'none',
						duration:2000
					})
				}else{
					resolve(res)
				}
			},
			fail:(err)=>{
				uni.showToast({
					title:'请求接口失败'
				})
				reject(err)
			}
		})
	})
}