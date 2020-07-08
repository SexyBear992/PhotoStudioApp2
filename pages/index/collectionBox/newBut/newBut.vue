<template>
	<view>
		<view class="main">
			<!-- 付款人 -->
			<view class="listBox">
				<view class="text">付款人</view>
				<input class="inp" type="text" value="" placeholder="请输入付款人" v-model="drawee" />
			</view>
			<!-- 项目名称 -->
			<view class="listBox">
				<view class="text">项目名称</view>
				<input class="inp" type="text" value="" placeholder="请输入项目名称" v-model="projectName" />
			</view>
			<!-- 金额 -->
			<view class="listBox">
				<view class="text">金额</view>
				<input class="inp" type="number" value="" placeholder="请输入金额" v-model="money" />
			</view>
			<!-- 支付方式 -->
			<view class="listBox">
				<view class="text">支付方式</view>
				<picker @change="bindPickerChange" :value="index" :range="array">
					<view class="inp">{{array[index]}}</view>
				</picker>
			</view>
			<!-- 日期 -->
			<view class="listBox">
				<view class="text">日期</view>
				<view class="inp" @click="openDate">{{time}}</view>
			</view>
			<!-- 录入人 -->
			<view class="listBox">
				<view class="text">录入人</view>
				<input class="inp" type="text" value="" placeholder="请输入录入人" v-model="operator" />
			</view>
			
			<!-- 备注 -->
			<view class="note">
				<view class="text">备注</view>
				<textarea type="text" placeholder="请填写备注" />
			</view>
		</view>
		
		<view class="save" @click="save">保存</view>
		
		<uni-calendar
		:insert="false"
		:lunar="true" 
		ref="calendar"
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
				// 付款人
				drawee:'',
				// 项目名称
				projectName:'',
				// 金额
				money:'',	
				// 时间
				time:'请选择时间',
				// 录入人
				operator:'',
				// 选择器
				array: ['微信', '支付宝', '现金'],
				// 选择器下标
				index: 0,
			};
		},
		methods:{
			// 打开日历
			openDate(){
				this.$refs.calendar.open()
			},
			// 日历返回值
			confirm(e){
				this.time = e.fulldate
			},
			// 支付方式 选择器
			bindPickerChange(e){
				this.index = e.target.value
			},
			// 保存
			save(){
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.main{
		width: 600rpx;
		margin: 0rpx auto;
		.listBox{
			font-size: 32rpx;
			margin-top: 50rpx;
			display: flex;
			justify-content: space-between;
			.text{
				margin-top: 5rpx;
			}
			.inp{
				line-height: 60rpx;
				height: 60rpx;
				width: 350rpx;
				border: 1rpx solid #f0eded;
				padding-left: 10rpx;
			}
		}
		.note{
			margin-top: 50rpx;
			font-size: 32rpx;
			textarea{
				margin-top: 20rpx;
				border: 1rpx solid #f0eded;
				padding: 10rpx;
			}
		}
	}
	.save{
		width: 550rpx;
		height: 80rpx;
		margin: 0rpx auto;
		line-height: 80rpx;
		text-align: center;
		color: #FFFFFF;
		background-color: #f26161;
		border-radius: 5rpx;
		margin-top: 100rpx;
	}
</style>
