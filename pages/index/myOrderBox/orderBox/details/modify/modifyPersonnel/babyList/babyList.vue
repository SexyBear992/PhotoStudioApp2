<template>
	<view>
		<view class="box">
			<view class="listBox">
				<view class="title">昵称：</view>
				<picker @change="babyPicerChange" :value="babyIndex" :range="babyPickerList">
					<view class="textBox">
						<view class="text">{{babyPickerList[babyIndex]}}</view>
						<!-- <image src="https://7068-photostudioapp-1302515241.tcb.qcloud.la/newIcon/down.png" mode=""></image> -->
					</view>
				</picker>
			</view>
			
			<view class="listBox">
				<view class="title">名字：</view>
				<view class="textBox">
					<input type="text" v-model="thisBabyInfo.name" />
				</view>
			</view>
			
			<lunar class="lunar" :title="'宝宝生日'" :typeLunar="thisBabyInfo.birthdayLunar" :typeStr="thisBabyInfo.birthdayStr" :typeTime="thisBabyInfo.birthdayTime"
			 :calendarData="calendarData" @openCal="openCal" ref="lunar" @timeInfo="timeInfo"></lunar>
			
			<view @click="openCalendar">日历</view>
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
		props:['shopId','info','callNameList'],
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
			}
			
		},
		watch:{
			thisBabyInfo:{
				deep:true,
				handler(){
					console.log('监听组件数据',this.thisBabyInfo)
				}
			},
			callNameList(){
				this.newBabyPickerList()
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
