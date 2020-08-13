/********************* 新增或修改拍照预约 ***********************/
<template>
	<view>
		<view class="bigBox">
			<!-- 标题 -->
			<view class="titleBox">
				<view class="left">
					<view>{{itemNo}}</view>
					<view>{{name}}</view>
				</view>
			</view>
			
			<!-- 预约门店 -->
			<shopModule
			 :shopId="params.orderItemProcessReservation.reservationShopId" 
				@getId="getShopId" 
			></shopModule>
			
			<!-- 预约日期 -->
			<dateModule 
				:getType="'pz'"
				:reservationDate="params.orderItemProcessReservation.reservationDate"
				:shopId="params.orderItemProcessReservation.reservationShopId"
			></dateModule>
			
			<!-- 档期分组 -->
			<scheduleModule 
				:type="type" 
				:getType="'pz'"
				:date="params.orderItemProcessReservation.reservationDate" 
				:shopId="params.orderItemProcessReservation.reservationShopId" 
				@getId="getTypographyTypeId"
			></scheduleModule>
			
			<!-- 预约时间 -->
			<timeModule 
				:getType="'pz'"
				:date="params.orderItemProcessReservation.reservationDate" 
				:shopId="params.orderItemProcessReservation.reservationShopId" 
				:typography="params.orderItemProcessReservation.typographyTypeId" 
				:time="params.orderItemProcessReservation.reservationTime" 
				@getTime="getTime"
			></timeModule>
			
			<!-- 拍照类型 -->
			<processModule 
				:process="params.processType"
				@getId="getProcess"
			></processModule>
			
			<!-- 预约标签 -->
			<labelModule 
				:labelId="params.labelCategoryId" 
				@getId="getLabelId"
			></labelModule>
			
			<!-- 拍微视频 -->
			<videoModule 
				:isVideo="params.isVideo" 
				@getId="getVideo"
			></videoModule>
			
			<!-- 预约景点 -->
			<view class="box">
				<view class="title">预约景点</view>
				<view class="text" @click="goPlace">
					<view class="arr">{{params.completePhotoDataJson.photoDataPlaceJsons | photoData}}</view>
					<i-icon type="enter" color="#80848f"/>
				</view>
			</view>
			
			<!-- 预约服装 -->
			<view class="box">
				<view class="title">预约服装</view>
				<view class="text" @click="goDress">
					<view class="arr">{{params.completePhotoDataJson.photoDataDressJsons | photoData}}</view>
					<i-icon type="enter" color="#80848f"/>
				</view>
			</view>
			
			<!-- 通知状态 -->
			<noticeModule 
				:notice="params.noticeStatus" 
				@getId="getNotice"
			></noticeModule>
			
			<!-- 预约备注 -->
			<textarea v-model="params.remark" placeholder="预约备注"></textarea>
			
			<view class="button" @click="addPhoto" v-if="params.id">修改拍照预约</view>
			<view class="button" @click="addPhoto" v-else>保存拍照预约</view>
			
		</view>
		<i-message id="message" />
	</view>
</template>

