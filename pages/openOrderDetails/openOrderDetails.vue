<template>
	<view>
		<!-- 客户信息 -->
		<view class="box">
			<view class="title">客户信息</view>
			<view class="main">
				<!-- 编号 -->
				<view class="listBox">
					<view class="left">
						<view class="title">编号</view>
						<view class="text" v-if="codingBoo == false">{{coding}}</view>
						<input type="text" focus v-if="codingBoo == true" v-model="coding"/>
					</view>
					<switch @change="switchCoding" color="#61a3ff"  class="switch"/>
				</view>
				<!-- 门店 -->
				<view class="listBox">
					<view class="left">
						<view class="title">门店</view>
						<view class="text">{{stores}}</view>
					</view>
					<image :src="url+'icon_hr@2x.png'" mode="" @click="goStores"></image>
				</view>
				<!-- 时间 -->
				<view class="listBox">
					<view class="left">
						<view class="title">时间</view>
						<view class="text" v-if="timeBoo == false">{{time}}</view>
						<input type="text" focus v-if="timeBoo == true" v-model="time"/>
					</view>
					<switch @change="switchTime" color="#61a3ff"  class="switch"/>
				</view>
				<!-- 接单 -->
				<view class="listBox">
					<view class="left">
						<view class="title">接单</view>
						<view class="text">{{pickOrder}}</view>
					</view>
					<image :src="url+'icon_hr@2x.png'" mode="" @click="goCandidates('pickOrder')"></image>
				</view>
				<!-- 客服 -->
				<view class="listBox">
					<view class="left">
						<view class="title">客服</view>
						<view class="text">{{CustomerService}}</view>
					</view>
					<image :src="url+'icon_hr@2x.png'" mode="" @click="goCandidates('CustomerService')"></image>
				</view>
				<!-- 网销 -->
				<view class="listBox">
					<view class="left">
						<view class="title">网销</view>
						<view class="text">{{NetSales}}</view>
					</view>
					<image :src="url+'icon_hr@2x.png'" mode="" @click="goCandidates('NetSales')"></image>
				</view>
				<!-- 分类 -->
				<view class="listBox">
					<view class="left">
						<view class="title">分类</view>
						<view class="text">{{classification}}</view>
					</view>
					<image :src="url+'icon_hr@2x.png'" mode="" @click="goChoose('classification')"></image>
				</view>
				<!-- 分组 -->
				<view class="listBox">
					<view class="left">
						<view class="title">分组</view>
						<view class="text">{{grouping}}</view>
					</view>
					<image :src="url+'icon_hr@2x.png'" mode="" @click="goChoose('grouping')"></image>
				</view>
				<!-- 风格 -->
				<view class="listBox">
					<view class="left">
						<view class="title">风格</view>
						<view class="text">{{style}}</view>
					</view>
					<image :src="url+'icon_hr@2x.png'" mode="" @click="goChoose('style')"></image>
				</view>
				<!-- 备注 -->
				<view class="note">
					<view class="title">备注</view>
					<textarea class="textartea" placeholder="订单备注" v-model="note"></textarea>
				</view>
			</view>
		</view>
		
		<!-- 客户来源 -->
		<view class="box">
			<view class="title">客户来源</view>
			<view class="main">
				<!-- 来源 -->
				<view class="listBox">
					<view class="left">
						<view class="title">来源</view>
						<view class="text">{{source}}</view>
					</view>
					<image :src="url+'icon_hr@2x.png'" mode="" @click="goSource"></image>
				</view>
				<!-- 介绍人 -->
				<view class="listBox">
					<view class="left">
						<view class="title">介绍人</view>
						<view class="text">{{references}}</view>
					</view>
				</view>
				<!-- 手机号码 -->
				<view class="listBox">
					<view class="left">
						<view class="title">手机号码</view>
						<view class="text">{{sourcePhone}}</view>
					</view>
					<view class="chooseReferences" @click="chooseReferences">选择介绍人</view>
				</view>
			</view>
		</view>
		
		<!-- 客户信息 -->
		<view class="box">
			<view class="title">客户信息</view>
			<view class="main">
				<!-- 客户区域 -->
				<view class="listBox">
					<view class="left">
						<view class="title">客户区域</view>
						<view class="text">{{area}}</view>
					</view>
					<image :src="url+'icon_hr@2x.png'" mode="" @click="chooseArea"></image>
				</view>
				<!-- 结婚时间 -->
				<view class="listBox">
					<view class="left">
						<view class="title">结婚时间</view>
						<view class="text" v-if="marriedTimeOld == null">{{marriedTime}}</view>
						<view class="text" v-else>{{marriedTimeOld}}</view>
					</view>
					<view class="right">
						<switch @change="switchOldDate" color="#61a3ff" class="switch"/><span>农历</span>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 客户联系人信息 -->
		<view class="box">
			<view class="title">客户联系人信息</view>
			<view class="main" v-for="(item,index) in userInfo" :key="index">
				<view class="user">联系人{{index+1}}</view>
				<!-- 称呼 -->
				<view class="listBox">
					<view class="left">
						<view class="title">称呼</view>
						<input type="text" v-model="item.callName"/>
					</view>
				</view>
				<!-- 名字 -->
				<view class="listBox">
					<view class="left">
						<view class="title">名字</view>
						<input type="text" v-model="item.name"/>
					</view>
				</view>
				<!-- 手机 -->
				<view class="listBox">
					<view class="left">
						<view class="title">名字</view>
						<input type="text" v-model="item.phone"/>
					</view>
				</view>
				<!-- QQ -->
				<view class="listBox">
					<view class="left">
						<view class="title">QQ</view>
						<input type="text" v-model="item.qq"/>
					</view>
				</view>
				<!-- 微信 -->
				<view class="listBox">
					<view class="left">
						<view class="title">微信</view>
						<input type="text" v-model="item.wechat"/>
					</view>
				</view>
				<!-- 地址 -->
				<view class="listBox">
					<view class="left">
						<view class="title">地址</view>
						<input type="text" v-model="item.infoAddress"/>
					</view>
				</view>
				<!-- 生日 -->
				<view class="listBox">
					<view class="left">
						<view class="title">生日</view>
						<view class="text" v-if="item.brisdayOld == null">{{item.brisday}}</view>
						<view class="text" v-else>{{item.brisdayOld}}</view>
					</view>
					<view class="right">
						<switch @change="switchBrisdayOld($event,index)" color="#61a3ff" class="switch"/><span>农历</span>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 订单套系内容 -->
		<view class="box">
			<view class="title">订单套系内容</view>
			<view class="main">
				<!-- 服务等级 -->
				<view class="listBox">
					<view class="left">
						<view class="title">服务等级</view>
						<view class="text">{{serviceLv}}</view>
					</view>
					<image :src="url+'icon_hr@2x.png'" mode="" @click="goServiceLv"></image>
				</view>
				<!-- 老师级别 -->
				<view class="listBox">
					<view class="left">
						<view class="title">老师级别</view>
						<view class="text">{{teacherLv}}</view>
					</view>
					<image :src="url+'icon_hr@2x.png'" mode="" @click="goTeacherLv"></image>
				</view>
				<!-- 套系名字 -->
				<view class="listBox">
					<view class="left">
						<view class="title">套系名字</view>
						<view class="text">{{seriesName}}</view>
					</view>
					<view class="addLB">
						<view class="but" @click="addBag">添加礼包</view>
						<image :src="url+'icon_hr@2x.png'" mode="" @click="goSeriesName"></image>
					</view>
				</view>
				<!-- 套系明细 -->
				<view class="seriesInfo">
					<view class="left">
						<view class="text">套餐价格：</view>
						<view class="text">{{seriesMoney}}</view>
						<view class="text">礼包价格：</view>
						<view class="text">{{bagMoney}}</view>
					</view>
					<view class="right">
						<view class="text">合计：</view>
						<view class="text">{{addMoney}}</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 新增列表 -->
		<view class="newList" v-for="(item,index) in orderInfo" :key="index">
			<view class="title">
				<view class="text">
					订单{{index+1}}
				</view>
				<view v-if="index != 0" class="deleteOrder" @click="deleteOrder(index)">删除子单</view>
			</view>
			<view class="main">
				<view class="listBox">
					<view class="titleL">价格</view>
					<input type="number" class="text" v-model="item.orderMoney"/>
				</view>
				<view class="listBox">
					<view class="titleL">精修</view>
					<input type="number" class="text" v-model="item.modify"/>
				</view>
				<view class="listBox">
					<view class="titleL">拍摄保底张数</view>
					<input type="number" class="text" v-model="item.photoNum"/>
				</view>
				<view class="listBox">
					<view class="titleL">入底</view>
					<input type="number" class="text" v-model="item.onBottom"/>
				</view>
				<view class="listBox">
					<view class="titleL">入册</view>
					<input type="number" class="text" v-model="item.onCopies"/>
				</view>
			</view>
		</view>
		<view class="addOrder" @click="addOrder">新增子单</view>
		<view class="save" @click="saveOrder">保存订单</view>
	</view>
