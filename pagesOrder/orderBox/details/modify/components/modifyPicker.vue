/************ 开单一级选择器 ***************/
<template>
	<view class="bigBox">
		<picker @change="enchoose" :value="index" :range="arr">
			<view class="picker">
				<view class="text">{{show}}</view>
				<image src="https://lyfz-saas-erp-system.oss-cn-hangzhou.aliyuncs.com/AppletsFile/down.png" mode=""></image>
			</view>
			</picker>
	</view>
</template>

<script>
	const { $Message } = require('@/wxcomponents/base/index');
	import { mapGetters } from 'vuex'
	export default{
		props:['title','categoryName','changeId'],
		computed:{
			...mapGetters('shopArr',[
				// 分类
				'get_orderTypeArr',
				// 分组
				'get_orderGroup',
				// 服务等级
				'get_serviceCategory',
				// 教师等级
				'get_teacherCategory'
			]),
		},
		data(){
			return{
				show:'请选择',
				arr:[],
				index:0
			}
		},
		created(){
			this.getArr()
		},
		methods:{
			getArr(){
				if(this[this.categoryName].length > 0){
					this[this.categoryName].forEach((i)=>{
						this.arr.push(i.name)
					})
					this.arr.shift()
				}else{
					$Message({
						content: '请重试',
						type: 'error'
					});
				}
			},
			enchoose(e){
				this.index = Number(e.detail.value)
				this.show = this.arr[this.index]
				this[this.categoryName].some((i)=>{
					if(i.name === this.show){
						this.$emit('update:getId',i.id)
					}
				})
			},	
		},
		watch:{
			changeId(){
				this[this.categoryName].some((i)=>{
					if(i.id === this.changeId){
						this.show = i.name
					}
				})
				this.index = this.arr.findIndex((i)=>{return i == this.show})
				this.$forceUpdate()
			}
		}
	}
</script>

<style lang="scss" scoped>
	// @import './moduleStyle.scss';
	.picker{
		display: flex;
	}
	image{
		width: 15rpx;
		height: 15rpx;
		margin: 40rpx 0 0 5rpx;
	}
</style>
