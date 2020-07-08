<template>
	<view>
		<view class="main">
			<!-- 新增产品 product-->
			<view class="labelBox moveView" v-if="typeName == 'newProduct'">
				<view class="top">
					<!-- <view class="title">新增产品</view> -->
					<view class="add" @click="add">新增</view>
				</view>
				<view class="labe">
					<view class="titleBox tB">
						<view class="titleLB fTLB">商品</view>
						<view class="titleLB">单价</view>
						<view class="titleLB">P数</view>
						<view class="titleLB">数量</view>
					</view>
					<view class="titleBox" v-for="(list,ind) in orderInfo" :key='ind'>
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
								<view class="del" @click="del(ind)">删除</view>
							</movable-view>
						</movable-area>
					</view>
				</view>
			</view>
			<!-- 新增服装 clothing-->
			<view class="labelBox moveView" v-if="typeName == 'newClothing'">
				<view class="top">
					<!-- <view class="title">新增服装</view> -->
					<view class="add"  @click="add">新增</view>
				</view>
				<view class="labe">
					<view class="titleBox tB">
						<view class="titleLB fTLB">服装</view>
						<view class="titleLB">单价</view>
						<view class="titleLB">类型</view>
						<view class="titleLB">数量</view>
					</view>
					<view class="titleBox" v-for="(list,ind) in orderInfo" :key='ind'>
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
								<view class="del" @click.stop="del(ind)">删除</view>
							</movable-view>
						</movable-area>
					</view>
				</view>
			</view>
			<!-- 景点 attractions-->
			<view class="labelBox moveView" v-if="typeName == 'newAttractions'">
				<view class="top">
					<!-- <view class="title">新增景点</view> -->
					<view class="add"  @click="add">新增</view>
				</view>
				<view class="labe">
					<view class="titleBox tB">
						<view class="titleLB fTLB">景点</view>
						<view class="titleLB">单价</view>
						<view class="titleLB">类型</view>
						<view class="titleLB"></view>
					</view>
					<view class="titleBox" v-for="(list,ind) in orderInfo" :key='ind'>
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
								<view class="del" @click="del(ind)">删除</view>
							</movable-view>
						</movable-area>
					</view>
				</view>
			</view>
			<!-- 服务 service-->
			<view class="labelBox moveView" v-if="typeName == 'newService'">
				<view class="top">
					<!-- <view class="title">新增服务</view> -->
					<view class="add"  @click="add">新增</view>
				</view>
				<view class="labe">
					<view class="titleBox tB">
						<view class="titleLB fTLB">服务</view>
						<view class="titleLB">单价</view>
						<view class="titleLB">人数</view>
						<view class="titleLB">数量</view>
					</view>
					<view class="titleBox" v-for="(list,ind) in orderInfo" :key='ind'>
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
								<view class="del" @click="del(ind)">删除</view>
							</movable-view>
						</movable-area>
					</view>
				</view>
			</view>
			<!-- 取消/确定 -->
			<view class="butBox">
				<view class="cancel" @click="cancel">取消</view>
				<view class="determine" @click="determine">确认</view>
			</view>
		</view>		
	</view>
</template>

<script>
	import {mapGetters} from 'vuex'
	import orderInfo from '../../../../components/childOrder/orderInfo.js'
	export default {
		data() {
			return {
				// 类型名字
				typeName:'',
				// 下标
				ind:'',
				// 订单
				orderInfo:[],
			};
		},
		computed:{
			...mapGetters([
				'addList'
			])
		},
		onLoad(option){
			this.typeName = option.type
			this.ind = option.ind
			switch(option.type){
				case 'newProduct':
					var tit = '产品';
					break;
				case 'newClothing':
					var tit = '服装';
					break;
				case 'newAttractions':
					var tit = '景点'
					break;
				case 'newService':
					var tit = '服务'
					break
			}

			uni.setNavigationBarTitle({
				title:tit
			})
		},
		mounted(){
			this.orderInfo = orderInfo[this.ind][this.typeName]
		},
		methods:{
			onChange: function(e,list){
				// // console.log(e.detail.x)
				if(e.detail.x < -35){
					list.close = -77
				}else if(e.detail.x >= -35){
					list.close = 0
				}
				
			},
			// 删除
			del(index){
				// list[index+1].close = 0
				this.orderInfo.splice(index,1)
			},
			// 新增
			add(){
				uni.navigateTo({
					url:'../../openOrderBox/chooseList/chooseList?type=' + this.typeName
				})
			},
			// 取消
			cancel(){
				uni.navigateBack({
					delta:1
				})
			},
			// 确认
			determine(){
				uni.navigateBack({
					delta:1
				})
			},
		},
		watch:{
			addList(){
				let _this = this
				this.addList.arr.forEach((i)=>{
					_this.orderInfo.push(i)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.main{
	width: 700rpx;
	margin: 10rpx auto;
	.labelBox{
		.top{
			display: flex;
			flex-direction: row-reverse;
			.title{
				background-color: #FFFFFF;
				padding-left: 0;
			}
			.add{
				font-size: 28rpx;
				margin: 10rpx;
			}
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
	.butBox{
		margin-top: 20rpx;
		display: flex;
		justify-content: flex-end;
		.cancel{
			width: 120rpx;
			height: 60rpx;
			line-height: 60rpx;
			text-align: center;
			font-size: 28rpx;
			border-radius: 10rpx;
			border: 1rpx solid #C0C0C0;
		}
		.determine{
			width: 120rpx;
			height: 60rpx;
			line-height: 60rpx;
			text-align: center;
			font-size: 28rpx;
			border-radius: 10rpx;
			margin-left: 20rpx;
			color: #FFFFFF;
			background-color: #2d8cf0;
		}
	}
}


</style>
