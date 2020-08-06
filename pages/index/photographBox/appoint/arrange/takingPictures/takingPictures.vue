/************************************  添加拍照 改期拍照  ******************************************/
<template>
	<view class="bigBox">
		<!-- 预约门店 -->
		<view class="listBox">
			<view class="title">预约门店</view>
			<pickerModule my-img="imgMargin" :arrInfo="shopArr" :nowName="nowPickerName" @getId="getShopId"></pickerModule>
		</view>
		<!-- 预约日期 -->
		<view class="listBox">
			<view class="title">预约日期</view>
			<view @click="openMyCalendar">calendarModal</view>
		</view>
		<!-- 档期分组 -->
		<view class="listBox">
			<view class="title">档期分组</view>
			<view>pickerModule</view>
		</view>
		<!-- 预约时间 -->
		<view class="listBox">
			<view class="title">预约时间</view>
			<view>pickerModule</view>
		</view>
		<!-- 拍照类型 -->
		<view class="listBox">
			<view class="title">拍照类型</view>
			<view>pickerModule</view>
		</view>
		<!-- 预约标签 -->
		<view class="listBox">
			<view class="title">预约标签</view>
			<view>pickerModule</view>
		</view>
		<!-- 拍微视频 -->
		<view class="switch">
			<switch @change="video" style="transform:scale(0.5)" color="#61a3ff"/>
			<view>拍微视频</view>
		</view>
		<!-- 预约景点 -->
		<view class="listBox">
			<view class="title">预约景点</view>
			<view>navigateTo</view>
		</view>
		<!-- 预约服装 -->
		<view class="listBox">
			<view class="title">预约服装</view>
			<view>navigateTo</view>
		</view>
		<!-- 通知状态 -->
		<view class="listBox">
			<view class="title">通知状态</view>
			<view>pickerModule</view>
		</view>
		<!-- 备注 -->
		<view class="remarkBox">
			<textarea placeholder="订单备注" />
		</view>
		
		<!-- 保存 或 修改 -->
		<view class="button" @click="addPhoto" v-if="isAdd">保存拍照预约</view>
		<view class="button" @click="updataPhoto" v-else>修改拍照预约</view>
	</view>
</template>

<script>
	import pickerModule from '@/components/pickerModule.vue'
	import { addPhotoInfo } from '@/util/api/shop.js'
	import { mapGetters } from 'vuex'
	export default {
		components:{
			pickerModule,
		},
		computed:{
			...mapGetters('app',[
				'shopId'
			]),
			...mapGetters('shopArr',[
				// 门店
				'get_shopAllArr', 
				// 预约档期
				'get_schedule'
			])
		},
		data() {
			return {
				
				// 订单ID
				itemId:null,
				// 是否为新增订单
				isAdd:true,
				// 打开日历
				myCalendar:false,
				
				// 过滤门店
				shopIdMap: new Map(),
				// 过滤档期分组
				scheduleMap: new Map(),
				
				// picker门店
				shopArr:[],
				nowPickerName:null,
				
				params:{
					completePhotoDataJson:{ //	完成JSON数据
						photoDataDressJsons:null,	//完成服装
						photoDataPlaceJsons:null,	//	完成拍照景点
						photoNum:null,	//拍照张数
					},
					instructorAssistants:null,	//引导师助理		
					intege:null,	//引导师
					isVideo:null,	//是否录像状态
					itemId:null,	//子订单ID
					makeupAssistants:null,	//化妆师助理
					makeups:null,	//化妆师	
					photographerAssistants:null,	//摄影师助理
					photographers:null,	//摄影师
					processStatus:null,	//拍照状态,可用值:NOT_PROCESSING,PROCESSING,COMPLETE
					processType:null,	//	拍照类型,可用值:NORMAL,RETAKE,MAKE_UP,ADD
					shopId:null,	//操作门店
					successShopId:null,	//拍照门店
					successTime:null,	//拍照时间
					videographers:null,	//录像师
				}
				
			};
		},
		onLoad(option){
			this.itemId = option.id
			if(option.id !== 'null'){
				this.isAdd = false
				uni.setNavigationBarTitle({
					title:'拍照预约改期'
				})
			}else{
				this.isAdd = true
				uni.setNavigationBarTitle({
					title:'添加预约拍照'
				})
			}
		},
		mounted(){
			this.shopIdMap = new Map(this.get_shopAllArr.map(item => [item.shopId, item.shopName]))
			this.scheduleMap = new Map(this.get_schedule.map(item => [item.id, item.name]))
			this.getPickerArr()
			this.getScheduleArr()
			if(this.isAdd){
				// 添加订单
				// 操作门店赋值当前门店
				this.params.shopId = this.shopId
				// 当选pciker选择的门店名
				this.nowPickerName = this.shopIdMap.get(this.shopId)
			}else{
				// 修改订单
				this.nowPickerName = this.shopIdMap.get(15)
			}
		},
		methods:{
			// 门店数组
			getPickerArr(){
				let arr = []
				this.get_shopAllArr.forEach((i)=>{
					let lis ={
						id:i.shopId,
						name:i.shopName
					}
					arr.push(lis)
				})
				this.shopArr = arr
			},
			// 获取门店ID
			getShopId(e){
				this.params.shopId = e.id
			},
			
			// 打开选日期
			openMyCalendar(){
				this.myCalendar = true
			},
			
			// 档期数组
			getScheduleArr(){
				console.log('档期',this.get_schedule)
			},
			
			// 是否拍微视频
			video(e){
				this.params.isVideo = e.detail.value
			},
		
			// 新增拍照预约
			addPhoto(){
				console.log('新增拍照预约',this.params)
			},
			// 修改拍照预约
			updataPhoto(){
				console.log('修改拍照预约',this.params)
			},
		},
		watch:{
			params:{
				deep:true,
				handler(){
					console.log('测试监听',this.params)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../button.scss';
	/deep/.imgMargin{
		margin: 18rpx 0 0 5rpx !important;
	}
	.bigBox{
		font-size: 28rpx;
		.listBox{
			display: flex;
			margin: 30rpx;
			padding: 20rpx;
			border-bottom: 1rpx solid #DDDDDD;
			.title{
				width: 270rpx;
			}
		}
		.switch{
			display: flex;
			>view{
				margin: 12rpx 0 0 -20rpx;
			}
		}
		.remarkBox{
			margin: 30rpx;
			textarea{
				border-radius: 10rpx;
				border: 1rpx solid #DDDDDD;
				padding: 20rpx;
				width: 650rpx;
				height: 150rpx;
			}
		}
	}
</style>
