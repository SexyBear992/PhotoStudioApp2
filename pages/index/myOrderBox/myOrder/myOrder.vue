<template>
	<view>
		<view class="showTop" v-if="showTop">
			<view class="but" :class="action?'action':''" @click="changeShow1">部门订单</view>
			<view class="but" :class="!action?'action':''" @click="changeShow2">下属订单</view>
		</view>
		<view class="topBox">
			<picker @change="bindPickerChange" :value="index" :range="array" class="chooseType">
				<view class="text">
					{{array[index]}}
					<image :src="url+'icon_hr@2x.png'" mode=""></image>
				</view>
			</picker>
			<view class="search">
				<input type="text" value="" placeholder="请输入关键字" v-model="keyword"/>
			</view>
			<view class="searchBut" @click="search">搜索</view>
		</view>
		<view class="oNumTs">
			共计{{allOrderNum}}个订单，已加载{{getOrderNum}}个订单
		</view>
		
		<view class="orderMain"  v-for="(item,index) in allOrder" :key="index">
			<view class="orderMainTopBox">
				<view class="DDnum">
					<view class="img">
						<image :src="url+'dingdan.png'" mode=""></image>
					</view>
					<view class="text">订单号：{{item.DDNumber}}</view>
				</view>
				<view class="DDnum">
					<view class="img">
						<image :src="url+'shijian.png'" mode=""></image>
					</view>
					<view class="text r">正常单 拍照完成</view>
				</view>
			</view>
			<view class="orderMainInfoBox">
				<view class="UserBox">
					<view class="left">女士：<span>{{item.womenName}}</span></view>
					<view class="right">电话：<span>{{item.womenPhone}}</span></view>
				</view>
				<view class="UserBox">
					<view class="left">男士：<span>{{item.manName}}</span></view>
					<view class="right">电话：<span>{{item.manPhone}}</span></view>
				</view>
				
				<view class="detailsBox">
					<view class="lfet">
						<view class="text">套系名称：{{item.systemName}}</view>
						<view class="text">预约时间：{{item.YYDate}}</view>
						<view class="text">选样时间：{{item.XYDate}}</view>
					</view>
					<view class="right">
						<view class="text">套系金额：{{item.systemMoney}}</view>
						<view class="text">拍照时间：{{item.PZDate}}</view>
						<view class="text">取件时间：{{item.QJDate}}</view>
						<view class="text">看板时间：{{item.KBDate}}</view>
					</view>
				</view>
			</view>
			<view class="orderMainBut">
				<view class="but" @click="goOrderDetails">订单信息</view>
				<view class="but">进度查询</view>
				<view class="but">收银</view>
				<!-- <view class="but">备注</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	import myOrder from './myOrderInfo.js'
	export default {
		data() {
			return {
				url:'https://7068-photostudioapp-1302515241.tcb.qcloud.la/icon/',
				type:null,
				// 搜索关键字
				keyword:'',
				// 共有订单数量
				allOrderNum:0,
				// 已加载订单数量
				getOrderNum:0,
				// 所有订单内容
				allOrder:[],
				// 显示顶部订单选项
				showTop:false,
				// 顶部订单选项
				action:true,
				// 类型选择
				array: ['订单号', '姓名', '预约日期', '拍照日期','选片日期','看设计日期','取件日期'],
				index: 0,
			}
		},
		onLoad(option){
			this.type = option.type
			if(option.type == 'tddd'){
				this.showTop = true
			}
		},
		mounted(){
			this.allOrder = myOrder
		},
		methods: {
			// 客人信息 跳转开单详情页面
			goOrderDetails(){
				uni.navigateTo({
					url:'../orderDetails/orderDetails'
				})
			},
			// 搜索
			search(){
				console.log(this.keyword)
			},
			// 团队订单 部门订单
			changeShow1(){
				this.action = true
			},
			// 团队订单 部门订单
			changeShow2(){
				this.action = false
			},
			
			bindPickerChange: function(e) {
				this.index = e.target.value
			},
		}
	}
</script>

<style lang="scss" scoped>
	.showTop{
		display: flex;
		margin: 10rpx;
		justify-content: space-around;
		.but{
			width: 360rpx;
			height: 80rpx;
			line-height: 80rpx;
			border: 1rpx solid #C0C0C0;
			text-align: center;
			font-size: 32rpx;
		}
		.action{
			background-color: #bababa;
		}
	}
	.topBox{
		display: flex;
		justify-content: space-between;
		padding: 20rpx;
		.chooseType{
			display: flex;
			border: 1rpx solid #c0c0c0;
			border-radius: 10rpx;
			// width: 130rpx;
			height: 60rpx;
			line-height: 60rpx;
			justify-content: space-between;
			padding: 0rpx 10rpx;
			.text{
				font-size: 30rpx;
			}
			image{
				margin: auto 0;
				width: 12rpx;
				height: 18rpx;
				transform:rotate(90deg);
				margin-left: 10rpx;
			}
		}
		.search{
			input{
				width: 350rpx;
				height: 60rpx;
				line-height: 60rpx;
				font-size: 28rpx;
				padding: 0 10rpx;
				border: 1px solid #c0c0c0;
				border-radius: 3px;
			}
		}
		.searchBut{
			border: 1rpx solid #c0c0c0;
			border-radius: 10rpx;
			text-align: center;
			width: 100rpx;
			height: 60rpx;
			line-height: 60rpx;
		}
	}
	.oNumTs{
		text-align: center;
		font-size: 24rpx;
		padding-bottom: 20rpx;
		border-bottom: 10rpx solid #e6e5f6;
	}
	.orderMain{
		border-bottom: 1rpx solid #eeeeee;
		.orderMainTopBox{
			display: flex;
			justify-content: space-between;
			border-bottom: 1rpx solid #eeeeee;
			margin: 0 30rpx;
			padding: 20rpx 0;
			.DDnum{
				display: flex;
				.img{
					width: 40rpx;
					height: 40rpx;
					border-radius: 50%;
					background-color: #ef1d64;
					image{
						width: 40rpx;
						height: 40rpx;
					}
				}
				.text{
					font-size: 28rpx;
					color: #bababa;
				}
				.r{
					color: #ef1d64;
				}
			}
		}
		.orderMainInfoBox{
			margin: 0 30rpx;
			.UserBox{
				display: flex;
				justify-content: space-between;
				font-size: 32rpx;
				padding: 20rpx 0;
				span{
					color: #6f6fb8;
				}
			}
			.detailsBox{
				display: flex;
				justify-content: space-between;
				font-size: 28rpx;
				color: #bababa;
				border-bottom: 1rpx solid #eeeeee;
				.text{
					margin: 10rpx 0;
				}
			}
		}
		.orderMainBut{
			display: flex;
			margin: 20rpx;
			justify-content: flex-end;
			.but{
				width: 130rpx;
				height: 70rpx;
				line-height: 70rpx;
				background-color: #61a3ff;
				text-align: center;
				font-size: 28rpx;
				color: #FFFFFF;
				border-radius: 10rpx;
				margin-left: 20rpx;
			}
		}
	}
</style>
