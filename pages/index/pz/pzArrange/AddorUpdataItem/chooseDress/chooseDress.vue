<template>
	<view class="bigBox">
		<!-- 标题 -->
		<view class="titleBox">
			<view class="left">
				<view>{{itemNo}}</view>
				<view>{{name}}</view>
			</view>
		</view>
		
		<!-- 添加按键 -->
		<view class="addBox">
			<view class="add" v-if="gift.length > 0">+添加礼包</view>
		</view>
		
		<view class="mainBox">
			<view class="list" v-for="(item,index) in infoData" :key="item.id">
				<view class="text">{{item.name}} ({{item.type | type}})</view>
				<input type="number" v-model="item.useNum" @input="num($event,index)" placeholder="请输入"/>
				<view>套</view>
			</view>
		</view>
		<i-message id="message" />
		<view class="button" @click="enSure">确定选择</view>
	</view>
</template>

<script>
	import { getPhotoDress, getGiftList } from '@/util/api/shop.js'
	export default {
		filters:{
			type(type){
				const result = new Map([
					['INT', '内景'],
					['OUT', '外景'],
					['NONE', '无']
				])
				return result.get(type)
			},
		},
		data() {
			return {
				
				// 订单ID
				oId:null,
				// 子订单ID
				itemId:null,
				// 子订单号
				itemNo:null,
				// 子订单名
				name:null,
				
				// 已选择
				enArr:[],
				
				// 礼品
				gift:[],
				
				// 内容
				infoData:[],
			};
		},
		onLoad(option){
			this.itemNo = option.itemNo
			this.name = option.name
			this.oId = option.oId
			this.itemId = option.itemId
			this.getPhotoDress()
			this.getGiftList('DRESS_INFO')
			this.enArr = JSON.parse(option.en)
		},
		methods:{
			// 获得服装
			getPhotoDress(){
				getPhotoDress({itemId: Number(this.itemId)}).then(res=>{
					this.infoData = res.data.data
					if(this.enArr){
						this.enArr.forEach((i)=>{
							this.infoData.forEach((j)=>{
								if(i.id === j.id){
									j.useNum = i.useNum
								}
							})
						})
					}
				})
			},
			// 获取礼包
			getGiftList(e){
				let params = {
					giftTypes: [e],
					orderId:this.oId
				}
				getGiftList(params).then(res=>{
					this.gift = res.data.data
				})
			},
			
			// input监听
			num(e,index){
				this.infoData[index].useNum = Number(e.detail.value)
			},
			
			//确定选择
			enSure(){
				let newArr = []
				this.infoData.forEach((i)=>{
					if(i.useNum){
						let lis = {
							id:i.id,
							name:i.name,
							sourceProducts:i.sourceProducts,
							type:i.type,
							useNum:i.useNum
						}
						newArr.push(lis)
					}
				})
				var pages = getCurrentPages();
				var prevPage = pages[pages.length - 2]; //上一个页面
				prevPage.setData({
					dress: newArr
				})
				uni.navigateBack({//返回
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../../button.scss';
	.bigBox{
		.titleBox{
			display: flex;
			justify-content: space-between;
			padding: 30rpx;
			font-size: 32rpx;
			font-weight: bold;
			border-bottom: 1rpx solid #DDDDDD;
			.left{
				display: flex;
				>view{
					margin-right: 20rpx;
				}
			}
		}
		.list{
			font-size: 32rpx;
			display: flex;
			margin: 30rpx;
			padding-bottom: 30rpx;
			border-bottom: 1rpx solid #DDDDDD;
			.text{
				margin-left: 30rpx;
				width: 300rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			input{
				padding: 0 20rpx;
				width: 150rpx;
			}
		}
		.addBox{
			display: flex;
			flex-direction: row-reverse;
			padding: 30rpx;
			.add{
				width:160rpx;
				height:48rpx;
				line-height: 48rpx;
				text-align: center;
				border: 2rpx dashed #61A3FF;
				border-radius:24rpx;
				font-size: 28rpx;
				color: #61A3FF;
				margin-left: 30rpx;
			}
		}
	}
</style>
