/***************  信息模块选择picker组件模块  ****************/

<template>
	<view>
			<view class="uni-list" v-if="list.length > 0">
					<view class="uni-list-cell">
							<view class="uni-list-cell-db">
									<picker @change="bindPickerChange" :value="index" :range="array">
										<view class="box">
											<view class="left">
												<view class="title">{{title}}</view>
												<view class="uni-input value">{{array[index]}}</view>
											</view>
											<image src="https://7068-photostudioapp-1302515241.tcb.qcloud.la/icon/icon_hr@2x.png"></image>
										</view>
									</picker>
							</view>
					</view>
			</view>
	
			<view v-else class="box">
				<view class="left">
					<view class="title">{{title}}</view>
					<view class="value" v-if="time">{{time | time}}</view>
					<view class="value" v-if="text">{{text}}</view>
				</view>
				<image src="https://7068-photostudioapp-1302515241.tcb.qcloud.la/icon/icon_hr@2x.png"></image>
			</view>
	</view>
</template>

<script>
	export default {
		props:{
			title: {
				type: String,
			},
			list:{
				type: Array
			},
			time:{
				type: String,
			},
			text:{
				type: String
			}
		},
		filters:{
			time(times){
				
				let dt = new Date(Number(times))
				let y = dt.getFullYear()
				let m = (dt.getMonth() + 1).toString().padStart(2, 0)
				let d = dt.getDate().toString().padStart(2, 0)
				return `${y}-${m}-${d}`
			}
		},
		data() {
			return {
				array: [],
				index: 0,
			};
		},
		mounted(){
			this.newArr()
	
		},
		methods:{
			bindPickerChange(e){
				this.index = e.target.value
				this.$emit('changeValue',this.array[e.target.value])
			},
			// 赋值数组
			newArr(){
				this.array = this.list
				this.$emit('changeValue',this.array[this.index])
			}
		},
		watch:{
			list(){
				this.newArr()
			},
		}
	}
</script>

<style lang="scss" scoped>
	.box{
		height: 80rpx;
		display: flex;
		margin: 0 30rpx;
		justify-content: space-between;
		border-bottom: 1rpx solid #f9f9f9;
		.left{
			font-size: 28rpx;
			display: flex;
			line-height: 80rpx;
			.title{
				margin: 0;
				margin-right: 30rpx;
			}
			.value{
				color: #8d8d8d;
			}
		}
		
		image{
			width: 12rpx;
			height: 18rpx;
			padding: 33rpx 0;
		}
	}
</style>
