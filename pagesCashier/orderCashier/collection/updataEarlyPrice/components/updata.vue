<template>
	<view class="bigBox">
		<!-- 收款门店 -->
		<view class="listBox">
			<view class="title">收款门店</view>
			<view class="text">{{shopIdMap.get(earlyBasic.entryShopId)}}</view>
		</view>
		<!-- 收款人 -->
		<view class="listBox">
			<view class="title">收款人</view>
			<view class="text">{{get_userInfo.anotherName}}</view>
		</view>
		<!-- 消费订单 -->
		<view class="listBox">
			<view class="title">消费订单</view>
			<view class="text">{{earlyBasic.markNo}}</view>
		</view>
		<!-- 消费类别 -->
		<view class="listBox">
			<view class="title">消费类别</view>
			<view class="text">{{consumeTypeMap.get(earlyBasic.saleCategoryId)}}</view>
		</view>
		<!-- 消费项目 -->
		<view class="listBox">
			<view class="title">消费项目</view>
			<view class="text">{{earlyBasic.name}}</view>
		</view>
		<!-- 消费金额 -->
		<view class="listBox">
			<view class="title">消费金额</view>
			<view class="text">{{earlyBasic.sumPrice}}</view>
		</view>
		<!-- 收款时间 -->
		<view class="listBox">
			<view class="title">收款时间</view>
			<view class="text" @click="openCalendar">
				<view>{{params.receiptTime | time}}</view>
				<image class="my-img" src="https://lyfz-saas-erp-system.oss-cn-hangzhou.aliyuncs.com/AppletsFile/down.png" mode=""></image>
			</view>
		</view>
		<!-- 支付方式 -->
		<payPicker :getId.sync="params.billEntryReceiptDtos[0].payCategoryId" :getName.sync="params.billEntryReceiptDtos[0].payName"></payPicker>
		<!-- 金额 -->
		<view class="money">
			<view class="sumPrice">
				<view class="title">应收金额：</view>
				<view class="text">{{earlyBasic.sumPrice}}</view>
			</view>
			<view class="incomePrice">
				<view class="title">已收金额</view>
				<view class="text">{{earlyBasic.incomePrice}}</view>
			</view>
			<view class="arrears">
				<view class="title">欠款</view>
				<view class="text">{{earlyBasic.sumPrice - earlyBasic.incomePrice}}</view>
			</view>
			<view class="refundPrice">
				<view class="title">已退款</view>
				<view class="text">{{earlyBasic.refundPrice}}</view>
			</view>
		</view>
		<!-- 支付金额 -->
		<view class="listBox">
			<view class="title">支付金额</view>
			<input @input="money" @blur="moneyBlur" type="number" v-model="params.billEntryReceiptDtos[0].incomePrice" placeholder="请输入"/>
		</view>
		<!-- 收款凭证 -->
		<view class="listBox">
			<view class="title">收款凭证</view>
			<input type="text" placeholder="收款凭证" v-model="params.billEntryReceiptDtos[0].credentials"/>
		</view>	
		<!-- 收款备注 -->
		<view class="remarkBox">
			<textarea placeholder="收款备注:" v-model="params.remark" :hidden="showText"/>
		</view>
		
		<view class="button" v-if="type === 'collection'" @click="collection">确定收款</view>
		<view class="button" v-else @click="refund">确定退款</view>
		<!-- 日历 -->
		<uni-calendar 
			:insert="false"
			:lunar="true" 
			:clearDate='true'
			@confirm="enSure"
			@close="close"
			ref="calendar"
		/>
	</view>
</template>

