<template>
	<view class="bigBox">
		<view class="box">
			<view class="titleBox">
				<view class="title">修改</view>
				<view  @click="close">
					<i-icon type="close" size="15" color="#80848f"/>
				</view>
			</view>
		
			<view class="mainBox" v-if="faType === 'place'">
				<view class="textareaBox">
					<view class="title">备注：</view>
					<textarea type="text" v-model="updatInfo.remark"  placeholder="备注" />
				</view>
			</view>
			
			<view class="mainBox" v-if="faType === 'product' ">
				<view class="listBox">
					<view class="title">P数：</view>
					<view class="textBox">
						<input type="text" class="text" placeholder="P数" v-model="updatInfo.countP" />
					</view>
				</view>
				
				<view class="listBox">
					<view class="title">数量：</view>
					<view class="textBox">
						<input type="text" class="text" placeholder="数量" v-model="updatInfo.countNum" />
					</view>
				</view>
				
				<view class="listBox">
					<view class="title">加急时间：</view>
					<view class="textBox">
						<input type="text" class="text" placeholder="加急时间" v-model="updatInfo.expeditedTime" />
					</view>
				</view>
				
				<view class="listBox">
					<view class="title">取件方式：</view>
					<view class="textBox">
						<input type="text" class="text" placeholder="取件方式" v-model="updatInfo.pickupModeCategoryId" />
					</view>
				</view>
				
				<view class="textareaBox">
					<view class="title">备注：</view>
					<textarea type="text" v-model="updatInfo.remark"  placeholder="备注" />
				</view>
				
			</view>
			
			<view class="okBox">
				<view class="ok" @click="ok">确定修改</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:['info','faType'],
		data(){
			return{
				updatInfo:{},
			}
		},
		mounted(){
			this.getParmas()
		},
		methods:{
			// 获得parmas
			getParmas(){
				console.log(this.info)
				let data = this.info
				if(this.faType === 'product'){
					let arr = {
						countNum:data.countNum,
						countP:data.countP,
						expeditedTime:data.expeditedTime,
						id:data.id,
						pickupModeCategoryId:data.pickupModeCategoryId,
						remark:data.remark
					}
					this.updatInfo = arr
				}else if(this.faType === 'dress'){
					let arr = {
						count: data.count,
						id: data.id,
						remark: data.remark,
					}
					this.updatInfo = arr
				}else if(this.faType === 'service'){
					let arr = {
						count: data.count,
						id: data.id,
						remark: data.remark,
					}
					this.updatInfo = arr
				}else if(this.faType === 'place'){
					let arr = {
						id:data.id,
						remark:data.remark
					}
					this.updatInfo = arr
				}
				
			},
			// 关闭
			close(){
				this.$emit('close')
			},
			ok(){
				this.$emit('ok',this.updatInfo)
			}
		},
		watch:{
			info(){
				this.getParmas()
			},
			updatInfo:{
				deep:true,
				handler(){
					console.log(this.updatInfo)
				}
			}
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
		font-size: 28rpx;
		top: 0;
		.box{
			width: 600rpx;
			margin: 50% auto;
			transform: translateY(-20%);
			border-radius: 15rpx;
			background-color: #FFFFFF;
			.titleBox{
				display: flex;
				font-size: 32rpx;
				justify-content: space-between;
				padding: 30rpx;
				border-bottom: 1rpx solid #DDD;
			}
			.mainBox{
				padding: 50rpx;
				.textareaBox{
					font-size: 28rpx;
					display: flex;
					color: #000000;
					padding: 20rpx 0;
					.title{
						width: 100rpx;
					}
					textarea{
						width: 320rpx;
						border: 1rpx solid #DDDDDD;
						border-radius: 10rpx;
						padding: 20rpx;
						min-height: 100rpx;
					}
				}
				.listBox{
					font-size: 28rpx;
					display: flex;
					color: #000000;
					padding: 20rpx 0;
					.title{
						width: 170rpx;
					}
					.textBox{
						display: flex;
						image{
							width: 15rpx;
							height: 15rpx;
							margin: 18rpx 0 0 5rpx;
						}
						input{
							width: 270rpx;
							border: 1rpx solid #DDD;
							border-radius: 10rpx;
							padding: 0 10rpx;
						}
					}
				}
			}
			.okBox{
				display: flex;
				flex-direction: row-reverse;
				padding: 10rpx 30rpx;
				border-top: 1rpx solid #DDD;
				.ok{
					width: 150rpx;
					height: 60rpx;
					font-size: 28rpx;
					text-align: center;
					line-height: 60rpx;
					border-radius: 10rpx;
					border: 1rpx solid #DDDDDD;
				}
			}
		}
	}
</style>
