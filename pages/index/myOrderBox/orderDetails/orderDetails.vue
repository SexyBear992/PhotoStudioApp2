<template>
	<view>
		<view class="butBox">
			<view class="but" @click="goOrderInfo">开单信息</view>
			<view class="but" @click="goCustomerInfo">客户信息</view>
			<view class="but" @click="goCustomerSource">客户来源</view>
			<view class="but" @click="goServicePersonnel">服务人员</view>
			<view class="but" @click="goCustomerArea">客户区域</view>
			<view class="but" @click="goSystemInfo">套系信息</view>
			<view class="but" @click="goOnBottomAndCopies">入底/入册</view>
			<view class="but" @click="goProduct">产品</view>
			<view class="but" @click="goClothing">服装</view>
			<view class="but" @click="goAttractions">景点</view>
			<view class="but" @click="goService">服务</view>
		</view>
		
		<view class="orderDetailsBox">
			<view class="title">订单详情</view>
			<!-- 订单号 -->
			<view class="listBox f">
				<view class="left">
					<view class="img">
						<image :src="url+'dingdan.png'" mode=""></image>
					</view>
					<view class="text">订单号：{{info.DDNumber}}</view>
				</view>
				<view class="right">创建时间:{{info.time}}</view>
			</view>
			<!-- 门店 -->
			<view class="listBox">
				<view class="left">门店</view>
				<view class="right">{{info.stores}}</view>
			</view>
			<!-- 接单人员 -->
			<view class="listBox">
				<view class="left">接单人员</view>
				<view class="right">{{info.pickOrder}}</view>
			</view>
			<!-- 专服人员 -->
			<view class="listBox">
				<view class="left">专服人员</view>
				<view class="right">{{info.CustomerService}}</view>
			</view>
			<!-- 网销人员 -->
			<view class="listBox">
				<view class="left">网销人员</view>
				<view class="right">{{info.NetSales}}</view>
			</view>
			<!-- 订单分类 -->
			<view class="listBox">
				<view class="left">订单分类</view>
				<view class="right">{{info.classification}}</view>
			</view>
			<!-- 订单分组 -->
			<view class="listBox">
				<view class="left">订单分组</view>
				<view class="right">{{info.grouping}}</view>
			</view>
			<!-- 订单风格 -->
			<view class="listBox">
				<view class="left">订单风格</view>
				<view class="right">{{info.style}}</view>
			</view>
			<!-- 备注 -->
			<view class="listBox note">
				<view class="left">备注</view>
				<view class="right">{{info.note}}</view>
			</view>
			
			<view class="title">客户来源</view>
			<!-- 来源 -->
			<view class="listBox">
				<view class="left">来源</view>
				<view class="right">{{info.source}}</view>
			</view>
			<!-- 介绍人 -->
			<view class="listBox">
				<view class="left">介绍人</view>
				<view class="right">{{info.references}}</view>
			</view>
			<!-- 介绍人电话 -->
			<view class="listBox">
				<view class="left">介绍人电话</view>
				<view class="right">{{info.sourcePhone}}</view>
			</view>
			
			<view class="title">客户信息</view>
			<!-- 客户区域 -->
			<view class="listBox">
				<view class="left">客户区域</view>
				<view class="right">{{info.area}}</view>
			</view>
			<!-- 结婚时间 -->
			<view class="listBox">
				<view class="left">结婚时间</view>
				<view class="right">{{info.InfoTime}}</view>
			</view>

			<view class="title">客户联系人信息</view>
			<!-- 男性 -->
			<!-- 名字 -->
			<view class="listBox">
				<view class="left">{{info.man.callName}}</view>
				<view class="right">{{info.man.name}}</view>
			</view>
			<!-- 手机 -->
			<view class="listBox">
				<view class="left">手机</view>
				<view class="right">{{info.man.phone}}</view>
			</view>
			<!-- Q Q -->
			<view class="listBox">
				<view class="left">Q Q</view>
				<view class="right">{{info.man.qq}}</view>
			</view>
			<!-- 微信 -->
			<view class="listBox">
				<view class="left">微信</view>
				<view class="right">{{info.man.wechat}}</view>
			</view>
			<!-- 生日 -->
			<view class="listBox">
				<view class="left">生日</view>
				<view class="right">{{info.man.birthday}}</view>
			</view>
			<!-- 女性 -->
			<!-- 名字 -->
			<view class="listBox">
				<view class="left">{{info.women.callName}}</view>
				<view class="right">{{info.women.name}}</view>
			</view>
			<!-- 手机 -->
			<view class="listBox">
				<view class="left">手机</view>
				<view class="right">{{info.women.phone}}</view>
			</view>
			<!-- Q Q -->
			<view class="listBox">
				<view class="left">Q Q</view>
				<view class="right">{{info.women.qq}}</view>
			</view>
			<!-- 微信 -->
			<view class="listBox">
				<view class="left">微信</view>
				<view class="right">{{info.women.wechat}}</view>
			</view>
			<!-- 生日 -->
			<view class="listBox">
				<view class="left">生日</view>
				<view class="right">{{info.women.birthday}}</view>
			</view>
			
			<view class="title">订单套系内容</view>
			<!-- 服务等级 -->
			<view class="listBox">
				<view class="left">服务等级</view>
				<view class="right">{{info.serviceLv}}</view>
			</view>
			<!-- 老师级别 -->
			<view class="listBox">
				<view class="left">老师级别</view>
				<view class="right">{{info.teacherLv}}</view>
			</view>
			<!-- 套系名字 -->
			<view class="listBox">
				<view class="left">套系名字</view>
				<view class="right">{{info.seriesName}}</view>
			</view>
			
			<view class="title">{{info.seriesName}}</view>
			<!-- 价格 -->
			<view class="listBox">
				<view class="left">价格</view>
				<view class="right">{{info.series.orderMoney}}</view>
			</view>
			<!-- 精修 -->
			<view class="listBox">
				<view class="left">精修</view>
				<view class="right">{{info.series.modify}}</view>
			</view>
			<!-- 拍摄保底张数 -->
			<view class="listBox">
				<view class="left">拍摄保底张数</view>
				<view class="right">{{info.series.photoNum}}</view>
			</view>
			<!-- 入底 -->
			<view class="listBox">
				<view class="left">入底</view>
				<view class="right">{{info.series.onBottom}}</view>
			</view>
			<!-- 入册 -->
			<view class="listBox">
				<view class="left">入册</view>
				<view class="right">{{info.series.onCopies}}</view>
			</view>
			<!-- 新增产品 product-->
			<view class="title">新增产品</view>
			<view class="labelBox moveView" v-if="info.series.newProduct.length>0">
				<view class="labe">
					<view class="titleBox tB">
						<view class="titleLB fTLB">商品</view>
						<view class="titleLB">单价</view>
						<view class="titleLB">P数</view>
						<view class="titleLB">数量</view>
					</view>
					<view class="titleBox" v-for="(list,ind) in info.series.newProduct" :key='ind'>
						<view class="titleLB fTLB">{{list.title}}</view>
						<view class="titleLB Money">{{list.price}}</view>
						<input class="titleLB" v-model="list.pnum"/>
						<input class="titleLB" v-model="list.num"/>
					</view>
				</view>
			</view>
			<!-- 新增服装 clothing-->
			<view class="title">新增服装</view>
			<view class="labelBox moveView" v-if="info.series.newClothing.length>0">
				<view class="labe">
					<view class="titleBox tB">
						<view class="titleLB fTLB">服装</view>
						<view class="titleLB">单价</view>
						<view class="titleLB">类型</view>
						<view class="titleLB">数量</view>
					</view>
					<view class="titleBox" v-for="(list,ind) in info.series.newClothing" :key='ind'>
						<view class="titleLB fTLB">{{list.title}}</view>
						<view class="titleLB Money">{{list.price}}</view>
						<view class="titleLB">{{list.type}}</view>
						<input class="titleLB" v-model="list.num"/>
					</view>
				</view>
			</view>
			<!-- 景点 attractions-->
			<view class="title">新增景点</view>
			<view class="labelBox moveView" v-if="info.series.newAttractions.length>0">
				<view class="labe">
					<view class="titleBox tB">
						<view class="titleLB fTLB">景点</view>
						<view class="titleLB">单价</view>
						<view class="titleLB">类型</view>
						<view class="titleLB"></view>
					</view>
					<view class="titleBox" v-for="(list,ind) in info.series.newAttractions" :key='ind'>
						<view class="titleLB fTLB">{{list.title}}</view>
						<view class="titleLB Money">{{list.price}}</view>
						<view class="titleLB">{{list.type}}</view>
						<input class="titleLB" v-model="list.num"/>
					</view>
				</view>
			</view>
			<!-- 服务 service-->
			<view class="title">新增服务</view>
			<view class="labelBox moveView" v-if="info.series.newService.length>0">
				<view class="labe">
					<view class="titleBox tB">
						<view class="titleLB fTLB">服务</view>
						<view class="titleLB">单价</view>
						<view class="titleLB">人数</view>
						<view class="titleLB">数量</view>
					</view>
					<view class="titleBox" v-for="(list,ind) in info.series.newService" :key='ind'>
						<view class="titleLB fTLB">{{list.title}}</view>
						<view class="titleLB Money">{{list.price}}</view>
						<view class="titleLB">{{list.people}}</view>
						<input class="titleLB" v-model="list.num"/>
					</view>
				</view>
			</view>
						
		</view>
	</view>
