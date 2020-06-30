<template>
	<view>
		<!-- 开单信息 -->
		<view class="box">
			<view class="title">开单信息</view>
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
					<image :src="url+'icon_hr@2x.png'" mode="" @click="openDrawer('stores')"></image>
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
				<!-- 酒店信息 -->
				<view class="listBox" v-if="type == 'hq'">
					<view class="left">
						<view class="title">酒店信息</view>
						<input type="text" v-model="item.hotelInfo" placeholder="酒店信息"/>
					</view>
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
					<image :src="url+'icon_hr@2x.png'" mode="" @click="openDrawer('source')"></image>
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
					<view class="chooseReferences" @click="goCandidates('references')">选择介绍人</view>
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
					<image :src="url+'icon_hr@2x.png'" mode="" @click="openDrawer('area')"></image>
				</view>
				<!-- 结婚时间 -->
				<view class="listBox" v-if="type == 'hs' || type == 'ym' || type == 'fw'">
					<view class="left">
						<view class="title" v-if="type == 'hs'">结婚日期</view>
						<view class="title" v-if="type == 'ym'">预产日期</view>
						<view class="title" v-if="type == 'fw'">服务日期</view>
						<view class="text" v-if="InfoTimeOld == null">{{InfoTime}}</view>
						<view class="text" v-else>{{InfoTimeOld}}</view>
					</view>
					<view class="right">
						<switch @change="switchOldDate" color="#61a3ff" class="switch"/><span>农历</span>
					</view>
				</view>
				
			</view>
		</view>
		
		<!-- 宝宝信息 -->
		<view class="box" v-if="type == 'et'">
			<view class="title">宝宝信息</view>
			<view class="main" v-for="(item,index) in babyInfo" :key="index">
				<view class="listBox ch">
					<view class="left">
						<view class="title">称呼</view>
						<view class="text">{{item.callName}}</view>
						<!-- <input type="text" v-model="item.callName"/> -->
					</view>
					<image :src="url+'icon_hr@2x.png'" mode="" @click="openDrawer('BabycallName',index)"></image>
				</view>
				<!-- 名字 -->
				<view class="listBox">
					<view class="left">
						<view class="title">名字</view>
						<input type="text" v-model="item.name" placeholder="名字"/>
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
		
		<!-- 客户联系人信息 -->
		<view class="box">
			<view class="title">客户联系人信息</view>
			<view class="main" v-for="(item,index) in userInfo" :key="index">
				<!-- <view class="user">联系人{{index+1}}</view> -->
				<!-- 称呼 -->
				<view class="listBox ch">
					<view class="left">
						<view class="title">称呼</view>
						<view class="text">{{item.callName}}</view>
						<!-- <input type="text" v-model="item.callName"/> -->
					</view>
					<image v-if="type == 'xz' || type == 'fw'" :src="url+'icon_hr@2x.png'" mode="" @click="openDrawer('callName',index)"></image>
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
						<view class="title">QQ</view>
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
				<!-- 地址 -->
				<!-- <view class="listBox">
					<view class="left">
						<view class="title">地址</view>
						<input type="text" v-model="item.infoAddress" />
					</view>
				</view> -->
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
					<view class="addLB">
						<view class="but" @click="addBag">添加礼包</view>
						<image :src="url+'icon_hr@2x.png'" mode="" @click="openDrawer('seriesName')"></image>
					</view>
				</view>
				<!-- 套系明细 -->
				<!-- <view class="seriesInfo" v-if="seriesName != '请选择'">
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
				</view> -->
			</view>
		</view>
		
		<!-- 新增列表 -->
		<view class="newList" v-if="seriesName != '请选择'" v-for="(item,index) in orderInfo" :key="index">
			<view class="title">
				<view class="text">
					订单{{index+1}}
				</view>
				<view v-if="index != 0" class="deleteOrder" @click="deleteOrder(index)">删除子单</view>
			</view>
			<view class="main">
				<!-- 价格 -->
				<view class="listBox">
					<view class="titleL">价格</view>
					<view class="text">{{item.orderMoney}}</view>
					<!-- <input type="number" class="text" v-model="item.orderMoney"/>s -->
				</view>
				<!-- 精修 -->
				<view class="listBox">
					<view class="titleL">精修</view>
					<view class="text">{{item.modify}}</view>
					<!-- <input type="number" class="text" v-model="item.modify"/> -->
				</view>
				<!-- 拍摄保底张数 -->
				<view class="listBox">
					<view class="titleL">拍摄保底张数</view>
					<view class="text">{{item.photoNum}}</view>
					<!-- <input type="number" class="text" v-model="item.photoNum"/> -->
				</view>
				<!-- 入底 -->
				<view class="listBox">
					<view class="titleL">入底</view>
					<view class="text">{{item.onBottom}}</view>
					<!-- <input type="number" class="text" v-model="item.onBottom"/> -->
				</view>
				<!-- 入册 -->
				<view class="listBox">
					<view class="titleL">入册</view>
					<view class="text">{{item.onCopies}}</view>
					<!-- <input type="number" class="text" v-model="item.onCopies"/> -->
				</view>
				
				<!-- 新增产品 product-->
				<view class="labelBox">
					<view class="title">新增产品</view>
					<view class="labe">
						<view class="titleBox">
							<view class="titleLB">商品</view>
							<view class="titleLB">P数</view>
							<view class="titleLB">数量</view>
							<view class="titleLB">价格</view>
							<view class="titleLB">加急</view>
							<view class="titleLB">取件方式</view>
							<view class="titleLB">备注</view>
						</view>
						<view class="textBox1">
							<view class="textLB">
								<view class="textLBtitle">10*10杂志</view>
							</view>
							<input class="textLB" v-model="item.newProduct.pPnum1"/>
							<input class="textLB" v-model="item.newProduct.pNum1"/>
							<input class="textLB" v-model="item.newProduct.pMoney1"/>
							<input class="textLB" v-model="item.newProduct.pUrgent1"/>
							<input class="textLB" v-model="item.newProduct.pGetFun1"/>
							<input class="textLB" v-model="item.newProduct.pNote1"/>
						</view>
						<view class="textBox2">
							<view class="textLB">
								<view class="textLBtitle">36寸放大</view>
							</view>
							<input class="textLB" v-model="item.newProduct.pPnum2"/>
							<input class="textLB" v-model="item.newProduct.pNum2"/>
							<input class="textLB" v-model="item.newProduct.pMoney2"/>
							<input class="textLB" v-model="item.newProduct.pUrgent2"/>
							<input class="textLB" v-model="item.newProduct.pGetFun2"/>
							<input class="textLB" v-model="item.newProduct.pNote2"/>
						</view>
					</view>
				</view>
				
				<!-- 新增服装 clothing-->
				<view class="labelBox">
				<view class="title">新增服装</view>
				<view class="labe">
					<view class="titleBox">
						<view class="titleLB cTitle">商品</view>
						<view class="titleLB cTitle">数量</view>
						<view class="titleLB cTitle">单价</view>
						<view class="titleLB cTitle">类型</view>
						<view class="titleLB cTitle">备注</view>
					</view>
					<view class="textBox1">
						<view class="textLB cText">
							<view class="textLBtitle cTitle">10*10杂志</view>
						</view>
						<input class="textLB cText" v-model="item.newClothing.cNum1"/>
						<input class="textLB cText" v-model="item.newClothing.cPrice1"/>
						<input class="textLB cText" v-model="item.newClothing.cType1"/>
						<input class="textLB cText" v-model="item.newClothing.cNote1"/>
					</view>
					<view class="textBox2">
						<view class="textLB cText">
							<view class="textLBtitle cTitle">10*10杂志</view>
						</view>
						<input class="textLB cText" v-model="item.newClothing.cNum2"/>
						<input class="textLB cText" v-model="item.newClothing.cPrice2"/>
						<input class="textLB cText" v-model="item.newClothing.cType2"/>
						<input class="textLB cText" v-model="item.newClothing.cNote2"/>
					</view>
				</view>
			</view>
				
			</view>
		</view>
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
				<!-- 来源 -->
				<view v-if="drawerType == 'source'">
					<view class="title">来源选择</view>
					<view v-for="(item,index) in sourceList" :key="index">
						<view class="text" @click="chooseDrawer(drawerType,item.name)" :class="(item.action)?'action':''">{{item.name}}</view>
					</view>
				</view>
				<!-- 区域 -->
				<view v-if="drawerType == 'area'">
					<view class="title">区域选择</view>
					<view v-for="(item,index) in areaList" :key="index">
						<view class="text" @click="chooseDrawer(drawerType,item.name)" :class="(item.action)?'action':''">{{item.name}}</view>
					</view>
				</view>
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
				<!-- 昵称选择 -->
				<view v-if="drawerType == 'callName'">
					<view class="title">昵称选择</view>
					<view v-for="(item,index) in callNameList" :key="index">
						<view class="text" @click="chooseDrawer(drawerType,item.name)" :class="(item.action)?'action':''">{{item.name}}</view>
					</view>
				</view>
				<!-- 宝宝昵称选择 -->
				<view v-if="drawerType == 'BabycallName'">
					<view class="title">宝宝昵称选择</view>
					<view v-for="(item,index) in babyCallNameList" :key="index">
						<view class="text" @click="chooseDrawer(drawerType,item.name)" :class="(item.action)?'action':''">{{item.name}}</view>
					</view>
				</view>
		    </view>
		</uni-drawer>
		<view class="addOrder" v-if="seriesName != '请选择'" @click="addOrder">新增子单</view>
		<view class="save" @click="saveOrder">保存订单</view>
	</view>
