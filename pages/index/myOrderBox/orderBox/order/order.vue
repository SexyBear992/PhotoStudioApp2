<template>
	<view>
		<section class="PullScroll-Page">
		  <s-pull-scroll ref="pullScroll" :back-top="true" :pullDown="pullDown" :pullUp="loadData">
				
				<searchModul ref="searchModul" @search="search"></searchModul>
				
				<view class="listBox" v-for="item in list" :key="item.orderId">
					
					<detailMoudel :info="item"></detailMoudel>
					
					<view class="butBox">
						<view class="scheduleBut" @click="schedule(item.orderNo)">进度查询</view>
						<view class="detailsBut" @click="orderDetails(item.orderId)">订单详情</view>
					</view>
					
				</view>
		  
				<view class="noMove" v-if="showNoMore">没有更多数据</view>
			</s-pull-scroll>
		</section>
		<i-message id="message" />
	</view>
</template>

<script>
	import searchModul from '@/components/searchModul.vue'
	import sPullScroll from '@/components/s-pull-scroll';
	import detailMoudel from '@/components/detailMoudel.vue'
	import {getMyOrder, getTeamOrder, getAllOrder, getSubordinatesOrder} from '@/util/api/shop.js'
	export default {
		components:{
			sPullScroll, 
			searchModul,
			detailMoudel
		},
		data() {
			return {
				// 订单类型
				type:null,
				
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
					// startAssemblyPrice:null,	//开始套系金额	
					// startCreateTime:null,	//开始创建时间	
					// startOrderTime:null,	//开始订单时间	
					// type:null,	//订单类型
				}
			};
		},
		onLoad(option){
			this.type = option.type
			// 赋值小程序标题
			uni.setNavigationBarTitle({
				title: option.typeName
			});
			this.refresh();
		},
		onShow(){
			this.getOrder().then(res=>{
				const curList = res.records
				let arr = []
				curList.forEach((i)=>{
					arr.push(i)
				})
				this.list = arr
			})
		},
		methods:{
			// 获取订单
			getOrder(){
				if(this.type === 'wddd'){
					return getMyOrder(this.params).then(res=>{
						return Promise.resolve(res.data.data)
					})
				}else if(this.type === 'xsdd'){
					return getSubordinatesOrder(this.params).then(res=>{
						return Promise.resolve(res.data.data)
					})
				}else if(this.type === 'bmdd'){
					return getTeamOrder(this.params).then(res=>{
						return Promise.resolve(res.data.data)
					})
				}else if(this.type === 'sydd'){
					return getAllOrder(this.params).then(res=>{
						return Promise.resolve(res.data.data)
					})
				}
			},

			// 搜索
			search(e){
				this.params = e
				// console.log(this.params)
				this.list = [];
				this.getOrder().then(res=>{
					const curList = res.records
					curList.forEach((i)=>{
						this.list.push(i)
					})
				})
			},
			// 订单详情
			orderDetails(orderId){
				uni.navigateTo({
					url:'../details/details?orderId=' + orderId
				})
			},
			// 进度查询
			schedule(orderNo){
				uni.navigateTo({
					url:'../schedule/schedule?orderNo=' + orderNo
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
					this.getOrder().then(res=>{
						this.total = res.total
						const curList = res.records
						curList.forEach((i)=>{
							this.list.push(i)
						})
					})
					this.showNoMore = false
				}else{
					this.showNoMore = true
				}
				if(!this.showNoMore){
					this.params.page = pullScroll.page
				}
				// if (this.list.length > 60) {
				// 	// finish(boolean:是否显示finishText,默认显示)
				// 	pullScroll.finish(this.list.length > 5);
				// } else {
					pullScroll.success();
				// }
			  // }, 500);
			}
		},
		watch:{
			type(){
			}
		}
	}
</script>

<style lang="scss" scoped>
	.listBox{
		width:690rpx;
		// height:665px;
		margin: 30rpx auto;
		background:rgba(255,255,255,1);
		box-shadow:0rpx 7rpx 29rpx 6rpx rgba(0, 0, 0, 0.03);
		border-radius:10rpx;
		font-size: 28rpx;
		.butBox{
			display: flex;
			flex-direction: row-reverse;
			padding: 30rpx;
			.detailsBut,.scheduleBut{
				width: 180rpx;
				height: 60rpx;
				line-height: 60rpx;
				text-align: center;
				border: 1rpx solid #d2d2d2;
				border-radius: 30rpx;
			}
			.scheduleBut{
				background-color: #61a3ff;
				color: #FFFFFF;
				border: 1rpx solid #61a3ff;
				margin-left: 30rpx;
				box-shadow:0rpx 7rpx 14rpx 1rpx rgba(97,163,255,0.27);
			}
		}
	}
	.noMove{
		font-size: 28rpx;
		color: #a2a2a2;
		text-align: center;
		margin-bottom: 30rpx
	}
</style>
