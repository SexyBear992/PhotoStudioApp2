<template>
	<view class="bigBox">
		<view class="topBox">
			<!-- 常用按键背景 -->
			<view class="commonlyBack"></view>
			<!-- 常用按键 -->
			<view class="commonly">
				<view class="listBox" @click="iconList('sy')">
					<image :src="url+'/changyong/money.png'" mode="aspectFill"></image>
					<view class="text">收银</view>
				</view>
				
				<view class="listBox" @click="iconList('kd')">
					<image :src="url+'/changyong/billing.png'" mode="aspectFill"></image>
					<view class="text">开单</view>
				</view>
				
				<view class="listBox" @click="iconList('ddcx')">
					<image :src="url+'/changyong/search.png'" mode="aspectFill"></image>
					<view class="text">订单查询</view>
				</view>
				
				<view class="listBox" @click="iconList('pzyy')">
					<image :src="url+'/changyong/take_photo.png'" mode="aspectFill"></image>
					<view class="text">拍照预约</view>
				</view>
				
				<view class="listBox" @click="iconList('xpyy')">
					<image :src="url+'/changyong/photo.png'" mode="aspectFill"></image>
					<view class="text">选片预约</view>
				</view>
			</view>
		</view>
		
		<!-- 客资系统 -->
		<view class="classification">
			<view class="title">客资系统</view>
			<view class="listBox">
				
				<view class="list" @click="iconList('xzkz')">
					<image :src="url+'/kezi/add.png'" mode="" class="xzkz"></image>
					<view class="text">新增客资</view>
				</view>
				
				<view class="list" @click="iconList('yxtg')">
					<image :src="url+'/kezi/extension.png'" mode="" class="yxtg"></image>
					<view class="text">营销推广</view>
				</view>
				
				<view class="list" @click="iconList('yyzx')">
					<image :src="url+'/kezi/invitation.png'" mode="" class="yyzx"></image>
					<view class="text">邀约咨询</view>
				</view>
				
				<view class="list" @click="iconList('msjd')">
					<image :src="url+'/kezi/reception.png'" mode="" class="msjd"></image>
					<view class="text">门市接待</view>
				</view>
			</view>
		</view>

		<!-- 订单管理 -->
		<view class="classification">
			<view class="title">订单管理</view>
			<view class="listBox">
				
				<view class="list" @click="iconList('kd')">
					<image :src="url+'/dingdan/billing.png'" mode="" class="dingdan"></image>
					<view class="text">开单</view>
				</view>
				
				<view class="list" @click="iconList('wddd')">
					<image :src="url+'/dingdan/me.png'" mode="" class="dingdan"></image>
					<view class="text">我的订单</view>
				</view>
				
				<view class="list" @click="iconList('bmdd')">
					<image :src="url+'/dingdan/department.png'" mode="" class="dingdan"></image>
					<view class="text">部门订单</view>
				</view>
				
				<view class="list" @click="iconList('xsdd')">
					<image :src="url+'/dingdan/subordinate.png'" mode="" class="dingdan"></image>
					<view class="text">下属订单</view>
				</view>
				
				<view class="list" @click="iconList('sydd')">
					<image :src="url+'/dingdan/all.png'" mode="" class="dingdan"></image>
					<view class="text">所有订单</view>
				</view>
			</view>
			
		</view>
	
		<!-- 收银台 -->
		<view class="classification">
			<view class="title">收银台</view>
			<view class="listBox">
				
				<view class="list" @click="iconList('ddsk')">
					<image :src="url+'/shouying/money.png'" mode="" class="ddsk"></image>
					<view class="text">订单收款</view>
				</view>
				
				<view class="list" @click="iconList('sksk')">
					<image :src="url+'/shouying/customer.png'" mode="" class="sksk"></image>
					<view class="text">散客收款</view>
				</view>
				
				<view class="list" @click="iconList('zc')">
					<image :src="url+'/shouying/income.png'" mode="" class="zc"></image>
					<view class="text">支出</view>
				</view>
				
				<view class="list" @click="iconList('blj')">
					<image :src="url+'/shouying/deposit.png'" mode="" class="blj"></image>
					<view class="text">保留金</view>
				</view>
				
				<view class="list" @click="iconList('qtsr')">
					<image :src="url+'/shouying/pay.png'" mode="" class="qtsr"></image>
					<view class="text">其他收入</view>
				</view>
				
			</view>
		</view>
		
		<!-- 摄化 -->
		<view class="classification">
			<view class="title">摄化</view>
			<view class="listBox">
				
				<view class="list" @click="iconList('pzyy')">
					<image :src="url+'/shehua/take_photo.png'" mode="" class="pzyy"></image>
					<view class="text">拍照预约</view>
				</view>
				
				<view class="list" @click="iconList('shgz')">
					<image :src="url+'/shehua/photinization.png'" mode="" class="shgz"></image>
					<view class="text">摄化工作</view>
				</view>
				
				<view class="list" @click="iconList('shdqcx')">
					<image :src="url+'/shehua/calendar.png'" mode="" class="dqcx"></image>
					<view class="text">档期查询</view>
				</view>
				
			</view>	
		</view>
		
		<!-- 数码 -->
		<view class="classification">
			<view class="title">数码</view>
			<view class="listBox">
				
				<view class="list" @click="iconList('smap')">
					<image :src="url+'/shuma/digital.png'" mode="" class="smap"></image>
					<view class="text">数码安排</view>
				</view>
				
				<view class="list" @click="iconList('smgz')">
					<image :src="url+'/shuma/digital_work.png'" mode="" class="smgz"></image>
					<view class="text">数码工作</view>
				</view>
				
			</view>
		</view>
		
		<!-- 选片 -->
		<view class="classification">
			<view class="title">选片</view>
			<view class="listBox">
				
				<view class="list" @click="iconList('xpyy')">
					<image :src="url+'/xuanpian/photo.png'" mode="" class="xpyy"></image>
					<view class="text">选片预约</view>
				</view>
				
				<view class="list" @click="iconList('xpgz')">
					<image :src="url+'/xuanpian/photo_work.png'" mode="" class="xpgz"></image>
					<view class="text">选片工作</view>
				</view>
				
				<view class="list" @click="iconList('xpdqcx')">
					<image :src="url+'/xuanpian/calendar.png'" mode="" class="dqcx"></image>
					<view class="text">档期查询</view>
				</view>
				
			</view>
		</view>
		
		<!-- 看板 -->
		<view class="classification">
			<view class="title">看板</view>
			<view class="listBox">
				
				<view class="list" @click="iconList('kbyy')">
					<image :src="url+'/kanban/kanban.png'" mode="" class="kbyy"></image>
					<view class="text">看板预约</view>
				</view>
				
				<view class="list" @click="iconList('kbgz')">
					<image :src="url+'/kanban/kanban_work.png'" mode="" class="kbgz"></image>
					<view class="text">看板工作</view>
				</view>
				
				<view class="list" @click="iconList('kbdqcx')">
					<image :src="url+'/kanban/calendar.png'" mode="" class="dqcx"></image>
					<view class="text">档期查询</view>
				</view>
				
			</view>
		</view>
		
		<!-- 取件 -->
		<view class="classification">
			<view class="title">取件</view>
			<view class="listBox">
				
				<view class="list" @click="iconList('qjyy')">
					<image :src="url+'/qvjian/take.png'" mode="" class="qjyy"></image>
					<view class="text">取件预约</view>
				</view>
				
				<view class="list" @click="iconList('qjgz')">
					<image :src="url+'/qvjian/pick_up.png'" mode="" class="qjgz"></image>
					<view class="text">取件工作</view>
				</view>
				
				<view class="list" @click="iconList('qjdqcx')">
					<image :src="url+'/qvjian/calendar.png'" mode="" class="dqcx"></image>
					<view class="text">档期查询</view>
				</view>
				
			</view>
		</view>
	
		
		<!-- IOS手机底部留白 -->
		<view class="bottomList"></view>
		<tabBar :index="1"></tabBar>
	</view>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'
	export default {
		data() {
			return {
				url:'https://7068-photostudioapp-1302515241.tcb.qcloud.la/newIcon/index',
			};
		},
		computed:{
			...mapGetters('app',[
				'token',
				'shopId'
			]),
			...mapGetters('shopArr',[
				'get_shopAllArr'
			])
		},
		onLoad(){
			uni.hideHomeButton()
		},
		methods:{
			getUrl(name){
				switch(name){
					case 'sy':					// 收银
						console.log('收银');
						break;
					case 'kd':					// 开单
						return 'myOrderBox/openOrder/openOrder'
						break;
					case 'ddcx':				// 订单查询
						console.log('订单查询');
						break;
					case 'pzyy':				// 拍照预约
						return './convention/convention?type=pzyy'
						break;
					case 'xpyy':				// 选片预约
						return './convention/convention?type=xpyy'
						break;
					case 'xzkz':				// 新增客资
						console.log('新增客资');
						break;
					case 'yxtg':				// 营销推广
						console.log('营销推广');
						break;
					case 'yyzx':				// 邀约咨询
						console.log('邀约咨询');
						break;
					case 'msjd':				// 门市接待
						console.log('门市接待');
						break;
					case 'wddd':				// 我的订单
						return './myOrderBox/orderBox/order/order?type=wddd&typeName=我的订单'
						break;
					case 'bmdd':				// 部门订单
						return './myOrderBox/orderBox/order/order?type=bmdd&typeName=团队订单'
						break;
					case 'xsdd':				// 下属订单
						return './myOrderBox/orderBox/order/order?type=xsdd&typeName=下属订单'
						break;
					case 'sydd':				// 所有订单
						return './myOrderBox/orderBox/order/order?type=sydd&typeName=所有订单'
						break;
					case 'ddsk':				// 订单收款
						console.log('订单收款');
						break;
					case 'sksk':				// 散客收款
						console.log('散客收款');
						break;
					case 'zc':					// 支出
						console.log('支出');
						break;
					case 'blj':					// 保留金
						console.log('保留金');
						break;
					case 'qtsr':				// 其他收入
						console.log('其他收入');
						break;

					case 'shgz':				// 摄化工作
						console.log('摄化工作');
						break;
					case 'shdqcx':			// 摄化档期查询
						console.log('摄化档期查询');
						break;
					case 'smap':				// 数码安排
						console.log('数码安排');
						break;
					case 'smgz':				// 数码工作
						console.log('数码工作');
						break;
					case 'xpgz':				// 选片工作
						console.log('选片工作');
						break;
					case 'xpdqcx':			// 选片档期查询
						console.log('选片档期查询');
						break;
					case 'kbyy':				// 看板预约
						return './convention/convention?type=kbyy'
						break;
					case 'kbgz':				// 看板工作
						console.log('看板工作');
						break;
					case 'kbdqcx':			// 看板档期查询
						console.log('看板档期查询');
						break;
					case 'qjyy':				// 取件预约
						return './convention/convention?type=qjyy'
						break;
					case 'qjgz':				// 取件工作
						console.log('取件工作');
						break;
					case 'qjdqcx':			// 取件档期查询
						console.log('取件档期查询');
						break;
				}
			},
			// 点击图标进入
			iconList(name){
				uni.navigateTo({
					url:this.getUrl(name)
				})
			},
			
			onPageScroll(e){
				if(e.scrollTop<=0){
					uni.pageScrollTo({
					    scrollTop: 0,
					});
				}
			}
		},
	}
