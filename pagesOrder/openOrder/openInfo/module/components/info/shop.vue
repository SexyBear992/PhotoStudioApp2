<template>
	<view class="bigBox">
		<view class="left">
			<view class="title">门店</view>
			<picker @change="change" :value="index" :range="pickerShopArr">
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
	import { mapGetters } from 'vuex'
	export default{
		computed:{
			...mapGetters('app',[
				'shopId',
			]),
			...mapGetters('shopArr',[
				'get_shopAllArr',
			]),
		},
		data(){
			return{
				pickerShopArr:[],
				index:0,
				show:null,
			}
		},
		mounted(){
			this.getShopArr()
		},
		methods:{
			// 支付方式数组
			getShopArr(){
				if(this.get_shopAllArr.length > 0){
					this.get_shopAllArr.forEach((i)=>{
						this.pickerShopArr.push(i.shopName)
					})
					this.index = this.get_shopAllArr.findIndex((i)=>{
						return i.shopId === this.shopId
					})
					this.show = this.pickerShopArr[this.index]
				}else{
					$Message({
						content: '请重试',
						type: 'error'
					});
				}
				
			},
			// 支付方式返回
			change(e){
				this.index = Number(e.detail.value)
				this.show = this.pickerShopArr[this.index]
				this.get_shopAllArr.some((i)=>{
					if(i.shopName === this.show){
						this.$emit('update:shopId',i.shopId)
					}
				})
			},	
		}
	}
</script>

<style lang="scss" scoped>
	@import '../moduleStyle.scss';
</style>
