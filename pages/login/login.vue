<template>
	<view class="bigBox">
		
		<!-- 输入手机号 -->
		<view class="ip">
			<view class="left">
				<i-icon class="icon" type="mobilephone_fill" size="28" color="#61A3FF" />
				<view class="text">+86</view>
			</view>
			<input type="text" placeholder="请输入手机号" v-model="ticketBody.unumber"/>
			<view class="close" @click="close(1)">
				<i-icon type="delete" size="28" color="#80848f" />
			</view>
		</view>
		
		<!-- 输入密码 -->
		<view class="ip">
			<view class="left">
				<i-icon class="icon" type="lock_fill" size="28" color="#61A3FF"  />
				<input type="password" placeholder="请输入密码" v-model="ticketBody.password"/>
			</view>
			<view class="close" @click="close(2)">
				<i-icon type="delete" size="28" color="#80848f" />
			</view>
		</view>
		
		<!-- 登录按键 -->
		<view class="but" @click="login">登录</view>
		
		<i-message id="message" />
	</view>
</template>

<script>
	import { getTicket } from '../../util/api/getTicket.js'
	import { mapGetters, mapActions } from 'vuex'
	export default {
		computed:{
			...mapActions('app',[
				'get_userInfo'
			]),
			
		},
		data() {
			return {
				// 获取ticket的包体
				ticketBody: {
					unumber:null,
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
				'act_ticket'
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
				getTicket(this.ticketBody).then(res=>{
					uni.setStorage({
						key:'ticket',
						data:res.data.data.ticket
					})
					this.act_ticket(res.data.data.ticket)
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.ip{
		display: flex;
		justify-content: space-between;
		width: 570rpx;
		padding: 15rpx;
		border-radius: 100rpx;
		border: 1rpx solid #dbdde1;
		margin-top: 50rpx;
		margin-left: 50%;
		transform: translateX(-50%);
		.left{
			display: flex;
			>view{
				margin-top: 6rpx;
				padding-right: 15rpx;
			}
		}
		input{
			margin-top: 6rpx;
		}
	}
	.ip:nth-child(1){
		margin-top: 200rpx;
		.left{
			border-right: 1rpx solid #dbdde1;
		}
	}
	.ip:nth-child(2){
		.icon{
			margin-right: 15rpx;
		}
	}

	.but{
		width: 600rpx;
		height: 80rpx;
		margin-top: 100rpx;
		line-height: 80rpx;
		border-radius: 40rpx;
		background-color: #61A3FF;
		color: #FFFFFF;
		text-align: center;
		margin-left: 50%;
		transform: translateX(-50%);
	}
</style>
