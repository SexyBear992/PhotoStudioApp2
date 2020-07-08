<template>
	<view>
		<view class="main">
			<view class="topBox">
				<view class="timeBox">
					<view class="startTime" @click="openDate('startTime')">{{startTime}}</view>
					至
					<view class="endTime"  @click="openDate('endTime')">{{endTime}}</view>
				</view>
				<view class="search">搜索</view>
			</view>
			
		</view>
		
		<uni-calendar 
		ref="calendar"
		:insert="false"
		:start-date="startTime=='开始日期'?'':startTime"
		:lunar="true"
		@confirm="confirm"
		 />
	</view>
</template>

<script>
	import uniCalendar from '@/components/uni/uni-calendar/uni-calendar.vue'
	export default {
		components: {
			uniCalendar
		},
		data() {
			return {
				// 开始时间
				startTime:'开始日期',
				// 结束时间
				endTime:'结束时间',
				// 打开日期类型
				typeTime:null
			};
		},
		methods:{
			openDate(type){
				this.typeTime = type
				this.$refs.calendar.open();
			},
			confirm(e) {
				this[this.typeTime] = e.fulldate
			}
		}
	}
</script>

<style lang="scss" scoped>
	.main{
		.topBox{
			display: flex;
			.timeBox{
				width: 550rpx;
				height: 70rpx;
				line-height: 70rpx;
				border-radius: 5rpx;
				display: flex;
				justify-content: space-around;
				border: 1rpx solid #bababa;
				.startTime{
					color: #bababa;
				}
				.endTime{
					color: #bababa;
				}
			}
			.search{
				width: 100rpx;
				height: 70rpx;
				line-height: 70rpx;
			}
		}
		
	}
</style>
