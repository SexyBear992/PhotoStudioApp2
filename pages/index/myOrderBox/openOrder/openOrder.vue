/***
	开单页面
***/

<template>
	<view>
		<image :src="url+'hsBut.png'" mode="" @click="goOpen('婚纱开单','hs')"></image>
		<image :src="url+'etBut.png'" mode="" @click="goOpen('儿童开单','et')"></image>
		<image :src="url+'ymBut.png'" mode="" @click="goOpen('孕妈开单','ym')"></image>
		<image :src="url+'fwBut.png'" mode="" @click="goOpen('服务开单','fw')"></image>
		<image :src="url+'xzBut.png'" mode="" @click="goOpen('写真开单','xz')"></image>
		<image :src="url+'hqBut.png'" mode="" @click="goOpen('婚庆开单','hq')"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:'https://7068-photostudioapp-1302515241.tcb.qcloud.la/newIcon/',
			};
		},
		methods:{
			goOpen(name,type){
				uni.navigateTo({
					url:'openInfo/openInfo?typeName='+ name +'&type=' + type
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	image{
		width: 690rpx;
		height: 160rpx;
		margin: 15rpx 0;
		margin-left: 50%;
		transform: translateX(-50%);
	}
</style>
