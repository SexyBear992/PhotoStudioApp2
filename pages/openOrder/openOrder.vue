<template>
	<view>
		
		<view class="list hs" @click="goOpenOrderD('hs')">
			<view class="text">婚纱开单</view>
			<image :src="url+'nannv.png'" mode=""></image>
		</view>
		
		<view class="list et" @click="goOpenOrderD('et')">
			<view class="text">儿童开单</view>
			<image :src="url+'ertong.png'" mode=""></image>
		</view>
		
		<view class="list ym" @click="goOpenOrderD('ym')">
			<view class="text">孕妈开单</view>
			<image :src="url+'yunfu.png'" mode=""></image>
		</view>
		
		<view class="list xz" @click="goOpenOrderD('xz')">
			<view class="text">写真开单</view>
			<image :src="url+'zhaopian.png'" mode=""></image>
		</view>
		
		<view class="list fw" @click="goOpenOrderD('fw')">
			<view class="text">服务开单</view>
			<image :src="url+'kefu.png'" mode=""></image>
		</view>
		
		<view class="list hq" @click="goOpenOrderD('hq')">
			<view class="text">婚庆开单</view>
			<image :src="url+'icon-heart.png'" mode=""></image>
		</view>
		
		
		<view class="back" @click="back">返回</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:'../../static/icon/'
			};
		},
		methods:{
			// 进入开单详情页
			goOpenOrderD(u){
				switch(u){
					// 婚纱开单
					case 'hs':
					uni.navigateTo({
						url:'../openOrderDetails/openOrderDetails?typeName=婚纱开单&type=' + u 
					})
					break;
					// 儿童开单
					case 'et':
					uni.navigateTo({
						url:'../openOrderDetails/openOrderDetails?typeName=儿童开单&type=' + u 
					})
					break;
					// 孕妈开单
					case 'ym':
					uni.navigateTo({
						url:'../openOrderDetails/openOrderDetails?typeName=孕妈开单&type=' + u 
					})
					break;
					// 写真开单
					case 'xz':
					uni.navigateTo({
						url:'../openOrderDetails/openOrderDetails?typeName=写真开单&type=' + u
					})
					break;
					// 服务开单
					case 'fw':
					uni.navigateTo({
						url:'../openOrderDetails/openOrderDetails?typeName=服务开单&type=' + u
					})
					break;
					// 婚庆开单
					case 'hq':
					uni.navigateTo({
						url:'../openOrderDetails/openOrderDetails?typeName=婚庆开单&type=' + u
					})
					break;
				}
			},
		
			// 返回
			back(){
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list{
		width: 600rpx;
		margin: 0 auto;
		display: flex;
		padding: 30rpx;
		border-radius: 15rpx;
		justify-content: space-between;
		margin-top: 20rpx;
		.text{
			color: #FFFFFF;
			line-height: 80rpx;
		}
		image{
			width: 90rpx;
			height: 90rpx;
		}
	}
	.hs{	
		background-image: linear-gradient(to right, rgba(255, 183, 221,0.6) , rgba(255, 183, 221,1));
	}
	.et{
		background-image: linear-gradient(to right, rgba(92, 173, 255,0.6) , rgba(92, 173, 255,1));
	}
	.ym{
		background-image: linear-gradient(to right, rgba(171, 220, 255,0.6) , rgba(171, 220, 255,1));
	}
	.xz{
		background-image: linear-gradient(to right, rgba(25, 190, 107,0.6) , rgba(25, 190, 107,1));
	}
	.fw{
		background-image: linear-gradient(to right, rgba(255, 153, 0,0.6) , rgba(255, 153, 0,1));
	}
	.hq{
		background-image: linear-gradient(to right, rgba(237, 64, 20,0.6) , rgba(237, 64, 20,1));
	}
	.back{
		border-radius: 40rpx;
		margin: 20rpx auto;
		width: 300rpx;
		height: 80rpx;
		background-color: #61a3ff;
		color: #FFFFFF;
		line-height: 80rpx;
		text-align: center;
	}
</style>
