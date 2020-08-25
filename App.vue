<script>
	import { getAuthorization } from '@/util/api/user.js'
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

			};
		},
		computed: {
			...mapGetters('app',[
				'get_ticket',
				'get_userInfo'
			])
		},
		mounted(){
		},
		methods: {
			...mapActions('app',[
				'act_ticket',
				'act_userInfo'
			]),
			...mapActions('shopArr',[
				'act_shopAllArr',
				'act_orderTypeArr',
				'act_orderGroup',
				'act_origin',
				'act_category',
				'act_serviceCategory',
				'act_teacherCategory',
				'act_piceList',
				'act_schedule',
				'act_consumeType',
				'act_pay',
				'act_receipt',
				'act_spending'
			]),
			// 获取本地缓存ticket
			getStorageTicket() {
				let that = this
				// 在本地缓存中获取ticket
				uni.getStorage({
					key: 'ticket',
					success: function(res) {
						that.act_ticket(res.data)
					},
					fail: function(err) {
						uni.redirectTo({
							url:'/pages/login/login'
						})
					}
				})
			},
		
			// 获取员工信息
			getAuthorization(){
				getAuthorization().then(res=>{
					// console.log('员工信息',res.data.data)
					this.act_userInfo(res.data.data)
				})
			}
		},
		watch:{
			get_ticket(){
				this.getAuthorization()
				
			},
			get_userInfo(){
				this.act_shopAllArr()
				this.act_orderTypeArr()
				this.act_orderGroup()
				this.act_origin()
				this.act_category()
				this.act_serviceCategory()
				this.act_teacherCategory()
				this.act_piceList()
				this.act_schedule()
				this.act_consumeType()
				this.act_pay()
				this.act_receipt()
				this.act_spending()
				// uni.switchTab({
				// 	url:'/pages/index/index'
				// })
			}
		}
	};
</script>

<style>

</style>