</template>

<script>
	var calendar = require('../../util/calendar.js');
	import uniDrawer from "@/components/uni/uni-drawer/uni-drawer.vue"
	import {mapGetters} from 'vuex'
	export default {
		components: {uniDrawer},
		data() {
			return {
				url:'../../static/icon/',
				// 标题名字
				typeName:null,
				// 类型
				type:null,
				// 编号
				coding:'001',
				// 编号布尔值
				codingBoo:false,
				// 抽屉打开的类型
				drawerType:null,
				// 门店
				stores:'惠州店',
				// 门店列表
				storesList:[
					{
						id : 1,
						name : '惠州总店',
						action : false
					},
					{
						id : 2,
						name : '江北总店',
						action : false
					}
				],
				// 时间
				time:'2020-6-28',
				// 时间布尔值
				timeBoo:false,
				// 分类
				classification:'婚纱',
				// 分类列表
				classificationList:[
					{
						id : 1,
						name : '优质客户',
						action : false
					},
					{
						id : 2,
						name : 'VIP客户',
						action : false
					},
				],
				// 分组
				grouping:'A组',
				// 分组列表
				groupingList:[
					{
						id : 1,
						name : 'A组客户',
						action : false
					},
					{
						id : 2,
						name : 'B组客户',
						action : false
					},
					{
						id : 3,
						name : 'C组客户',
						action : false
					},
				],
				// 风格
				style:'简洁大方/秀气素雅',
				// 风格列表
				styleList:[
					{ id: 1 ,
					  name:'豪华艳丽',
					  action : false
					},
					{ id: 2 ,
					  name:'温文尔雅',
					  action : false
					},
					{ id: 3 ,
					  name:'复古典雅',
					  action : false
					},
					{ id: 4 ,
					  name:'传统大方',
					  action : false
					}
				],
				// 酒店信息
				hotelInfo:'',
				// 备注
				note:'',
				// 来源
				source:'自然进店',
				// 来源列表
				sourceList:[
					{
						id : 1,
						name : '自然进店',
						action : false
					},
					{
						id : 2,
						name : '朋友介绍',
						action : false
					},
					{
						id : 3,
						name : '客资客户',
						action : false
					},
					{
						id : 4,
						name : '老客户',
						action : false
					},
				],
				// 介绍人
				references:'莉莉',
				// 介绍人电话
				sourcePhone:'16271717126',
				// 区域
				area:'江北',
				// 区域列表
				areaList:[
					{
						id : 1,
						name : '惠城区',
						action : false
					},
					{
						id : 2,
						name : '江北区',
						action : false
					},
					{
						id : 3,
						name : '和南岸区',
						action : false
					},
					{
						id : 4,
						name : '仲恺高新区',
						action : false
					},
				],
				// 结婚时间
				InfoTime:'2020-07-08',
				// 结婚时间 农历
				InfoTimeOld:null,
				// 客户联系人信息
				userInfo:[],
				// 宝宝信息
				babyInfo:[
					{
						// 称呼
						callName:'称呼',
						// 名字
						name:'',
						// 生日
						brisday:'2020-03-03',
						// 农历生日
						brisdayOld:null,
					}
				],
				// 宝宝昵称列表
				babyCallNameList:[
					{
						id:1,
						name:'男宝',
						action: false
					},
					{
						id:2,
						name:'女宝',
						action: false
					},
				],
				// 昵称列表
				callNameList:[
					{
						id:1,
						name:'先生',
						action: false
					},
					{
						id:2,
						name:'女士',
						action: false
					},
				],
				// 昵称下标
				callNameIndex:null,
				// 服务等级
				serviceLv:'1v1',
				// 服务等级列表
				serviceLvList:[
					{
						id : 1,
						name : '1v1',
						action : false
					},
					{
						id : 2,
						name : '1v2',
						action : false
					},
					{
						id : 3,
						name : '1v3',
						action : false
					},
					{
						id : 4,
						name : '1v4',
						action : false
					},
					{
						id : 5,
						name : '1v5',
						action : false
					},
					{
						id : 6,
						name : '2v1',
						action : false
					},
					{
						id : 7,
						name : '2v2',
						action : false
					},
					{
						id : 8,
						name : '2v3',
						action : false
					},
					{
						id : 9,
						name : '2v4',
						action : false
					},
					{
						id : 10,
						name : '2v5',
						action : false
					},
				],
				// 老师级别
				teacherLv:'首席',
				// 教师级别列表
				teacherLvList:[
					{
						id : 1,
						name : '总监摄影师',
						action : false
					},
					{
						id : 2,
						name : '资深摄影师',
						action : false
					},
					{
						id : 3,
						name : '大摄影师',
						action : false
					},
					{
						id : 3,
						name : '见习摄影师',
						action : false
					},
				],
				// 套系名称
				seriesName:'请选择',
				// 套系列表
				seriesNameList:[
					{
						name : '普通套系',
						list:[
							{
								id : 1,
								name:'9980超值套餐',
								action : false,
							}
						]
					},
				],
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
						orderMoney:5999,
						// 精修
						modify:50,
						// 拍摄保底张数
						photoNum:5999,
						// 入底
						onBottom:50,
						// 入册
						onCopies:50,
						// 新增产品
						newProduct:{
							// P数 1
							pPnum1 : 10,
							// 数量 1
							pNum1 : 1,
							// 价格 1
							pMoney1 : 100,
							// 加急 1
							pUrgent1 : '加急',
							// 取件方式 1
							pGetFun1 : '',
							// 备注 1
 							pNote1 : '',
							
							// P数 2
							pPnum2 : 20,
							// 数量 1
							pNum2 : 2,
							// 价格 2
							pMoney2 : 200,
							// 加急 2
							pUrgent2 : '加急',
							// 取件方式 2
							pGetFun2 : '',
							// 备注 2
							pNote2 : ''
						},
						// 新增服装
						newClothing:{
							// 数量 1
							cNum1 : 10,
							// 单价 1
							cPrice1 : 1,
							// 类型 1
							cType1 : '',
							// 备注 1
							cNote1 : '',
							
							// 数量 2
							cNum2 : 20,
							// 单价 2
							cPrice2 : 2,
							// 类型 2
							cType2 : '',
							// 备注 2
							cNote2 : '',
						}
					}
				],
				// 风格选择的列表
				styleArr : []
			};	
		},
		computed: {
			...mapGetters([
				'pickOrder',
				'CustomerService',
				'NetSales'
			]),
		},
		onLoad(option){
			// 获取页面路径中的type（开单类型）
			this.typeName = option.typeName
			this.type = option.type
			// 赋值小程序标题
			uni.setNavigationBarTitle({
				title: option.typeName
			});
			// 如果是type为婚庆或婚纱 昵称显示 新郎 新娘
			// 如果是type为孕妈或儿童 昵称显示 爸爸 妈妈
			// 如果是type为写真或服务 昵称显示 昵称
			if(option.type == 'hs' || option.type == 'hq'){
				this.userInfo = [{
					// 称呼
					callName:'新娘',
					// 名字
					name:'',
					// 电话
					phone:'',
					// qq
					qq:'',
					// 微信
					wechat:'',
					// 地址
					infoAddress:'',
					// 生日
					brisday:'2020-03-03',
					// 农历生日
					brisdayOld:null,
				},
				{
					callName:'新郎',
					name:'',
					phone:'',
					qq:'',
					wechat:'',
					infoAddress:'',
					brisday:'2020-03-05',
					brisdayOld:null
				}]
			}else if(option.type == 'et' || option.type == 'ym'){
				this.userInfo = [{
					// 称呼
					callName:'妈妈',
					// 名字
					name:'',
					// 电话
					phone:'',
					// qq
					qq:'',
					// 微信
					wechat:'',
					// 地址
					infoAddress:'',
					// 生日
					brisday:'2020-03-03',
					// 农历生日
					brisdayOld:null,
				},
				{
					callName:'爸爸',
					name:'',
					phone:'',
					qq:'',
					wechat:'',
					infoAddress:'',
					brisday:'2020-03-05',
					brisdayOld:null
				}]
				this.seriesNameList.push(
					{
						name : '宝宝套系',
						list:[
							{
								id : 2,
								name:'9999新生儿成长套餐',
								action : false,
							}
						]
					}
				)
			}else if(option.type == 'xz' || option.type == 'fw'){
				this.userInfo = [{
					// 称呼
					callName:'',
					// 名字
					name:'',
					// 电话
					phone:'',
					// qq
					qq:'',
					// 微信
					wechat:'',
					// 地址
					infoAddress:'',
					// 生日
					brisday:'2020-03-03',
					// 农历生日
					brisdayOld:null,
				}]
			}
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
			
			//打开抽屉
			openDrawer(type,index){
				// 赋值昵称下标
				this.callNameIndex = index
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
				}else if(drawerType == 'callName'){
					this.userInfo[this.callNameIndex].callName = item
					// 改变选择颜色 (循环遍历数组，改变点击的颜色)
					this.callNameList.forEach(function(i){
						if(i.name == item){
							i.action = true
						}else{
							i.action = false
						}
					})
					this.$refs.drawer.close()
				}else if(drawerType == 'BabycallName'){
					this.babyInfo[this.callNameIndex].callName = item
					// 改变选择颜色 (循环遍历数组，改变点击的颜色)
					this.babyCallNameList.forEach(function(i){
						if(i.name == item){
							i.action = true
						}else{
							i.action = false
						}
					})
					this.$refs.drawer.close()
				}else{
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
				}
			},
			
			// 前往选人页面
			goCandidates(type){
				if(type == 'pickOrder'){
					uni.navigateTo({
						url:'../candidates/candidates?type=pickOrder'
					})
				}else if(type == 'CustomerService'){
					uni.navigateTo({
						url:'../candidates/candidates?type=CustomerService'
					})
				}else if(type == 'NetSales'){
					uni.navigateTo({
						url:'../candidates/candidates?type=NetSales'
					})
				}else if(type == 'references'){
					uni.navigateTo({
						url:'../candidates/candidates?type=references'
					})
				}
			},
		
			// 是否选择农历 结婚时间
			switchOldDate:function(e){
				if(e.target.value == true){
					// 将时间转为农历
					let nongli = calendar.getLunarDate(this.InfoTime)
					let nonglixinxi = calendar.getLunarDateString(nongli);
					let year = nonglixinxi.year
					let month = nonglixinxi.month
					let day = nonglixinxi.day
					let InfoTime = `${year}年-${month}月-${day}`
					this.InfoTimeOld = InfoTime
				}else{
					// 将农历清空
					this.InfoTimeOld = null
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
					let InfoTime = `${year}年-${month}月-${day}`
					this.userInfo[index].brisdayOld = InfoTime
				}else{
					// 将农历清空
					this.userInfo[index].brisdayOld = null
				}
			},
		
			// 添加礼包
			addBag(){
				console.log('添加礼包')
			},
			
			// 新增订单
			addOrder(){
				let info ={
					// 价格
					orderMoney:'500',
					// 精修
					modify:'50',
					// 拍摄保底张数
					photoNum:'10',
					// 入底
					onBottom:'20',
					// 入册
					onCopies:'20',
					// 新增产品
					newProduct:{
						// P数 1
						pPnum1 : 10,
						// 数量 1
						pNum1 : 1,
						// 价格 1
						pMoney1 : 100,
						// 加急 1
						pUrgent1 : '加急',
						// 取件方式 1
						pGetFun1 : '',
						// 备注 1
						pNote1 : '',
						
						// P数 2
						pPnum2 : 20,
						// 数量 1
						pNum2 : 2,
						// 价格 2
						pMoney2 : 200,
						// 加急 2
						pUrgent2 : '加急',
						// 取件方式 2
						pGetFun2 : '',
						// 备注 2
						pNote2 : ''
					},
					// 新增服装
					newClothing:{
						// 数量 1
						cNum1 : 10,
						// 单价 1
						cPrice1 : 1,
						// 类型 1
						cType1 : '',
						// 备注 1
						cNote1 : '',
						
						// 数量 2
						cNum2 : 20,
						// 单价 2
						cPrice2 : 2,
						// 类型 2
						cType2 : '',
						// 备注 2
						cNote2 : '',
					}
				}
				
				this.orderInfo.push(info)
			},
			
			// 删除子单
			deleteOrder(index){
				this.orderInfo.splice(index, 1)
			},
	
			// 保存订单
			saveOrder(){
				let OrderArr = {
					'编号' : this.coding,
					'门店' : this.stores,
					'时间' : this.time,
					'分类' : this.classification,
					'分组' : this.grouping,
					'风格' : this.style,
					'备注' : this.note,
					'来源' : this.source,
					'介绍人' : this.references,
					'介绍人电话' : this.sourcePhone,
					'区域' : this.area,
					'结婚时间' : this.InfoTime,
				    '结婚时间(农历)' : this.InfoTimeOld,
					'客户联系人信息' : this.userInfo,
					'服务等级' : this.serviceLv,
					'老师等级' : this.teacherLv,
					'套系名称' : this.seriesName,
					'套餐价格' : this.seriesMoney,
					'礼包价格' : this.bagMoney,
					'合计' : this.addMoney,
					'子单' : this.orderInfo
				}
				
				console.log(OrderArr)
			},
		
		},
		watch:{
			styleArr(){
				console.log(this.styleArr)
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
			.ch{
				background-color: #f9f9f9;
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
						margin:auto 0;
						width: 500rpx;
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
		padding-bottom: 50rpx;
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
			.labelBox{
				.title{
					background-color: #FFFFFF;
					padding-left: 0;
				}
				.labe{
					width: 700rpx;
					margin: 0 auto;
					.titleBox{
						background-color: #e3ecff;
						display: flex;
						justify-content: space-between;
						.titleLB{
							text-align: center;
							height: 80rpx;
							line-height: 80rpx;
							width: 14.3%;
							font-size: 24rpx;
							color: #6c90cf;
							// width: ;
						}
						.cTitle{
							width: 20%;
						}
					}
					.textBox1,.textBox2{
						margin-top: 5rpx;
						background-color: #f2f6ff;
						display: flex;
						justify-content: space-between;		
						.textLB{
							color: #000000;
							text-align: center;
							height: 80rpx;
							width: 14.3%;
							font-size: 24rpx;
							.textLBtitle{
								width: 70%;
								margin: auto;
								margin-top: 10rpx;
							}
							.cTitle{
								width: 60%;
							}
						}	
						.cText{
							width: 20% ;
						}
					}
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
	.action{
		color: #578ff4;
	}
	.drawer{
		.title{
			font-size: 36rpx;
			font-weight: bold
		}
		.text{
			margin: 10rpx
		}
		.liName{
			margin-left: 20rpx;
		}
	}
</style>
