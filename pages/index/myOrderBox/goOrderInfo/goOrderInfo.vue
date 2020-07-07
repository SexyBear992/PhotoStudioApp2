<template>
	<view>
		<view class="main">
			
			<!-- 编号 -->
			<view class="listBox">
				<view class="left">
					<view class="title">编号</view>
					<view class="text" v-if="codingBoo == false">{{coding}}</view>
					<input type="text" focus v-if="codingBoo == true" v-model="coding" placeholder="订单编号"/>
				</view>
				<switch @change="switchCoding" color="#61a3ff"  class="switch"/>
			</view>
			<!-- 门店 -->
			<view class="listBox">
				<view class="left">
					<view class="title">门店</view>
					<view class="text">{{stores}}</view>
				</view>
				<image :src="url+'icon_hr@2x.png'" mode="" @click="openDrawer('stores')"></image>
			</view>
			<!-- 时间 -->
			<view class="listBox" @click="openCalendar">
				<view class="left">
					<view class="title">时间</view>
					<view class="text">{{time}}</view>
				</view>
				<image :src="url+'icon_hr@2x.png'" mode=""></image>
			</view>
			<!-- 分类 -->
			<view class="listBox">
				<view class="left">
					<view class="title">分类</view>
					<view class="text">{{classification}}</view>
				</view>
				<image :src="url+'icon_hr@2x.png'" mode="" @click="openDrawer('classification')"></image>
			</view>
			<!-- 分组 -->
			<view class="listBox">
				<view class="left">
					<view class="title">分组</view>
					<view class="text">{{grouping}}</view>
				</view>
				<image :src="url+'icon_hr@2x.png'" mode="" @click="openDrawer('grouping')"></image>
			</view>
			<!-- 风格 -->
			<view class="listBox">
				<view class="left">
					<view class="title">风格</view>
					<view class="text">{{style}}</view>
				</view>
				<image :src="url+'icon_hr@2x.png'" mode="" @click="openDrawer('style')"></image>
			</view>
			<!-- 备注 -->
			<view class="note">
				<view class="title">备注</view>
				<textarea class="textarea" placeholder="订单备注" v-model="note"></textarea>
			</view>
			<!-- 取消/确定 -->
			<view class="butBox">
				<view class="cancel" @click="cancel">取消</view>
				<view class="determine" @click="determine">确认</view>
			</view>
			<!-- 抽屉弹窗 -->
			<uni-drawer
				mode="right"
				ref='drawer'
				class="drawer"
			>
				<view style="padding:30rpx;">
					<!-- 门店 -->
					<view v-if="drawerType == 'stores'">
						<view class="title">门店选择</view>
						<view v-for="(item,index) in storesList" :key="index">
							<view class="text" @click="chooseDrawer(drawerType,item.name)" :class="(item.action)?'action':''">{{item.name}}</view>
						</view>
					</view>
					<!-- 分类 -->
					<view v-if="drawerType == 'classification'">
						<view class="title">分类选择</view>
						<view v-for="(item,index) in classificationList" :key="index">
							<view class="text" @click="chooseDrawer(drawerType,item.name)" :class="(item.action)?'action':''">{{item.name}}</view>
						</view>
					</view>
					<!-- 分组 -->
					<view v-if="drawerType == 'grouping'">
						<view class="title">分组选择</view>
						<view v-for="(item,index) in groupingList" :key="index">
							<view class="text" @click="chooseDrawer(drawerType,item.name)" :class="(item.action)?'action':''">{{item.name}}</view>
						</view>
					</view>
					<!-- 风格 -->
					<view v-if="drawerType == 'style'">
						<view class="title">风格选择</view>
						<view v-for="(item,index) in styleList" :key="index">
							<view class="text" @click="chooseDrawer(drawerType,item.name)" :class="(item.action)?'action':''">{{item.name}}</view>
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
	</view>
</template>

<script>
	import uniDrawer from "@/components/uni/uni-drawer/uni-drawer.vue"
	import uniCalendar from '@/components/uni/uni-calendar/uni-calendar.vue'
	
	import storesList from '../../openOrderBox/openOrderDetails/storesList.js'
	import classificationList from '../../openOrderBox/openOrderDetails/classificationList.js'
	import groupingList from '../../openOrderBox/openOrderDetails/groupingList.js'
	import styleList from '../../openOrderBox/openOrderDetails/styleList.js'
	export default {
		components: {uniDrawer,uniCalendar},
		data() {
			return {
				url:'https://7068-photostudioapp-1302515241.tcb.qcloud.la/icon/',
				// 标题名字
				typeName:null,
				// 类型
				type:null,
				// 编号
				coding:'订单编号',
				// 编号布尔值
				codingBoo:false,
				// 抽屉打开的类型
				drawerType:null,
				// 门店
				stores:'选择门店',
				// 门店列表
				storesList:[],
				// 时间
				time:'请选择日期',
				// 分类
				classification:'订单分类',
				// 分类列表
				classificationList:[],
				// 分组
				grouping:'订单分组',
				// 分组列表
				groupingList:[],
				// 风格
				style:'喜爱风格',
				// 风格列表
				styleList:[],
				// 风格选择的列表
				styleArr : [],
				// 备注
				note:'',
			};
		},
		mounted(){
			this.storesList = storesList
			this.classificationList = classificationList
			this.groupingList = groupingList
			this.styleList = styleList
		},
		methods:{
			
			//打开抽屉
			openDrawer(type,index){
				this.drawerType = type
				this.$refs.drawer.open()
			},
			// 抽屉选择返回值
			chooseDrawer(drawerType,item,index){
				// 如果返回值是风格的话
				if(drawerType == 'style'){	
					let _this = this
					// 遍历风格列表
					this.styleList.forEach(function(i){
						if(i.name == item){
							// 选中颜色赋布尔值
							i.action = !i.action
						}
						// 已选的增加进styleArr(已选择风格数组)
						if(i.action == true){
							_this.styleArr.push(i.name)
						}else{
							// 遍历已选择风格列表
							_this.styleArr.forEach(function(j,val){
								if(j == i.name){
									// 删除取消风格
									_this.styleArr.splice(val,1)
									// 删除第一个(重复)
									_this.styleArr.splice(0,1)
								}
							})
						}
					})
					
					let newArr = [...new Set(this.styleArr)]
					let str = newArr.toString().replace(/,/g,"/")
					// console.log(str)
					// 风格赋值
					this.style = str
					// this.$refs.drawer.close()
				}else{
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
				}
			},
			// 打开日历
			openCalendar() {
				this.$refs.calendar.open()
			},
			// 选择时间
			sureDay(e){
				this.time = e.fulldate
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
	.note{
		.textarea{
			border: 1rpx solid #C0C0C0;
			width: 660rpx;
			padding: 20rpx;
			margin-top: 15rpx;
			border-radius: 10rpx
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
	}
	.action{
		color: #578ff4;
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

</style>
