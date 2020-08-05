/****************************** 预约拍照 *********************************/
<template>
	<view>
		<section class="PullScroll-Page">
		  <s-pull-scroll ref="pullScroll" :back-top="true" :pullDown="pullDown" :pullUp="loadData">
				
				<searchModul ref="searchModul" @search="search"></searchModul>
				
				<view class="listBox" v-for="item in list" :key="item.orderId">
					
					<detailMoudel :info="item"></detailMoudel>
					
					<view class="butBox">
						<view class="arrange" @click="arrange(item.orderNo)">安排拍照</view>
					</view>
					
				</view>
		  
				<view class="noMove" v-if="showNoMore">没有更多数据</view>
			</s-pull-scroll>
		</section>
	</view>
</template>

<script>
	import searchModul from '@/components/searchModul.vue'
	import sPullScroll from '@/components/s-pull-scroll';
	import detailMoudel from '@/components/detailMoudel.vue'
	import { getAllOrderItem } from '@/util/api/shop.js'
	export default {
		components:{
			sPullScroll,
			searchModul,
			detailMoudel
		},

		data() {
			return {
				// 总数量
				total:11,
				// 列表
				list: [],
				// 没有更多
				showNoMore:false,
				
				
				params:{
					isSearchCount:true,
					limit:10,
					page:1,
					// assemblyCategoryId:null,	//套系类别
					// assemblyName:null,	//套系名称
					// categoryId:null,	//客户区域	
					// contactMobile:null,	//订单主联系人电话
					// contactName:null,	//订单主联系人姓名
					// createUser:null,	//录入人	
					// endAssemblyPrice:null,	//结束套系金额
					// endCreateTime:null,	//结束创建时间	
					// endOrderTime:null,	//结束订单时间	
					// orderCategoryId:null,	//订单类别	
					// orderNo:null,	//订单号	
					// orderShopId:null,	//订单门店	
					// originId:null,	//客户来源	
					// reception:null,	//接单人ID	
					// startAssemblyPrice:null,	//开始套系金额	
					// startCreateTime:null,	//开始创建时间	
					// startOrderTime:null,	//开始订单时间	
				}
			};
		},
		onLoad(){
			this.refresh();
		},
		methods:{
			// 获取摄化订单详情
			getAllOrderItem(){
				getAllOrderItem(this.params).then(res=>{
					this.total = res.data.data.total
						const curList = res.data.data.records
						curList.forEach((i)=>{
							this.list.push(i)
						})
					
				})
			},
			
			// 搜索
			search(e){
				this.params = e
				this.list = [];
				this.getAllOrderItem()
			},
			
			// 安排拍照
			arrange(e){
				uni.navigateTo({
					url:'./arrange/arrange?orderNo=' + e
				})
			},
			
			// 组件
			refresh () {
			  this.$nextTick(() => {
			    this.$refs.pullScroll.refresh();
			  });
			},
			pullDown (pullScroll) {
			  setTimeout(() => {
			    this.loadData(pullScroll);
			  }, 200);
			},
			loadData (pullScroll) {
				
				// console.log(pullScroll.page)
				if (pullScroll.page == 1) {
					this.list = [];
				}
				if(this.list.length < this.total){
					this.getAllOrderItem()
					this.showNoMore = false
				}else{
					this.showNoMore = true
				}
				if(!this.showNoMore){
					this.params.page = pullScroll.page
				}
				pullScroll.success();
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.butBox{
		display: flex;
		flex-direction: row-reverse;
		padding: 30rpx;
		.arrange{
			width: 180rpx;
			height: 60rpx;
			font-size: 28rpx;
			line-height: 60rpx;
			text-align: center;
			border-radius: 30rpx;
			background-color: #61a3ff;
			color: #FFFFFF;
			border: 1rpx solid #61a3ff;
			box-shadow:0rpx 7rpx 14rpx 1rpx rgba(97,163,255,0.27);
		}
	}
	.noMove{
		font-size: 28rpx;
		color: #a2a2a2;
		text-align: center;
		margin-bottom: 30rpx
	}
</style>
