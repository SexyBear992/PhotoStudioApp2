/******************** 添加支出或修改支出 *********************/
<template>
	<view>
		<spending :spendingDetail="spendingDetail" :addressSpending="addressSpending" :calendarTime="calendarTime" @openCalendar="openCalendar"></spending>
		<i-message id="message" />
		<!-- 日历 -->
		<uni-calendar 
			:insert="false"
			:lunar="true" 
			:clearDate='true'
			@confirm="enSure"
			ref="calendar"
		/>
	</view>
</template>

<script>
	import uniCalendar from '@/components/uni/uni-calendar/uni-calendar.vue'
	import spending from './components/spending.vue'
	export default {
		components:{
			uniCalendar,
			spending
		},
		data() {
			return {
				// 是否为添加
				isAdd: false,
				addressSpending:null,
				// 日历返回时间
				calendarTime:null,
				// 详情
				spendingDetail:null,
			};
		},
		onLoad(op){
			let title
			if(op.id){
				this.isAdd = false
				let pages = getCurrentPages()
				let prvePages = pages[pages.length - 2]
				let spendingDetail = prvePages.data.spendingDetail
				this.spendingDetail = spendingDetail
				title = '修改店面支出'
			}else{
				this.isAdd = true
				title = '录入店面支出'
			}
			uni.setNavigationBarTitle({
				title:title
			})		
		},
		onShow(){
			let pages = getCurrentPages()
			let currPages = pages[pages.length - 1]
			let address = currPages.data.address
			if(address){
				this.addressSpending = address
			}
		},
		methods:{
			// 打开日历
			openCalendar(){
				this.$refs.calendar.open()
			},
			// 日历返回
			enSure(e){	
				this.calendarTime = Date.parse(new Date(e.fulldate))
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/pages/index/cashier/orderCashier/collection/components/updataPriceStyle.scss';
</style>
