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
				<view class="listBox" @click="openCalendar('time')">
					<view class="left">
						<view class="title">时间</view>
						<view class="text">{{time}}</view>
					</view>
					<image :src="url+'icon_hr@2x.png'" mode=""></image>
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
					<view class="left" @click="openCalendar('InfoTime',index)">
						<view class="title" v-if="type == 'hs'">结婚日期</view>
						<view class="title" v-if="type == 'ym'">预产日期</view>
						<view class="title" v-if="type == 'fw'">服务日期</view>
						<view class="text" v-if="showTimeOld">{{InfoTime}}</view>
						<view class="text" v-else>{{InfoTimeOld}}</view>
					</view>
					<view class="right">
						<switch @change="switchBrisdayOld($event,index,'InfoTimeOld')" color="#61a3ff" class="switch"/><span>农历</span>
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
				<view class="listBox"  @click="openCalendar('babyInfo',index)">
					<view class="left">
						<view class="title">生日</view>
						<view class="text" v-if="item.lunar">{{item.brisday}}</view>
						<view class="text" v-else>{{item.brisdayOld}}</view>
					</view>
					<view class="right">
						<switch @change="switchBrisdayOld($event,index,'brisday')" color="#61a3ff" class="switch"/><span>农历</span>
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
					</view>
					<image :src="url+'icon_hr@2x.png'" mode="" @click="openDrawer('callName',index)"></image>
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
				<!-- 地址 -->
				<!-- <view class="listBox">
					<view class="left">
						<view class="title">地址</view>
						<input type="text" v-model="item.infoAddress" />
					</view>
				</view> -->
				<!-- 生日 -->
				<view class="listBox">
					<view class="left" @click="openCalendar('userInfo',index)">
						<view class="title">生日</view>
						<view class="text" v-if="item.lunar">{{item.brisday}}</view>
						<view class="text" v-else>{{item.brisdayOld}}</view>
					</view>
					<view class="right">
						<switch @change="switchBrisdayOld($event,index,'brisday')" color="#61a3ff" class="switch"/><span>农历</span>
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
						<image :src="url+'icon_hr@2x.png'" mode="" @click="openDrawer('seriesName')"></image>
					</view>
				</view>
				
				<view class="but" @click="addBag">添加礼包</view>
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
		<childOrder  v-if="seriesName != '请选择'" :seriesName="seriesName"></childOrder>
		
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
						<view class="text" @click="chooseDrawer(drawerType,item.name,index)" :class="(item.action)?'action':''">{{item.name}}</view>
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
		<uni-calendar 
		    :insert="false"
		    :lunar="true" 
			:clearDate='true'
			ref='calendar'
			@confirm="sureDay"
			class="calendar"
		 />
		<!-- IOS手机底部留白 -->
		<view class="bottomList"></view>
		<view class="save" @click="saveOrder">保存订单</view>
	</view>
</template>

