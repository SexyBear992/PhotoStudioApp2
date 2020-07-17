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
		methods: {
			...mapActions('app',[
				'setToken',
				'getUserInfo'
			]),
			...mapActions('shopArr',[
				'act_shopAllArr'
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
						// uni.redirectTo({
						// 	url:'/pages/login/login'
						// })
					}
				})
			},
		},
		watch:{
			// 获得ticket请求token
			ticket:{
				deep:true,
				handler(val){
					this.getToken(val)
				}
			},
			// 获取token 请求商店
			token(){
				this.act_shopAllArr()
			}
		}
	};
</script>

<style>

</style>
