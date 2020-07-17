<template>
	<view class="login">
		<!-- 头部导航栏 -->
		<view class="topNav">
			<view class="title"></view>
		</view>
		
		<!-- 输入手机号 -->
		<view class="ip phone">
			<view class="left">
				<!-- <view class="icon"></view> -->
				<image class="icon" :src="url+'renyuan.png'" mode=""></image>
				<view class="text">+86</view>
				<!-- <view class="down"></view> -->
			</view>
			
			<view class="right">
				<input type="text" placeholder="请输入手机号" v-model="ticketBody.unumber"/>
				<image :src="url+'ziyuan.png'" mode=""  class="close" @click="close(1)"></image>
			</view>
		</view>
		
		<!-- 输入密码 -->
		<view class="ip pas">
			<view class="left">
				<image class="icon i2" :src="url+'suoding.png'" mode=""></image>
				<!-- <view class="icon"></view> -->
				<input type="password" placeholder="请输入密码" v-model="ticketBody.password"/>
			</view>
			<view class="right">
				<image :src="url+'ziyuan.png'" mode=""  class="close" @click="close(2)"></image>
			</view>
		</view>
		
		<!-- 登录按键 -->
		<view class="but" @click="login">登录</view>
	</view>
</template>

<script>
	import { getTicket } from '../../util/api/getTicket.js'
	import { getToken } from '../../util/api/user.js'
	import { mapGetters, mapActions } from 'vuex'
	export default {
		data() {
			return {
				url:'https://7068-photostudioapp-1302515241.tcb.qcloud.la/icon/',
				// 获取ticket的包体
				ticketBody: {
					// "15816447772"
					unumber:null,
					// "123456"
					password:null,
					service:"",
					code:"",
					app:"erp"
				}
			};
		},
		onLoad(){
			uni.hideHomeButton()
		},
		mounted(){
		},
		methods:{
			...mapActions('app',[
				'setToken'
			]),
			
			// 清空输入框input
			close(i){
				// 清空手机号
				if(i == 1){
					this.ticketBody.unumber = null
					// 清空密码
				}else if(i == 2){
					this.ticketBody.password = null
				}
			},
			// 登录
			login(){
				let that = this
				
				getTicket(this.ticketBody).then(res=>{
					uni.setStorage({
						key:'ticket',
						data:res.data.data.ticket
					})
					let ticket = {
						grant_type: 'ticket',
						ticket: res.data.data.ticket
					}
					getToken(ticket).then(resquest => {
						if (resquest.data.code === 200) {
							// 将返回的token存入vuex中
							that.setToken(resquest.data.data.access_token)
							// 并跳转到首页
							uni.switchTab({
								url: '/pages/index/index'
							})
						}else{
							// 如果登录失败跳转入登录页
							uni.redirectTo({
								url:'/pages/login/login'
							})
						}
					})
				})

			},
		}
	}
</script>

<style lang="scss" scoped>
	.topNav{
		background-color: #61A3FF;
		.title{
			// background-color: #FFFFFF;
			// color: #61A3FF;
			text-align: center;
			width:330rpx;
			height:78rpx;
			line-height: 78rpx;
			// background:rgba(255,255,255,1);
			// border-radius:16rpx 16rpx 1rpx 0rpx;
			padding-top: 10rpx;
			margin-left: 55rpx;
		}
	}
	.ip{
		width:562rpx;
		height:90rpx;
		background:rgba(255,255,255,1);
		border-radius:45rpx;
		border:1rpx solid rgba(219, 221, 225, 1);
		display: flex;
		justify-content: space-between;
		font-size: 36rpx;
		margin: 0 auto;
		.icon{
			height: 44rpx;
			width: 44rpx;
			margin-top: 5rpx;
			margin-right: 20rpx;
		}
		.i2{
			height: 40rpx;
			width: 40rpx;
		}
		.left{
			display: flex;
			margin: auto 0;
			margin-left: 30rpx;
		}
		.right{
			display: flex;
			margin: auto 0;
			margin-right: 30rpx;
			// box-sizing: border-box;
			.close{
				margin: auto 0;
				width:30rpx;
				height:30rpx;
				border-radius:50%;
			}
		}
		.down{
			margin: auto 0;
			margin-left: 13rpx;
			margin-right: 20rpx;
			width:14rpx;
			height:10rpx;
			background:rgba(165,171,183,1);
			opacity:0.7;
		}
		
	}
	.phone{
		margin-top: 70rpx;
		margin-bottom: 50rpx;
		.text{
			margin-right: 10px;
		}
		.left{
			border-right: 1rpx solid #DBDDE1;
		}
		.close{
			
		}
		input{
			margin-right: 15rpx;
			width: 285rpx;
		}
	}
	.but{
		background-color: #61A3FF;
		width:562rpx;
		height:90rpx;
		border-radius:45rpx;
		line-height: 90rpx;
		text-align: center;
		color: #FFFFFF;
		font-size: 36rpx;
		margin: 0 auto;
		margin-top: 110rpx;
	}
	.sq{
		margin-top: 30rpx;
		background-color: #9eea6a;
	}
</style>