</template>

<script>
	var calendar = require('../../util/calendar.js');
	export default {
		data() {
			return {
				url:'../../static/icon/',
				type:null,
				// 编号
				coding:'001',
				// 编号布尔值
				codingBoo:false,
				// 门店
				stores:'惠州店',
				// 时间
				time:'2020-6-28',
				// 时间布尔值
				timeBoo:false,
				// 接单
				pickOrder:'张三/李四/王五',
				// 客服
				CustomerService:'张六/李七/王八',
				// 网销
				NetSales:'张九/李十/王十一',
				// 分类
				classification:'婚纱',
				// 分组
				grouping:'A组',
				// 风格
				style:'简洁大方/秀气素雅',
				// 备注
				note:'',
				// 来源
				source:'自然进店',
				// 介绍人
				references:'莉莉',
				// 介绍人电话
				sourcePhone:'16271717126',
				// 区域
				area:'江北',
				// 结婚时间
				marriedTime:'2020-07-08',
				// 结婚时间 农历
				marriedTimeOld:null,
				// 客户联系人信息
				userInfo:[
					{
						// 称呼
						callName:'老婆',
						// 名字
						name:'莉莉',
						// 电话
						phone:'18272727272',
						// qq
						qq:'3492374',
						// 微信
						wechat:'sncklsn',
						// 地址
						infoAddress:'惠州市惠城区',
						// 生日
						brisday:'2020-03-03',
						// 农历生日
						brisdayOld:null,
					},
					{
						callName:'老婆2',
						name:'莉莉2',
						phone:'18272727272',
						qq:'3492374',
						wechat:'sncklsn',
						infoAddress:'惠州市惠城区2',
						brisday:'2020-03-05',
						brisdayOld:null
					}
				],
				// 服务等级
				serviceLv:'1v1',
				// 老师级别
				teacherLv:'首席',
				// 套系名称
				seriesName:'5999婚纱照',
				// 套系套餐价格
				seriesMoney:'5999元',
				// 套系礼包价格
				bagMoney:'300元',
				// 套系合计价格
				addMoney:'5999元',
				// 订单
				orderInfo:[
					{
						// 价格
						orderMoney:'5999',
						// 精修
						modify:'50',
						// 拍摄保底张数
						photoNum:'5999',
						// 入底
						onBottom:'50',
						// 入册
						onCopies:'50'
					}
				]
			};
		},
		onLoad(option){
			// 获取页面路径中的type（开单类型）
			this.type = option.type
			// 赋值小程序标题
			uni.setNavigationBarTitle({
				title: option.type
			});
		},
		mounted(){
		
		},
		methods: {
			// 编号开关
			switchCoding: function (e) {
				// 布尔值赋值
				this.codingBoo = e.target.value
			},
			
			// 时间开关
			switchTime:function(e){
				this.timeBoo = e.target.value
			},
			
			// 前往选择门店
			goStores(){
				console.log('门店')
			},
			
			// 前往选人页面
			goCandidates(type){
				console.log(type)
			},
			
			// 前往选择页面
			goChoose(type){
				console.log(type)
			},
			
			// 选择来源
			goSource(){
				console.log('来源')
			},
			
			// 选择介绍人
			chooseReferences(){
				console.log('选择介绍人')
			},
			
			// 选择区域
			chooseArea(){
				console.log('选择区域')
			},
			
			// 是否选择农历 结婚时间
			switchOldDate:function(e){
				if(e.target.value == true){
					// 将时间转为农历
					let nongli = calendar.getLunarDate(this.marriedTime)
					let nonglixinxi = calendar.getLunarDateString(nongli);
					let year = nonglixinxi.year
					let month = nonglixinxi.month
					let day = nonglixinxi.day
					let marriedTime = `${year}年-${month}月-${day}`
					this.marriedTimeOld = marriedTime
				}else{
					// 将农历清空
					this.marriedTimeOld = null
				}
			},
			
			// 是否选择农历 生日
			switchBrisdayOld:function(e,index){
				if(e.target.value == true){
					let nongli = calendar.getLunarDate(this.userInfo[index].brisday)
					let nonglixinxi = calendar.getLunarDateString(nongli);
					let year = nonglixinxi.year
					let month = nonglixinxi.month
					let day = nonglixinxi.day
					let marriedTime = `${year}年-${month}月-${day}`
					this.userInfo[index].brisdayOld = marriedTime
				}else{
					// 将农历清空
					this.userInfo[index].brisdayOld = null
				}
			},
		
			// 选择服务等级
			goServiceLv(){
				console.log('服务等级')
			},
			
			// 选择老师等级
			goTeacherLv(){
				console.log('老师等级')
			},
			
			// 套系名称
			goSeriesName(){
				console.log('套系名称')
			},
		
			// 添加礼包
			addBag(){
				console.log('添加礼包')
			},
			
			// 新增订单
			addOrder(){
				let info ={
					// 价格
					orderMoney:'',
					// 精修
					modify:'',
					// 拍摄保底张数
					photoNum:'',
					// 入底
					onBottom:'',
					// 入册
					onCopies:''
				}
				
				this.orderInfo.push(info)
			},
			
			// 删除子单
			deleteOrder(index){
				this.orderInfo.splice(index, 1)
			},
			// 保存订单
			saveOrder(){
				console.log('保存订单')
			}
		}
	}
