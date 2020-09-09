/********************************  套系内容  *************************************/
<template>
	<view class="bigBox">
		<i-collapse accordion>
			<i-collapse-item 
				i-class="collapse-item"
				i-class-title="collapse-item-title"
				i-class-content="collapse-item-content"
				i-title-wrap="title-wrap"
				i-con="i-con"
				v-for="item in assemblyInfo" 
				:key="item.itemId" 
				:title="item.name" 
				:name="item.itemId" 
				@click.native="getItemId(item.itemId)"
			>
				<view slot="content">
					<!-- 基本信息 -->
					<view class="basisInfo">
						<!-- 价格 -->
						<view class="list">
							<view class="title">价格：</view>
							<view class="text">{{item.price}}</view>
						</view>
						<!-- 精修 -->
						<view class="list">
							<view class="title">精修：</view>
							<view class="text">{{item.refineCount}}</view>
						</view>
						<!-- 拍摄张数 -->
						<view class="list">
							<view class="title">拍摄张数：</view>
							<view class="text">{{item.photoCount}}</view>
						</view>
						<!-- 入底 -->
						<view class="list">
							<view class="title">入底：</view>
							<view class="text">{{item.bottomCount}}</view>
						</view>
						<!-- 入册 -->
						<view class="list">
							<view class="title">入册：</view>
							<view class="text">{{item.bookCount}}</view>
						</view>
					</view>
					
					<!-- 列表信息 -->
					<view class="tableBox">		
					<view class="refreshBox">
						<view class="refresh" @click="resh(item.itemId)">
							<i-icon type="refresh" size="20" color="#80848f" />
						</view>
					</view>
						<assemblyTable v-if="showOrderItem.orderItemGoods.length > 0" :orderItem="showOrderItem.orderItemGoods" :type="'GOODS'"></assemblyTable>
						<assemblyTable v-if="showOrderItem.orderItemDressInfo.length > 0" :orderItem="showOrderItem.orderItemDressInfo" :type="'DRESSINFO'"></assemblyTable>
						<assemblyTable v-if="showOrderItem.orderItemPlace.length > 0" :orderItem="showOrderItem.orderItemPlace" :type="'PLACE'"></assemblyTable>
						<assemblyTable v-if="showOrderItem.orderItemService.length > 0" :orderItem="showOrderItem.orderItemService" :type="'SERVICE'"></assemblyTable>
					</view>
				</view>
			</i-collapse-item>
		</i-collapse>
	</view>
</template>

<script>
	import assemblyTable from './assemblyTable.vue'
	import { getOrderItem } from '@/util/api/shop.js'
	export default{
		props:['assemblyInfo'],
		components:{
			assemblyTable
		},
		data(){
			return{
				name:null,
				// 已获取子订单
				geted:[],
				// 已获取子订单详情
				orderItem:[],
				// 显示子订单详情
				showOrderItem:null,
			}
		},
		methods:{
			// 获取点击ID
			getItemId(e){
				if(!this.geted.includes(e)){
					this.geted.push(e)
					this.geted = [...new Set(this.geted)]
					this.getOrderItem(e)
				}else{
					this.orderItem.some((i)=>{
						if(i.itemId === e){
							this.showOrderItem = i
						}
					})
				}
			},
			// 获取子订单详情
			getOrderItem(e){
				getOrderItem({itemId:e}).then(res=>{
					let obj = res.data.data
					obj.itemId = e
					this.orderItem.push(obj)
					this.showOrderItem = obj
				})
			},
			// 刷新
			resh(e){
				this.getOrderItem(e)
			}
		},
	}
</script>

<style lang="scss">

	/deep/.collapse-item{
		padding: 0 !important;
		border: 0 !important;
		margin-top: 5rpx;
	}
	/deep/.title-wrap{
		background-color: #61A3FF;
		padding: 10rpx 30rpx !important;
		display: flex;
		justify-content: space-between;
	}
	/deep/.collapse-item-title{
		margin-left: 30rpx;
		color: #FFFFFF;
		font-size: 28rpx;
	}
	/deep/.i-con{
		color: #FFFFFF;
	}
	
	.basisInfo{
		.list{
			display: flex;
			font-size: 28rpx;
			padding: 0 20rpx;
			margin-top: 30rpx;
			height: 80rpx;
			line-height: 80rpx;
			border-bottom: 1rpx solid #DDDDDD;
			.title{
				width: 270rpx;
			}
		}
	}
	
	.tableBox{
		.refreshBox{
			display: flex;
			flex-direction: row-reverse;
		}
		.refresh{
			
		}
	}
</style>
