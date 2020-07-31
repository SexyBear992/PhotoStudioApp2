/**************************  客户来源模板  *******************************/
<template>
	<view class="bigBox"> 
		<!-- 标题 -->
		<view class="titleBox">
			<view class="title">
				客户来源模板
			</view>
		</view>
		
		<!-- 客户来源 -->
		<view class="listBox">
			<view class="title">客户来源：</view>
			<view class="text">{{originIdMap.get(dataInfo.originId)}}</view>
		</view>
		
		<!-- 介绍人 -->
		<view class="listBox">
			<view class="title">介绍人：</view>
			<view class="text">{{dataInfo.referrerName | referrer}}</view>
		</view>
		
		<!-- 手机号码 -->
		<view class="listBox">
			<view class="title">手机号码：</view>
			<view class="text">{{dataInfo.referrerMobile | referrer}}</view>
		</view>
		
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default{
		props:['openInfo'],
		computed:{
			...mapGetters('shopArr',[
				// 来源
				'get_origin',
			])
		},
		filters:{
			referrer(data){
				if(data !== null && data.trim() !== ''){
					return data
				}else{
					return '未填写'
				}
			}
		},
		data(){
			return{
				// 过滤来源
				originIdMap: new Map(),  
				
				// 内容
				dataInfo:{
					// 客户来源
					originId:null,
					// 介绍人
					referrerName:null,
					// 手机号码
					referrerMobile:null
				}
			}
		},
		mounted(){
			this.originIdMap = new Map(this.get_origin.map(item => [item.id, item.name]))
		},
		watch:{
			openInfo(){
				// 客户来源
				this.dataInfo.originId = this.openInfo.customerGroupVo.originId
				// 介绍人
				this.dataInfo.referrerName = this.openInfo.customerGroupVo.referrerName
				// 介绍人电话
				this.dataInfo.referrerMobile = this.openInfo.customerGroupVo.referrerMobile
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bigBox{
		padding: 0 30rpx;
		padding-top: 30rpx;
		.titleBox{
			font-size: 32rpx;
			border-left: 8rpx solid #61A3FF;
			.title{
				margin-left: 30rpx;
			}
		}
		.listBox{
			display: flex;
			font-size: 28rpx;
			padding: 0 20rpx;
			margin-top: 30rpx;
			height: 80rpx;
			line-height: 80rpx;
			border-bottom: 1rpx solid #DDDDDD;
			.title{
				width: 270rpx;
			}
		}
	}
</style>