</script>

<style lang="scss">
	.box{
		margin-bottom: 50rpx;
		.title{
			font-size: 38rpx;
			margin-left: 30rpx;
			margin-top: 30rpx;
			font-weight: bold;
		}
		.main{
			margin: 0 30rpx;
			.user{
				margin: 35rpx 0;
				color: #8d8d8d;
				font-size: 28rpx;
			}
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
						margin-top: 20rpx;
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
					padding: 33rpx 30rpx;
				}
				.addLB{
					display: flex;
					.but{
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
			.seriesInfo{
				margin-top: 30rpx;
				display: flex;
				color: #ff9d36;
				font-size: 24rpx;
				padding: 30rpx;
				justify-content: space-between;
				background-color: #fff7e9;
				border-radius: 10rpx;
				.left{
					display: flex;
				}
				.right{
					display: flex;
				}
			}
			.note{
				border-bottom: 1rpx solid #f9f9f9;
				.title{
					font-size: 28rpx;
					font-weight: normal;
					margin: 0;
					margin-right: 30rpx;
					margin-top: 20rpx;
				}
				.textartea {
					margin-top: 20rpx;
					background-color: #f9f9f9;
					max-width:650rpx;
					width:650rpx;
					height: 100rpx;
					padding: 20rpx;
					font-size: 24rpx;
				}
			}
		}
	}
	.newList{
		margin-top: -20rpx;
		margin-bottom: 20rpx;
		.title{
			background-color: #f5f5f5;
			color: #939393;
			font-size: 24rpx;
			padding: 20rpx 30rpx;
			display: flex;
			justify-content: space-between;
			.deleteOrder{
				border: 1rpx solid #FF0000;
				color: #FF0000;
				background-color: #FFFFFF;
				border-radius: 10rpx;
				padding: 5rpx;
				font-size: 20rpx;
			}
		}
		.main{
			margin: 0 30rpx;
			.listBox{
				display: flex;
				height: 80rpx;
				border-bottom: 1rpx solid #f9f9f9;
				line-height: 80rpx;
				font-size: 28rpx;
				.text{
					color: #909090;
					margin: auto 40rpx
				}
			}
		}	
	}
	.addOrder{
		border: 1rpx solid #6d9ef6;
		color: #6d9ef6;
		border-radius: 10rpx;
		font-size: 24rpx;
		height: 40rpx;
		width: 100rpx;
		line-height: 40rpx;
		text-align: center;
		margin-left: 50%;
		transform: translateX(-50%);
	}
	.save{
		color: #FFFFFF;
		width: 650rpx;
		height: 80rpx;
		background-color: #578ff4;
		text-align: center;
		line-height: 80rpx;
		border-radius: 40rpx;
		margin: 50rpx auto;
	}
</style>
