/******
	获取ticket值
*******/

const { $Message } = require('@/wxcomponents/base/index');
// https://api.lyfz.net/sso/v1/ticket/login 线上
// https://api.27yn.cn/sso/v1/ticket/login 线下
let ticketUrl = 'https://api.27yn.cn/sso/v1/ticket/login'
export const getTicket = (options) => {
	uni.showLoading({
	    title: '加载中',
			mask:true
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
					$Message({
						content: '请输入账号或者密码',
						type: 'warning'
					});
				}else if(res.data.code === 3101){
					$Message({
						content: '请输入验证码',
						type: 'warning'
					});
				}else if(res.data.code !== 1000){
					$Message({
						content: res.data.msg,
						type: 'error'
					});
				}else{
					resolve(res)
				}
			},
			fail:(err)=>{
				uni.hideLoading();
				$Message({
					content: '请求接口失败',
					type: 'error'
				});
				reject(err)
			}
		})
	})
}