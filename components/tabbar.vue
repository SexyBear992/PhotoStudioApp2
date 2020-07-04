<template>
	<view class="tabbar">
		<view class="list tabBarIndex" @click="tabBarIndex" :class="index===1?'tabBarAction':null">
			<image class="icon icon1" :src="index===1?url+'gztA.png':url+'gzt.png'" mode=""></image>
			<view class="text">工作台</view>
		</view>
		<view class="list tabBarAddressBook" @click="tabBarAddressBook"  :class="index===2?'tabBarAction':null">
			<image class="icon icon2" :src="index===2?url+'tongxunluA.png':url+'tongxunlu.png'" mode=""></image>
			<view class="text">通讯录</view>
		</view>
		<!-- <view class="tabBarMy" @click="tabBarMy"  :class="index===3?'tabBarAction':null"></view> -->
		<view class="list add">
			<image :src="url+'icon_tjfb@2x.png'" @click="add" mode=""></image>
			<view class="plus">+</view>
		</view>
		<view class="list tabBarInformation" @click="tabBarInformation"  :class="index===4?'tabBarAction':null">
			<image class="icon icon4" :src="index===4?url+'xinxiA.png':url+'xinxi.png'" mode=""></image>
			<view class="text">消息</view>
		</view>
		<view class="list tabBarMy" @click="tabBarMy"  :class="index===5?'tabBarAction':null">
			<image class="icon icon5" :src="index===5?url+'renA.png':url+'ren.png'" mode=""></image>
			<view class="text">我的</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['index'],		
		data() {
			return {
				url:'https://7068-photostudioapp-1302515241.tcb.qcloud.la/icon/'
			};
		},
		methods:{
			tabBarIndex(){
				uni.switchTab({
					url:'/pages/index/index'
				})
			},
			tabBarAddressBook(){
				uni.switchTab({
					url:'/pages/addressBook/addressBook'
				})
			},
			add(){
				uni.switchTab({
					url:'/pages/add/add'
				})
			},
			tabBarInformation(){
				uni.switchTab({
					url:'/pages/information/information'
				})
			},
			tabBarMy(){
				uni.switchTab({
					url:'/pages/my/my'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tabbar{
		width: 100%;
		height: 122rpx;
		background-color: #fff;
		position: fixed;
		bottom: 0;
		display: flex;
		font-size: 28rpx;
		text-align: center;
		.list{
			width: 20%;
			margin: 20rpx 0 16rpx 0;
			.icon1,.icon4,.icon5,.icon2{
				width: 44rpx;
				height: 44rpx;
				margin-bottom: 2rpx;
			}
		}
		.add{
			position: relative;
			image{
				width: 77rpx;
				height: 77rpx;
			}
			.plus{
				position: absolute;
				top: -5rpx;
				// left: 54rpx;
				color: #FFFFFF;
				font-size: 60rpx;
				margin-left: 50%;
				transform: translateX(-50%);
			}
		}
		.tabBarAction{
			color: #40adff;
		}
	}
</style>
