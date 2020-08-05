/***************  信息模块选择picker组件模块  ****************/

<template>
	<view>
			<view class="uni-list" v-if="list.length > 0">
					<view class="uni-list-cell">
							<view class="uni-list-cell-db">
									<picker @change="bindPickerChange" :value="callIndex?callIndex:index" :range="array">
										<view class="box">
											<view class="left">
												<view class="title">{{title}}</view>
												<view class="uni-input value" v-if="callIndex">{{array[callIndex]}}</view>
												<view class="uni-input value" v-else>{{array[index]}}</view>
											</view>
											<i-icon class="icon" type="enter" size="16" color="#80848f"/>
										</view>
									</picker>
							</view>
					</view>
			</view>
	
			<view v-else class="box">
				<view class="left">
					<view class="title">{{title}}</view>
					<view class="value" v-if="time">{{time | time}}</view>
					<view class="value" v-if="text">{{text}}</view>
				</view>
				<i-icon class="icon" type="enter" size="16" color="#80848f"/>
			</view>
	</view>
</template>

<script>
	export default {
		props:{
			title: {
				type: String,
			},
			list:{
				type: Array
			},
			time:{
				type: String,
			},
			text:{
				type: String
			},
			callNameIndex:{
				type: Number
			}
		},
		data() {
			return {
				array: [],
				index: 0,
				callIndex:null,
			};
		},
		mounted(){
			this.callIndex = this.callNameIndex
			this.newArr()
	
		},
		methods:{
			bindPickerChange(e){
				if(this.callIndex){
					this.callIndex = e.target.value
				}else{
					this.index = e.target.value
				}
				this.$emit('changeValue',this.array[e.target.value])
			},
			// 赋值数组
			newArr(){
				this.array = this.list
				if(this.callIndex){
					this.$emit('changeValue',this.array[this.callIndex])
				}else{
					this.$emit('changeValue',this.array[this.index])
				}
			}
		},
		watch:{
			list(){
				this.newArr()
			},
			callNameIndex(){
				this.callIndex = this.callNameIndex
			}
		}
	}
</script>

<style lang="scss" scoped>
	.box{
		height: 80rpx;
		display: flex;
		margin: 0 30rpx;
		justify-content: space-between;
		border-bottom: 1rpx solid #f9f9f9;
		.left{
			font-size: 28rpx;
			display: flex;
			line-height: 80rpx;
			.title{
				margin: 0;
				margin-right: 30rpx;
			}
			.value{
				color: #8d8d8d;
			}
		}
		.icon{
			margin-top: 18rpx;
		}
	}
</style>
