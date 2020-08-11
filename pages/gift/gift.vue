/****************************************  礼物添加页面 ***********************************************/
<template>
<view class="bigBox">
		<view class="box">

			<view class="pickerBox">
				<view class="text">礼包名称</view>
				<view class="picker">
					<picker
						@columnchange="changeList" 
						:range="array"
						mode = multiSelector
						@change="enSystem"
						:value="pickerIndex"
					>
						<view class="uni-input">
							<view>{{array[1][pickerIndex[1]]}}</view>
							<i-icon type="unfold" size="15" color="#80848f"/>
						</view>
					</picker>
				</view>
			</view>
			
			<view class="prompt">
				<view>总共({{allData}})个 <span v-if="canCheck > 0">可选({{canCheck}})个</span></view>
			</view>
			
			<view class="mainBox">
				<view class="titleBox">
					<view class="title"></view>
					<view class="title">名称</view>
					<view class="title">数量</view>
					<view class="title">类型</view>
				</view>
				
				<checkbox-group @change="checkboxChange">
					<view class="textBox" v-for="(item ,index) in giftDetail" :key="index">
						<view class="check">
							<checkbox :value="item.name" :checked="item.checked" style="transform:scale(0.7)"/>
						</view>
						<view class="text f">{{item.name}}</view>
						<view class="text">{{item.number | num}}</view>
						<view class="text">{{item.type}}</view>
					</view>
				</checkbox-group>
			</view>
			
			<view class="enSureBox">
				<view class="enGift" @click="enGift">确定</view>
			</view>
		</view>
		<i-message id="message" />
	</view>
</template>

