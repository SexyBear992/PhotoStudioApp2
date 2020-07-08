<template>
	<view>
		<view class="main">
			<view class="box">
				<!-- <view class="title">客户联系人信息</view> -->
				<view class="main" v-for="(item,index) in userInfo" :key="index">
					<!-- <view class="user">联系人{{index+1}}</view> -->
					<!-- 称呼 -->
					<view class="listBox ch">
						<view class="left">
							<view class="title">称呼</view>
							<view class="text">{{item.callName}}</view>
						</view>
						<image :src="url+'icon_hr@2x.png'" mode="" @click="openDrawer(index)"></image>
					</view>
					<!-- 名字 -->
					<view class="listBox">
						<view class="left">
							<view class="title">名字</view>
							<input type="text" v-model="item.name" placeholder="名字"/>
						</view>
					</view>
					<!-- 手机 -->
					<view class="listBox">
						<view class="left">
							<view class="title">手机</view>
							<input type="text" v-model="item.phone" placeholder="手机"/>
						</view>
					</view>
					<!-- QQ -->
					<view class="listBox">
						<view class="left">
							<view class="title">Q Q</view>
							<input type="text" v-model="item.qq" placeholder="QQ"/>
						</view>
					</view>
					<!-- 微信 -->
					<view class="listBox">
						<view class="left">
							<view class="title">微信</view>
							<input type="text" v-model="item.wechat" placeholder="微信"/>
						</view>
					</view>
					<!-- 生日 -->
					<view class="listBox">
						<view class="left" @click="openCalendar('userInfo',index)">
							<view class="title">生日</view>
							<view class="text" v-if="item.lunar">{{item.brisday}}</view>
							<view class="text" v-else>{{item.brisdayOld}}</view>
						</view>
						<view class="right">
							<switch @change="switchBrisdayOld($event,index)" color="#61a3ff" class="switch"/><span>农历</span>
						</view>
					</view>
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
				<!-- 昵称选择 -->
				<view>
					<view class="title">昵称选择</view>
					<view v-for="(item,index) in callNameList" :key="index">
						<view class="text" @click="chooseDrawer(drawerType,item.name,index)" :class="(item.action)?'action':''">{{item.name}}</view>
					</view>
				</view>
			</view>
		</uni-drawer>
	
		<uni-calendar
		    :insert="false"
		    :lunar="true" 
			:clearDate='true'
			ref='calendar'
			@confirm="sureDay"
			class="calendar"
		 />
	</view>
</template>

<script>
	import uniDrawer from "@/components/uni/uni-drawer/uni-drawer.vue"
	import uniCalendar from '@/components/uni/uni-calendar/uni-calendar.vue'
	import userInfoH from '../../openOrderBox/openOrderDetails/userInfoH.js'
	import callNameListH from '../../openOrderBox/openOrderDetails/callNameListH.js'
	export default {
		components: {uniDrawer,uniCalendar},
		data() {
			return {
				url:'https://7068-photostudioapp-1302515241.tcb.qcloud.la/icon/',
				// 客户联系人信息
				userInfo:[],
				// 昵称列表
				callNameList:[],
				// 打开抽屉昵称下标
				callNameIndex:0,
				// 打开时间下标
				timeIndex:0
			};
		},
		mounted(){
			this.userInfo = userInfoH
			this.callNameList = callNameListH
		},
		methods:{
			//打开抽屉
			openDrawer(index){
				this.callNameIndex = index
				this.$refs.drawer.open()
				let _this = this
				this.callNameList.forEach(function(i){
					if(_this.userInfo[index].callName == i.name){
						i.action = true
					}else{
						i.action = false
					}
				})
			},
			// 抽屉选择返回值
			chooseDrawer(drawerType,item,index){
				// console.log(drawerType == 'callName' && (this.type != 'xz' || this.type != 'fw'))
				if(this.callNameIndex == 0){
					var oCallNameIndex = 1
				}else{
					var oCallNameIndex = 0
				}
				var _this = this
				// // 改变选择颜色 (循环遍历数组，改变点击的颜色)
				this.callNameList.forEach(function(i){
					if(i.name == item){
						i.action = true
						_this.userInfo[_this.callNameIndex].callName = i.name
					}else{
						i.action = false
						// if(_this.type != 'xz' && _this.type != 'fw'){
							_this.userInfo[oCallNameIndex].callName = i.name
						// }
					}
				})
		
				
				this.$refs.drawer.close()
			},
				
			// 是否选择农历 生日
			switchBrisdayOld:function(e,index){
				if(e.target.value == true){
					this.userInfo[index].lunar =false
				}else{
					this.userInfo[index].lunar =true
				}		
			},
		
			// 打开日历
			openCalendar(time,index) {
				this.timeClss = time
				this.timeIndex = index
				this.$refs.calendar.open()
			},
			
			// 确定日历时间
			sureDay(e){
				// 获得农历
				let year = e.lunar.Animal
				let month = e.lunar.IMonthCn
				let day = e.lunar.IDayCn
				let lunar = `${year}年-${month}-${day}`
				this.userInfo[this.timeIndex].brisday = e.fulldate
				this.userInfo[this.timeIndex].brisdayOld = lunar
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
