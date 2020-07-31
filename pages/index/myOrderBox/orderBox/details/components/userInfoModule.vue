/************************************  客户信息  ***********************************/
<template>
	<view class="bigBox">
		<!-- 标题 -->
		<view class="titleBox">
			<view class="title">
				客户信息
			</view>
		</view>
		
		<!-- 客户区域 -->
		<view class="listBox">
			<view class="title">客户区域：</view>
			<view class="text">{{categoryIdMap.get(dataInfo.categoryId) | category}}</view>
		</view>
		
		<!-- 日期类型 -->
		<view class="listBox" v-if="typeTimeTitle">
			<view class="title">{{typeTimeTitle}}</view>
			<!-- 农历 -->
			<view class="text" v-if="dataInfo.typeLunar">{{dataInfo.typeStr | typeStr}}</view>
			<!-- 新历 -->
			<view class="text" v-else>{{dataInfo.typeTime | typeTime}}</view>
		</view>
		
		
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default{
		props:['openInfo'],
		computed:{
			...mapGetters('shopArr',[
				// 区域
				'get_category',
			])
		},
		filters:{
			// 区域
			category(data){
				if(data){
					return data
				}else{
					return '未选择'
				}
			},
			// 农历
			typeStr(str){
				if(str){
					return str
				}else{
					return '未定日期'
				}
			},
			// 新历
			typeTime(time){
				if(time){
					let dt = new Date(Number(time))
					let y = dt.getFullYear()
					let m = (dt.getMonth() + 1).toString().padStart(2, 0)
					let d = dt.getDate().toString().padStart(2, 0)
					return `${y}-${m}-${d}`
				}else{
					return '未定日期'
				}
			},
		},
		data(){
			return{
				// 过滤区域
				categoryIdMap: new Map(),  
				
				// 类型日期显示
				typeTimeTitle:null,
				
				// 内容
				dataInfo:{
					// 客户区域
					categoryId:null,
					// 订单类型时间是否农历
					typeLunar:null,
					// 类型日期 新历
					typeTime:null,
					// 类型日期 农历
					typeStr:null,
				}
			}
		},
		mounted(){
			this.categoryIdMap = new Map(this.get_category.map(item => [item.id, item.name]))
		},
		watch:{
			openInfo(){
				// 客户区域
				this.dataInfo.categoryId = this.openInfo.customerGroupVo.categoryId
				// 类型日期显示
				switch(this.openInfo.type){
					case 'WEDDING_DRESS':
						this.typeTimeTitle = '结婚日期'
						break;
					case 'PREGNANT':
						this.typeTimeTitle = '预产日期'
						break;
					case 'SERVICE':
						this.typeTimeTitle = '服务日期'
				}
				// 订单类型时间是否农历
				this.dataInfo.typeLunar = this.openInfo.typeLunar
				// 类型日期 新历
				this.dataInfo.typeTime = this.openInfo.typeTime
				// 类型日期 农历
				this.dataInfo.typeStr = this.openInfo.typeStr
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
