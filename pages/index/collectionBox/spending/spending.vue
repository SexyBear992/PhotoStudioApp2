<template>
	<!-- 支出 -->
	<view>
		<view class="but" @click="newBut">新增录入</view>
		<view class="but" @click="checkBut">查询支出</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			// 进入增加录入
			newBut(){
				uni.navigateTo({
					url:'../newBut/newBut'
				})
			},
			// 进入查询支出
			checkBut(){
				uni.navigateTo({
					url:'../checkBut/checkBut'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.but{
		margin: 0rpx auto;
		margin-top: 150rpx;
		width: 450rpx;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 10rpx;
		text-align: center;
		color: #FFFFFF;
		background-color: #3894ff;
	}
</style>
