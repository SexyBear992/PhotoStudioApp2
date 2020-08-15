<template>
	<view>
		<view class="box">
			<view class="title">拍照时间</view>
			<view class="text" @click="openCalendar">{{comTime | time}}
				<image class="my-img" src="https://7068-photostudioapp-1302515241.tcb.qcloud.la/newIcon/down.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:['time'],
		data(){
			return{
				comTime:null,
			}
		},
		methods:{
			// 打开日历
			openCalendar(){
				this.$emit('openCalendar')
			},

		},
		watch:{
			time(){
				this.comTime = this.time
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/pages/index/arrange/components/component.scss';
	image{
		width: 15rpx;
		height: 15rpx;
		margin-top: 18rpx;
	}		
</style>
