<template>
	<view>
		<view class="allMoney">套系金额{{allMoney}}元</view>
		<view class="newList" v-for="(item,index) in orderInfo" :key="index">
			<view class="title">
				<view class="text">
					{{seriesName}}
				</view>
				<view v-if="index != 0" class="deleteOrder" @click="deleteOrder(index)">删除子单</view>
			</view>
			<view class="main">
				<!-- 价格 -->
				<view class="listBox">
					<view class="titleL">价格</view>
					<input type="number" class="text" v-model="item.orderMoney"/>
				</view>
				<!-- 精修 -->
				<view class="listBox">
					<view class="titleL">精修</view>
					<input type="number" class="text" v-model="item.modify"/>
				</view>
				<!-- 拍摄保底张数 -->
				<view class="listBox">
					<view class="titleL">拍摄保底张数</view>
					<input type="number" class="text" v-model="item.photoNum"/>
				</view>
				<!-- 入底 -->
				<view class="listBox">
					<view class="titleL">入底</view>
					<input type="number" class="text" v-model="item.onBottom"/>
				</view>
				<!-- 入册 -->
				<view class="listBox">
					<view class="titleL">入册</view>
					<input type="number" class="text" v-model="item.onCopies"/>
				</view>
				<!-- 新增产品 product-->
				<view class="labelBox">
					<view class="title">新增产品</view>
					<view class="labe">
						<view class="titleBox">
							<view class="titleLB">商品</view>
							<view class="titleLB">P数</view>
							<view class="titleLB">数量</view>
							<view class="titleLB">价格</view>
							<view class="titleLB">加急</view>
							<view class="titleLB">取件方式</view>
							<view class="titleLB">备注</view>
						</view>
						<view class="textBox1">
							<view class="textLB">
								<view class="textLBtitle">10*10杂志</view>
							</view>
							<input class="textLB" v-model="item.newProduct.pPnum1"/>
							<input class="textLB" v-model="item.newProduct.pNum1"/>
							<input class="textLB" v-model="item.newProduct.pMoney1"/>
							<input class="textLB" v-model="item.newProduct.pUrgent1"/>
							<input class="textLB" v-model="item.newProduct.pGetFun1"/>
							<input class="textLB" v-model="item.newProduct.pNote1"/>
						</view>
						<view class="textBox2">
							<view class="textLB">
								<view class="textLBtitle">36寸放大</view>
							</view>
							<input class="textLB" v-model="item.newProduct.pPnum2"/>
							<input class="textLB" v-model="item.newProduct.pNum2"/>
							<input class="textLB" v-model="item.newProduct.pMoney2"/>
							<input class="textLB" v-model="item.newProduct.pUrgent2"/>
							<input class="textLB" v-model="item.newProduct.pGetFun2"/>
							<input class="textLB" v-model="item.newProduct.pNote2"/>
						</view>
					</view>
				</view>
				<!-- 新增服装 clothing-->
				<view class="labelBox">
				<view class="title">新增服装</view>
				<view class="labe">
					<view class="titleBox">
						<view class="titleLB cTitle">商品</view>
						<view class="titleLB cTitle">数量</view>
						<view class="titleLB cTitle">单价</view>
						<view class="titleLB cTitle">类型</view>
						<view class="titleLB cTitle">备注</view>
					</view>
					<view class="textBox1">
						<view class="textLB cText">
							<view class="textLBtitle cTitle">10*10杂志</view>
						</view>
						<input class="textLB cText" v-model="item.newClothing.cNum1"/>
						<input class="textLB cText" v-model="item.newClothing.cPrice1"/>
						<input class="textLB cText" v-model="item.newClothing.cType1"/>
						<input class="textLB cText" v-model="item.newClothing.cNote1"/>
					</view>
					<view class="textBox2">
						<view class="textLB cText">
							<view class="textLBtitle cTitle">10*10杂志</view>
						</view>
						<input class="textLB cText" v-model="item.newClothing.cNum2"/>
						<input class="textLB cText" v-model="item.newClothing.cPrice2"/>
						<input class="textLB cText" v-model="item.newClothing.cType2"/>
						<input class="textLB cText" v-model="item.newClothing.cNote2"/>
					</view>
				</view>
			</view>
				
			</view>
		</view>
		
		<view class="addOrder" @click="addOrder">新增子单</view>
	</view>
</template>

<script>
	import orderInfo from '../pages/openOrderDetails/orderInfo.js'
	import addOrderList from '../pages/openOrderDetails/addOrderList.js'
	export default {
		props:['seriesName'],
		data() {
			return {
				// 订单
				orderInfo:[],
				// 套餐金额
				allMoney:null
			};
		},
		mounted(){
			this.orderInfo = orderInfo
			this.allMoney = parseInt(this.seriesName)
			orderInfo[0].orderMoney = parseInt(this.seriesName)
		},
		methods:{
			// 新增订单
			addOrder(){
				this.orderInfo.push(addOrderList)
			},
			// 删除子单
			deleteOrder(index){
				// index 为循环列表的下标
				this.orderInfo.splice(index, 1)
			},
		},
		watch:{
			orderInfo:{//深度监听，可监听到对象、数组的变化
				handler(val, oldVal){
					let arr = val.map((i)=>{
						return i.orderMoney
					})
					this.allMoney = arr.reduce((n,m) => n+m)
				},
				deep:true
			}
		}
	}
</script>

<style lang="scss" scoped>
.newList{
	padding-bottom: 50rpx;
	.title{
		background-color: #f5f5f5;
		color: #939393;
		font-size: 24rpx;
		padding: 20rpx 30rpx;
		display: flex;
		justify-content: space-between;
		.deleteOrder{
			border: 1rpx solid #FF0000;
			color: #FF0000;
			background-color: #FFFFFF;
			border-radius: 10rpx;
			padding: 5rpx;
			font-size: 20rpx;
		}
	}
	.main{
		margin: 0 30rpx;
		.listBox{
			display: flex;
			height: 80rpx;
			border-bottom: 1rpx solid #f9f9f9;
			line-height: 80rpx;
			font-size: 28rpx;
			.text{
				color: #909090;
				margin: auto 40rpx
			}
		}
		.labelBox{
			.title{
				background-color: #FFFFFF;
				padding-left: 0;
			}
			.labe{
				width: 700rpx;
				margin: 0 auto;
				.titleBox{
					background-color: #e3ecff;
					display: flex;
					justify-content: space-between;
					.titleLB{
						text-align: center;
						height: 80rpx;
						line-height: 80rpx;
						width: 14.3%;
						font-size: 24rpx;
						color: #6c90cf;
						// width: ;
					}
					.cTitle{
						width: 20%;
					}
				}
				.textBox1,.textBox2{
					margin-top: 5rpx;
					background-color: #f2f6ff;
					display: flex;
					justify-content: space-between;		
					.textLB{
						color: #000000;
						text-align: center;
						height: 80rpx;
						width: 14.3%;
						font-size: 24rpx;
						.textLBtitle{
							width: 70%;
							margin: auto;
							margin-top: 10rpx;
						}
						.cTitle{
							width: 60%;
						}
					}	
					.cText{
						width: 20% ;
					}
				}
			}
		}
	}	
}
.addOrder{
	border: 1rpx solid #6d9ef6;
	color: #6d9ef6;
	border-radius: 10rpx;
	font-size: 24rpx;
	height: 40rpx;
	width: 100rpx;
	line-height: 40rpx;
	text-align: center;
	margin-left: 50%;
	transform: translateX(-50%);
}
.allMoney{
	color: #FF0000;
	margin: 20rpx;
	font-size: 28rpx;
}
</style>
