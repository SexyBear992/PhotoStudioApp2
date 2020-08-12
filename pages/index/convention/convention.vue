/*********************************  拍照 选片 看板 取件 预约  ***************************************/
<template>
	<view>
		<section class="PullScroll-Page">
		  <s-pull-scroll ref="pullScroll" :back-top="true" :pullDown="pullDown" :pullUp="loadData">
				
				<searchModul ref="searchModul" @search="search"></searchModul>
				
				<view class="listBox" v-for="item in list" :key="item.orderId">
					
					<detailMoudel :info="item"></detailMoudel>
					
					<view class="butBox" v-for="(list, index) in item.orderItemBasisVos" :key="list.itemId">
						<view class="textBox">
							<view class="text">{{list.itemNo}} {{list.name}}</view>
							<view class="text">入册/入底：{{list.bookCount}}/{{list.bottomCount}} {{list.photoStatus|processStatus}}</view>
						</view>
						<view class="arrange" v-if="type === 'pzyy'" @click="pz(item.orderNo,index)">安排拍照</view>
						<view class="arrange" v-if="type === 'xpyy'" @click="xp(item.orderNo,index)">安排选片</view>
						<view class="arrange" v-if="type === 'kbyy'" @click="kb(item.orderNo,index)">安排看板</view>
						<view class="arrange" v-if="type === 'qjyy'" @click="qj(item.orderNo,index)">安排取件</view>
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
	import { getAllOrderItem } from '@/util/api/shop.js'
	export default {
		components:{
			sPullScroll,
			searchModul,
			detailMoudel
		},
		filters:{
			// 拍照状态
			processStatus (type) {
				const result = new Map([
					['NOT_PROCESSING', '未拍照'],
					['PROCESSING', '拍照中'],
					['COMPLETE', '拍照完成']
				])
				return result.get(type)
			},
		},
		data() {
			return {
				// 类型
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
					// reception:null,	//接单人ID	
					// startAssemblyPrice:null,	//开始套系金额	
					// startCreateTime:null,	//开始创建时间	
					// startOrderTime:null,	//开始订单时间	
				}
			};
		},
		onLoad(option){
			this.type = option.type
			let title
			switch(option.type){
				case 'pzyy':
					title = '拍照预约'
					break;
				case 'kbyy':
					title = '看板预约'
					break;
				case 'xpyy':
					title = '选片预约'
					break;
				case 'qjyy':
					title = '取件预约'
					break;
			}
			uni.setNavigationBarTitle({
				title:title
			})
			
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
			pz(e,index){
				// 该 index 为子订单下标
				uni.navigateTo({
					url:'../arrange/arrange?indexType=pz&orderNo=' + e + '&index=' + index
				})
			},
			// 安排选片
			xp(e,index){
				uni.navigateTo({
					// url:'../xp/xpArrange/xpArrange?orderNo=' + e + '&index=' + index
					url:'../arrange/arrange?indexType=xp&orderNo=' + e + '&index=' + index
				})
			},
			// 安排看板
			kb(e,index){
				uni.navigateTo({
					// url:'../kb/kbArrange/kbArrange?orderNo=' + e + '&index=' + index,
					url:'../arrange/arrange?indexType=kb&orderNo=' + e + '&index=' + index
				})
			},
			// 安排取件
			qj(e,index){
				uni.navigateTo({
					// url:'../qj/qjArrange/qjArrange?orderNo=' + e + '&index=' + index
					url:'../arrange/arrange?indexType=qj&orderNo=' + e + '&index=' + index
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
		justify-content: space-between;
		margin: 0 30rpx;
		padding: 30rpx 0;
		border-bottom: 1rpx solid #DDDDDD;
		.textBox{
			font-size: 32rpx;
			font-weight: bold;
			margin-left: 30rpx;
			.text{
				width: 360rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
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
			margin-top: 15rpx;
		}
	}
	.butBox:nth-child(1){
		border-bottom: none;
	}
	.noMove{
		font-size: 28rpx;
		color: #a2a2a2;
		text-align: center;
		margin-bottom: 30rpx
	}
</style>
