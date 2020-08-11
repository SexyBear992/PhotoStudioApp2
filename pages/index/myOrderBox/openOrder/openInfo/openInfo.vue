<template>
	<view>
		<!-- 开单信息模块 -->
		<InfoModule ref="Info" :addressInfo="addressInfo"></InfoModule>
		
		<!-- 客户来源模板 -->
		<sourceModule ref="source"></sourceModule>
		
		<!-- 客户信息 -->
		<userInfoModule ref="userInfo" :type="type"></userInfoModule>
		
		<!-- 宝宝信息 -->
		<baby ref="baby" v-if="babyShow" :type="type"></baby>
		
		<!-- 客户联系人信息 -->
		<contactInfoModule ref="contactInfo" :type="type"></contactInfoModule>
		
		<!-- 订单套系内容 -->
		<orderPriceModule ref="orderPrice":type="type" :toolInfo="toolInfo" :giftInfo="giftInfo"></orderPriceModule>
		
		<view class="save" @click="saveBut">保存订单</view>
		<view class="botBox"></view>
		
		<i-message id="message" />
	</view>
</template>

<script>
	const { $Message } = require('@/wxcomponents/base/index.js');
	import { mapGetters } from 'vuex'
	import InfoModule from './components/InfoModule.vue'
	import sourceModule from './components/sourceModule.vue'
	import userInfoModule from './components/userInfoModule.vue'
	import contactInfoModule from './components/contactInfoModule.vue'
	import orderPriceModule from './components/orderPriceModule.vue'
	import baby from './components/babyModule.vue'
	import { openWedding, openBaby, openPortray, openPregnant, openService, openWeddingDress} from '@/util/api/shop.js'
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
				// 联系人
				addressInfo:null,
				// 工具箱
				toolInfo:null,
				// 礼包
				giftInfo:null,
				
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
		onShow(){
			let that = this;
			let pages = getCurrentPages();
			let currPage = pages[pages.length - 1]; //当前页面
			let address = currPage.data.address;
			let tool = currPage.data.tool;
			let gift = currPage.data.gift;
			this.addressInfo = address
			this.toolInfo = tool
			this.giftInfo = gift
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
				// 选择套系内容
				let orderItem = this.$refs.orderPrice.saveOrderItem()
				// // 礼包内容
				let addGift = this.$refs.orderPrice.saveAddGiftInfo()
				
								
				/********************************  选择礼包内容  *********************************/
				if(addGift){
					if(addGift.orderItemDressInfo){
						if(addGift.orderItemDressInfo.length <= 0){
							addGift.orderItemDressInfo = null
						}
					}
					if(addGift.orderItemGoods){
						if(addGift.orderItemGoods.length <= 0){
							addGift.orderItemGoods = null
						}
					}
					if(addGift.orderItemPlace){
						if(addGift.orderItemPlace.length <= 0){
							addGift.orderItemPlace = null
						}
					}
					if(addGift.orderItemService){
						if(addGift.orderItemService.length <= 0){
							addGift.orderItemService = null
						}
					}
					data.orderGiftDto = addGift
				}else{
					data.orderGiftDto = null
				}
				
				
				/********************************  订单套系内容  *********************************/
				data.serviceCategoryId = orderPrice.serviceCategoryId
				data.teacherCategoryId = orderPrice.teacherCategoryId
				data.assemblyCategoryId = orderPrice.assemblyCategoryId
				data.assemblyId = orderPrice.assemblyId
				data.assemblyName = orderPrice.assemblyName
				data.assemblyPrice = orderPrice.assemblyPrice
				if(data.assemblyName === null){
					$Message({
							content: '请选择套系',
							type: 'warning'
					});
				}else{
					/********************************  选择套系内容  *********************************/
					orderItem.forEach((i)=>{
						if(i.orderItemDressInfo){
							if(i.orderItemDressInfo.length <= 0){
								i.orderItemDressInfo = null
							}
						}
						if(i.orderItemGoods){
							if(i.orderItemGoods.length <= 0){
								i.orderItemGoods = null
							}
						}
						if(i.orderItemPlace){
							if(i.orderItemPlace.length <= 0){
								i.orderItemPlace = null
							}
						}
						if(i.orderItemService){
							if(i.orderItemService.length <= 0){
								i.orderItemService = null
							}
						}
					})
					let newOrderItem = orderItem.filter((i)=>{
						if(i.name !== null){
							return i
						}
					})
					
					data.orderItem = orderItem
				}
			
				/*******************************  客户联系人信息  ********************************/
				data.customerGroup.newCustomerContactDtos = []
				data.customerGroup.oldCustomerContactDtos = []
				if(contactInfo[0].name === null){
					$Message({
						content: '客户联系人姓名不能为空',
						type: 'warning'
					});
				}else if(contactInfo[0].mobile === null){
					$Message({
						content: '客户联系人电话不能为空',
						type: 'warning'
					});
				}
				
				// 如果名字不为空 则push入数组
				contactInfo.forEach((i)=>{
					if(i.name !== null){
						if(i.id){
							i.dataStatus = 'UPDATE'
							data.customerGroup.oldCustomerContactDtos.push(i)
						}else{
							data.customerGroup.newCustomerContactDtos.push(i)
						}
					}
				})

				
				/**********************************  宝宝信息  ***********************************/
				let babySave = true
				if(this.babyShow){
					data.customerGroup.newCustomerBabyDtos = []
					baby.forEach((i)=>{
						if(i.name !== null){
							data.customerGroup.newCustomerBabyDtos.push(i)						
						}
					})
					if(baby[0].name === null){
						$Message({
							content: '宝宝名字不能为空',
							type: 'warning'
						});
						babySave = false
					}
				}
				
				/**********************************  客户信息 userInfo ***********************************/
				data.customerGroup.categoryId = userInfo.categoryId
				data.typeLunar = userInfo.typeLunar
				data.typeStr = userInfo.typeStr
				data.typeTime = userInfo.typeTime	
				
				/**********************************  客户来源 source ***********************************/
				data.customerGroup.originId = source.originId
				if(data.customerGroup.originId === null){
					$Message({
						content: '客户来源不能为空',
						type: 'warning'
					});
				}
				data.customerGroup.referrerMobile = source.referrerMobile
				data.customerGroup.referrerName = source.referrerName
				
				/**********************************  开单信息处理 Info ***********************************/ 
				if(Info.receptions.length <= 0){
					$Message({
						content: '接单人员不能为空',
						type: 'warning'
					});
					data.receptions = Info.receptions
				}else{
					data.receptions = Info.receptions
				}
				data.autoOrderNo = Info.autoOrderNo
				data.autoOrderTime = Info.autoOrderTime
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
					$Message({
						content: '请输入订单号',
						type: 'warning'
					});
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
					babySave &&
					data.customerGroup.originId !== null && 
					contactInfo[0].mobile !== null && 
					contactInfo[0].name !== null && 
					data.assemblyName !== null
				){
					if(this.type === 'WEDDING_DRESS'){
						openWeddingDress(this.openOrderData).then(res=>{
							// console.log('婚纱开单',res)
							if(res.data.data.id){
								uni.redirectTo({
									url:'../openSuccess/openSuccess'
								})
							}
						})
					}else if(this.type === 'BABY'){
						openBaby(this.openOrderData).then(res=>{
							// console.log('儿童开单',res)
							if(res.data.data.id){
								uni.redirectTo({
									url:'../openSuccess/openSuccess'
								})
							}
						})
					}else if(this.type === 'PREGNANT'){
						openPregnant(this.openOrderData).then(res=>{
							// console.log('孕妈开单',res)
							if(res.data.data.id){
								uni.redirectTo({
									url:'../openSuccess/openSuccess'
								})
							}
						})
					}else if(this.type === 'SERVICE'){
						openService(this.openOrderData).then(res=>{
							// console.log('服务开单',res)
							if(res.data.data.id){
								uni.redirectTo({
									url:'../openSuccess/openSuccess'
								})
							}
						})
					}else if(this.type === 'PORTRAY'){
						openPortray(this.openOrderData).then(res=>{
							// console.log('写真开单',res)
							if(res.data.data.id){
								uni.redirectTo({
									url:'../openSuccess/openSuccess'
								})
							}
						})
					}else if(this.type === 'WEDDING'){
						openWedding(this.openOrderData).then(res=>{
							// console.log('婚庆开单',res)
							if(res.data.data.id){
								uni.redirectTo({
									url:'../openSuccess/openSuccess'
								})
							}
						})
					}
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
