/****************************** 日历选期 *********************************/
<template>
	<view>
		<!-- 日历年月 -->
		<view class='calendar_title flex_nowrap'>
		  <view class='icon' @tap='lastMonth'>
				上
		  </view>
		  <view>{{year}}年{{month}}月</view>
		  <view class='icon' @tap='nextMonth'>
				下
		  </view>
		</view>
		
		<!-- 日历主体 -->
		<view class='calendar'>
		  <view class='header'>
		    <view v-for="(item,index) in date" :key="index" :class='(index == todayIndex) ? "weekMark" : ""'>{{item}}
		      <view class="weekMarkBot"></view>
		    </view>
		  </view>
		
		  <view class='date-box'>
		    <block v-for="(item,index) in dateArr" :key="index">
		      <view :class='isToday == item.isToday ? "nowDay" : ""'>
		        <view class='date-head' @tap='lookHuoDong(year,month,item.dateNum)' :data-year='year' :data-month='month' :data-datenum='item.dateNum'>
		          <view>{{item.dateNum}}</view>
		        </view>
		      </view>
		    </block>
		  </view>
		
		</view>
	</view>
</template>

<script>
	export default {
		components:{
		},
		data() {
			return {
				year: 0,
				month: 0,
				date: ['日', '一', '二', '三', '四', '五', '六'],
				dateArr: [],
				isToday: 0,
				isTodayWeek: false,
				todayIndex: 0
			};
		},
		mounted(){
			this.backToday()
		},
		methods:{
			dateInit(setYear, setMonth) {
				//全部时间的月份都是按0~11基准，显示月份才+1
				let dateArr = [];                       //需要遍历的日历数组数据
				let arrLen = 0;                         //dateArr的数组长度
				let now = setYear ? new Date(setYear, setMonth) : new Date();
				let year = setYear || now.getFullYear();
				let nextYear = 0;
				let month = setMonth || now.getMonth();                 //没有+1方便后面计算当月总天数
				let nextMonth = (month + 1) > 11 ? 1 : (month + 1);
				let startWeek = new Date(year + ',' + (month + 1) + ',' + 1).getDay();                          //目标月1号对应的星期
				let dayNums = new Date(year, nextMonth, 0).getDate();               //获取目标月有多少天
				let obj = {};
				let num = 0;
				if (month + 1 > 11) {
					nextYear = year + 1;
					dayNums = new Date(nextYear, nextMonth, 0).getDate();
				}
				arrLen = startWeek + dayNums;
				for (let i = 0; i < arrLen; i++) {
					if (i >= startWeek) {
						num = i - startWeek + 1;
						obj = {
							isToday: '' + year + (month + 1) + num,
							dateNum: num,
							weight: 5
						}
					} else {
						obj = {};
					}
					dateArr[i] = obj;
				}
				this.dateArr = dateArr
				let nowDate = new Date();
				let nowYear = nowDate.getFullYear();
				let nowMonth = nowDate.getMonth() + 1;
				let nowWeek = nowDate.getDay();
				let getYear = setYear || nowYear;
				let getMonth = setMonth >= 0 ? (setMonth + 1) : nowMonth;
				if (nowYear == getYear && nowMonth == getMonth) {					
					this.isTodayWeek = true,
					this.todayIndex = nowWeek
				} else {
					this.isTodayWeek = false,
					this.todayIndex = -1
				}
			},
			
			// 上月切换 
			lastMonth() {
				//全部时间的月份都是按0~11基准，显示月份才+1
				let year = this.month - 2 < 0 ? this.year - 1 : this.year;
				let month = this.month - 2 < 0 ? 11 : this.month - 2;
				this.year = year,
				this.month = (month + 1)
				this.dateInit(year, month);
			},
			
			// 下月切换
			nextMonth() {
				//全部时间的月份都是按0~11基准，显示月份才+1
				let year = this.month > 11 ? this.year + 1 : this.year;
				let month = this.month > 11 ? 0 : this.month;
				this.year = year,
				this.month = (month + 1)
				this.dateInit(year, month);
			},
			
			// 回到今天
			backToday(){
				let now = new Date();
				let year = now.getFullYear();
				let month = now.getMonth() + 1;
				this.dateInit();
				this.year = year,
				this.month = month,
				this.isToday = '' + year + month + now.getDate()
			},
			
			// 查看日期
			lookHuoDong(y,m,d){
				this.isToday = `${y}${m}${d}`
				console.log(`${y}-${m}-${d}`)
				let nowDate = new Date(`${y}-${m}-${d}`);
				let nowWeek = nowDate.getDay();
				this.todayIndex = nowWeek
			}
		}
	}
</script>

<style lang="scss">
.calendar_title{
	width: 70%; 
	margin: 10rpx auto; 
	display: flex;
	justify-content: space-between;
	font-size: 20pt;
	color: #000;
	.icon image{
		width: 60rpx; 
		height: 60rpx;
		margin: 5rpx auto;
	}
}

/* 日历 */
.calendar{
	width: 100%;
	margin-top: 75rpx;
	background: #fff;
	border-bottom-right-radius: 20rpx;
	border-bottom-left-radius: 20rpx;
	padding: 0 0 20rpx;
}
.header{
	font-size: 0;
	width: 80%;
	margin: 0 auto;
}
.header>view{
	display: inline-block;
	width: 14.285%;
	color: #666;
	font-size: 30rpx;
	text-align: center;
	border-bottom: 1px solid #D0D0D0;
	padding: 20rpx 0;
}
.weekMark{
	position: relative;
	width: 80%;
	margin: 0 auto;
	.weekMarkBot{
		position: absolute;
		bottom: 0;left: 0;
		width: 100%;
		border-bottom: 2px solid #69f;
	}
}
.date-box{
	font-size: 0;
	padding: 10rpx 0;
	width: 80%;
	margin: 0 auto;
	>view{
		position: relative;
		display: inline-block;
		width: 14.285%;
		color: #666;
		text-align: center;
		vertical-align: middle;
		.date-head{
			height: 60rpx;
			line-height: 60rpx;
			font-size: 12pt;
		}
	}
	.nowDay{
		.date-head{
			width: 60rpx;
			border-radius: 50%;
			text-align: center;
			color: #fff;
			background-color: #ff9933;
			margin: 0 auto;
		}
	}
}

</style>