</script>
<style>
	page{
		background-color: #61A3FF;
		height : 100%
	}
</style>
<style lang="scss" scoped>

	.bigBox{
		background-color: #F7F7F7;
		.topBox{
			.commonlyBack{
				height: 170rpx;
				border-bottom-left-radius: 50%;
				border-bottom-right-radius: 50%;
				background-color: #61A3FF;
			}
			.commonly{
				margin-top: -160rpx;
				margin-left: 50%;
				transform: translateX(-50%);
				width:650rpx;
				background:#FFFFFF;
				box-shadow:0rpx 14rpx 32rpx 0rpx rgba(25,137,249,0.07);
				border-radius:10rpx;
				display: flex;
				justify-content: space-between;
				padding: 40rpx 20rpx;
				.listBox{
					image{
						width: 90rpx;
						height: 90rpx;
						margin-left: 50%;
						transform: translateX(-50%);
					}
					.text{
						font-size: 24rpx;
						color: #666666;
						text-align: center;
					}
				}
			}
		}
		.classification{
			background-color: #FFFFFF;
			padding: 30rpx;
			margin-top: 30rpx;
			.title{
				font-size: 30rpx;
				color: #000000;
				font-weight: bold;
				margin-bottom: 30rpx;
			}
			.listBox{
				display: flex;
				.list{
					margin-right: 40rpx;
					width: 100rpx;
					height: 100rpx;
					display: flex;
					flex-direction:column;
					justify-content: space-between;
					image{
						margin-left: 50%;
						transform: translateX(-50%);
					}
					.xzkz{
						width: 51rpx;
						height: 48rpx;
					}
					.yxtg,.yyzx,.sksk{
						width: 50rpx;
						height: 48rpx;
					}
					.msjd{
						width: 57rpx;
						height: 48rpx;
					}
					.dingdan{
						width: 44rpx;
						height: 53rpx;
					}
					.ddsk{
						width: 44rpx;
						height: 48rpx;
					}
					.zc,.qtsr{
						width: 48rpx;
						height: 48rpx;
					}
					.blj{
						width: 40rpx;
						height: 46rpx;
					}
					.pzyy{
						width: 47rpx;
						height: 40rpx;
					}
					.shgz{
						width: 50rpx;
						height: 38rpx;
					}
					.dqcx{
						width: 46rpx;
						height: 42rpx;
					}
					.smap{
						width: 48rpx;
						height: 40rpx;
					}
					.smgz{
						width: 44rpx;
						height: 44rpx;
					}
					.xpyy{
						width: 48rpx;
						height: 41rpx;
					}
					.xpgz,.dqcx{
						width: 46rpx;
						height: 40rpx;
					}
					.kbyy{
						width: 45rpx;
						height: 40rpx;
					}
					.kbgz{
						width: 43rpx;
						height: 44rpx;
					}
					.qjyy{
						width: 56rpx;
						height: 48rpx;
					}
					.qjgz{
						width: 42rpx;
						height: 46rpx;
					}
					
					
					.text{
						font-size: 24rpx;
						color: #333333;
						text-align: center;
					}
				}
			}	
		}
		.bottomList{
			height: 200rpx;
		}
	}
	
</style>