<script>
	import uniDrawer from "@/components/uni/uni-drawer/uni-drawer.vue"
	import uniCalendar from '@/components/uni/uni-calendar/uni-calendar.vue'
	import childOrder from '@/components/childOrder/childOrder.vue'
	import {mapGetters} from 'vuex'
	// 导入文件数据
	import storesList from './storesList.js'
	import classificationList from './classificationList.js'
	import groupingList from './groupingList.js'
	import sourceList from './sourceList.js'
	import babyInfo from './babyInfo.js'
	import babyCallNameList from './babyCallNameList.js'
	import callNameListH from './callNameListH.js'
	import callNameListX from './callNameListX.js'
	import callNameListE from './callNameListE.js'
	import serviceLvList from './serviceLvList.js'
	import styleList from './styleList.js'
	import teacherLvList from './teacherLvList.js'
	import seriesNameList from './seriesNameList.js'
	import areaList from './areaList.js'
	import userInfoH from './userInfoH.js'
	import userInfoE from './userInfoE.js'
	import userInfoX from './userInfoX.js'
	export default {
		components: {uniDrawer,uniCalendar,childOrder},
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
				// 酒店信息
				hotelInfo:'',
				// 备注
				note:'',
				// 来源
				source:'客户来源',
				// 来源列表
				sourceList:[],
				// 介绍人
				// references:'莉莉',
				// 介绍人电话
				// sourcePhone:'16271717126',
				// 区域
				area:'客户区域',
				// 区域列表
				areaList:[],
				// 结婚时间
				InfoTime:'请选择日期',
				// 结婚时间 农历
				InfoTimeOld:'请选择日期',
				// 结婚时间 是否显示新历
				showTimeOld:true,
				// 客户联系人信息
				userInfo:[],
				// 宝宝信息
				babyInfo:[],
				// 宝宝昵称列表
				babyCallNameList:[],
				// 昵称列表
				callNameList:[],
				// 昵称下标
				callNameIndex:null,
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
				// 套系套餐价格
				seriesMoney:'5999元',
				// 套系礼包价格
				bagMoney:'300元',
				// 套系合计价格
				addMoney:'5999元',			
				// 选择时间类型
				timeClss:null,
				// 选择时间下标
				timeIndex:null
			};	
		},
		computed: {
			...mapGetters([
				'pickOrder',
				'CustomerService',
				'NetSales',
				'references',
				'sourcePhone'
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
			if(option.type == 'hs' || option.type == 'hq'){
				this.userInfo = userInfoH
			}else if(option.type == 'et' || option.type == 'ym'){
				this.userInfo = userInfoE
			}else if(option.type == 'xz' || option.type == 'fw'){
				this.userInfo = userInfoX
			}
		},
		onUnload(){
			// 清空数据
			this.clearAction(seriesNameList)
			this.clearAction(classificationList)
			this.clearAction(groupingList)
			this.clearAction(styleList)
			this.clearAction(sourceList)
			this.clearAction(areaList)
			this.clearAction(babyInfo)
			this.clearAction(babyCallNameList)
			if(this.callNameList == []){
				this.clearAction(callNameList)
			}
			this.clearAction(serviceLvList)
			this.clearAction(teacherLvList)
			this.clearAction(storesList)
			this.$store.commit('pickOrder','接单人员')
			this.$store.commit('CustomerService','专服人员')
			this.$store.commit('NetSales','网销人员')
			this.$store.commit('references','介绍人')
			this.$store.commit('sourcePhone','介绍人电话')
		},
		mounted(){
			this.seriesNameList = seriesNameList
			this.storesList = storesList
			this.classificationList = classificationList
			this.groupingList = groupingList
			this.styleList = styleList
			this.sourceList = sourceList
			this.areaList = areaList
			this.babyInfo = babyInfo
			this.babyCallNameList = babyCallNameList
			if(this.type == 'hs' || this.type == 'hq'){
				this.callNameList = callNameListH
			}else if(this.type == 'et' || this.type == 'ym'){
				this.callNameList = callNameListE
				// 对接口需删除
				this.seriesNameList.push({
					name : '宝宝套系',
					list:[
						{
							id : 2,
							name:'9999新生儿成长套餐',
							action : false,
						}
					]
				})
			}else{
				this.callNameList = callNameListX
			}
			this.serviceLvList = serviceLvList
			this.teacherLvList = teacherLvList
		},
		methods: {
			// 编号开关
			switchCoding: function (e) {
				// 布尔值赋值
				this.codingBoo = e.target.value
				if(e.target.value){
					this.coding = ''
				}else{
					this.coding = '订单编号'
				}
			},
			
			//打开抽屉
			openDrawer(type,index){
				this.callNameIndex = index
				this.drawerType = type
				this.$refs.drawer.open()
				let _this = this
				if(type == 'callName'){
					this.callNameList.forEach(function(i){
						if(_this.userInfo[index].callName == i.name){
							i.action = true
						}else{
							i.action = false
						}
					})
				}
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
							_this.userInfo[_this.callNameIndex].callName = i.name
						}else{
							if(_this.type != 'xz' && _this.type != 'fw'){
								_this.userInfo[oCallNameIndex].callName = i.name
							}
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
		
			// 是否选择农历 生日
			switchBrisdayOld:function(e,index,timeClss){
				if(timeClss == 'InfoTimeOld'){
					if(e.target.value == true){
						this.showTimeOld =false
					}else{
						this.showTimeOld =true
					}
				}else if(timeClss =='brisday'){
					if(e.target.value == true){
						this.userInfo[index].lunar =false
					}else{
						this.userInfo[index].lunar =true
					}
				}
				
			},
		
			// 添加礼包
			addBag(){
				console.log('添加礼包')
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
			
			// 打开日历
			openCalendar(time,index) {
				this.timeClss = time
				this.timeIndex = index
				this.$refs.calendar.open()
			},
			
			sureDay(e){
				// 获得农历
				let year = e.lunar.Animal
				let month = e.lunar.IMonthCn
				let day = e.lunar.IDayCn
				let lunar = `${year}年-${month}-${day}`
				if(this.timeClss == 'time' || this.timeClss == 'InfoTime'){
					this[this.timeClss] = e.fulldate			
					this.InfoTimeOld = lunar
				}else if(this.timeClss == 'userInfo' ||this.timeClss  =='babyInfo'){
					this[this.timeClss][this.timeIndex].brisday = e.fulldate				
					this[this.timeClss][this.timeIndex].brisdayOld = lunar
				}
				console.log(this.$refs.calendar)
			},
			
			// 清空选择
			clearAction(list){
				list.forEach((i)=>{
					if(i.list){
						i.list.forEach((item)=>{
							item.action = false
						})
					}else{
						i.action = false
					}
				})
			},
		},
		watch:{
			// 监听，如果选择风格为空 则显示 '喜爱风格'
			styleArr(){
				if(this.styleArr.length <= 0 ){
					this.style ='喜爱风格'
				}
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
			.but{
				border: 1rpx solid #6d9ef6;
				color: #6d9ef6;
				border-radius: 10rpx;
				font-size: 24rpx;
				height: 40rpx;
				line-height: 40rpx;
				padding: 0 10rpx;
				width: 100rpx;
				float: right;
				margin: 10rpx 0;
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
	
	
	.save{
		position: fixed;
		bottom: 30rpx;
		margin-left: 50%;
		transform: translateX(-50%);
		color: #FFFFFF;
		width: 650rpx;
		height: 80rpx;
		background-color: #578ff4;
		text-align: center;
		line-height: 80rpx;
		border-radius: 40rpx;
		z-index: 2;
	}
	.action{
		color: #578ff4;
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
	.calendar{
		z-index: 2;
	}
	.bottomList{
		height: 150rpx;
	}
</style>
