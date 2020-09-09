<template>
	<view class="bigBox">
		<view class="left">
			<view class="title">昵称</view>
			<picker @change="change" :value="index" :range="arr">
				<view class="picker">
					<view class="text">{{show}}</view>
					<i-icon class="icon" type="enter" size="16" color="#80848f"/>
				</view>
			</picker>
		</view>
	</view>
</template>

<script>
	const { $Message } = require('@/wxcomponents/base/index');
	import { getCallName } from '@/util/api/goods.js'
	export default{
		props:['callNameArr'],
		data(){
			return{
				arr:[],
				index:0,
				show:'昵称',
			}
		},
		mounted(){
			this.getCallName()
		},
		methods:{
			// 获取昵称
			getCallName(){
				this.arr = this.callNameArr.map((i)=>{ return i.name })
				this.show = this.arr[this.index]
				this.$emit('update:callName',this.show)
			},
			change(e){
				this.index = e.detail.value
				this.show = this.arr[this.index]
				this.$emit('update:callName',this.show)
			},	
		},
		watch:{
			callNameArr(){
				this.getCallName()
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './moduleStyle.scss';
</style>
