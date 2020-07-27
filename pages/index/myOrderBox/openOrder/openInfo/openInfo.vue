<template>
	<view>
		<!-- 开单信息模块 -->
		<InfoModule ref="Info"></InfoModule>
		
		<!-- 客户来源模板 -->
		<sourceModule ref="source"></sourceModule>
		
		<!-- 客户信息 -->
		<userInfoModule ref="userInfo" :type="type"></userInfoModule>
		
		<!-- 宝宝信息 -->
		<baby ref="baby" v-if="babyShow" :type="type"></baby>
		
		<!-- 客户联系人信息 -->
		<contactInfoModule ref="contactInfo" :type="type"></contactInfoModule>
		
		<!-- 订单套系内容 -->
		<orderPriceModule ref="orderPrice":type="type"></orderPriceModule>
		
		<view class="save" @click="saveBut">保存订单</view>
		<view class="botBox"></view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	import InfoModule from './components/InfoModule.vue'
	import sourceModule from './components/sourceModule.vue'
	import userInfoModule from './components/userInfoModule.vue'
	import contactInfoModule from './components/contactInfoModule.vue'
	import orderPriceModule from './components/orderPriceModule.vue'
	import baby from './components/babyModule.vue'
	export default {	
		components:{
			InfoModule,
			sourceModule,
			userInfoModule,
			contactInfoModule,
			orderPriceModule,
			baby
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
				// 是否显示宝宝信息
				babyShow:false,
				openOrderData:{
					// // 订单号
					// orderNo:null,
					// // 是否自动生产订单号
					// autoOrderNo:false,
					// // 当前商店ID
					// shopId:null,
					// // 选择商店ID
					// orderShopId:null,
					// // 订单分组ID
					// groupCategoryId:null,
					// // 订单分类ID
					// orderCategoryId:null,
					// // 下单时间
					// orderTime:null,
					// // 风格
					// likeStyle:null,
					// // 备注
					// remark:null,
					// // 客户组信息
					// customerGroup:{
					// 	// 客户来源ID
					// 	originId:null,
					// 	// 介绍人
					// 	referrerName:null,
					// 	// 介绍人手机号码
					// 	referrerMobile:null,
					// 	// 客户区域
					// 	categoryId:null,
					// },
					// // 订单类型时间
					// typeTime:null,
					// // 	订单类型时间是否农历
					// typeLunar:null,
					// // 时间为农历传
					// typeStr:null,
					// // 服务等级
					// serviceCategoryId:null,
					// // 老师级别
					// teacherCategoryId:null,
					// // 套系类别ID
					// assemblyCategoryId:null,
					// // 套系ID
					// assemblyId:null,
					// // 套系名称
					// assemblyName:null,
					// // 套系价格
					// assemblyPrice:null
				}
			};
		},
		onLoad(option){
			this.type = option.type
			// 赋值小程序标题
			uni.setNavigationBarTitle({
				title: option.typeName
			});
			if(option.type === 'BABY'){
				this.babyShow = true
			}else{
				this.babyShow = false
			}
		},
		mounted(){
			// 赋值当前门店ID
			this.openOrderData.shopId = this.shopId
		
		},
		methods:{
			// 保存订单
			saveBut(){
				let data = this.openOrderData
				data.customerGroup = {}
				// 如果不是生成订单号且订单号为空
				let canSave = true
				// 开单信息
				let Info = this.$refs.Info.save()
				// 客户来源
				let source = this.$refs.source.save()
				// 客户信息
				let userInfo = this.$refs.userInfo.save()
				// 宝宝信息
				if(this.babyShow){
					var baby = this.$refs.baby.save()
				}
				// 客户联系人信息
				let contactInfo = this.$refs.contactInfo.save()	
				// 订单套系内容
				let orderPrice =this.$refs.orderPrice.save()
				
				// // 选择套系内容
				// let orderItem = this.$refs.orderPrice.saveOrderItem()
				// // 礼包内容
				// let addGift = this.$refs.orderPrice.saveAddGiftInfo()
				
								
				// console.log('选择套系内容',orderItem)
				// console.log('礼包内容',addGift)
				
				/********************************  订单套系内容  *********************************/
				console.log('orderPrice',orderPrice)
				data.serviceCategoryId = orderPrice.serviceCategoryId
				data.teacherCategoryId = orderPrice.teacherCategoryId
				data.assemblyCategoryId = orderPrice.assemblyCategoryId
				data.assemblyId = orderPrice.assemblyId
				data.assemblyName = orderPrice.assemblyName
				data.assemblyPrice = orderPrice.assemblyPrice
				
				if(data.assemblyName === null){
					uni.showToast({
						title:'请选择套系',
						icon:'none'
					},2000)
				}
s				
				/*******************************  客户联系人信息  ********************************/
				data.customerGroup.newCustomerContactDtos = []
				data.customerGroup.oldCustomerContactDtos = []
				if(contactInfo[0].name === null){
						uni.showToast({
							title:'客户联系人姓名不能为空',
							icon:'none'
						})
				}else if(contactInfo[0].mobile === null){
					uni.showToast({
						title:'客户联系人电话不能为空',
						icon:'none'
					})
				}
				contactInfo.forEach((i)=>{
					if(i.id){
						i.dataStatus = 'UPDATE'
						data.customerGroup.oldCustomerContactDtos.push(i)
					}else{
						data.customerGroup.newCustomerContactDtos.push(i)
					}
				})

				
				/**********************************  宝宝信息  ***********************************/
				if(this.babyShow){
					data.customerGroup.newCustomerBabyDtos = []
					baby.forEach((i)=>{
						data.customerGroup.newCustomerBabyDtos.push(i)
					})
				}
				
				/**********************************  客户信息  ***********************************/
				data.customerGroup.categoryId = userInfo.categoryId
				data.typeLunar = userInfo.typeLunar
				data.typeStr = userInfo.typeStr
				data.typeTime = userInfo.typeTime	
				
				/**********************************  客户来源  ***********************************/
				data.customerGroup.originId = source.originId
				if(data.customerGroup.originId === null){
					uni.showToast({
						title:'客户来源不能为空',
						icon:'none'
					},2000)
				}
				data.customerGroup.referrerMobile = source.referrerMobile
				data.customerGroup.referrerName = source.referrerName
				
				/**********************************  开单信息处理  ***********************************/ 
				if(Info.receptions.length <= 0){
					uni.showToast({
						title:'接单人员不能为空',
						icon:'none'
					},2000)
					data.receptions = Info.receptions
				}else{
					data.receptions = Info.receptions
				}
				data.autoOrderNo = Info.autoOrderNo
				data.groupCategoryId = Info.groupCategoryId
				data.likeStyle = Info.likeStyle
				if(Info.networkSales.length > 0){
					data.networkSales = Info.networkSales
				}else{
					data.networkSales = null
				}
				data.orderCategoryId = Info.orderCategoryId
				if(data.autoOrderNo === false && Info.orderNo === null){
					canSave = false
					uni.showToast({
						title:'请输入订单号',
						icon:'none'
					},2000)
				}else{
					canSave = true
					data.orderNo = Info.orderNo
				}
				data.orderShopId = Info.orderShopId
				data.orderTime = Info.orderTime
				if(Info.services.length > 0){
					data.services = Info.services
				}else{
					data.services = null
				}
				data.remark = Info.remark
				

				if(
					data.receptions.length > 0 && 
					canSave && 
					data.customerGroup.originId !== null && 
					contactInfo[0].mobile !== null && 
					contactInfo[0].name !== null
				){
					console.log(this.openOrderData)
				}
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
	.save{
		position: fixed;
		bottom: 30rpx;
		width: 500rpx;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 40rpx;
		text-align: center;
		background-color: #61a3ff;
		color: #FFFFFF;
		margin-left: 50%;
		transform: translateX(-50%);
		z-index: 2;
	}
	.botBox{
		height: 140rpx;
	}
</style>
