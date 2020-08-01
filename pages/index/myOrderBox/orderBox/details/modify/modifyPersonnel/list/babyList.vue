/*****************************  修改客户信息 宝宝  *******************************/
<template>
	<view>
		<view class="box">

			<!-- 昵称 -->
			<view class="listBox">
				<view class="title">昵称：</view>
				<picker @change="babyPicerChange" :value="babyIndex" :range="babyPickerList">
					<view class="textBox">
						<view class="text">{{babyPickerList[babyIndex]}}</view>
						<image src="https://7068-photostudioapp-1302515241.tcb.qcloud.la/newIcon/down.png" mode=""></image>
					</view>
				</picker>
			</view>
			
			<!-- 名字 -->
			<view class="listBox">
				<view class="title">名字：</view>
				<view class="textBox">
					<input class="input" type="text" v-model="thisBabyInfo.name" placeholder="宝宝姓名"/>
				</view>
			</view>
			
			<!-- 生日 -->
			<view class="listBox">
				<lunar 
					class="lunar" 
					:title="'宝宝生日'" 
					:typeLunar="thisBabyInfo.birthdayLunar" 
					:typeStr="thisBabyInfo.birthdayStr" 
					:typeTime="thisBabyInfo.birthdayTime"
					:calendarData="calendarData"
					@openCal="openCal" ref="lunar" 
					@timeInfo="timeInfo"
				></lunar>
			</view>
			<!-- 日历 -->
			<uni-calendar 
				:insert="false"
				:lunar="true" 
				:clearDate='true'
				@confirm="enSure"
				ref="calendar"
			/>

		</view>
	</view>
</template>

<script>
	import lunar from '../../components/lunar.vue'
	import uniCalendar from '@/components/uni/uni-calendar/uni-calendar.vue'
	export default {
		props:['info','callNameList'],
		components:{
			uniCalendar,
			lunar
		},
		data() {
			return {	
				// 宝宝picker
				babyPickerList:[],
				babyIndex:0,
				
				// 日历选择值
				calendarData:null,
				
				thisBabyInfo:[],
			};
		},
		mounted(){
			this.thisBabyInfo = this.info
			this.newBabyPickerList()
		},
		methods:{		
			// 创建宝宝picker数组
			newBabyPickerList(){
				let arr = this.callNameList.map((i)=>{
					return i.name
				})
				this.babyPickerList = arr
				
				let nowBabyCallName = this.info.callName
				this.babyIndex = this.babyPickerList.findIndex((i)=>{
					return i === nowBabyCallName
				})
			},
				
			// 宝宝picker返回
			babyPicerChange(e){
				this.babyIndex = e.detail.value
				this.callNameList.some((i)=>{
					// console.log(i)
					if(i.name === this.babyPickerList[e.detail.value]){
						this.thisBabyInfo.sex = i.sex
						this.thisBabyInfo.callName = i.name
					}
				})
			},
			
			// 打开日历
			openCal(){
				this.$refs.calendar.open()
			},
			// 赋值日历返回值
			enSure(e){
				this.calendarData = e
			},
			// 获取lunar返回值
			timeInfo(e){
				this.thisBabyInfo.birthdayLunar = e.typeLunar
				this.thisBabyInfo.birthdayStr = e.typeStr
				this.thisBabyInfo.birthdayTime = e.typeTime
				this.thisBabyInfo.zodiac = e.zodiac
			},
			
			save(){
				return this.thisBabyInfo
			}
		},
		watch:{
			callNameList(){
				this.newBabyPickerList()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.box{
		.listBox{
			display: flex;
			font-size: 28rpx;
			padding: 0 20rpx;
			margin: 30rpx;
			height: 80rpx;
			line-height: 80rpx;
			border-bottom: 1rpx solid #DDDDDD;
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
				.input{
					border-radius: 10rpx;
					border: 1rpx solid #DDDDDD;
					padding: 15rpx;
				}
			}
			.lunar{
				width: 100%;
			}
		}
	}
</style>
