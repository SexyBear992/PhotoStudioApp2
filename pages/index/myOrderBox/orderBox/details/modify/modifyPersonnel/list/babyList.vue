/*****************************  修改客户信息 宝宝  *******************************/
<template>
	<view>
		<view class="box">

			<!-- 昵称 -->
			<view class="listBox">
				<view class="title">昵称：</view>
				<pickerModule my-img="imgMargin" :arrInfo="pickerBaby" :nowName="nowBabyName" @getId="getBabyId"></pickerModule>
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
	import pickerModule from '@/components/pickerModule.vue'
	import uniCalendar from '@/components/uni/uni-calendar/uni-calendar.vue'
	export default {
		props:['info','callNameList'],
		components:{
			uniCalendar,
			pickerModule,
			lunar
		},
		data() {
			return {	
				// 宝宝picker
				pickerBaby:[],
				nowBabyName:null,
				
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
				let arr = []
				this.callNameList.forEach((i)=>{
					let lis ={
						id:i.sex,
						name:i.name
					}
					arr.push(lis)
				})
				this.pickerBaby = arr
				this.nowBabyName = this.info.callName
			},
				
			// 宝宝picker返回
			getBabyId(e){
				this.thisBabyInfo.sex = e.id
				this.thisBabyInfo.callName = e.name
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
			thisBabyInfo:{
				deep:true,
				handler(){
					console.log(this.thisBabyInfo)
				}
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
	/deep/.imgMargin{
		margin: 40rpx 0 0 5rpx !important;
	}
</style>
