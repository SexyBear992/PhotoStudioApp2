<template>
	<view>
		<view class="main">
			<!-- 入底 -->
			<view class="listBox">
				<view class="titleL">入底</view>
				<input type="number" class="text" :focus="true" :placeholder="onBottom"/>
			</view>
			<!-- 入册 -->
			<view class="listBox">
				<view class="titleL">入册</view>
				<input type="number" class="text" :placeholder="onCopies"/>
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
	export default {
		data() {
			return {
				// 入底
				onBottom:20,
				// 入册
				onCopies:20
			};
		},
		methods:{
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
			}
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
			border-bottom: 1rpx solid #f9f9f9;
			line-height: 80rpx;
			font-size: 28rpx;
			.text{
				color: #909090;
				margin: auto 40rpx
			}
		}
		.labelBox{
			.title{
				background-color: #FFFFFF;
				padding-left: 0;
			}
			.labe{
				width: 700rpx;
				margin: 0 auto;
				.titleBox{
					overflow: hidden;
					display: flex;
					justify-content: space-between;
					background-color: #f2f6ff;
					.titleLB{
						text-align: center;
						height: 80rpx;
						line-height: 80rpx;
						font-size: 24rpx;
						color: #6c90cf;
						width: 20%;
					}
				}
				.tB{
					background-color: #e5edff;
				}
				.fTLB{
					width: 40% !important;
				}
			}
		}
		.moveView{
			margin-top: 20rpx;
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
