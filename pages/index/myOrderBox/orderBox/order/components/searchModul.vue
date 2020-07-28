<template>
	<view>
		<view class="search">
			<view class="searchLeft">
				<picker @change="bindPickerChange" :value="index" :range="array">
					<view class="uni-input">{{array[index]}}</view>
				</picker>
				<input type="text" :placeholder="array[index]" v-model="keyword"/>
			</view>
			
			<view class="searchBut" @click="search">
				<i-icon type="search" size="20" color="#80848f" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				// 搜索下拉选择
				array:['姓名','手机号','订单号'],
				// 下拉下标
				index:0,
				// 搜索
				keyword:null,
				
				parmas:{
					isSearchCount:true,
					limit:10,
					page:1,
				}
			}
		},
		methods:{
			search(){
				this.parmas.page = 1
				if(this.keyword && this.keyword !== ''){
					let value = this.array[this.index]
					if(value === '姓名'){
						delete this.parmas.contactMobile
						delete this.parmas.orderNo
						this.parmas.contactName = this.keyword
					}else if(value === '手机号'){
						delete this.parmas.contactName
						delete this.parmas.orderNo
						this.parmas.contactMobile = this.keyword
					}else if(value === '订单号'){
						delete this.parmas.contactName
						delete this.parmas.contactMobile
						this.parmas.orderNo = this.keyword
					}
				}else{
					delete this.parmas.contactName
					delete this.parmas.contactMobile
					delete this.parmas.orderNo
				}
				this.$emit('search',this.parmas)
			},
		}
	
	}
</script>

<style lang="scss" scoped>
	.search{
		background-color: #f8f8f8;
		width: 690rpx;
		height: 80rpx;
		line-height: 80rpx;
		margin: 30rpx auto; 
		display: flex;
		justify-content: space-between;
		.searchLeft{
			display: flex; 
			.uni-input{
				font-size: 28rpx;
				font-weight: bold;
				padding: 0 30rpx;
			}
			input{
				font-size: 28rpx;
				margin-top: 18rpx;
				border-left: 1rpx solid #DDDDDD;
				padding: 0 30rpx;

			}
		}
		.searchBut{
			padding: 0 30rpx;
		}
	}
</style>
