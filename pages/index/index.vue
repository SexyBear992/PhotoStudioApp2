<template>
	<view>
		<!-- 顶部模块 -->
		<view class="topBox">
			<!-- 头像 搜索 -->
			<view class="top">
				<image :src="url+'img_tx@2x.png'" class="avatar"></image>
				<view class="search">
					<image :src="url+'icon_search@2x.png'" mode="" class="icon"></image>
					<input placeholder="请输入订单号/手机号/姓名" placeholder-style="color: #FFFFFF; font-size:25rpx" />
				</view>
				<image :src="url+'icon_xx@2x.png'" mode="" class="ts"></image>
			</view>
		</view>
		
		<!-- 常用按键 -->
		<view class="commonly">
			<view class="listBox">
				<view class="controlsList" @click="iconList('sy')">
					<image :src="url+'icon_sy@2x.png'" mode="" class="icon"></image>
					<view class="text">收银</view>
				</view>
				<view class="controlsList" @click="iconList('kd')">
					<image :src="url+'icon_kd@2x.png'" mode="" class="icon"></image>
					<view class="text">开单</view>
				</view>
				<view class="controlsList" @click="iconList('dk')">
					<image :src="url+'icon_dk@2x.png'" mode="" class="icon"></image>
					<view class="text">打卡</view>
				</view>
				<view class="controlsList" @click="iconList('sk')">
					<image :src="url+'icon_sk@2x.png'" mode="" class="icon"></image>
					<view class="text">摄控</view>
				</view>
				<view class="controlsList" @click="iconList('qj')">
					<image :src="url+'icon_qj@2x.png'" mode="" class="icon"></image>
					<view class="text">取件</view>
				</view>
			</view>	
		</view>
	
		<!-- 分类按键 客资-->
		<view class="classification">
			<view class="title">客资</view>
			<view class="iconBox">
				<view class="list" @click="iconList('xzkz')">
					<image :src="url+'icon_xzkz@2x.png'" mode="" class="icon"></image>
					<view class="text">新增客资</view>
				</view>
				<view class="list" @click="iconList('wdkz')">
					<image :src="url+'icon_wdkz@2x.png'" mode="" class="icon"></image>
					<view class="text">我的客资</view>
				</view>
				<view class="list"  @click="iconList('tdkz')">
					<image :src="url+'icon_tdkz@2x.png'" mode="" class="icon"></image>
					<view class="text">团队客资</view>
				</view>
				<view class="list"  @click="iconList('qbkz')">
					<image :src="url+'icon_qbkz@2x.png'" mode="" class="icon"></image>
					<view class="text">全部客资</view>
				</view>
				<view class="list"  @click="iconList('kztj')">
					<image :src="url+'icon_kztj@2x.png'" mode="" class="icon"></image>
					<view class="text">客资统计</view>
				</view>
			</view>
		</view>
		
		<!-- 分类按键 订单-->
		<view class="classification">
			<view class="title">订单</view>
			<view class="iconBox">
				<view class="list" @click="iconList('kd')">
					<image :src="url+'icon_cy_kd@2x.png'" mode="" class="icon"></image>
					<view class="text">开单</view>
				</view>
				<view class="list" @click="iconList('wddd')">
					<image :src="url+'icon_wdd@2x.png'" mode="" class="icon"></image>
					<view class="text">我的订单</view>
				</view>
				<view class="list"  @click="iconList('tddd')">
					<image :src="url+'icon_tdd@2x.png'" mode="" class="icon"></image>
					<view class="text">团队订单</view>
				</view>
				<view class="list"  @click="iconList('sydd')">
					<image :src="url+'icon_wdd@2x.png'" mode="" class="icon"></image>
					<view class="text">所有订单</view>
				</view>
				<view class="list"  @click="iconList('tcsj')">
					<image :src="url+'icon_tcsj@2x.png'" mode="" class="icon"></image>
					<view class="text">套餐升级</view>
				</view>
			</view>
		</view>
		
		<!-- 分类按键 收银台-->
		<view class="classification">
			<view class="title">收银台</view>
			<view class="iconBox">
				<view class="list" @click="iconList('ddsk')">
					<image :src="url+'icon_syt_sk@2x.png'" mode="" class="icon"></image>
					<view class="text">订单收款</view>
				</view>
				<view class="list" @click="iconList('sksk')">
					<image :src="url+'icon_syt_sksk@2x.png'" mode="" class="icon"></image>
					<view class="text">散客收款</view>
				</view>
				<view class="list"  @click="iconList('zc')">
					<image :src="url+'icon_zc@2x.png'" mode="" class="icon"></image>
					<view class="text">支出</view>
				</view>
				<view class="list"  @click="iconList('blj')">
					<image :src="url+'icon_blj@2x.png'" mode="" class="icon"></image>
					<view class="text">保留金</view>
				</view>
				<view class="list"  @click="iconList('qtsr')">
					<image :src="url+'icon_qtsr@2x.png'" mode="" class="icon"></image>
					<view class="text">其他收入</view>
				</view>
			</view>
		</view>
	
		<!-- 分类按键 服装-->
		<view class="classification">
			<view class="title">服装</view>
			<view class="iconBox">
				<view class="list" @click="iconList('fzyy')">
					<image :src="url+'icon_fzyy@2x.png'" mode="" class="icon"></image>
					<view class="text">服装预约</view>
				</view>
				<view class="list" @click="iconList('fzdd')">
					<image :src="url+'icon_fzdd@2x.png'" mode="" class="icon"></image>
					<view class="text">服装订单</view>
				</view>
				<view class="list"  @click="iconList('fzcx')">
					<image :src="url+'icon_fzcx@2x.png'" mode="" class="icon"></image>
					<view class="text">服装查询</view>
				</view>
				<view class="list"  @click="iconList('fzsx')">
					<image :src="url+'icon_fzsx@2x.png'" mode="" class="icon"></image>
					<view class="text">服装送洗</view>
				</view>
				<view class="list"  @click="iconList('fzgl')">
					<image :src="url+'icon_fzgl@2x.png'" mode="" class="icon"></image>
					<view class="text">服装管理</view>
				</view>
			</view>
		</view>
		
		<!-- 分类按键 排控-->
		<view class="classification">
			<view class="title">排控</view>
			<view class="iconBox">
				<view class="list" @click="iconList('cp')">
					<image :src="url+'icon_cp@2x.png'" mode="" class="icon"></image>
					<view class="text">催拍</view>
				</view>
				<view class="list" @click="iconList('sypd')">
					<image :src="url+'icon_sypd@2x.png'" mode="" class="icon"></image>
					<view class="text">摄影派单</view>
				</view>
				<view class="list"  @click="iconList('wdgz')">
					<image :src="url+'icon_wwork@2x.png'" mode="" class="icon"></image>
					<view class="text">我的工作</view>
				</view>
				<view class="list"  @click="iconList('skb')">
					<image :src="url+'icon_pk_skb@2x.png'" mode="" class="icon"></image>
					<view class="text">摄控表</view>
				</view>
				<view class="list"  @click="iconList('dqgl')">
					<image :src="url+'icon_dqgl@2x.png'" mode="" class="icon"></image>
					<view class="text">档期管理</view>
				</view>
			</view>
		</view>
		
		<!-- 分类按键 数码-->
		<view class="classification">
			<view class="title">数码</view>
			<view class="iconBox">
				<view class="list" @click="iconList('smap')">
					<image :src="url+'icon_smap@2x.png'" mode="" class="icon"></image>
					<view class="text">数码安排</view>
				</view>
				<view class="list" @click="iconList('gzap')">
					<image :src="url+'icon_gzap@2x.png'" mode="" class="icon"></image>
					<view class="text">工作安排</view>
				</view>
				<view class="list"  @click="iconList('smyj')">
					<image :src="url+'icon_smyj@2x.png'" mode="" class="icon"></image>
					<view class="text">数码预警</view>
				</view>
			</view>
		</view>
		
		<!-- 分类按键 发片取件-->
		<view class="classification">
			<view class="title">发片取件</view>
			<view class="iconBox">
				<view class="list" @click="iconList('fp')">
					<image :src="url+'icon_fp@2x.png'" mode="" class="icon"></image>
					<view class="text">发片</view>
				</view>
				<view class="list" @click="iconList('hjdj')">
					<image :src="url+'icon_hjdj@2x.png'" mode="" class="icon"></image>
					<view class="text">回件登记</view>
				</view>
				<view class="list"  @click="iconList('qj')">
					<image :src="url+'icon_qj@2x.png'" mode="" class="icon"></image>
					<view class="text">取件</view>
				</view>
				<view class="list"  @click="iconList('jd')">
					<image :src="url+'icon_jd@2x.png'" mode="" class="icon"></image>
					<view class="text">结单</view>
				</view>
			</view>
		</view>
		
		<!-- 分类按键 客服-->
		<view class="classification bottomList">
			<view class="title">客服</view>
			<view class="iconBox">
				<view class="list" @click="iconList('hfdc')">
					<image :src="url+'icon_hfdc@2x.png'" mode="" class="icon"></image>
					<view class="text">回访调查</view>
				</view>
				<view class="list" @click="iconList('pjgl')">
					<image :src="url+'icon_pjgl@2x.png'" mode="" class="icon"></image>
					<view class="text">评价管理</view>
				</view>
				<view class="list"  @click="iconList('kfrl')">
					<image :src="url+'icon_kfrl@2x.png'" mode="" class="icon"></image>
					<view class="text">客服日历</view>
				</view>
			</view>
		</view>
	
		<tabBar :index="1"></tabBar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:'https://7068-photostudioapp-1302515241.tcb.qcloud.la/icon/'
			};
		},
		methods:{
			// 点击图标进入
			iconList(name){
				switch(name){
					// 收银
					case 'sy':
					console.log('收银');
					break;
					// 打卡
					case 'dk':
					console.log('打卡');
					break;
					// 摄控
					case 'sk':
					console.log('摄控');
					break;
					// 开单
					case 'kd':
					uni.navigateTo({
						url:'../openOrder/openOrder'
					})
					break;
					// 取件
					case 'qj':
					console.log('取件');
					break;
					
					// 新增客资
					case 'xzkz':
					console.log('新增客资');
					break;
					// 我的客资
					case 'wdkz':
					console.log('我的客资');
					break;
					// 团队客资
					case 'tdkz':
					console.log('团队客资');
					break;
					// 全部客资
					case 'qbkz':
					console.log('全部客资');
					break;
					// 客资统计
					case 'kztj':
					console.log('客资统计');
					break;		
					// 我的订单
					case 'wddd':
					console.log('我的订单');
					break;
					// 团队订单
					case 'tddd':
					console.log('团队订单');
					break;
					// 所有订单
					case 'sydd':
					console.log('所有订单');
					break;
					// 套餐升级
					case 'tcsj':
					console.log('套餐升级');
					break;
					// 订单收款
					case 'ddsk':
					console.log('订单收款');
					break;
					// 散客收款
					case 'sksk':
					console.log('散客收款');
					break;
					// 支出
					case 'zc':
					console.log('支出');
					break;
					// 保留金
					case 'blj':
					console.log('保留金');
					break;
					// 其他收入
					case 'qtsr':
					console.log('其他收入');
					break;
					// 服装预约
					case 'fzyy':
					console.log('服装预约');
					break;
					// 服装订单
					case 'fzdd':
					console.log('服装订单');
					break;
					// 服装查询
					case 'fzcx':
					console.log('服装查询');
					break;
					// 服装送洗
					case 'fzsx':
					console.log('服装送洗');
					break;
					// 服装管理
					case 'fzgl':
					console.log('服装管理');
					break;
					// 催拍
					case 'cp':
					console.log('催拍');
					break;
					// 摄影派单
					case 'sypd':
					console.log('摄影派单');
					break;
					// 我的工作
					case 'wdgz':
					console.log('我的工作');
					break;
					// 摄控表
					case 'skb':
					console.log('摄控表');
					break;
					// 档期管理
					case 'dqgl':
					console.log('档期管理');
					break;
					// 数码安排
					case 'smap':
					console.log('数码安排');
					break;
					// 工作安排
					case 'gzap':
					console.log('工作安排');
					break;
					// 数码预警
					case 'smyj':
					console.log('数码预警');
					break;
					// 发片
					case 'fp':
					console.log('发片');
					break;
					// 回件登记
					case 'hjdj':
					console.log('回件登记');
					break;
					// 结单
					case 'jd':
					console.log('结单');
					break;
					// 回访调查
					case 'hfdc':
					console.log('回访调查');
					break;
					// 评价管理
					case 'pjgl':
					console.log('评价管理');
					break;
					// 客服日历
					case 'kfrl':
					console.log('客服日历');
					break;
				}
			}
		},
	}
