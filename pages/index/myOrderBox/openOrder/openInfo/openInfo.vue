<template>
	<view>
		<!-- 开单信息模块 -->
		<InfoModule @InfoModuleValue="InfoModuleValue"></InfoModule>
		
		<!-- 客户来源模板 -->
		<sourceModule @sourceModuleValue="sourceModuleValue"></sourceModule>
		
		<!-- 客户信息 -->
		<userInfoModule @userInfoValue="userInfoValue" :type="type"></userInfoModule>
		
		<!-- 客户联系人信息 -->
		<contactInfoModule :type="type"></contactInfoModule>
		
		<!-- 订单套系内容 -->
		<orderPriceModule @orderPriceValue="orderPriceValue" :type="type"></orderPriceModule>
		
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
				console.log(this.openOrderData)
			},
			
			/***************************************  组件回值 ********************************************/ 
			
			// 组件传值 选择结果 开单信息
			InfoModuleValue(e){
				this.openOrderData.orderShopId = e.orderShopId
				this.openOrderData.groupCategoryId = e.groupCategoryId
				this.openOrderData.orderCategoryId = e.orderCategoryId
				this.openOrderData.orderTime = e.orderTime
				this.openOrderData.likeStyle = e.likeStyle
				this.openOrderData.remark = e.remark
			},
			// 组件传值 选择结果 客户来源
			sourceModuleValue(e){
				this.openOrderData.customerGroup.originId = e.originId
				this.openOrderData.customerGroup.referrerName = e.referrerName
				this.openOrderData.customerGroup.referrerMobile = e.referrerMobile
			},
			// 组件传值 选择结果 客户信息
			userInfoValue(e){
				this.openOrderData.customerGroup.categoryId = e.categoryId
				this.openOrderData.typeTime = e.typeTime
				this.openOrderData.typeLunar = e.typeLunar
				this.openOrderData.typeStr = e.typeStr
			},
			
			// 组件传值 选择结果 订单套系内容
			orderPriceValue(e){
				this.openOrderData.serviceCategoryId = e.serviceCategoryId
				this.openOrderData.teacherCategoryId = e.teacherCategoryId
			}
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
