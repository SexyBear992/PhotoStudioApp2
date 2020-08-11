<template>
	<view class="box">
		<view class="listBox">
			<view class="title">{{title}}</view>
			<view class="textBox">
				<view class="text" @click="goAddress">{{show}}</view>
				<image class="my-img" src="https://7068-photostudioapp-1302515241.tcb.qcloud.la/newIcon/down.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:['title','show','type'],
		data(){
			return{
				
			}
		},
		methods:{
			goAddress(){
				this.$emit('goAddress',this.type)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.listBox{
		display: flex;
		margin: 30rpx;
		padding: 20rpx;
		font-size: 28rpx;
		border-bottom: 1rpx solid #DDDDDD;
		.title{
			width: 270rpx;
		}
		.textBox{
			display: flex;
			image{
				width: 15rpx;
				height: 15rpx;
				margin: 18rpx 0 0 5rpx;
			}	
		}
	}
</style>
