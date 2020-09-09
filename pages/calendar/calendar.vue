/****************************** 日历选期 *********************************/
<template>
	<view class="bigBox">
		<searchModul v-if="isCheck" ref="searchModul" @search="search"></searchModul>
		
		<calendarBody :dateDetail="dateDetail" @getDate="getDate" @enDate="enDate"></calendarBody>

		<pageDetails v-if="isCheck" :pageDetails="pageDetails" :type="type"></pageDetails>
	
		<i-message id="message" />
	</view>
</template>

<script>
	import { 
		getPhotoDate, 
		getChooseDate, 
		getWatchDate, 
		getPickupDate,
		getPhotoPage,
		getChoosePage,
		getWatchPage,
		getPickupPage
		} from '@/util/api/shop.js'
	import calendarBody from './components/calendarBody.vue'
	import pageDetails from './components/pageDetails.vue'
	import searchModul from '@/components/searchModul.vue'
	export default {
		components:{
			calendarBody,
			searchModul,
			pageDetails
		},
		data() {
			return {
				
				// 请求日历类型
				type:null,
				show:false,
				isCheck:false,
				// 日历详情
				dateDetail:[],
				
				pageDetails:null,
				
				pickerDate:'',
				
				dateParams:{
					reservationShopId:null,
					startTime:null,
					endTime:null,
				},
			
				params:{
					// contactMobile:null,	//订单主联系人电话
					// contactName:null,	//订单主联系人姓名
					// orderNo:null,	//订单号
					reservationShopId:null,	//预约门店
					endTime:null,	//结束时间
					isSearchCount:true,
					limit:10,
					page:1,
					startTime:null,	//开始时间
				}
			};
		},
		onLoad(options){
			this.type = options.type
			this.dateParams.reservationShopId = Number(options.id)
			this.params.reservationShopId = Number(options.id)
			if(options.check){
				this.isCheck = JSON.parse(options.check)
			}
		},
		methods:{	
			// 获取时间
			getDate(e){
				this.pickerDate = e
				this.getCalendar()
				let timestamp = Date.parse(new Date(this.pickerDate)) - 28800000
				this.params.startTime = timestamp
				this.params.endTime = timestamp
				this.getPage()
			},
			
			// 获取日历信息
			getCalendar(){
				let arr = this.pickerDate.split('-')
				// 当前年份
				let nowYear = Number(arr[0])
				// 当前月份
				let nowMonth = Number(arr[1])
				// 获得当月多少天
				let dayNums = new Date(nowYear, nowMonth, 0).getDate();
				// 开始时间
				let startTime = Date.parse(new Date(`${nowYear}-${this.completeDate(nowMonth)}-01`))
				this.dateParams.startTime = Number(startTime) - 28800000 //减去8小时时间戳
				// 结束时间
				let endTime = Date.parse(new Date(`${nowYear}-${this.completeDate(nowMonth)}-${dayNums}`))
				this.dateParams.endTime = Number(endTime) - 28800000 //减去8小时时间戳
				switch(this.type){
					case 'pz':
						this.getPhotoDate()
						break;
					case 'xp':
						this.getChooseDate()
						break;
					case 'kb':
						this.getWatchDate()
						break;
					case 'qj':
						this.getPickupDate()
						break;
				}
			},	
			// 获取拍照预约日历
			getPhotoDate(){
				getPhotoDate(this.dateParams).then(res=>{
					this.dateDetail = res.data.data
					this.show = true
				})
			},
			// 获取选片预约日历
			getChooseDate(){
				getChooseDate(this.dateParams).then(res=>{
					this.dateDetail = res.data.data
					this.show = true
				})
			},			
			// 获取看板预约日历
			getWatchDate(){
				getWatchDate(this.dateParams).then(res=>{
					this.dateDetail = res.data.data
					this.show = true
				})
			},		
			// 获取取件预约日历
			getPickupDate(){
				getPickupDate(this.dateParams).then(res=>{
					this.dateDetail = res.data.data
					this.show = true
				})
			},
	
			// 日月补0
			completeDate(value) {
				return value < 10 ? "0" + value:value;
			},
			
			// 搜索返回
			search(e){
				// 姓名
				if(e.contactName){
					this.params.contactName = e.contactName
					this.getPage()
				}
				if(e.contactMobile){
					this.params.contactMobile = e.contactMobile
					this.getPage()
				}
				if(e.orderNo){
					this.params.orderNo = e.orderNo
					this.getPage()
				}
				if(e.orderShopId){
					this.dateParams.reservationShopId = e.orderShopId
					this.params.reservationShopId = e.orderShopId
					this.getCalendar()
				}
				console.log(e)
			},
			
			// 点击选择日期
			enDate(date){
				if(this.isCheck){
					let timestamp = Number(Date.parse(new Date(date))) - 28800000;
					this.params.startTime = timestamp
					this.params.endTime = timestamp
					this.getPage()
				}else{
					let timestamp = Number(Date.parse(new Date(date))) - 28800000;
					var pages = getCurrentPages();
					var prevPage = pages[pages.length - 2]; //上一个页面
					prevPage.setData({
						date: {
							'date':timestamp,
						}
					})
					uni.navigateBack({//返回
						delta: 1
					})
				}
			},
		
			// 获取表格
			getPage(){
				switch(this.type){
					case 'pz':
						this.getPhotoPage()
						break;
					case 'xp':
						this.getChoosePage()
						break;
					case 'kb':
						this.getWatchPage()
						break;
					case 'qj':
						this.getPickupPage()
						break;
				}
			},
			// 获取拍照表格
			getPhotoPage(){
				getPhotoPage(this.params).then(res=>{
					this.pageDetails = res.data.data.records
				})
			},
			// 获取选片表格
			getChoosePage(){
				getChoosePage(this.params).then(res=>{
					this.pageDetails = res.data.data.records
				})
			},
			// 获取看板表格
			getWatchPage(){
				getWatchPage(this.params).then(res=>{
					this.pageDetails = res.data.data.records
				})
			},
			// 获取取件表格
			getPickupPage(){
				getPickupPage(this.params).then(res=>{
					this.pageDetails = res.data.data.records
				})
			},
		},
	}
</script>

<style lang="scss" scoped>
</style>
