/*******************   通过手机号查找客户组模态框   *******************/

<template>
	<view class="bigBox">
		<view class="box">
			<view class="title">老客户</view>
			<radio-group class="radioBox" @change="radioChange">
					<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in newList" :key="index">
							<view>
									<radio :value="index"/>
									{{item | text}}
							</view>
					</label>
			</radio-group>
			<view class="butBox">
				<view class="cancel" @click="cancel">取消</view>
				<view class="ok" @click="ok">确定</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:['customerData'],
		data(){
			return{
				// 显示数组
				newList:null,
				current:0,
				// 已选择的数组
				enItem:null,
			}
		},
		filters:{
			text(arr){
				return arr.map((i)=>{
					return [i.mobile,i.name]
				})
			}
		},
		mounted(){
			this.getNewList()
		},
		methods:{
			// 将父组件返回数组进行处理
			getNewList(){
				let arr = this.customerData.map((i)=>{
					return i.customerContactVos
				})
				this.newList = arr
			},
			radioChange(e){
				this.enItem = this.newList[e.detail.value]
			},
			// 取消
			cancel(){
				this.$emit('cancel',false)
			},
			// 确定
			ok(){
				this.$emit('ok',this.enItem)
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
		color: #808080;
		.box{
			margin: 0 30rpx;
			font-size: 28rpx;
			background-color: #FFFFFF;
			border-radius: 15rpx;
			margin-top: 50%;
			.title{
				font-size: 36rpx;
				font-weight: bold;
				padding: 30rpx;
			}
			.radioBox{
				padding: 50rpx;
				padding-top: 0rpx;
			}
			.butBox{
				display: flex;
				.cancel,.ok{
					width: 50%;
					height: 80rpx;
					line-height: 80rpx;
					text-align: center;
					font-size: 32rpx;
				}
				.ok{
					color: #61a3ff;
				}
			}
		}
	}
</style>
