<template>
	<view>
		<view class="main">
			<!-- 来源 -->
			<view class="listBox">
				<view class="left">
					<view class="title">来源</view>
					<view class="text">{{source}}</view>
				</view>
				<image :src="url+'icon_hr@2x.png'" mode="" @click="openDrawer('source')"></image>
			</view>
			<!-- 介绍人 -->
			<view class="listBox">
				<view class="left">
					<view class="title">介绍人</view>
					<!-- <view class="text">{{references}}</view> -->
					<input type="text" v-model="references" placeholder="介绍人名字"/>
				</view>
				<view class="chooseReferences" @click="goCandidates('references')">选择介绍人</view>
			</view>
			<!-- 手机号码 -->
			<view class="listBox">
				<view class="left">
					<view class="title">手机号码</view>
					<input type="text" v-model="sourcePhone" placeholder="介绍人手机号"/>
					<!-- <view class="text">{{sourcePhone}}</view> -->
				</view>
			</view>
			
			<!-- 取消/确定 -->
			<view class="butBox">
				<view class="cancel" @click="cancel">取消</view>
				<view class="determine" @click="determine">确认</view>
			</view>
		</view>
		
		<!-- 抽屉弹窗 -->
		<uni-drawer
			mode="right"
			ref='drawer'
			class="drawer"
		>
			<view style="padding:30rpx;">
				<!-- 来源 -->
				<view v-if="drawerType == 'source'">
					<view class="title">来源选择</view>
					<view v-for="(item,index) in sourceList" :key="index">
						<view class="text" @click="chooseDrawer(drawerType,item.name)" :class="(item.action)?'action':''">{{item.name}}</view>
					</view>
				</view>
			</view>
		</uni-drawer>
	</view>
</template>

<script>
	import {mapGetters} from 'vuex'
	import uniDrawer from "@/components/uni/uni-drawer/uni-drawer.vue"
	import sourceList from '../../openOrderBox/openOrderDetails/sourceList.js'
	export default {
		components: {uniDrawer},
		data() {
			return {
				url:'https://7068-photostudioapp-1302515241.tcb.qcloud.la/icon/',
				// 来源
				source:'客资客户',
				// 来源列表
				sourceList:[],
				// 打开抽屉类型
				drawerType:''
			};
		},
		computed:{
			...mapGetters([
				'references',
				'sourcePhone'
			])
		},
		mounted(){
			this.sourceList = sourceList
		},
		methods:{
			goCandidates(type){
				uni.navigateTo({
					url:'../../openOrderBox/candidates/candidates?type=references'
				})
			},
			//打开抽屉
			openDrawer(type,index){
				this.callNameIndex = index
				this.drawerType = type
				this.$refs.drawer.open()
				let List = type + 'List'
				let _this = this
				this[List].forEach(function(i){
					if(i.name == _this[type]){
						i.action = true
					}else{
						i.action = false
					}		
				})
			},
					
			// 抽屉选择返回值
			chooseDrawer(drawerType,item,index){
				// 正常情况
				let List = drawerType + 'List'
					// 门店赋值
				this[drawerType] = item
				// 改变选择颜色 (循环遍历数组，改变点击的颜色)
				this[List].forEach(function(i){
					if(i.name == item){
						i.action = true
					}else{
						i.action = false
					}		
				})
				this.$refs.drawer.close()
			},
		}
	}
</script>

<style lang="scss" scoped>
.main{
	width: 700rpx;
	margin: 10rpx auto;
	.listBox{
		display: flex;
		height: 80rpx;
		justify-content: space-between;
		border-bottom: 1rpx solid #f9f9f9;
		.left{
			font-size: 28rpx;
			display: flex;
			line-height: 80rpx;
			.title{
				font-size: 28rpx;
				font-weight: normal;
				margin: 0;
				margin-right: 30rpx;
			}
			input{
				margin:auto 0;
				width: 435rpx;
			}
		}
		.switch{
			margin-top: 10rpx;
			transform:scale(0.5);
		}
		input{
			color: #8d8d8d;
		}
		.right{
			margin-top: 10rpx;
			font-size: 24rpx;
			color: #61a3ff;
			.switch{
				margin-top: 0;
				margin-right: -20rpx;
			}
		}
		.text{
			color: #8d8d8d;
		}
		image{
			width: 12rpx;
			height: 18rpx;
			padding: 33rpx 30rpx 33rpx 100rpx;
		}
		.addLB{
			display: flex;
			
		}
		.chooseReferences{
			border: 1rpx solid #6d9ef6;
			color: #6d9ef6;
			border-radius: 10rpx;
			font-size: 24rpx;
			height: 40rpx;
			line-height: 40rpx;
			padding: 0 10rpx;
			margin: auto 0;
		}
	}	
	.butBox{
		margin-top: 20rpx;
		display: flex;
		justify-content: flex-end;
		.cancel{
			width: 120rpx;
			height: 60rpx;
			line-height: 60rpx;
			text-align: center;
			font-size: 28rpx;
			border-radius: 10rpx;
			border: 1rpx solid #C0C0C0;
		}
		.determine{
			width: 120rpx;
			height: 60rpx;
			line-height: 60rpx;
			text-align: center;
			font-size: 28rpx;
			border-radius: 10rpx;
			margin-left: 20rpx;
			color: #FFFFFF;
			background-color: #2d8cf0;
		}
	}
	.butBox{
		margin-top: 20rpx;
		display: flex;
		justify-content: flex-end;
		.cancel{
			width: 120rpx;
			height: 60rpx;
			line-height: 60rpx;
			text-align: center;
			font-size: 28rpx;
			border-radius: 10rpx;
			border: 1rpx solid #C0C0C0;
		}
		.determine{
			width: 120rpx;
			height: 60rpx;
			line-height: 60rpx;
			text-align: center;
			font-size: 28rpx;
			border-radius: 10rpx;
			margin-left: 20rpx;
			color: #FFFFFF;
			background-color: #2d8cf0;
		}
	}
}
.drawer{
	.title{
		font-size: 38rpx;
		font-weight: bold
	}
	.text{
		margin: 20rpx;
		font-size: 36rpx;
	}
	.liName{
		margin-left: 20rpx;
	}
	.action{
		color: #578ff4;
	}
}
	
</style>
