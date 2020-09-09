<template>
	<view>
		<view class="listBox">
			<view class="left">
				<view class="title">{{title}}</view>
				<view class="textBox" @click="openCalendar">
					<view class="text" v-if="timeData.typeLunar">{{timeData.typeStr | typeStr}}</view>
					<view class="text" v-else>{{timeData.typeTime | typeTime}}</view>
					<image src="https://lyfz-saas-erp-system.oss-cn-hangzhou.aliyuncs.com/AppletsFile/down.png" mode=""></image>
				</view>
			</view>
			
			<view class="right">
				<switch @change="lunarSwitch" color="#61a3ff" class="switch" :checked="typeLunar"/><span>农历</span>
			</view>
			

		</view>
	</view>
</template>

<script>
	export default{
		props:['typeLunar','typeStr','typeTime','title','calendarData'],
		computed:{
			allTime(){
				const{
					typeLunar,
					typeStr,
					typeTime
				} = this
				return {
					typeLunar,
					typeStr,
					typeTime
				}
			}
		},
		filters:{
			// 新历时间
			typeTime(time){
				if(time){
					let dt = new Date(Number(time))
					let y = dt.getFullYear()
					let m = (dt.getMonth() + 1).toString().padStart(2, 0)
					let d = dt.getDate().toString().padStart(2, 0)
					return `${y}-${m}-${d}`
				}else{
					return '请选择时间'
				}
			},
			// 农历时间
			typeStr(time){
				if(time){
					return time
				}else{
					return '请选择时间'
				}
			}
		},
		data(){
			return{	
				timeData:{
					typeLunar:null,
					typeStr:null,
					typeTime:null,
					zodiac:null
				}
			}
		},
		mounted(){
			this.timeData.typeLunar = this.typeLunar
			this.timeData.typeStr = this.typeStr
			this.timeData.typeTime = this.typeTime
		},
		methods:{
			// 切换是否农历
			lunarSwitch(e){
				this.timeData.typeLunar = e.target.value
				this.$emit('timeInfo',this.timeData)
			},
			// 打开日历
			openCalendar(){
				this.$emit('openCal')
			},
			// 农历转成新历字符串
			LunarToNew(lunar){
				let arr = lunar.split('-')
				let year = this.calendarData.year
				let month = this.CNToNumMonth(arr[1])
				let day
				if(arr[2] === '初十'){
					day = 10
				}else{
					let dayArr1 = this.CNToNumDay1(arr[2].split('')[0])
					let dayArr2 = this.CNToNumDay2(arr[2].split('')[1])
					day = dayArr1+dayArr2
				}
				let newArr = `${year}-${month}-${day}`
				return newArr
			},
			// 汉字转换数字 月份
			CNToNumMonth(cn){
				switch(cn){
					case '一月':
						return '01'
						break;
					case '二月':
						return '02'
						break;
					case '三月':
						return '03'
						break;
					case '四月':
						return '04'
						break;
					case '五月':
						return '05'
						break;
					case '六月':
						return '06'
						break;
					case '七月':
						return '07'
						break;
					case '八月':
						return '08'
						break;
					case '九月':
						return '09'
						break;
					case '十月':
						return '10'
						break;
					case '十一月':
						return '11'
						break;
					case '十二月':
						return '12'
						break;
					
				}
			},
			// 汉字转换数字 日 第一个字符串
			CNToNumDay1(cn){
				switch(cn){
					case '初':
						return '0'
						break;
					case '十':
						return '1'
						break;
					case '甘':
						return '2'
						break;
					case '三':
						return '3'
						break;
				}
			},
			// 汉字转换数字 日 第二个字符串
			CNToNumDay2(cn){
				switch(cn){
					case '一':
						return '1'
						break;
					case '二':
						return '2'
						break;
					case '三':
						return '3'
						break;
					case '四':
						return '4'
						break;
					case '五':
						return '5'
						break;
					case '六':
						return '6'
						break;
					case '七':
						return '7'
						break;
					case '八':
						return '8'
						break;
					case '九':
						return '9'
						break;
					case '十':
						return '0'
						break;
				}
			},
			
			// 提交
			save(){
				return this.timeData
			},
		},
		watch:{
			allTime(){
				this.timeData.typeLunar = this.typeLunar
				this.timeData.typeStr = this.typeStr
				this.timeData.typeTime = this.typeTime
			},
			// 日历类型返回值
			calendarData(){
				let e = this.calendarData
				this.timeData.zodiac = e.lunar.Animal
				// 新历时间 时间戳
				this.timeData.typeTime = Date.parse(new Date(e.fulldate))
				// 农历时间 字符串
				let year = e.lunar.Animal
				let month = e.lunar.IMonthCn
				let day = e.lunar.IDayCn
				let lunar = `${year}年-${month}-${day}`
				this.timeData.typeStr = this.LunarToNew(lunar)
				this.$emit('timeInfo',this.timeData)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.listBox{
		display: flex;
		justify-content: space-between;
		.left{
			display: flex;
			.title{
				width: 270rpx;
			}
			.textBox{
				display: flex;   
				.text{
					max-width: 360rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				image{
					width: 15rpx;
					height: 15rpx;
					margin: 40rpx 0 0 5rpx;
				}
			}
		}
		.right{
			.switch{
				margin-top: 0;
				margin-right: -20rpx;
				transform:scale(0.5);
			}
		}
	}

</style>
