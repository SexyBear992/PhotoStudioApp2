<template>
	<!-- 支付方式 -->
	<view class="listBox">
		<view class="title">{{title}}</view>
		<picker @change="change" :value="index" :range="arr">
			<view class="textBox">
				<view class="text">{{show}}</view>
				<image class="my-img" src="https://lyfz-saas-erp-system.oss-cn-hangzhou.aliyuncs.com/AppletsFile/down.png" mode=""></image>
			</view>
		</picker>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default{
		props: {
			title: {
				default: '支付方式'
			},
			nowPay:{
				default: null,
			}
		},
		computed:{
			...mapGetters('shopArr',[
				'get_pay',
			]),
		},
		data(){
			return{
				index: 0,
				arr:[],
				text:null,
				receiptArr:[],
				show:'请选择'
			}
		},
		created(){
			this.getArr()
		},
		methods:{
			getArr(){
				let arr = []
				this.receiptArr = this.get_pay.filter((i)=>{ return i.level === 2 })
				this.arr = this.receiptArr.map((i)=>{ return i.name })
				this.getParams()
			},
			change(e){
				this.index = e.detail.value
				this.getParams()
			},
			getParams(){
				this.show = this.arr[this.index]
				this.$emit('update:getId',this.receiptArr[this.index].id)
				this.$emit('update:getName',this.show)
			},
		},
		watch:{
			nowPay(){
				this.index = this.receiptArr.findIndex((i)=>{ return i.id === this.nowPay})
				this.show = this.arr[this.index]
			}
		}
	}
</script>

<style lang="scss" scoped>
	.listBox{
		display: flex;
		margin: 30rpx;
		padding: 20rpx;
		border-bottom: 1rpx solid #DDDDDD;
		font-size: 28rpx;
		.title{
			width: 270rpx;
		}
		.text{
			display: flex;
			image{
				width: 15rpx;
				height: 15rpx;
				margin-top: 18rpx;
			}			
		}
	}
	.textBox{
		font-size: 28rpx;
		display: flex;
		image{
			width: 15rpx;
			height: 15rpx;
			margin-top: 18rpx;
		}				
	}
</style>