<script>
	const { $Message } = require('@/wxcomponents/base/index');
	import uniCalendar from '@/components/uni/uni-calendar/uni-calendar.vue'
	import payPicker from '@/pagesCashier/components/payPicker.vue'
	import { mapGetters } from 'vuex'
	import { updataLateReceipt, lateRefund } from '@/util/api/shop.js'
	export default{
		props:['earlyBasic','type'],
		components:{
			uniCalendar,
			payPicker,
		},
		computed:{
			...mapGetters('app',[
				'shopId',
				'get_userInfo'
			]),
			...mapGetters('shopArr',[
				// 消费类别
				'get_consumeType',
				'get_shopAllArr',
			]),
		},
		data(){
			return{
				shopIdMap:new Map(),
				consumeTypeMap:new Map(),
				showText:false,
				// 不合法数字是否改变
				changeNum:false,

				params:{
					billEntryReceiptDtos:[
						{
							credentials:null,	//收款凭证
							expandField:null,	//扩展字段
							incomePrice:null,	//收款金额
							payCategoryId:null,	//支付方式类别
							payName:null,	//支付方式名称
						}
					],	//支付方式	
					employeePerformances:[],	//业绩分配人员
					entryId:null, //录入订单ID
					name:null, //消费项目	
					receiptShopId:null, //收款门店	
					receiptTime:null, //收款日期	
					receiptUser:null, //收款人	
					remark:null, //收款备注
					saleCategoryId:-1, //销售类别	
					shopId:null, //当前门店ID
				}
			}
		},
		mounted(){
			this.shopIdMap = new Map(this.get_shopAllArr.map(item => [item.shopId, item.shopName]))
			this.consumeTypeMap = new Map(this.get_consumeType.map(item => [item.id, item.name]))
			this.forParams()
		},
		methods:{
			// 基础信息赋值params
			forParams(){
				let data = this.params
				let basic = this.earlyBasic
				// 业绩分配人员
				let employeePerformances = []
				this.earlyBasic.receptions.forEach((i)=>{
					let arr = {
						actorId:i.actorId,
						resultsRatio:1,
					}
					employeePerformances.push(arr)
				})
				data.employeePerformances = employeePerformances
				// 录入订单
				data.entryId = basic.id
				// 消费项目
				data.name = basic.name
				// 收款门店
				data.receiptShopId = basic.entryShopId
				// 收款日期
				data.receiptTime = basic.entryTime
				// 收款人 
				data.receiptUser = this.get_userInfo.userId
				// 销售类型
				data.saleCategoryId = basic.saleCategoryId
				// 当前门店
				data.shopId = this.shopId
			},
		
			// 打开日历
			openCalendar(){
				this.$refs.calendar.open()
				this.showText = true
			},
			enSure(e){
				this.params.receiptTime = Date.parse(new Date(e.fulldate))
			},
			close(){
				this.showText = false
			},
			
			// 输入金额
			money(e){
				let arrears = Number(this.earlyBasic.sumPrice - this.earlyBasic.incomePrice)
				let en = Number(this.incomePrice + this.refundPrice)
				let getMoney = Number(e.detail.value)
				if(this.type === 'collection'){
					if(getMoney > arrears){
						this.changeNum = true
						$Message({
							content: '超过应付金额',
							type: 'warning'
						});
					}
				}else{
					if(getMoney > en){
						this.changeNum = true
						$Message({
							content: '超过已付金额',
							type: 'warning'
						});
					}
				}
			},
			moneyBlur(){
				let arrears = Number(this.earlyBasic.sumPrice - this.earlyBasic.incomePrice)
				let en = Number(this.incomePrice + this.refundPrice)
				if(this.changeNum){
					if(this.type === 'collection'){
						this.params.billEntryReceiptDtos[0].incomePrice = arrears
					}else{
						this.params.billEntryReceiptDtos[0].incomePrice = en
					}
				}
			},
			
			// 返回
			back(data){
				let pages = getCurrentPages();
				let pPrevPage = pages[pages.length - 3]; //上上一个页面
				pPrevPage.setData({
					isChange: true
				})
				$Message({
					content: data + '成功',
					type: 'success',
					duration: 1
				});
				setTimeout(()=>{
					uni.navigateBack({
						delta:1,
					})
				},1000)
			},
			
			// 收款
			collection(){
				updataLateReceipt(this.params).then(res=>{
					if(res.data.code===200){
						this.back('收款')
					}
				})
			},
			// 退款
			refund(){
				lateRefund(this.params).then(res=>{
					if(res.data.code===200){
						this.back('退款')
					}
				})
			},
		},
	}
</script>

<style lang="scss" scoped>
	@import '../../components/updataPriceStyle.scss';
</style>
