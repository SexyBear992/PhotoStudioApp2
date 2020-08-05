/********************    工具箱模态框      *********************/
<template>
	<view class="bigBox">
		<view class="listBox">
			<view class="close">
				<view class="closeBut" @click="close">
					<i-icon type="close" size="15" color="#80848f"/>
				</view>
			</view>
			<view class="textBox">
				<view class="text" @click="goodToolList">商品</view>
				<view class="text" @click="dressToolList">服装</view>
				<view class="text" @click="placeToolList">景点</view>
				<view class="text" @click="servicesToolList">服务</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default{
		props:['index'],
		data(){
			return{
			}
		},
		methods:{
			// 关闭模态框
			close(){
				this.$emit('close')
			},
			
			// 打开商品工具箱
			goodToolList(){
				this.$emit('close')
				uni.navigateTo({
					url:'../../../../tool/tool?type=GOODS&index=' + this.index
				})
			},
			// 打开服装工具箱
			dressToolList(){
				this.$emit('close')
				uni.navigateTo({
					url:'../../../../tool/tool?type=DRESSINFO&index=' + this.index
				})
			},
			// 打开景点工具箱
			placeToolList(){
				this.$emit('close')
				uni.navigateTo({
					url:'../../../../tool/tool?type=PLACE&index=' + this.index
				})
			},
			// 打开服务工具箱
			servicesToolList(){
				this.$emit('close')
				uni.navigateTo({
					url:'../../../../tool/tool?type=SERVICES&index=' + this.index
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.bigBox{
		z-index: 9999999;
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,0.5);
		top: 0;
		.listBox{
			width: 550rpx;
			margin: 50% auto;
			border-radius: 15rpx;
			background-color: #FFFFFF;
			.close{
				display: flex;
				flex-direction: row-reverse;
				.closeBut{
					margin: 20rpx;
				}
			}
			.textBox{
				margin: 0 30rpx;
				padding-bottom: 30rpx;
				.text{
					font-size: 32rpx;
					line-height: 70rpx;
				}
			}
		}
	}
</style>
