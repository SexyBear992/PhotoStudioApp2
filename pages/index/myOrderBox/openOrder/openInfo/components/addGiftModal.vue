/*************************  添加礼物模态框  *************************/
<template>
	<view class="bigBox">
		<view class="box">
			<view class="titleBox">
				<view class="title">礼包选择</view>
				<view  @click="close">
					<i-icon type="close" size="15" color="#80848f"/>
				</view>
			</view>
			
			<view class="pickerBox">
				<view class="text">礼包名称</view>
				<view class="picker">
					<picker
						@columnchange="changeList" 
						:range="array"
						mode = multiSelector
						@change="enSystem"
					>
						<view class="uni-input">
							<view>{{array[1][index]}}</view>
							<i-icon type="unfold" size="15" color="#80848f"/>
						</view>
					</picker>
				</view>
			</view>
			
			<view class="prompt">
				<view>总共({{allData}})个 <span v-if="canCheck > 0">可选({{canCheck}})个</span></view>
			</view>
			
			<view class="mainBox">
				<view class="topBox mainTitleBox">
					<view class="text name">名称</view>
					<view class="text">数量</view>
					<view class="text">类型</view>
				</view>
				
				<checkbox-group @change="checkboxChange">
					<view class="topBox" v-for="(item ,index) in giftDetail" :key="index">
						<view class="check">
							<checkbox :value="item.name" :checked="item.checked" style="transform:scale(0.7);margin-top: 8rpx"/>
						</view>
						<view class="text name">{{item.name}}</view>
						<view class="text">{{item.number}}</view>
						<view class="text">{{item.type}}</view>
					</view>
				</checkbox-group>
			</view>
			
			<view class="enSureBox">
				<view class="enGift" @click="enGift">确定</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { getGiftName, getGiftDetail } from '@/util/api/shop.js'
	import { mapActions,mapGetters } from 'vuex'
	export default{
		props:['type','giveGift'],
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
		data(){
			return{
				index:0,
				// 类别选择
				array:[[],[]],
				// 当前类别ID
				giftTypeId:null,
				// 当前礼包名称ID
				giftNameId:null,
				// 获得类名
				giftName:null,
				// 礼包详情
				giftDetail:null,
				// 选择礼包
				sureInfo:null,
				
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
			}
		},
		mounted(){
			this.act_giftType()
		},
		methods:{
			...mapActions('shopArr',[
				'act_giftType'
			]),
			
			// 获取礼物所有类名
			getGiftName(){
				getGiftName({shopId:this.shopId , type:this.type}).then(res=>{	
					this.giftName = res.data.data
					this.giftNameId = this.giftName[this.giftTypeId][0].id
					this.getGiftDetail()
				})
			},
			
			// 根据类别ID获取 类名
			getGiftNameList(){
				let giftNameArr = this.giftName[this.giftTypeId].map((i)=>{
					return i.name
				})
				this.array[1] = giftNameArr
			},
			
			// 获取礼物详情
			getGiftDetail(){
				getGiftDetail({id:this.giftNameId}).then(res=>{
					this.orderGiftDto.giftId = res.data.data.id
					this.orderGiftDto.giftName = res.data.data.name
					this.orderGiftDto.giftPrice = res.data.data.price
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
					res.data.data.giftItemDressInfos.forEach((i)=>{
						let arr = {
							name: i.name,
							number: i.count,
							type:'服装',
							id: i.dressInfosId,
							salePrice:i.salePrice,
							typeB:i.type
						}
						giftDetail.push(arr)
					})
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
							stockStatus: i.stockStatus
						}
						giftDetail.push(arr)
					})
					res.data.data.giftItemPlaces.forEach((i)=>{
						let arr = {
							name: i.name,
							number: '',
							id: i.placesId,
							type:'景点',
							salePrice:i.salePrice,
							typeB:i.placeType
						}
						giftDetail.push(arr)
					})
					res.data.data.giftItemServices.forEach((i)=>{
						let arr = {
							name: i.name,
							number: i.count,
							id: i.servicesId,
							type:'服务',
							salePrice:i.salePrice,
							peopleNumber:i.peopleNumber
						}
						giftDetail.push(arr)
					})

					this.giftDetail = giftDetail
					this.allData = this.giftDetail.length
					this.canCheck = res.data.data.selectCount
					
					// 已选勾选
					if(this.giveGift !== null){
						this.giftDetail.forEach((i)=>{
							if(this.giveGift.includes(i.name)){
								this.$set(i,'checked',true)
							}
						})
					}
					
				})
			},
			
			// picker改变
			changeList(e){
				let name = this.array[e.detail.column][e.detail.value]
				this.get_giftType.some((i)=>{
					if(i.name === name){
						this.giftTypeId = i.id
					}
				})
			
				if(e.detail.column === 1){
					this.index = e.detail.value
				}
			},
			
			// picker确定
			enSystem(e){
				this.giftName[this.giftTypeId].some((i)=>{
					if(i.name === this.array[1][e.detail.value[1]]){
						this.giftNameId = i.id
					}
				})
				this.getGiftDetail()
			},
			
			// 多选返回
			checkboxChange: function (e) {
				this.sureInfo = e.detail.value
				
			},
			
			// 关闭
			close(){
				this.$emit('closeAddGift')
			},
			
			// 确定添加礼包
			enGift(){
				this.giftDetail.forEach((i)=>{
					if(this.sureInfo){
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
								}
								this.orderGiftDto.orderItemGoods.push(arr)
							}else if(i.type === '景点'){
								let arr ={
									name:i.name,
									placeId:i.id,
									placeType:i.placeType,
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
					}
					
				})
				
				if(this.sureInfo.length > this.canCheck && this.canCheck > 0){
					uni.showToast({
						title:'最多可选' + this.canCheck,
						icon:'none'
					})
				}else{
					this.$emit('addGiftInfo',{info:this.orderGiftDto,show:this.sureInfo})
				}
				// console.log('礼包名字',this.giftName[this.giftTypeId].name)
			},
		},
		watch:{
			get_giftType(){
				let arr = this.get_giftType.map((i)=>{
					return i.name
				})
				arr.shift()
				this.array[0] = arr
				this.get_giftType.some((i)=>{
					if(i.name === this.array[0][0]){
						this.giftTypeId = i.id
					}
				})
				this.getGiftName()
			},
			giftNameAndId(){
				if(this.giftNameAndId.giftName !== null && this.giftNameAndId.giftTypeId !== null){
					this.getGiftNameList()
				}
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.bigBox{
		z-index: 9999999;
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,0.5);
		font-size: 28rpx;
		top: 0;
		.box{
			width: 600rpx;
			margin: 50% auto;
			transform: translateY(-20%);
			border-radius: 15rpx;
			background-color: #FFFFFF;
		}
		.titleBox{
			display: flex;
			font-size: 32rpx;
			justify-content: space-between;
			padding: 30rpx;
		}
		.pickerBox{
			padding: 0 30rpx;
			display: flex;
			.picker{
				
			}
			.uni-input{
				display: flex;
				justify-content: space-between;
				border: 1rpx solid #61a3ff;
				width: 200rpx;
				margin-left: 15rpx;
				border-radius: 10rpx;
				padding: 0 10rpx;
			}
		}
		.prompt{
			padding: 5rpx 30rpx;
		}
		.mainBox{
			margin: 10rpx 0;
			font-size: 28rpx;
			max-height: 600rpx;
			overflow-y: auto;
			.topBox{
				display: flex;
				margin: 0 30rpx;
				border-bottom: 1rpx solid #F7F7F7;
			}
			.text{
				height: 65rpx;
				line-height: 65rpx;
				width: 20%;
			}
			.name{
				width: 60%;
			}
			.mainTitleBox{
				text-align: center;
				background-color: #f8f8f9;
				.name{
					width: 57%;
				}
			}
			
		}
		.enSureBox{
			padding: 30rpx;
			display: flex;
			text-decoration: row-reverse;
			.enGift{
				background-color: #61a3ff;
				color: #FFFFFF;
				text-align: center;
				width: 80rpx;
				height: 50rpx;
				line-height: 50rpx;
				border-radius: 10rpx;
			}
		}
	}
</style>
