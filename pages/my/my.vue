<template>
	<view>
		<view class="topBox">
			<view class="topBut">
				<view class="switchStores" @click="switchStores">切换门店</view>
				<view class="SignIn" @click="SignIn">签到</view>
			</view>
			
			<view class="avatarBox">
				<image :src="url+'img_tx@2x.png'" mode=""  class="avatar"></image>
			</view>
			<view class="name">{{user.name}}</view>
			<view class="department">部门|{{user.department}}</view>
		</view>
		
		<view class="listBox">
			<view class="title">电话</view>
			<view class="text">{{user.phone}}</view>
		</view>
		
		<view class="listBox">
			<view class="title">部门电话</view>
			<view class="text">{{user.DPhone}}</view>
		</view>
		
		<view class="listBox">
			<view class="title">工号</view>
			<view class="text">{{user.Gid}}</view>
		</view>
		
		<view class="listBox">
			<view class="title">生日</view>
			<view class="text">{{user.birthday}}</view>
		</view>
		
		<view class="listBox">
			<view class="title">性别</view>
			<view class="text">{{user.sex}}</view>
		</view>
		
		<view class="listBox">
			<view class="title">邮件</view>
			<view class="text">{{user.email}}</view>
		</view>
		
		
		<tabBar :index="5"></tabBar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:'https://7068-photostudioapp-1302515241.tcb.qcloud.la/icon/',
				user:{
					name:'熊镇城',
					department:'开发',
					phone:'18718168497',
					DPhone:'23017183',
					Gid:'DD000',
					birthday:'07-17',
					email:'935299671@qq.com',
					sex:'男'
				}
			};
		},
		methods:{
			// 签到
			SignIn(){
				console.log('签到')
			},
			// 切换门店
			switchStores(){
				console.log('切换门店')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.topBox{
		.topBut{
			display: flex;
			justify-content: space-between;
			color: #FFFFFF;
			font-size: 28rpx;
			text-align: right;
			.SignIn,.switchStores{
				padding: 0 30rpx;
				padding-top: 10rpx;
			}
		}
		// padding-top: 20rpx;
		background-color: #61a3ff;
		border-bottom: 20rpx solid #e7e5f4;
		width: 100%;
		.avatarBox{
			width: 200rpx;
			height: 200rpx;
			margin: 0 auto;
			.avatar{
				width: 180rpx;
				height: 180rpx;
				border: 10rpx solid #007AFF;
				overflow: hidden;
				border-radius: 50%;
			}
		}
		.name{
			color: #FFFFFF;
			font-size: 36rpx;
			text-align: center;
			margin-top: 30rpx;
		}
		.department{
			font-size: 32rpx;
			color: #FFFFFF;
			text-align: center;
			margin-top: 10rpx;
			padding-bottom: 50rpx;
		}
	}
	.listBox{
		font-size: 34rpx;
		margin: 30rpx;
		padding-bottom: 30rpx;
		border-bottom: 2rpx solid #e7e5f4;
		display: flex;
		justify-content: space-between;
	}
	// .switchStores{
	// 	font-size: 30rpx;
	// 	background-color: #61a3ff;
	// 	color: #FFFFFF;
	// 	width: 180rpx;
	// 	height: 66rpx;
	// 	border-radius: 33rpx;
	// 	text-align: center;
	// 	line-height: 66rpx;
	// 	margin: 0 auto;
	// }
</style>
