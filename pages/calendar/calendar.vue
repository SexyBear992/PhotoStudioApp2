/****************************** 日历选期 *********************************/
<template>
	<view class="bigBox">
		
		<!-- 头部 -->
		<view class="header">
			<!-- 日历年月 -->
			<view class="Y_M_Box">
				<!-- 上个月 -->
			  <view class='icon' @tap='lastMonth'>
					<i-icon type="enterinto_fill" size="20" color="#92c0ff" />
			  </view>
				<!-- 显示年月 -->
				<view class="Y_M">
					<picker mode="date" fields="month" :value="pickerDate" :start="pickerStartDate" :end="pickerEndDate" @change="DateChange">
						<view class="showDate">{{pickerDate}}</view>
					</picker>
				</view>
			  <!-- 下个月 -->
			  <view class='icon' @tap='nextMonth'>
					<i-icon type="enterinto_fill" size="20" color="#92c0ff" />
			  </view>
			</view>
			<!-- 星期 -->
			<view class="weekBox">
				<view v-for="(item,index) in weekArr" :key="index">{{item}}</view>
			</view>
		</view>
		
		<!-- 日历主体 -->
		<view class="calenarBox" v-if="show">
			<view v-for="(item,index) in dateArr" :key="index">
				<view class="list">
					<view class="bg" :class="noBg(dateDetail,(item.num-1)) ? (bgColor(dateDetail,(item.num-1)) ? 'optional' : 'ban' ) : 'noBg'" @click="enDate(item.date)">
						<view class="day">{{item.num}}</view>
						<view class="typographyNum">{{dateDetail | typographyNum(item.num-1)}}</view>
					</view>
				</view>
			</view>
		</view>
	
		<i-message id="message" />
	</view>
</template>