<script>
	const { $Message } = require('@/wxcomponents/base/index');
	import { mapGetters } from 'vuex'
	import shopModule from '../components/shopModule.vue'
	import dateModule from '../components/dateModule.vue'
	import scheduleModule from '../components/scheduleModule.vue'
	import timeModule from '../components/timeModule.vue'
	import processModule from '../components/processModule.vue'
	import noticeModule from '../components/noticeModule.vue'
	import labelModule from '../components/labelModule.vue'
	import videoModule from '../components/videoModule.vue'
	import { addPhotoInfo, getPhotoDetail, updataPhotoInfo } from '@/util/api/shop.js'
	export default {
		components:{
			shopModule,
			dateModule,
			scheduleModule,
			timeModule,
			processModule,
			noticeModule,
			labelModule,
			videoModule
		},
		filters:{
			// 服装景点
			photoData(arr){
				if(arr.length <= 0){
					return '请选择'
				}else{
					let newArr = []
					arr.forEach((i)=>{
						newArr.push(i.name)
					})
					return newArr.join()
				}
			}
		},
		computed:{
			...mapGetters('app',[
				'shopId' 
			]),
		},
		data() {
			return {
				/************** 上页面传值 *************/ 
				// 子订单号
				itemNo:null,
				// 子订单名
				name:null,
				// 订单类型
				type:null,
				// 订单ID
				oId:null,
				// 子订单ID
				itemId:null,
				
				// 已经选择的服装
				enDress:null,
				// 已经选择的景点
				enPlace:null,
				
				// 时间在不在范围内
				isTime:null,
				
				// 修改 用来对比数据是否修改
				contrast:{},
				
				params:{
					completePhotoDataJson:{
						photoDataDressJsons:[], //完成服装
						photoDataPlaceJsons:[]  //完成拍照景点
					},
					instructorAssistants:null,	//引导师助理
					instructors:null, //引导师
					isVideo:false,	//是否录像状态
					labelCategoryId:null,	//标签类别
					makeupAssistants:null, //化妆师助理
					makeups:null, //化妆师
					noticeStatus:true,	//通知状态
					orderItemProcessReservation:{//	预约信息
						reservationDate:null,	//预约日期
						reservationShopId:null,	//预约门店ID
						reservationTime:null, //预约时间
						typographyTypeId:null, //模板ID
					},
					photographerAssistants:null,	//摄影师助理
					photographers:null,	//摄影师
					processType:'NORMAL', //拍照类型
					shopId:null,	//拍照门店
					remark:null, //备注
					videographers:null,	//录像师
				}
			}
		},
		onLoad(op){
			let pages = getCurrentPages()
			let prvePage = pages[pages.length - 2]
			let option = prvePage.data.options
			
			
			this.itemId = Number(option.itemId)
			this.itemNo = option.itemNo
			this.name = option.name
			this.oId = op.oId
			this.type = option.type
			if(op.id){
				this.getPhotoDetail(op.id)
				uni.setNavigationBarTitle({
					title:'修改拍照预约'
				})
			}else{
				this.params.itemId = Number(option.itemId)
				uni.setNavigationBarTitle({
					title:'新增拍照预约'
				})
			}
		},
		onShow(){
			let pages = getCurrentPages();
			let currPage = pages[pages.length - 1]; //当前页面
			let date = currPage.data.date
			let place = currPage.data.place
			let dress = currPage.data.dress
			// 时间
			if(date){
				this.params.orderItemProcessReservation.reservationDate = date.date
			}
			// 景点
			if(place){
				this.params.completePhotoDataJson.photoDataPlaceJsons = place
				this.enPlace = JSON.stringify(place)
			}
			// 服装
			if(dress){
				this.params.completePhotoDataJson.photoDataDressJsons = dress
				this.enDress = JSON.stringify(dress)
			}
		},
		mounted(){
			// 赋值当前门店ID
			this.params.shopId = this.shopId
			// 如果不为修改预约拍照 则赋值预约门店
			if(!this.params.id){
				this.params.orderItemProcessReservation.reservationShopId = this.shopId
			}
		},
		methods: {
			// 获得门店ID
			getShopId(e){
				this.params.orderItemProcessReservation.reservationShopId = e
			},
			// 获得模板ID
			getTypographyTypeId(e){
				this.params.orderItemProcessReservation.typographyTypeId = e
			},
			// 获得预约时间
			getTime(e){
				this.isTime = e.bool
				if(!e.bool){
					$Message({
						content: '预约时间不在档期模板时间内',
						type: 'warning'
					});
				}else{
					this.params.orderItemProcessReservation.reservationTime = e.time
				}
			},
			// 获得拍照类型
			getProcess(e){
				this.params.processType = e
			},
			// 获取标签ID
			getLabelId(e){
				this.params.labelCategoryId = e
			},
			// 是否微视频
			getVideo(e){
				this.params.isVideo = e
			},
			// 打开选择服装
			goDress(){
				uni.navigateTo({
					url:'./chooseDress/chooseDress?itemId=' + this.itemId + '&oId=' + this.oId + '&itemNo=' + this.itemNo + '&name=' + this.name + '&en=' + this.enDress
				})
			},
			// 打开选择景点
			goPlace(){
				uni.navigateTo({
					url:'./choosePlace/choosePlace?itemId=' + this.itemId + '&oId=' + this.oId + '&itemNo=' + this.itemNo + '&name=' + this.name + '&en=' + this.enPlace
				})
			}, 
			// 获取通知状态
			getNotice(e){
				this.params.noticeStatus = e
			},
			// 修改 获取预约详情
			getPhotoDetail(id){
				getPhotoDetail({ id: id}).then(res=>{
					this.isTime = true
					this.contrast = JSON.parse(JSON.stringify(res.data.data.orderItemProcessReservation))
					this.params = res.data.data
					let place = this.params.completePhotoDataJson.photoDataPlaceJsons
					this.enPlace = JSON.stringify(place)
					let dress = this.params.completePhotoDataJson.photoDataDressJsons
					this.enDress = JSON.stringify(dress)
				})
			},
			// 新增拍照预约
			addPhotoInfo(){
				addPhotoInfo(this.params).then(res=>{
					if(res.data.code === 200){
						$Message({
							content: '保存成功',
							type: 'success'
						});
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							})
						},1000)
					}
				})
			},
			// 修改拍照预约
			updataPhotoInfo(params){
				updataPhotoInfo(params).then(res=>{
					if(res.data.code === 200){
						$Message({
							content: '修改成功',
							type: 'success'
						});
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							})
						},1000)
					}
				})
			},
			// 新增拍照预约
			addPhoto(){
				if(this.params.orderItemProcessReservation.reservationDate === null){
					$Message({
							content: '预约日期不能为空',
							type: 'warning'
					});
				}else if(this.params.orderItemProcessReservation.reservationTime === null){
					$Message({
							content: '预约时间不能为空',
							type: 'warning'
					});
				}else if(!this.isTime){
					$Message({
							content: '预约时间不在档期模板时间内',
							type: 'warning'
					});
				}else if(this.params.labelCategoryId === null){
					$Message({
							content: '预约标签不能为空',
							type: 'warning'
					});
				}else{
					if(this.params.id){
						let newParams = JSON.parse(JSON.stringify(this.params))
						let contrast = this.contrast
						let originally = this.params.orderItemProcessReservation
						if(contrast.controlType === originally.controlType &&
							 contrast.groupTypeCategoryId === originally.groupTypeCategoryId &&
							 contrast.isOnline === originally.isOnline &&
							 contrast.reservationDate === originally.reservationDate && 
							 contrast.reservationShopId === originally.reservationShopId &&
							 contrast.reservationTime === originally.reservationTime
						){
							// 如果都为true 则预约日期没修改
							newParams.orderItemProcessReservation = null
						}else{
							// 如果其中一个为false 则重新赋值预约日期
							let newO = {
								reservationDate: originally.reservationDate,
								reservationShopId: originally.reservationShopId,
								reservationTime: originally.reservationTime,
								typographyTypeId: originally.typographyTypeId
							}
							newParams.orderItemProcessReservation = newO
						}
						// 人员全为null
						newParams.instructorAssistants = null
						newParams.instructors = null
						newParams.makeupAssistants = null
						newParams.makeups = null
						newParams.photographerAssistants = null
						newParams.photographers = null
						newParams.videographers = null
						
						this.updataPhotoInfo(newParams)
						
					}else{
						this.addPhotoInfo()
					}
				}	
			},		
		}
	}
</script>

<style lang="scss" scoped>
	@import '../components/component.scss';
</style>