<script>
	const { $Message } = require('@/wxcomponents/base/index');
	import { getGiftName, getGiftDetail } from '@/util/api/goods.js'
	import { mapActions,mapGetters } from 'vuex'
	export default{
		computed:{
			...mapGetters('shopArr',[
				'get_giftType'
			]),
			...mapGetters('app',[
				'shopId'
			]),
			giftNameAndId(){
				const{
					giftName,
					giftTypeId
				} = this 
				return {
					giftName,
					giftTypeId
				}
			}
		},
		filters:{
			num(number){
				if(number === 'null' || number === null){
					return 0
				}else{
					return number
				}
			}
		},
		data() {
			return {
				// 订单类型
				type:null,
				// picker选择
				array:[[],[]],
				// picker选择下标
				pickerIndex:[0,0],
				
				// 当前类别ID
				giftTypeId:null,
				// 当前礼包名称ID
				giftNameId:null,
				
				// 礼物名称对象列表
				giftNameList:null,
				
				// 礼包详情
				giftDetail:null,
				// 选择礼包
				sureInfo:[],
				
				// 已选
				giveGift:null,
				
				// 总共
				allData:null,
				// 可选
				canCheck:null,
				
				orderGiftDto:{
					// 	礼包入册
					bookCount:null,
					// 礼包入底
					bottomCount:null,
					// 礼包ID
					giftId:null,
					// 礼包名称
					giftName:null,
					// 礼包价格
					giftPrice:null,
					// 服装对象
					orderItemDressInfo:[],
					// 商店对象
					orderItemGoods:[],
					// 景点对象
					orderItemPlace:[],
					// 服务对象
					orderItemService:[],
				}
			};
		},
		onLoad(option){
			this.type = option.type
			if(option.giveGift === 'null'){
				this.giveGift = null
			}else{
				this.giveGift = option.giveGift.split(',')
			}
			this.pickerIndex = option.index.split(',').map(Number)
			
			// this.type = "WEDDING_DRESS"
			// this.giveGift = null
			// this.pickerIndex = [0,0]
			this.act_giftType()
		},
		methods:{
			...mapActions('shopArr',[
				'act_giftType'
			]),
			
			// 获取礼物名字
			getGiftName(){
				getGiftName({shopId:this.shopId , type:this.type}).then(res=>{	
					this.giftNameList = res.data.data
					// 获取礼物名字ID
					this.giftNameId = res.data.data[this.giftTypeId][this.pickerIndex[1]].id
					// 创建礼物名字数组
					this.getArrayGiftName()
					// 获取礼物详情
					this.getGiftDetail()
				})
			},
			
			// 根据类别ID获取 类名
			getArrayGiftName(){
				let arr = this.giftNameList[this.giftTypeId].map((i)=>{
					return i.name
				})
				this.array[1] = arr
			},
			
			// 获取礼物详情
			getGiftDetail(){
				getGiftDetail({id:this.giftNameId}).then(res=>{
					this.orderGiftDto.giftId = res.data.data.id
					this.orderGiftDto.giftName = res.data.data.name
					this.orderGiftDto.giftPrice = res.data.data.price
					// 创建新的对象
					// 入底/入册
					let giftDetail = [
						{
							name:'入册',
							number:res.data.data.bookCount,
							type:'入册',
						},
						{
							name:'入底',
							number:res.data.data.bottomCount,
							type:'入底',
						}
					]
					// 服装
					res.data.data.giftItemDressInfos.forEach((i)=>{
						let arr = {
							name: i.name,
							number: i.count,
							type:'服装',
							id: i.dressInfoId,
							salePrice:i.salePrice,
							typeB:i.type
						}
						giftDetail.push(arr)
					})
					// 商品
					res.data.data.giftItemGoods.forEach((i)=>{
						let arr = {
							name: i.name,
							number: i.count,
							type:'商品',
							id: i.goodsId,
							pSalePrice:i.pSalePrice,
							defaultP: i.defaultP,
							isSelect: i.isSelect,
							orderNum: i.count,
							orderP: i.countP,
							stockStatus: i.stockStatus,
							salePrice:i.salePrice
						}
						giftDetail.push(arr)
					})
					// 景点
					res.data.data.giftItemPlaces.forEach((i)=>{
						let arr = {
							name: i.name,
							number: '',
							id: i.placeId,
							type:'景点',
							salePrice:i.salePrice,
							typeB:i.placeType
						}
						giftDetail.push(arr)
					})
					// 服务
					res.data.data.giftItemServices.forEach((i)=>{
						let arr = {
							name: i.name,
							number: i.count,
							id: i.serviceId,
							type:'服务',
							salePrice:i.salePrice,
							peopleNumber:i.peopleNumber
						}
						giftDetail.push(arr)
					})
					
					// 赋值详情
					this.giftDetail = giftDetail
					// 赋值总数
					this.allData = this.giftDetail.length
					// 赋值该礼包可选数量
					this.canCheck = res.data.data.selectCount
					// 勾选已选礼包
					if(this.giveGift !== null){
						this.giftDetail.forEach((i)=>{
							if(this.giveGift.includes(i.name)){
								this.$set(i,'checked',true)
							}
						})
					}
				})
			},
			
			// picker改变 通过选择类别 改变礼物名
			changeList(e){
				let name = this.array[e.detail.column][e.detail.value]
				this.get_giftType.some((i)=>{
					if(i.name === name){
						this.giftTypeId = i.id
					}
				})
				// 重新获取礼物名列表
				this.getArrayGiftName()
			},
			
			// picker确定
			enSystem(e){
				this.pickerIndex = e.detail.value
				// 获取选择的礼物名称ID
				this.giftNameList[this.giftTypeId].some((i)=>{
					if(i.name === this.array[1][e.detail.value[1]]){
						this.giftNameId = i.id
					}
				})
				this.getGiftDetail()
			},
			
			// 多选返回
			checkboxChange(e) {
				this.sureInfo = e.detail.value
			},
			
			// 确定添加礼包
			enGift(){
				// 如果超出可选范围 提醒
				if(this.sureInfo.length > this.canCheck && this.canCheck > 0){
					$Message({
						content: '最多可选' + this.canCheck,
						type: 'warning'
					});
				}else{
					if(this.sureInfo){
						this.giftDetail.forEach((i)=>{		
							if(this.sureInfo.includes(i.name)){
								if(i.type === '入册'){
									this.orderGiftDto.bookCount = i.number
								}else if(i.type === '入底'){
									this.orderGiftDto.bottomCount = i.number
								}else if(i.type === '服装'){
									let arr = {
										count: i.number,
										dressInfoId: i.id,
										name: i.name,
										remark: null,
										salePrice: i.salePrice,
										sort: null,
										type: i.typeB
									}
									this.orderGiftDto.orderItemDressInfo.push(arr)
								}else if(i.type === '商品'){
									let arr = {
										defaultP: i.defaultP,
										expeditedTime: new Date().getTime(),
										goodsId: i.id,
										isSelect: i.isSelect,
										name: i.name,
										orderNum: i.orderNum,
										orderP: i.orderP,
										pSalePrice: i.pSalePrice,
										pickupModeCategoryId:null,
										remark:null,
										sort:null,
										stockStatus:i.stockStatus,
										salePrice: i.salePrice,
									}
									this.orderGiftDto.orderItemGoods.push(arr)
								}else if(i.type === '景点'){
									let arr ={
										name:i.name,
										placeId:i.id,
										placeType:i.typeB,
										remark:null,
										salePrice:i.salePrice,
										sort:null
									}
									this.orderGiftDto.orderItemPlace.push(arr)
								}else if(i.type === '服务'){
									let arr ={
										name:i.name,
										servicesId:i.id,
										count:i.number,
										remark:null,
										salePrice:i.salePrice,
										sort:null,
										peopleNumber:i.peopleNumber
									}
									this.orderGiftDto.orderItemService.push(arr)
								}
							}
						})
						var pages = getCurrentPages();
						var prevPage = pages[pages.length - 2]; //上一个页面
						prevPage.setData({
							gift: {
								'info':this.orderGiftDto,
								'show':this.sureInfo,
								'index':this.pickerIndex
							}
						})
						uni.navigateBack({//返回
							delta: 1
						})
					}
				}
			}
		},
		watch:{
			get_giftType(){
				// 获取礼物类别
				let arr = this.get_giftType.map((i)=>{
					return i.name
				})
				// 去除礼物第一个类别
				arr.shift()
				// 赋值到array数组下标0
				this.array[0] = arr
				
				// 获取当前类别的ID
				this.get_giftType.some((i)=>{
					if(i.name === this.array[0][this.pickerIndex[0]]){
						this.giftTypeId = i.id
					}
				})
				// 获取礼包名字
				this.getGiftName()
			}

			// giftNameAndId(){
			// 	if(this.giftNameAndId.giftName !== null && this.giftNameAndId.giftTypeId !== null){
			// 		this.getGiftNameList()
			// 	}
			// 	console.log(this.array)
			// },
			
		}
	}
