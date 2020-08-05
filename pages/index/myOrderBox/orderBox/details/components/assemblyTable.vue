<template>
	<view>
		<!-- 商品 -->
		<view class="table">
			<view class="topTitle">
				<view class="title">{{type | title}}</view>
			</view>
			<!-- 标题 -->
			<view class="titleBox">
				<view class="title" v-for="(item,index) in titleBox" :key="index">{{item}}</view>
			</view>
			<!-- 商品内容 -->
			<view class="textBox" v-if="type === 'GOODS'" v-for="item in orderItem" :key="item.id">
				<view class="text">{{item.name}}</view>
				<view class="text">{{item.pSalePrice}}</view>
				<view class="text">{{item.countP}}</view>
				<view class="text">{{item.countNum}}</view>
			</view>
			<!-- 服装内容 -->
			<view class="textBox" v-if="type === 'DRESSINFO'" v-for="item in orderItem" :key="item.id">
				<view class="text">{{item.name}}</view>
				<view class="text">{{item.salePrice}}</view>
				<view class="text">{{item.type | type}}</view>
				<view class="text">{{item.count}}</view>
			</view>
			<!-- 景点内容 -->
			<view class="textBox" v-if="type === 'PLACE'" v-for="item in orderItem" :key="item.id">
				<view class="text">{{item.name}}</view>
				<view class="text">{{item.salePrice}}</view>
				<view class="text">{{item.placeType | type}}</view>
				<view class="text"></view>
			</view>
			<!-- 服务内容 -->
			<view class="textBox" v-if="type === 'SERVICE'" v-for="item in orderItem" :key="item.id">
				<view class="text">{{item.name}}</view>
				<view class="text">{{item.salePrice}}</view>
				<view class="text">{{item.peopleNumber}}</view>
				<view class="text">{{item.count}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:['orderItem','type'],
		filters:{
			title(title){
				const result = new Map([
					['GOODS','商品'],
					['DRESSINFO','服装'],
					['PLACE','景点'],
					['SERVICE','服务'],
				])
			},
			type(type){
				const result = new Map([
					['INT', '内景'],
					['OUT', '外景'],
					['NONE', '无']
				])
				return result.get(type)
			}
		},
		data(){
			return{
				titleBox:null
			}
		},
		mounted(){
			switch(this.type){
				case 'GOODS':
					this.titleBox = ['商品','单价','P数','数量']
					break
				case 'DRESSINFO':
					this.titleBox = ['服装','单价','类型','数量']
					break
				case 'PLACE':
					this.titleBox = ['景点','单价','类型','']
					break
				case 'SERVICE':
					this.titleBox = ['服务','单价','人数','数量']
					break
			}
		}
	}
</script>

<style lang="scss" scoped>
	.table{
		margin-top: 30rpx;
		.topTitle{
			font-size: 32rpx;
			border-left: 8rpx solid #61A3FF;
			.title{
				margin-left: 30rpx;
			}
		}
		.titleBox{
			height: 80rpx;
			line-height: 80rpx;
			background-color: #F7F7F7;
			font-size: 28rpx;
			color: #333333;
			margin-top: 20rpx;
			display: flex;
			justify-content: space-between;
			.title{
				flex: 1;
				text-align: center;
			}
			.title:nth-child(1){
				flex: 1.5;
			}
		}
		.textBox{
			color: #999999;
			font-size: 24rpx;
			background-color: #fcfcfc;
			display: flex;
			justify-content: space-between;
			.text{
				flex: 1;
				text-align: center;
				padding: 10rpx;
			}
			.text:nth-child(1){
				flex: 1.5;
			}
		}
	}
</style>
