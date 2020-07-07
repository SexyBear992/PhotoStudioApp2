<template>
	<view>
		<view class="main">
			<!-- 接单 -->
			<view class="listBox">
				<view class="left">
					<view class="title">接单</view>
					<view class="text">{{pickOrder}}</view>
				</view>
				<image :src="url+'icon_hr@2x.png'" mode="" @click="goCandidates('pickOrder')"></image>
			</view>
			<!-- 客服 -->
			<view class="listBox">
				<view class="left">
					<view class="title">客服</view>
					<view class="text">{{CustomerService}}</view>
				</view>
				<image :src="url+'icon_hr@2x.png'" mode="" @click="goCandidates('CustomerService')"></image>
			</view>
			<!-- 网销 -->
			<view class="listBox">
				<view class="left">
					<view class="title">网销</view>
					<view class="text">{{NetSales}}</view>
				</view>
				<image :src="url+'icon_hr@2x.png'" mode="" @click="goCandidates('NetSales')"></image>
			</view>
			
			<!-- 取消/确定 -->
			<view class="butBox"> 
				<view class="cancel" @click="cancel">取消</view>
				<view class="determine" @click="determine">确认</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapGetters} from 'vuex'
	export default {
		computed: {
			...mapGetters([
				'pickOrder',
				'CustomerService',
				'NetSales',
			]),
		},
		data() {
			return {
				url:'https://7068-photostudioapp-1302515241.tcb.qcloud.la/icon/',
			};
		},
		methods:{
			// 前往选人页面
			goCandidates(type){
				if(type == 'pickOrder'){
					uni.navigateTo({
						url:'../../openOrderBox/candidates/candidates?type=pickOrder'
					})
				}else if(type == 'CustomerService'){
					uni.navigateTo({
						url:'../../openOrderBox/candidates/candidates?type=CustomerService'
					})
				}else if(type == 'NetSales'){
					uni.navigateTo({
						url:'../../openOrderBox/candidates/candidates?type=NetSales'
					})
				}else if(type == 'references'){
					uni.navigateTo({
						url:'../../openOrderBox/candidates/candidates?type=references'
					})
				}
			},
			
			// 取消
			cancel(){
				uni.navigateBack({
					delta:1
				})
			},
			// 确认
			determine(){
				uni.navigateBack({
					delta:1
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
.main{
	width: 700rpx;
	margin: 10rpx auto;
	.listBox{
		display: flex;
		height: 80rpx;
		justify-content: space-between;
		border-bottom: 1rpx solid #f9f9f9;
		.left{
			font-size: 28rpx;
			display: flex;
			line-height: 80rpx;
			.title{
				font-size: 28rpx;
				font-weight: normal;
				margin: 0;
				margin-right: 30rpx;
			}
			input{
				margin:auto 0;
				width: 435rpx;
			}
		}
		.switch{
			margin-top: 10rpx;
			transform:scale(0.5);
		}
		input{
			color: #8d8d8d;
		}
		.right{
			margin-top: 10rpx;
			font-size: 24rpx;
			color: #61a3ff;
			.switch{
				margin-top: 0;
				margin-right: -20rpx;
			}
		}
		.text{
			color: #8d8d8d;
		}
		image{
			width: 12rpx;
			height: 18rpx;
			padding: 33rpx 30rpx 33rpx 100rpx;
		}
		.addLB{
			display: flex;
			
		}
		.chooseReferences{
			border: 1rpx solid #6d9ef6;
			color: #6d9ef6;
			border-radius: 10rpx;
			font-size: 24rpx;
			height: 40rpx;
			line-height: 40rpx;
			padding: 0 10rpx;
			margin: auto 0;
		}
	}	
	.butBox{
		margin-top: 20rpx;
		display: flex;
		justify-content: flex-end;
		.cancel{
			width: 120rpx;
			height: 60rpx;
			line-height: 60rpx;
			text-align: center;
			font-size: 28rpx;
			border-radius: 10rpx;
			border: 1rpx solid #C0C0C0;
		}
		.determine{
			width: 120rpx;
			height: 60rpx;
			line-height: 60rpx;
			text-align: center;
			font-size: 28rpx;
			border-radius: 10rpx;
			margin-left: 20rpx;
			color: #FFFFFF;
			background-color: #2d8cf0;
		}
	}
}

</style>
