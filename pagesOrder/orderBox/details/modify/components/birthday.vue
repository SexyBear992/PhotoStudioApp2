<template>
	<view>
		<view class="bigBox">
			<view class="left">
				<view class="title">{{title}}:</view>
				<view class="text" @click="openCalendar">
					{{time | time}}
					<image src="https://lyfz-saas-erp-system.oss-cn-hangzhou.aliyuncs.com/AppletsFile/down.png" mode=""></image>
				</view>
			</view>
			<view class="right">
				<span>{{lunar? '农历' : '新历'}}</span>
				<switch @change="change" :checked="lunar" color="#61a3ff" class="switch"/>
			</view>
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
</template>

<script>
	import uniCalendar from '@/components/uni/uni-calendar/uni-calendar.vue'
	export default{
		props:{
			time:{
				default:null,
			},
			lunar:{
				default:false,
			},
			title:{
				default:'生日'
			}
		},
		components:{
			uniCalendar
		},
		data(){
			return{
			}
		},
		methods:{
			openCalendar(){
				this.$refs.calendar.open()
			},
			// 日历选中确定返回值
			enSure(e){
				this.$emit('update:getBTime',Date.parse(new Date(e.fulldate)))
			},
			change(e){
				this.$emit('update:getBLunar',e.target.value)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bigBox{
		font-size: 28rpx;
		display: flex;
		justify-content: space-between;
		border-bottom: 1rpx solid #ddd;
		margin: 0 30rpx;
		padding: 20rpx;
		.left{
			display: flex;
			.title{
				width: 270rpx;
			}
			.text{
				margin-top: -27rpx;
				image{
					width: 15rpx;
					height: 15rpx;
					margin: 40rpx 0 0 5rpx;
				}
			}
		}
		.right{
			display: flex;
			>span{
				margin-right: -20rpx;
			}
			.switch{
				margin-top: 0;
				margin-right: -20rpx;
				margin: -20rpx -20rpx -20rpx 0;
				transform:scale(0.5);
			}
		}
	}
</style>

