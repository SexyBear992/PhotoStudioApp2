<script>
	import { getToken } from './util/api/login.js'
	import { mapGetters, mapActions } from 'vuex'
	export default {
		onLaunch: function() {
			this.getStorageTicket()
		},
		onShow: function() {

		},
		onHide: function() {

		},
		computed: {
			
		},
		methods: {
			...mapActions('app',[
				'setToken'
			]),
			
			// 获取本地缓存ticket
			getStorageTicket() {
				let that = this
				// 在本地缓存中获取ticket
				uni.getStorage({
					key: 'ticket',
					success: function(res) {
						let ticket = {
							grant_type: 'ticket',
							ticket: res.data
						}
						getToken(ticket).then(resquest => {
							if (resquest.data.code === 200) {
								// 将返回的token存入vuex中
								that.setToken(resquest.data.data.access_token)
								// 并跳转到首页
								uni.switchTab({
									url: '/pages/index/index'
								})
							}else{
								// 如果登录失败跳转入登录页
								uni.redirectTo({
									url:'/pages/login/login'
								})
							}
						})
					},
					fail: function(err) {
						uni.redirectTo({
							url:'/pages/login/login'
						})
					}
				})
			}
		}
	};
</script>

<style>

</style>
