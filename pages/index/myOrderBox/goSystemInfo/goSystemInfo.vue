<template>
	<view>	
		<view class="main">
			<!-- 服务等级 -->
			<view class="listBox">
				<view class="left">
					<view class="title">服务等级</view>
					<view class="text">{{serviceLv}}</view>
				</view>
				<image :src="url+'icon_hr@2x.png'" mode="" @click="openDrawer('serviceLv')"></image>
			</view>
			<!-- 老师级别 -->
			<view class="listBox">
				<view class="left">
					<view class="title">老师级别</view>
					<view class="text">{{teacherLv}}</view>
				</view>
				<image :src="url+'icon_hr@2x.png'" mode="" @click="openDrawer('teacherLv')"></image>
			</view>
			<!-- 套系名字 -->
			<view class="listBox">
				<view class="left">
					<view class="title">套系名字</view>
					<view class="text">{{seriesName}}</view>
				</view>
				<image :src="url+'icon_hr@2x.png'" mode="" @click="openDrawer('seriesName')"></image>
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
				<!-- 服务等级 -->
				<view v-if="drawerType == 'serviceLv'">
					<view class="title">服务等级选择</view>
					<view v-for="(item,index) in serviceLvList" :key="index">
						<view class="text" @click="chooseDrawer(drawerType,item.name)" :class="(item.action)?'action':''">{{item.name}}</view>
					</view>
				</view>
				<!-- 老师级别 -->
				<view v-if="drawerType == 'teacherLv'">
					<view class="title">老师级别选择</view>
					<view v-for="(item,index) in teacherLvList" :key="index">
						<view class="text" @click="chooseDrawer(drawerType,item.name)" :class="(item.action)?'action':''">{{item.name}}</view>
					</view>
				</view>
				<!-- 套系名字 -->
				<view v-if="drawerType == 'seriesName'">
					<view class="title">套系名字选择</view>
					<view v-for="(item,index) in seriesNameList" :key="index">
						<view class="text">
							{{item.name}}>
							<view class="seriesNameList" v-for="(i,ind) in item.list" :key="ind" 
							 @click="chooseDrawer(drawerType,i.name,ind)" :class="(i.action)?'action':''">
								<view class="liName">{{i.name}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</uni-drawer>
		
	</view>
</template>

<script>
	import uniDrawer from "@/components/uni/uni-drawer/uni-drawer.vue"
	import serviceLvList from '../../openOrderBox/openOrderDetails/serviceLvList.js'
	import teacherLvList from '../../openOrderBox/openOrderDetails/teacherLvList.js'
	import seriesNameList from '../../openOrderBox/openOrderDetails/seriesNameList.js'
	export default {
		components:{ uniDrawer },
		data() {
			return {
				url:'https://7068-photostudioapp-1302515241.tcb.qcloud.la/icon/',
				// 抽屉打开类型
				drawerType : null,
				// 服务等级
				serviceLv:'服务级别',
				// 服务等级列表
				serviceLvList:[],
				// 老师级别
				teacherLv:'老师级别',
				// 教师级别列表
				teacherLvList:[],
				// 套系名称
				seriesName:'请选择',
				// 套系列表
				seriesNameList:[],
			};
		},
		mounted(){
			this.serviceLvList = serviceLvList
			this.teacherLvList = teacherLvList
			this.seriesNameList = seriesNameList
		},
		methods:{
			//打开抽屉
			openDrawer(type,index){
				this.drawerType = type
				this.$refs.drawer.open()
				let List = type+'List'
				let _this = this
				this[List].forEach(function(i){
					if(i.list){
						i.list.forEach(function(j){
							if(j.name == _this[type]){
								j.action = true
							}else{
								j.action = false
							}
						})
					}else{
						if(i.name == _this[type]){
							i.action = true
						}else{
							i.action = false
						}
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
					if(i.list){
						if(i.list[index].name == item){
							i.list[index].action = true
						}else{
							i.list[index].action = false
						}
					}else{
						if(i.name == item){
							i.action = true
						}else{
							i.action = false
						}
					}
				})
				this.$refs.drawer.close()
			},
			
			// 取消
			cancel(){
				uni.navigateBack({
					delta:1
				})
			},
			
			// 确认
			determine(){
				uni.navigateBack({
					delta:1
				})
			},
		},
	}
</script>

<style lang="scss">
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
