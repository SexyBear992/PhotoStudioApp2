<template>
	<view>
		<view class="bigBox">
			<view class="titleBox">
				<view class="left">
					<view>{{itemNo}}</view>
					<view>{{name}}</view>
				</view>
			</view>
			
			<!-- 预约门店 -->
			<shop :shopId="params.orderItemProcessReservation.reservationShopId" @getId="getShopId"></shop>
			
			<!-- 预约日期 -->
			<view class="box">
				<view class="title">预约日期</view>
				<view class="text" @click="openMyCalendar">
					<view>{{params.orderItemProcessReservation.reservationDate | time}}</view>
					<i-icon type="enter" color="#80848f"/>
				</view>
			</view>
			
			<!-- 预约时间 -->
			<Atime 
				:date="params.orderItemProcessReservation.reservationDate" 
				:shopId="params.orderItemProcessReservation.reservationShopId" 
				:typography="params.orderItemProcessReservation.typographyTypeId" 
				:time="params.orderItemProcessReservation.reservationTime" 
				@getTime="getTime"
			></Atime>
			
		</view>
		<i-message id="message" />
	</view>
</template>

<script>
	const { $Message } = require('@/wxcomponents/base/index');
	import { mapGetters } from 'vuex'
	import shop from '@/pages/index/pz/pzArrange/AddorUpdataItem/components/shop.vue'
	import Atime from '@/pages/index/pz/pzArrange/AddorUpdataItem/components/Atime.vue'
	import { getChooseDetail } from '@/util/api/shop.js'
	export default {
		components:{
			shop,
			Atime
		},
		computed:{
			...mapGetters('app',[
				'shopId' 
			]),
		},
		data() {
			return {
				// 子订单号
				itemNo:null,
				// 子订单名
				name:null,
				// 订单类型
				type:null,
				
				params:{
					orderItemProcessReservation:{//	预约信息
						reservationDate:null,	//预约日期
						reservationShopId:null,	//预约门店ID
						reservationTime:null, //预约时间
						typographyTypeId:null, //模板ID
					},
					shopId:null
				}
			};
		},
		onLoad(option){
			console.log(option)
			this.itemNo = option.itemNo
			this.name = option.name
			this.type = option.type
			if(JSON.parse(option.id)){
				this.getChooseDetail(option.id)
				uni.setNavigationBarTitle({
					title:'修改选片预约'
				})
			}else{
				uni.setNavigationBarTitle({
					title:'新增选片预约'
				})
			}
		},
		onShow(){
			let pages = getCurrentPages();
			let currPage = pages[pages.length - 1]; //当前页面
			let date = currPage.data.date
			let place = currPage.data.place
			let dress = currPage.data.dress
			if(date){
				this.params.orderItemProcessReservation.reservationDate = date.date
			}
		},
		mounted(){
			// 赋值当前门店ID
			this.params.shopId = this.shopId
			if(!this.params.id){
				this.params.orderItemProcessReservation.reservationShopId = this.shopId
			}
		},
		methods:{
			// 获得详情
			getChooseDetail(id){
				getChooseDetail({id:id}).then(res=>{
					console.log('详情',res)
				})
			},
			
			// 打开选日期
			openMyCalendar(){
				uni.navigateTo({
					url:'../../../../calendar/calendar?id=' + this.params.orderItemProcessReservation.reservationShopId
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/pages/index/pz/pzArrange/AddorUpdataItem/components/component.scss';
	.bigBox{
		.titleBox{
			display: flex;
			justify-content: space-between;
			padding: 30rpx;
			font-size: 32rpx;
			font-weight: bold;
			border-bottom: 1rpx solid #DDDDDD;
			.left{
				display: flex;
				>view{
					margin-right: 20rpx;
				}
			}		
		}
	}
</style>
