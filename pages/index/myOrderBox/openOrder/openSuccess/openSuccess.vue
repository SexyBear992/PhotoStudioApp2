<template>
	<view>
		<view class="title">开单成功</view>
		<view class="ok" @click="ok">确定</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			ok(){
				uni.switchTab({
					url:'../../../index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.title{
		font-size: 38rpx;
		color: #61A3FF;
		margin: 300rpx auto;
		text-align: center;
	}
	.ok{
		width: 500rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		border-radius: 40rpx;
		background-color: #61A3FF;
		color: #FFFFFF;
		margin: 0 auto;
	}
</style>
