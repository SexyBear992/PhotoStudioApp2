<script>
	import { getToken } from './util/api/user.js'
	import { mapGetters, mapActions } from 'vuex'
	export default {
		onLaunch: function() {
			this.getStorageTicket()
		},
		onShow: function() {

		},
		onHide: function() {

		},
		data() {
			return {
				ticket:{
					grant_type: 'ticket',
					ticket:null
				}
			};
		},
		computed: {
			...mapGetters('app',[
				'token',
			])
		},
		mounted(){
			// this.act_shopAllArr()
			// this.act_orderTypeArr()
			// this.act_orderGroup()
			// this.act_origin()
			// this.act_category()
			// this.act_serviceCategory()
			// this.act_teacherCategory()
			// this.act_piceList()
			// this.setToken('bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZWZhdWx0U2hvcElkIjoxNCwic2NvcGUiOlsiYWxsIl0sIm5hbWUiOiJhZG1pbiIsImFub3RoZXJOYW1lIjoi6LaF57qn566h55CG5ZGYIiwiZW50ZXJwcmlzZUlkIjo0NCwiZXhwIjoxNTk1NTc2NjU5LCJ1c2VySWQiOjcsImpvYk51bWJlciI6IjAwMSIsImp0aSI6ImYwODQ1ZGUzLTJiY2QtNDE0Yi04ZThkLWUyZDA2ZjZkYTczMCIsImNsaWVudF9pZCI6IlMzMDI4MSIsInVzZXJuYW1lIjoiYWRtaW4ifQ.yByQRAkKGWgskUewLg1ChWBo-ZMf0f4X8d-N2Tq5M4I')
		},
		methods: {
			...mapActions('app',[
				'setToken',
				'getUserInfo'
			]),
			...mapActions('shopArr',[
				'act_shopAllArr',
				'act_orderTypeArr',
				'act_orderGroup',
				'act_origin',
				'act_category',
				'act_serviceCategory',
				'act_teacherCategory',
				'act_piceList'
			]),
			// 获取本地缓存ticket
			getStorageTicket() {
				let that = this
				// 在本地缓存中获取ticket
				uni.getStorage({
					key: 'ticket',
					success: function(res) {
						that.ticket.ticket = res.data
					},
					fail: function(err) {
						uni.redirectTo({
							url:'/pages/login/login'
						})
					}
				})
			},
			// 获取token，并且存入vuex

			// 测试屏蔽
			getToken(ticket){
				getToken(ticket).then(res =>{
					if (res.data.code === 200) {
						// 将返回的token存入vuex中
						this.setToken(res.data.data.access_token)
						// 并跳转到首页
						// uni.switchTab({
						// 	url: '/pages/index/index'
						// })
					}else{
						// 如果登录失败跳转入登录页
						// setTimeout(()=>{
						// 	uni.redirectTo({
						// 		url:'/pages/login/login'
						// 	})
						// },2000)
					}
				})
			},
		},
		watch:{
			// 获得ticket请求token
			ticket:{
				deep:true,
				handler(val){
					// this.getToken(val)
					this.setToken(`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZWZhdWx0U2hvcElkIjoxNCwic2NvcGUiOlsiYWxsIl0sIm5hbWUiOiJhZG1pbiIsImFub3RoZXJOYW1lIjoi6LaF57qn566h55CG5ZGYIiwiZW50ZXJwcmlzZUlkIjo0NCwiZXhwIjoxNTk1NTc2ODg0LCJ1c2VySWQiOjcsImpvYk51bWJlciI6IjAwMSIsImp0aSI6ImJhMTAzMmQ1LTVmNGYtNGE1OS05NDk1LTQ3NjViYjU1NzkwZSIsImNsaWVudF9pZCI6IlMzMDI4MSIsInVzZXJuYW1lIjoiYWRtaW4ifQ.YgmoorLhDamPCq8I4Ro_ePkHFxOZi4bXKYHxxGlwlAs`)
				}
			},
			// 获取token 请求商店
			token(){
				this.act_shopAllArr()
				this.act_orderTypeArr()
				this.act_orderGroup()
				this.act_origin()
				this.act_category()
				this.act_serviceCategory()
				this.act_teacherCategory()
				this.act_piceList()
			}
		}
	};
</script>

<style>

</style>
