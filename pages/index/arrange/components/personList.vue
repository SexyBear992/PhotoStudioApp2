<template>
	<view class="box">
		<view class="listBox">
			<view class="title fa-title">{{title}}</view>
			<view class="textBox">
				<view class="text fa-text" @click="goAddress">{{show}}</view>
				<image class="my-img" src="https://7068-photostudioapp-1302515241.tcb.qcloud.la/newIcon/down.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		externalClasses:['fa-title','fa-text'],
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
				margin: 18rpx 0 0 5rpx;
			}	
		}
	}
</style>