</template>

<script>
	import info from './orderDetailsInfo.js'
	export default {
		data() {
			return {
				url:'https://7068-photostudioapp-1302515241.tcb.qcloud.la/icon/',
				info:[]
			};
		},
		mounted(){
			this.info = info
		},
		onUnload(){
			this.$store.commit('pickOrder','接单人员')
			this.$store.commit('CustomerService','专服人员')
			this.$store.commit('NetSales','网销人员')
		},
		methods:{
			// 修改开单信息
			goOrderInfo(){
				uni.navigateTo({
					url:'../goOrderInfo/goOrderInfo'
				})
			},
			// 修改客户信息
			goCustomerInfo(){
				console.log('修改客户信息')
			},
			// 修改客户来源
			goCustomerSource(){
				console.log('修改客户来源')
			},
			// 修改服务人员
			goServicePersonnel(){
				uni.navigateTo({
					url:'../goServicePersonnel/goServicePersonnel'
				})
				console.log('修改服务人员')
			},
			// 修改客户区域
			goCustomerArea(){
				console.log('修改客户区域')
			},
			// 修改套系信息
			goSystemInfo(){
				console.log('修改套系信息')
			},
			// 修改入底/入册
			goOnBottomAndCopies(){
				console.log('修改入底/入册')
			},
			// 修改产品
			goProduct(){
				console.log('修改产品')
			},
			// 修改服装
			goClothing(){
				console.log('修改服装')
			},
			// 修改景点
			goAttractions(){
				console.log('修改景点')
			},
			// 修改服务
			goService(){
				console.log('修改服务')
			}
		},
	}
