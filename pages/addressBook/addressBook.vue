<template>
	<view>
		<view class="listBox" v-for="(item,index) in addressBook" :key="index">
			<view class="left">
				<image :src="url+'img_tx@2x.png'" mode=""></image>
				<view class="nAndp">
					<view class="name">{{item.name}}</view>
					<view class="phone">{{item.phone}}</view>
				</view>
			</view>
			<view class="belongs">{{item.belongs}}</view>
			<image :src="url+'telephone.png'" class="icon" mode="" @click="goPhone(item.phone)"></image>
		</view>
		
		<tabBar :index="2"></tabBar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:'../../static/icon/',
				addressBook:[
					{
						name:'周易缘',
						phone:'134879132842',
						belongs:'门市部'
					},
					{
						name:'唐艺芯',
						phone:'134879132842',
						belongs:'门市部'
					},
					{
						name:'周俊廷',
						phone:'134879132842',
						belongs:'门市部'
					}
				]
			};
		},
		methods:{
			// 跳转进拨号页
			goPhone(phone){
				uni.makePhoneCall({
					phoneNumber:phone
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.listBox{
		display: flex;
		border-bottom: 1rpx solid #BBBBBB;
		padding: 22rpx;
		font-size: 28rpx;
		justify-content: space-between;
		.left{
			display: flex;
			image{
				width: 88rpx;
				height: 88rpx;
				border-radius: 50%;
				margin-top: 0;
				margin-right: 15rpx
			}
			.nAndp{
				margin-top: 10rpx;
			}
		}
		.belongs{
			margin-top: 30rpx;
		}
		image{
			width: 44rpx;
			height: 44rpx;
			margin-top: 25rpx;
		}
	}
</style>