</script>
<style>
	page{
		background-color: #F7F7F9;
	}
</style>
<style lang="scss" scoped>
	.topBox{
		height: 240rpx;
		background-color: #61A3FF;
		.top{
			margin: 0 20rpx;
			display: flex;
			.avatar{
				width: 60rpx;
				height: 60rpx;
			}
			.search{
				width: 550rpx;
				height: 60rpx;
				background-color: #2B8BF1;
				color: #FFFFFF;
				display: flex;
				margin-left: 26rpx;
				font-size:25rpx;
				.icon{
					width: 26rpx;
					height: 26rpx;
					margin: 17rpx 26rpx;
				}
				input{
					color: #FFFFFF;
					width: 100%;
					padding-top: 10rpx
				}
			}
			.ts{
				height: 45rpx;
				width: 37rpx;
				margin: auto 0;
				margin-left: 30rpx;
			}
		}
	}
	.commonly{
		width: 720rpx;
		background-color: #FFFFFF;
		border-radius: 8rpx;
		margin: 0 auto;
		margin-top: -118rpx;
		.listBox{
			display: flex;
			justify-content: space-between;
			padding: 43rpx;
			.controlsList{
				image{
					width: 90rpx;
					height: 90rpx;
				}
				.text{
					font-size: 28rpx;
					text-align: center;
				}
			}
		}
		
	}
	.classification{
		width: 720rpx;
		background-color: #FFFFFF;
		border-radius: 8rpx;
		margin: 0 auto;
		margin-top: 18rpx;
		font-size: 28rpx;
		.title{
			font-weight: bold;
			padding-top: 12rpx;
			padding-left: 19rpx;
		}
		.iconBox{
			display: flex;
			padding: 28rpx;
			padding-right: 0;
			.list{
				width: 96rpx;
				margin-right: 45rpx;
				image{
					margin-left: 50%;
					transform: translateX(-50%);
					width: 50rpx;
					height: 50rpx;
				}
				.text{
					font-size: 24rpx;
					text-align: center;
					color: #979494;
				}
			}
		}
	}
	.bottomList{
		margin-bottom: 137rpx;
	}
</style>
