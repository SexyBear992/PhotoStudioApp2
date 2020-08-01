<template>
	<view>
		<section class="PullScroll-Page">
		  <s-pull-scroll ref="pullScroll" :back-top="true" :pullDown="pullDown" :pullUp="loadData">
				
				<searchModul ref="searchModul" @search="search"></searchModul>
				
				<view class="listBox" v-for="item in list" :key="item.orderId">
					
					<!-- 顶部 订单号 订单类型 -->
					<view class="topNum">
						<view class="topConLeft">
							<view>订单号：</view>
							<view>{{item.orderNo}}</view>
						</view>
						<view class="topConRight">
							<image :src="item.type | img" mode=""></image>
							<view class="text">
								{{item.type | type}}
							</view>
						</view>
					</view>
					
					<!-- 订单信息 -->
					<view class="orderBox">
						<!-- 联系人信息 -->
						<view class="userInfo" v-for="user in item.customerContactBasicVos" :key="item.orderId">
							<view class="userLeft">
								<view class="callName">{{user.callName}}：</view>
								<view class="name">{{user.name}}</view>
							</view>
							<view class="userRight">
								<view>手机号：</view>
								<view>{{user.mobile | noMobile}}</view>
							</view>
						</view>
						
						<!-- 宝宝信息 -->
						<view class="babyInfo" v-for="baby in item.customerBabyBasicVos" :key="item.orderId">
							<view class="callName">{{baby.callName}}：</view>
							<view class="name">{{baby.name}}</view>
						</view>
						
						<!-- 订单详情 -->
						<view class="orderInfo">
							<view class="list">
								<view class="listLeft">
									<view class="title">订单门店：</view>
									<view class="text">{{shopIdMap.get(item.orderShopId)}}</view>
								</view>
								
								<view class="listRight">
									<view class="title">订单时间：</view>
									<view class="text">{{item.orderTime}}</view>
								</view>
							</view>
							
							<view class="list">
								<view class="listLeft">
									<view class="title">订单分类：</view>
									<view class="text">{{typeIdMap.get(item.orderCategoryId) | none}}</view>
								</view>
								
								<view class="listRight">
									<view class="title">订单分组：</view>
									<view class="text">{{groupIdMap.get(item.groupCategoryId) | none}}</view>
								</view>
							</view>
							
							<view class="list">
								<view class="listLeft">
									<view class="title">套系名称：</view>
									<view class="text">{{item.assemblyName}}</view>
								</view>
								
								<view class="listRight">
									<view class="title">套系金额：</view>
									<view class="text">{{item.assemblyPrice}}</view>
								</view>
							</view>
							
							<view class="list">
								<view class="listLeft">
									<view class="title">服务等级：</view>
									<view class="text">{{serviceIdMap.get(item.serviceCategoryId) | none}}</view>
								</view>
								
								<view class="listRight">
									<view class="title">老师级别：</view>
									<view class="text">{{teacherIdMap.get(item.teacherCategoryId) | none}}</view>
								</view>
							</view>
							
							<view class="list">
								<view class="listLeft">
									<view class="title">接单人员：</view>
									<view class="text">{{item.receptionist | reception}}</view>
								</view>
								
							</view>
						</view>
					</view>
					
					<view class="butBox">
						<view class="scheduleBut" @click="schedule(item.orderNo)">进度查询</view>
						<view class="detailsBut" @click="orderDetails(item.orderId)">订单详情</view>
					</view>
					
				</view>
		  
				<view class="noMove" v-if="showNoMore">没有更多数据</view>
			</s-pull-scroll>
		</section>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	import searchModul from './components/searchModul.vue'
	import sPullScroll from '@/components/s-pull-scroll';
	import {getMyOrder, getTeamOrder, getAllOrder, getSubordinatesOrder} from '@/util/api/shop.js'
	export default {
		components:{sPullScroll, searchModul},
		computed:{
			...mapGetters('shopArr',[
				'get_shopAllArr',
				'get_orderTypeArr',
				'get_orderGroup',
				'get_serviceCategory',
				'get_teacherCategory'
			])
		},
		filters:{
			type(type){
				const result = new Map([
					['WEDDING_DRESS', '婚纱订单'],
					['BABY', '儿童订单'],
					['PREGNANT', '孕妈订单'],
					['SERVICE', '服务订单'],
					['PORTRAY', '写真订单'],
					['WEDDING', '婚庆订单'],
				])
				return result.get(type)
			},
			img(type){
				let url = 'https://7068-photostudioapp-1302515241.tcb.qcloud.la/newIcon/'
				const result = new Map([
					['WEDDING_DRESS', url+ 'WEDDING_DRESS.png'],
					['BABY', url+ 'BABY.png'],
					['PREGNANT', url+ 'PREGNANT.png'],
					['SERVICE', url+ 'SERVICE.png'],
					['PORTRAY', url+ 'PORTRAY.png'],
					['WEDDING', url+ 'WEDDING.png'],
				])
				return result.get(type)
			},
			reception(arr){
				return arr.join('/')
			},
			none(data){
				if(data){
					return data
				}else{
					return '未选择'
				}
			},
			noMobile(data){
				if(data){
					return data
				}else{
					return '未填写'
				}
			}
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
				
				
				// 过滤门店
				shopIdMap: new Map(),
				// 过滤分组
				groupIdMap: new Map(),
				// 过滤分类
				typeIdMap: new Map(),
				// 过滤服务
				serviceIdMap: new Map(),
				// 过滤老师
				teacherIdMap: new Map(),
				
				parmas:{
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
		mounted(){
			this.shopIdMap = new Map(this.get_shopAllArr.map(item => [item.shopId, item.shopName]))
			this.groupIdMap = new Map(this.get_orderGroup.map(item => [item.id, item.name]))
			this.typeIdMap = new Map(this.get_orderTypeArr.map(item => [item.id, item.name]))
			this.serviceIdMap = new Map(this.get_serviceCategory.map(item => [item.id, item.name]))
			this.teacherIdMap = new Map(this.get_teacherCategory.map(item => [item.id, item.name]))
		},
		methods:{
			// 获取订单
			getOrder(){
				if(this.type === 'wddd'){
					return getMyOrder(this.parmas).then(res=>{
						return Promise.resolve(res.data.data)
					})
				}else if(this.type === 'xsdd'){
					return getSubordinatesOrder(this.parmas).then(res=>{
						return Promise.resolve(res.data.data)
					})
				}else if(this.type === 'bmdd'){
					return getTeamOrder(this.parmas).then(res=>{
						return Promise.resolve(res.data.data)
					})
				}else if(this.type === 'sydd'){
					return getAllOrder(this.parmas).then(res=>{
						return Promise.resolve(res.data.data)
					})
				}
			},

			// 搜索
			search(e){
				this.parmas = e
				// console.log(this.parmas)
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
				this.parmas.page = pullScroll.page
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
		.topNum{
			border-bottom: 1rpx solid #DDDDDD;
			display: flex;
			justify-content: space-between;
			padding: 30rpx;
			.topConLeft{
				display: flex;
			}
			.topConRight{
				display: flex;
				image{
					width: 28rpx;
					height: 28rpx;
					margin: 5rpx 10rpx 0 0;
				}
				.text{
					color: #61A3FF;
				}
			}
		}
		.orderBox{
			border-bottom: 1rpx solid #DDDDDD;
			margin: 0 30rpx;
			padding-top: 30rpx;
			.userInfo{
				font-size: 28rpx;
				display: flex;
				// justify-content: space-between;
				margin-bottom: 30rpx;
				.userLeft,.userRight{
					flex: 1;
					display: flex;
				}
				.userRight{
					margin-left: 10rpx;
				}
			}
			.babyInfo{
				display: flex;
				margin-bottom: 30rpx;
			}
			.orderInfo{
				font-size: 24rpx;
				color: #a2a2a2;
				.list{
					display: flex;
					// justify-content: space-between;
					margin-bottom: 30rpx;
					.listLeft,.listRight{
						flex: 1;
						display: flex;
					}	
					.listRight{
						margin-left: 10rpx;
					}
				}
			}
		}
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
