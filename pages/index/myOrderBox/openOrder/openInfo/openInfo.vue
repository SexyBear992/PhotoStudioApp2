<template>
	<view>
		<!-- 开单信息模块 -->
		<InfoModule ref="Info"></InfoModule>
		
		<!-- 客户来源模板 -->
		<sourceModule ref="source"></sourceModule>
		
		<!-- 客户信息 -->
		<userInfoModule ref="userInfo" :type="type"></userInfoModule>
		
		<!-- 客户联系人信息 -->
		<contactInfoModule ref="contactInfo" :type="type"></contactInfoModule>
		
		<!-- 订单套系内容 -->
		<orderPriceModule ref="orderPrice":type="type"></orderPriceModule>
		
		<button type="default" @click="save">保存订单</button>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	import InfoModule from './components/InfoModule.vue'
	import sourceModule from './components/sourceModule.vue'
	import userInfoModule from './components/userInfoModule.vue'
	import contactInfoModule from './components/contactInfoModule.vue'
	import orderPriceModule from './components/orderPriceModule.vue'
	export default {	
		components:{
			InfoModule,
			sourceModule,
			userInfoModule,
			contactInfoModule,
			orderPriceModule
		},
		computed:{
			...mapGetters('app',[
				'shopId'
			]),
		},
		data() {
			return {
				// 订单类型
				type:null,
				openOrderData:{
					// 订单号
					orderNo:null,
					// 是否自动生产订单号
					autoOrderNo:false,
					// 当前商店ID
					shopId:null,
					// 选择商店ID
					orderShopId:null,
					// 订单分组ID
					groupCategoryId:null,
					// 订单分类ID
					orderCategoryId:null,
					// 下单时间
					orderTime:null,
					// 风格
					likeStyle:null,
					// 备注
					remark:null,
					// 客户组信息
					customerGroup:{
						// 客户来源ID
						originId:null,
						// 介绍人
						referrerName:null,
						// 介绍人手机号码
						referrerMobile:null,
						// 客户区域
						categoryId:null,
					},
					// 订单类型时间
					typeTime:null,
					// 	订单类型时间是否农历
					typeLunar:null,
					// 时间为农历传
					typeStr:null,
					// 服务等级
					serviceCategoryId:null,
					// 老师级别
					teacherCategoryId:null,
					// 套系类别ID
					assemblyCategoryId:null,
					// 套系ID
					assemblyId:null,
					// 套系名称
					assemblyName:null,
					// 套系价格
					assemblyPrice:null
				}
			};
		},
		onLoad(option){
			this.type = option.type
			// 赋值小程序标题
			uni.setNavigationBarTitle({
				title: option.typeName
			});
		},
		mounted(){
			// 赋值当前门店ID
			this.openOrderData.shopId = this.shopId
		},
		methods:{
			// 保存订单
			save(){
				// 开单信息
				let Info = this.$refs.Info.save()
				// 客户联系人信息
				let contactInfo = this.$refs.contactInfo.save()
				// 客户来源
				let source = this.$refs.source.save()
				// 客户信息
				let userInfo = this.$refs.userInfo.save()
				// 订单套系内容
				let orderPrice =this.$refs.orderPrice.save()
				// 选择套系内容
				let orderItem = this.$refs.orderPrice.saveOrderItem()
				// 礼包内容
				let addGift = this.$refs.orderPrice.saveAddGiftInfo()
				
				// console.log('Info',Info)
				// console.log('contactInfo',contactInfo)
				// console.log('source',source)
				// console.log('userInfo',userInfo)
				// console.log('orderPrice',orderPrice)
				console.log('选择套系内容',orderItem)
				console.log('礼包内容',addGift)
				// console.log(this.openOrderData)
			},
			
		},
		watch:{
			shopId(){
				// 赋值当前门店ID
				this.openOrderData.shopId = this.shopId
			}
		}
	}
</script>

<style lang="scss">

</style>
