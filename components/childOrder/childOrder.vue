<template>
	<view>
		<view class="allMoney">套系金额{{allMoney}}元</view>
		<view class="newList" v-for="(item,index) in orderInfo" :key="index">
			<view class="title">
				<view class="text">
					{{seriesName}}
				</view>
				<view class="butBox">
					<view class="addList" @click="openAddList(index)">新增</view>
					<view v-if="index != 0" class="deleteOrder" @click="deleteOrder(index)">删除子单</view>
				</view>
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
				<view class="labelBox moveView" v-if="item.newProduct.length>0">
					<view class="title">新增产品</view>
					<view class="labe">
						<view class="titleBox tB">
							<view class="titleLB fTLB">商品</view>
							<view class="titleLB">单价</view>
							<view class="titleLB">P数</view>
							<view class="titleLB">数量</view>
						</view>
						<view class="titleBox" v-for="(list,ind) in item.newProduct" :key='ind'>
							<movable-area class="movableArea">
							    <movable-view class="movableView" 
									:x="list.close" 
									direction="horizontal" 
									@change="onChange($event,list)"
								>
									<view class="textLB fTLB">{{list.title}}</view>
									<view class="textLB Money">{{list.price}}</view>
									<input class="textLB" v-model="list.pnum"/>
									<input class="textLB" v-model="list.num"/>
									<view class="del" @click="del(item.newProduct,ind)">删除</view>
								</movable-view>
							</movable-area>
						</view>
					</view>
				</view>
				<!-- 新增服装 clothing-->
				<view class="labelBox moveView" v-if="item.newClothing.length>0">
					<view class="title">新增服装</view>
					<view class="labe">
						<view class="titleBox tB">
							<view class="titleLB fTLB">服装</view>
							<view class="titleLB">单价</view>
							<view class="titleLB">类型</view>
							<view class="titleLB">数量</view>
						</view>
						<view class="titleBox" v-for="(list,ind) in item.newClothing" :key='ind'>
							<movable-area class="movableArea">
							    <movable-view class="movableView" 
									:x="list.close" 
									direction="horizontal" 
									@change="onChange($event,list)"
								>
									<view class="textLB fTLB">{{list.title}}</view>
									<view class="textLB Money">{{list.price}}</view>
									<view class="textLB">{{list.type}}</view>
									<input class="textLB" v-model="list.num"/>
									<view class="del" @click.stop="del(item.newClothing,ind)">删除</view>
								</movable-view>
							</movable-area>
						</view>
					</view>
				</view>
				<!-- 景点 attractions-->
				<view class="labelBox moveView" v-if="item.newAttractions.length>0">
					<view class="title">新增景点</view>
					<view class="labe">
						<view class="titleBox tB">
							<view class="titleLB fTLB">景点</view>
							<view class="titleLB">单价</view>
							<view class="titleLB">类型</view>
							<view class="titleLB"></view>
						</view>
						<view class="titleBox" v-for="(list,ind) in item.newAttractions" :key='ind'>
							<movable-area class="movableArea">
							    <movable-view class="movableView" 
									:x="list.close" 
									direction="horizontal" 
									@change="onChange($event,list)"
								>
									<view class="textLB fTLB">{{list.title}}</view>
									<view class="textLB Money">{{list.price}}</view>
									<view class="textLB">{{list.type}}</view>
									<input class="textLB" v-model="list.num"/>
									<view class="del" @click="del(item.newAttractions,ind)">删除</view>
								</movable-view>
							</movable-area>
						</view>
					</view>
				</view>
				<!-- 服务 service-->
				<view class="labelBox moveView" v-if="item.newService.length>0">
					<view class="title">新增服务</view>
					<view class="labe">
						<view class="titleBox tB">
							<view class="titleLB fTLB">服务</view>
							<view class="titleLB">单价</view>
							<view class="titleLB">人数</view>
							<view class="titleLB">数量</view>
						</view>
						<view class="titleBox" v-for="(list,ind) in item.newService" :key='ind'>
							<movable-area class="movableArea">
							    <movable-view class="movableView" 
									:x="list.close" 
									direction="horizontal" 
									@change="onChange($event,list)"
								>
									<view class="textLB fTLB">{{list.title}}</view>
									<view class="textLB Money">{{list.price}}</view>
									<view class="textLB">{{list.people}}</view>
									<input class="textLB" v-model="list.num"/>
									<view class="del" @click="del(item.newService,ind)">删除</view>
								</movable-view>
							</movable-area>
						</view>
					</view>
				</view>
			
			</view>
		</view>
		
		
		<view class="addOrder" @click="addOrder">新增子单</view>
		
		<!-- 抽屉弹窗 -->
		<uni-drawer
			mode="right"
			ref='drawer'
			class="drawer"
		>
			<view style="padding:30rpx;">
				<!-- 门店 -->
				<view>
					<view class="title">新增产品</view>
					<view class="text" v-for="(item,index) in addListType" :key="index" @click="goChooseList(item)">
						{{item}}
					</view>
				</view>
			</view>
		</uni-drawer>
	</view>