<script>
	import { getPhotoDate, getChooseDate, getWatchDate, getPickupDate } from '@/util/api/shop.js'
	export default {
		components:{
		},
		filters:{
			typographyNum(arr,i){
				if(i !== NaN){
					if(arr[i]){
						// 是否休息
						let isVacation = arr[i].isVacation
						if(isVacation){
							return '休息'
						}else{
							// 可预约时间
							let can = arr[i].defaultTypographyNum
							// 已预约时间
							let ed = arr[i].inTypographyNum
							// 剩余
							let ing = can - ed
							return `${can}/${ed}/${ing}`
						}
					}
				}
			},
		},
		data() {
			return {
				
				// 请求日历类型
				type:null,
				show:false,
				
				// picker
				pickerDate:'',
				pickerStartDate:'2010-01-01',
				pickerEndDate:'2050-12-31',
				
				weekArr:['日', '一', '二', '三', '四', '五', '六'],
				
				// 日历
				dateArr:[],
				// 日历详情
				dateDetail:[],
				
				dateParams:{
					reservationShopId:null,
					startTime:null,
					endTime:null,
				}
			};
		},
		onLoad(options){
			this.type = options.type
			this.dateParams.reservationShopId = options.id
			this.dateInit()
		},
		created(){
			this.getNowDate()
		},
		methods:{
			// 获取当天日期
			getNowDate(){
				let date = new Date()
				let year = date.getFullYear()
				let month = date.getMonth() + 1
				let day = date.getDate()
				this.pickerDate = `${year}-${this.completeDate(month)}-${this.completeDate(day)}`
			},
			
			// 获取日历本体
			dateInit(){
				this.show = false
				let arr = this.pickerDate.split('-')
				// 当前年份
				let nowYear = Number(arr[0])
				// 当前月份
				let nowMonth = Number(arr[1])
				// 获得当月多少天
				let dayNums = new Date(nowYear, nowMonth, 0).getDate();
				// 获取当月1号对应的星期
				let startWeek = new Date(nowYear + ',' + nowMonth + ',' + 1).getDay()
				let dateArr = []
				let obj = [];
				for (let i = 0; i < startWeek + dayNums ; i++){
					if(i >= startWeek){
						obj = {
							num: i-startWeek + 1,
							date: `${nowYear}-${this.completeDate(nowMonth)}-${this.completeDate(i-startWeek+1)}`,
							data:null
						}
					} else {
						obj = []
					}
					dateArr[i] = obj
				}
				this.dateArr = dateArr
				this.getCalendar()
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

			
			// 判断是否需要背景色
			noBg(arr,i){
				if(i === NaN){
					return false
				}else{
					if(arr[i]){
						let isVacation = arr[i].isVacation
						if(isVacation){
							return false
						}else{
							return true
						}
					}
				}
			},
			
			// 判断可不可选背景色
			bgColor(arr,i){
				if(i !== NaN){
					if(arr[i]){
						// 可预约时间
						let can = arr[i].defaultTypographyNum
						// 已预约时间
						let ed = arr[i].inTypographyNum
						// 剩余
						let ing = can - ed
						if( ing > 0 ){
							return true
						}else{
							return false
						}
					}
				}
			},
			
			// 日月补0
			completeDate(value) {
				return value < 10 ? "0" + value:value;
			},
			
			// 日历选择返回
			DateChange(e){
				this.pickerDate = e.detail.value
				this.dateInit()
			},
			
			// 切换上月
			lastMonth(){
				let arr = this.pickerDate.split('-')
				// 获得当前年份
				let nowYear = Number(arr[0])
				// 获得当前月份
				let nowMonth = Number(arr[1])
				// 判断需不需要减去年份
				let newYear = nowMonth < 2 ? nowYear - 1 : nowYear
				// 获取新月份
				let newMonth = nowMonth < 2 ? 12 : nowMonth -1
				this.pickerDate = `${newYear}-${this.completeDate(newMonth)}-${arr[2]}`
				this.dateInit()
			},
			// 切换下月
			nextMonth(){
				let arr = this.pickerDate.split('-')
				// 获得当前年份
				let nowYear = Number(arr[0])
				// 获得当前月份
				let nowMonth = Number(arr[1])
				// 判断需不需要增加年份
				let newYear = nowMonth > 11 ? nowYear + 1 : nowYear
				// 获取新月份
				let newMonth = nowMonth > 11 ? 1 : nowMonth + 1
				this.pickerDate = `${newYear}-${this.completeDate(newMonth)}-${arr[2]}`
				this.dateInit()
			},
		
			// 点击选择日期
			enDate(date){
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
			},
		}
	}
</script>

<style lang="scss" scoped>
	.bigBox{
		font-size: 32rpx;
		.header{
			width: 690rpx;
			margin: 30rpx;
			margin-bottom: 0rpx;
			border-radius: 10rpx 10rpx 0 0 ;
			color: #FFFFFF;
			background-color: #61A3FF;
			.Y_M_Box{
				padding: 30rpx 0 ;
				width: 300rpx;
				display: flex;
				justify-content: space-between;
				margin-left: 50%;
				transform: translateX(-50%);
				.icon:nth-child(1){
					transform:rotateY(180deg)
				}
				.Y_M{
					.showDate{
						padding: 0 15rpx;
					}
				}
			}
			.weekBox{
				display: flex;
				justify-content: space-around;
				padding-bottom: 20rpx;
			}
		}
		.calenarBox{
			width: 690rpx;
			margin: 30rpx;
			margin-top: 0rpx;
			display: flex;
			flex-wrap:wrap;
			background-color: #FFFFFF;
			box-shadow:0rpx 7rpx 29rpx 6rpx rgba(0, 0, 0, 0.03);
			border-radius:0 0 10rpx 10rpx;
			.list{
				width: 78.57rpx;
				text-align: center;
				padding: 10rpx;
				.bg{
					border-radius: 10rpx;
					.typographyNum{
						font-size: 18rpx;
						padding: 5rpx;
					}
				}
				.noBg{
					.typographyNum{
						color: #FF0000;
					}
				}
				.optional{
					background-color: #61A3FF;
					color: #FFFFFF;
					box-shadow:0rpx 7rpx 29rpx 6rpx rgba(0, 0, 0, 0.03);
				}
				.ban{
					background-color: #CCCCCC;
					color: #FFFFFF;
					box-shadow:0rpx 7rpx 29rpx 6rpx rgba(0, 0, 0, 0.03);
				}
			}
		}
	}



</style>
