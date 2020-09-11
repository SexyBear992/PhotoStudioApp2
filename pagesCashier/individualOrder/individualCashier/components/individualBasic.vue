<template>
	<view class="bigBox">
		<!-- 单号 -->
		<view class="onlyListBox">
			<view class="list">
				<view class="text">单号：</view>
				<view class="info">{{info.orderNo}}</view>
			</view>
		</view>
		
		<!-- 项目名称 -->
		<view class="onlyListBox">
			<view class="list">
				<view class="text">项目名称：</view>
				<view class="info">{{info.name}}</view>
			</view>
		</view>
	
		<!-- 客户名字 -->
		<view class="onlyListBox">
			<view class="list">
				<view class="text">客户名字：</view>
				<view class="info">{{info.contactName}}</view>
			</view>
			
		</view>
		
		<!-- 客户手机 -->
		<view class="onlyListBox">
			<view class="list">
				<view class="text">客户手机：</view>
				<view class="info">{{info.contactMobile}}</view>
			</view>
		</view>
		
		<!-- 金额 -->
		<view class="money">
			<view class="sumPrice">
				<view class="title">应收金额：</view>
				<view class="text">{{info.sumPrice}}</view>
			</view>
			<view class="incomePrice">
				<view class="title">已收金额</view>
				<view class="text">{{info.incomePrice}}</view>
			</view>
			<view class="arrears">
				<view class="title">欠款</view>
				<view class="text">{{info.sumPrice - info.incomePrice}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:['info'],
		data(){
			return{
				
			}
		}
	}
</script>

<style lang="scss">
 @import '@/pagesCashier/orderCashier/components/cashierDetailStyle.scss';
 .money{
 	font-size: 24rpx;
 	display: flex;
 	.sumPrice{
 		display: flex;
 		color: #2db7f5;
 		margin-right: 30rpx;
 	}
 	.incomePrice{
 		display: flex;
 		color: #19be6b;
 		margin-right: 30rpx;
 	}
 	.arrears{
 		display: flex;
 		color: #ed4014;
 		margin-right: 30rpx;
 	}
 	.refundPrice{
 		display: flex;
 		color: #a8a8a8;
 	}
 }
</style>
