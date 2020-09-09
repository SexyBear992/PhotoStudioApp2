<template>
	<view class="bigBox">
		<view class="left">
			<view class="title">订单号</view>
			<view v-if="autoOrderNo" class="text">生成订单号</view>
			<input v-else type="text" placeholder="输入订单号" @input="orderNo"/>
		</view>
		<switch @change="change" :checked="autoOrderNo" color="#61a3ff" class="switch"/>
	</view>
</template>

<script>
	export default{
		props:['autoOrderNo'],
		data(){
			return{
				
			}
		},
		methods:{
			// 是否自动生成订单号
			change(e){
				this.$emit('update:autoOrder',e.detail.value)
			},
			// 获取输入订单号
			orderNo(e){
				this.$emit('update:getOrderNo',e.detail.value)
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../moduleStyle.scss';
</style>
