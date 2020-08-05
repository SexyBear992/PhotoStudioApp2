/*********

	接口调用 通用

**********/

import app from '@/store/module/app.js'
const request = (url, options) => {
	uni.showLoading({
	    title: '加载中',
			// 蒙板层
			mask:true,
	});
	return new Promise((resolve,reject)=>{
		uni.request({
			url:url,
			method:options.method,
			data:options.data,
			header: {
				'content-type': options.isObj ? 'application/json': 'application/x-www-form-urlencoded',
				'Authorization':'bearer '+ app.state.token,
				'CurrentShopId' : app.state.shopId
			},
			success :(res)=>{
				// uni.hideLoading();
				if(res.data.code !== 200){
					uni.showToast({
						title:res.data.message,
						icon:'none'
					})
					resolve(res)
				}else{
					uni.hideLoading();
					resolve(res)
				}
			},
			fail:(err)=>{
				// uni.hideLoading();
				uni.showToast({
					title:'请求接口失败'
				})
				reject(err)
			}
		})
	})
}
 
const get = (url, options = {}) => {
    return request(url, { method: 'GET', data: options })
}
 
//post对象
const postObj = (url, options) => {
    return request(url, { method: 'POST', data: options, isObj: true })
}
//post参数
const post = (url, options) => {
    return request(url, { method: 'POST', data: options, isObj: false })
}
 
const put = (url, options) => {
    return request(url, { method: 'PUT', data: options, isObj: true })
}
 
// 不能声明DELETE（关键字）
const remove = (url, options) => {
    return request(url, { method: 'DELETE', data: options })
}
 
module.exports = {
    get,
    post,
    put,
    remove,
    postObj,
}