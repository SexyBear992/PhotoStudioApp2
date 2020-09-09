<template>
	<view class="bigBox">
		<view class="left">
			<view class="title">时间</view>
			<view class="picker" @click="openCalendar">
				<view class="text">{{orderTime | time}}</view>
				<i-icon class="icon" type="enter" size="16" color="#80848f"/>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:['orderTime'],
		data(){
			return{
				
			}
		},
		methods:{
			openCalendar(){
				this.$emit('open')
			}
		},
	}
</script>

<style lang="scss" scoped>
	@import '../moduleStyle.scss';
</style>