</script>

<style lang="scss">
	.butBox{
		display: flex;
		flex-wrap:wrap;
		width: 100%;
		.but{
			width:33%;
			text-align: center;
			font-size: 32rpx;
			height: 70rpx;
			line-height: 70rpx;
			border-bottom: 1rpx solid #d8d8d8;
			border-right: 1rpx solid #d8d8d8;
		}
	}
	.orderDetailsBox{
		.title{
			background-color: #e6e5f5;
			font-size: 28rpx;
			padding: 10rpx 30rpx;
		}
		.listBox{
			height: 80rpx;
			display: flex;
			justify-content: space-between;
			margin: 30rpx;
			margin-bottom: 0;
			border-bottom: 1rpx solid #d8d8d8;
			font-size: 32rpx;
		}
		.f{
			font-size: 28rpx;
			margin: 30rpx 0;
			padding: 0 30rpx;
			color: #bababa;
			.left{	
				display: flex;
				.img{
					width: 40rpx;
					height: 40rpx;
					border-radius: 50%;
					background-color: #ef1d64;
					image{
						width: 40rpx;
						height: 40rpx;
					}
				}
			}
		}
		.bot{
			margin: 30rpx 0;
			padding: 0 30rpx;
			border-bottom: 15rpx solid #e6e5f5;
		}
		.labelBox{
			margin: 20rpx;
			.title{
				background-color: #FFFFFF;
				padding-left: 0;
			}
			.labe{
				width: 700rpx;
				margin: 0 auto;
				.titleBox{
					overflow: hidden;
					display: flex;
					justify-content: space-between;
					background-color: #f2f6ff;
					.titleLB{
						text-align: center;
						height: 80rpx;
						line-height: 80rpx;
						font-size: 24rpx;
						color: #6c90cf;
						width: 20%;
					}
				}
				.tB{
					background-color: #e5edff;
				}
				.fTLB{
					width: 40% !important;
				}
			}
		}
		
	}
</style>
