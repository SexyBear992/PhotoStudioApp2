<template>
	<view class="mainBox">
		<view class="moneyBox">
			<!-- 前期应收 后期应收 -->
			<view class="cashierListBox">
		
				<view class="textBox">
					<view class="text">前期应收</view>
					<view>{{info.latePrice}}</view>
				</view>
				
				<view class="textBox">
					<view class="text">后期应收</view>
					<view>{{info.earlyPrice}}</view>
				</view>
				
			</view>
			
			<!-- 已经收 欠款-->
			<view class="cashierListBox">
				<view class="textBox">
					<view class="text">已收</view>
					<view>{{info.incomePrice}}</view>
				</view>
				
				<view class="textBox">
					<view class="text">欠款</view>
					<view class="cRed">{{ info.latePrice + info.earlyPrice - info.incomePrice}}</view>
				</view>
			</view>
			
		</view>
		
		<view class="butBox">
			<view class="but" @click="earlyPrice">后期收款</view>
			<view class="but" @click="latePrice">前期收款</view>
			<view class="but" @click="detailPrice">收款详情</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:['info'],
		data(){
			return{
				
			}
		},
		methods:{
			// 收款详情
			detailPrice(){
				let pages = getCurrentPages();
				let currPage = pages[pages.length - 1]; //当前页
				currPage.setData({
					cashierDetail:{
						'orderNo': this.info.orderNo,
						'orderTime': this.info.orderTime,
						'assemblyName': this.info.assemblyName,
						'assemblyPrice': this.info.assemblyPrice,
						'latePrice': this.info.latePrice,
						'earlyPrice': this.info.earlyPrice,
						'incomePrice': this.info.incomePrice,
						'financeId': this.info.financeId
					}
				})
				uni.navigateTo({
					url:'./detailPrice/detailPrice'
				})
			},
			// 前期收款
			latePrice(){
				console.log('前期收款')
			},
			// 后期收款
			earlyPrice(){
				console.log('后期收款')
			},
		},
	}
</script>

<style lang="scss" scoped>
	.mainBox{
		margin: 30rpx;
		.moneyBox{
			border-bottom: 1rpx solid #DDDDDD;
			.cashierListBox{
				font-size: 28rpx;
				padding-bottom: 30rpx;
				display: flex;
				.textBox:nth-child(1){
					width: 250rpx;
				}
				.textBox{
					display: flex;
					color: #61A3FF;
					.text{
						color: #333333;
					}
					>view:nth-child(2){
						margin-left: 15rpx;
					}
					.cRed{
						color: #FF0000;
					}
				}
			}
		}
		.butBox{
			display: flex;
			flex-direction: row-reverse;
			padding: 30rpx 0;
			.but{
				color: #FFFFFF;
				background-color: #61A3FF;
				padding: 10rpx 20rpx;
				margin-left: 30rpx;
				font-size: 28rpx;
				box-shadow:0rpx 7rpx 14rpx 1rpx rgba(97,163,255,0.27);
				border-radius:30rpx;
			}
			.but:last-child{
				background-color: #FFFFFF;
				color: #333333;
				border: 1rpx solid #DDDDDD;
			}
		}
	}
</style>