</script>

<style lang="scss" scoped>
.bigBox{
	.box{
		font-size: 28rpx;
		margin-top: 30rpx;
		.pickerBox{
			display: flex;
			.text{
				margin: 10rpx 30rpx;
			}
			.uni-input{
				padding: 10rpx;
				border: 1rpx solid #61A3FF;
				border-radius: 10rpx;
				display: flex;
				>view{
					margin-right: 20rpx;
				}
			}
		}
		.prompt{
			margin: 30rpx;
		}
		.mainBox{
			.titleBox{
				display: flex;
				background-color: #f8f8f9;
				margin: 0 30rpx;
				height: 80rpx;
				line-height: 80rpx;
				.title{
					flex: 1; 
					text-align: center;
				}
				.title:nth-child(1){
					flex: 0.3;
				}
				.title:nth-child(2){
					flex: 1.7;
				}
			}
			.textBox{
				margin: 30rpx;
				display: flex;
				.check{
					flex: 0.3;
				}
				.text{
					text-align: center; 
					flex: 1;
				}
				.f{
					flex: 1.7;
				}
			}
		}
		.enGift{
			position: fixed;
			bottom: 30rpx;
			width: 600rpx;
			color: #FFFFFF;
			background-color: #61A3FF;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			border-radius: 40rpx;
			margin: 0 auto;
			margin-left: 50%;
			transform: translateX(-50%);
		}
	}
}
</style>