</template>

<script>
	import uniDrawer from "@/components/uni/uni-drawer/uni-drawer.vue"
	import orderInfo from './orderInfo.js'
	import addOrderList from './addOrderList.js'
	import {mapGetters} from 'vuex'
	export default {
		props:['seriesName'],
		components: {uniDrawer},
		data() {
			return {
				// 订单
				orderInfo:[],
				// 套餐金额
				allMoney:null,
				// 新增List类型
				addListType:['商品','服装','景点','服务'],
				// 增加List类型下标
				addListIndex : 0
			};
		},
		computed:{
			...mapGetters([
				'addList'
			])
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
			onChange: function(e,list){
				// console.log(e.detail.x)
				if(e.detail.x < -35){
					list.close = -77
				}else if(e.detail.x >= -35){
					list.close = 0
				}
			},
			del(list,index){
				// list[index+1].close = 0
				list.splice(index,1)
			},
			
			// 新增订单list
			openAddList(index){
				this.addListIndex = index
				this.$refs.drawer.open()
			},
			
			// 进入选择
			goChooseList(type){
				switch(type){
					case '商品':
						var t = 'newProduct';
						break;
					case '服装':
						var t =  'newClothing';
						break;
					case '景点':
						var t = 'newAttractions';
						break;
					case '服务':
						var t= 'newService';
						break;
				}
				uni.navigateTo({
					url:'../../pages/chooseList/chooseList?type=' + t
				})
				this.$refs.drawer.close()
			}
		},
		watch:{
			orderInfo:{//深度监听，可监听到对象、数组的变化
				handler(val, oldVal){
					let arr = val.map((i)=>{
						return Number(i.orderMoney)
					})
					this.allMoney = arr.reduce((n,m) => n+m)
				},
				deep:true
			},
			addList(){
				this.addList.arr.forEach((i)=>{
					(this.orderInfo[this.addListIndex])[this.addList.type].push(i)
				})
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
		.butBox{
			display: flex;
			.deleteOrder{
				border: 1rpx solid #FF0000;
				color: #FF0000;
				background-color: #FFFFFF;
				border-radius: 10rpx;
				padding: 5rpx;
				font-size: 20rpx;
			}
			.addList{
				margin-right: 20rpx;
			}
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
					overflow: hidden;
					display: flex;
					justify-content: space-between;
					background-color: #f2f6ff;
					.titleLB{
						text-align: center;
						height: 80rpx;
						line-height: 80rpx;
						font-size: 24rpx;
						color: #6c90cf;
						width: 20%;
					}
				}
				.tB{
					background-color: #e5edff;
				}
				.fTLB{
					width: 40% !important;
				}
			}
		}
		.moveView{
			margin-top: 20rpx;
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
.movableArea{
	width: 840rpx;
	height: 80rpx;
	.movableView{
		display: flex;
		width: 840rpx;
		height: 80rpx;
		.del{
			width: 20%;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			color: #FFFFFF;
			background-color: #FF0000;
		}
	}
	.textLB{
		width: 20%;
		color: #000000;
		text-align: center;
		height: 80rpx;
		font-size: 24rpx;
		line-height: 80rpx;
		.textLBtitle{
// 		// 	width: 70%;
// 		// 	margin: auto;
// 		// 	margin-top: 10rpx;
		}
	}	
}
.drawer{
	.title{
		font-size: 38rpx;
		font-weight: bold
	}
	.text{
		margin: 20rpx;
		font-size: 36rpx;
	}
	.liName{
		margin-left: 20rpx;
	}
}
</style>
