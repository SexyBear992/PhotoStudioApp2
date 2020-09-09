/*****************************  修改客户信息 客户  *******************************/
<template>
	<view>
		<view class="box">
			<!-- 昵称 -->
			<view class="listBox">
				<view class="title">昵称：</view>
				<pickerModule my-img="imgMargin" :arrInfo="pickerPerson" :nowName="nowPersonName" @getId="getPersonId"></pickerModule>
			</view>
			
			<!-- 名字 -->
			<view class="listBox">
				<view class="title">名字：</view>
				<view class="textBox">
					<input class="input" type="text" v-model="thisPersonInfo.name" placeholder="客户姓名"/>
				</view>
			</view>
			
			<!-- 电话 -->
			<view class="listBox">
				<view class="title">手机号码：</view>
				<view class="textBox">
					<input class="input" type="text" v-model="thisPersonInfo.mobile" placeholder="手机号码"/>
				</view>
			</view>
			
			<!-- 微信 -->
			<view class="listBox">
				<view class="title">微信号：</view>
				<view class="textBox">
					<input class="input" type="text" v-model="thisPersonInfo.wechat" placeholder="微信号"/>
				</view>
			</view>
			
			<!-- qq -->
			<view class="listBox">
				<view class="title">QQ号：</view>
				<view class="textBox">
					<input class="input" type="text" v-model="thisPersonInfo.qq" placeholder="QQ"/>
				</view>
			</view>
			
			<!-- 生日 -->
			<view class="listBox">
				<lunar 
					class="lunar" 
					:title="'客户生日'" 
					:typeLunar="thisPersonInfo.birthdayLunar" 
					:typeStr="thisPersonInfo.birthdayStr" 
					:typeTime="thisPersonInfo.birthdayTime"
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
	export default{
		props:['info','callNameList'],
		components:{
			uniCalendar,
			pickerModule,
			lunar
		},
		data(){
			return{
				// 客户picker
				pickerPerson:[],
				nowPersonName:null,
				
				// 日历选择值
				calendarData:null,
				
				thisPersonInfo:[],
			}
		},
		mounted(){
			this.thisPersonInfo = this.info
			this.newPersonPickerList()
		},
		methods:{
			// 创建客户picker数组
			newPersonPickerList(){
				let arr = []
				this.callNameList.forEach((i)=>{
					let lis ={
						id:i.sex,
						name:i.name
					}
					arr.push(lis)
				})
				this.pickerPerson = arr
				this.nowPersonName = this.info.callName
			},
				
			// 客户picker返回
			getPersonId(e){
				this.thisPersonInfo.sex = e.id
				this.thisPersonInfo.callName = e.name
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
				this.thisPersonInfo.birthdayLunar = e.typeLunar
				this.thisPersonInfo.birthdayStr = e.typeStr
				this.thisPersonInfo.birthdayTime = e.typeTime
			},
		
			// 保存
			save(){
				return this.thisPersonInfo
			}
		},
		watch:{
			callNameList(){
				this.newPersonPickerList()
			},
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
