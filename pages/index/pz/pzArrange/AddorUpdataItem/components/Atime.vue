/************************* 预约时间 ***************************/
<template>
	<view>
		<view class="box">
			<view class="title">预约时间</view>
			<input type="text" v-model="sTime" @input="timeChange" @blur="timeBlur"/>
			<picker @change="getTime" :value="timeIndex" :range="photoTimeArr">
				<view class="text">
					<view>时间段</view>
					<image class="my-img" src="https://7068-photostudioapp-1302515241.tcb.qcloud.la/newIcon/down.png" mode=""></image>
				</view>
			</picker>
		</view>
	</view>
</template>

<script>
	import { getPhotoTime } from '@/util/api/shop.js'
	export default{
		props:['date','shopId','typography','time'],
		data(){
			return{
				// picker预约时间段
				timeIndex:0,
				photoTimeArr:[],
				timeArr:[],
				sTime:null,
				
				// 是否在范围内
				isTime:false,
			}
		},
		methods:{
			// 获取预约时间段
			getPhotoTime(){
				let params ={
					reservationDate: this.date, //预约日期
					reservationShopId: this.shopId,	//预约门店ID
					typographyTypeId: this.typography //模板ID
				}
				getPhotoTime(params).then(res=>{
					// timeFrameStr
					let data = res.data.data
					this.timeArr = data
					let arr = []
					data.forEach((i)=>{
						let name = `${i.timeFrameStr} ${i.typographyCount}/${i.useTypographyNum}`
						arr.push(name)
					})
					this.photoTimeArr = arr
				})
			},
			// input监听
			timeChange(e){
				let result = []
				this.timeArr.forEach(item => { // (this.timeArr 为 所有的预约时间)
					let start
					let end
					let bool
					let timeStr = this.sTime
					if (item.timeFrameType === 'EQUALS') {
						start = item.startTime
						bool = Number(start.replace(':', '')) === Number(timeStr.replace(':', ''))
						result.push(bool)
					} else {
						start = item.startTime
						end = item.endTime
						bool = Number(start.replace(':', '')) <= Number(timeStr.replace(':', '')) && Number(timeStr.replace(':', '')) <= Number(end.replace(':', ''))
						result.push(bool)
					}
				})
				this.isTime = result[0]
			},
			// input失去焦点
			timeBlur(){
				this.$emit('getTime',{time:this.sTime,bool:this.isTime})
			},
			// picker选择时间
			getTime(e){
				this.timeIndex = e.detail.value
				let time = this.timeArr[this.timeIndex]
				this.sTime = time.startTime
				this.isTime = true
				this.$emit('getTime',{time:this.sTime,bool:this.isTime})
			},
		},
		watch:{
			typography(){
				this.getPhotoTime()
			},
			time(){
				this.sTime = this.time
			}
		}
	}
</script>


<style lang="scss" scoped>
	@import './component.scss';
	input{
		border: 1rpx solid #DDDDDD;
		width: 200rpx;
		margin-right: 20rpx;
		padding: 0 10rpx;
		border-radius: 10rpx;
	}
	image{
		width: 15rpx;
		height: 15rpx;
		margin: 18rpx 0 0 5rpx;
	}	
</style>
