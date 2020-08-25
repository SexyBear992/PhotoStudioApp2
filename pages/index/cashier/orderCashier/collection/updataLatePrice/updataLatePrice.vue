<template>
	<view>
		<view class="bigBox">
			<!-- 收款门店 -->
			<view class="listBox">
				<view class="title">收款门店</view>
				<view class="text">{{shopIdMap.get(params.receiptShopId)}}</view>
			</view>
			
			<!-- 收款人 -->
			<view class="listBox">
				<view class="title">收款人</view>
				<view class="text">{{get_userInfo.anotherName}}</view>
			</view>
			
			<!-- 接单人 -->
			<view class="listBox">
				<view class="title">接单人</view>
				<view class="text">{{actor}}</view>
			</view>
			
			<!-- 收款项目 -->
			<view class="listBox">
				<view class="title">收款项目</view>
				<pickerModule my-img="imgMargin" :arrInfo="receiptPickerArr" @getId="getReceiptId"></pickerModule>
			</view>
			
			<!-- 收款时间 -->
			<view class="listBox">
				<view class="title">收款时间</view>
				<view class="text" @click="openCalendar">
					<view>{{params.receiptTime | time}}</view>
					<image class="my-img" src="https://7068-photostudioapp-1302515241.tcb.qcloud.la/newIcon/down.png" mode=""></image>
				</view>
			</view>
			
			<!-- 支付方式 -->
			<view class="listBox">
				<view class="title">支付方式</view>
				<pickerModule my-img="imgMargin" :arrInfo="payPickerArr" @getId="getPayId"></pickerModule>
			</view>
			
			<!-- 金额 -->
			<view class="money">
				<view class="sumPrice">
					<view class="title">应收金额：</view>
					<view class="text">{{sumPrice}}</view>
				</view>
				<view class="incomePrice">
					<view class="title">已收金额</view>
					<view class="text">{{incomePrice}}</view>
				</view>
				<view class="arrears">
					<view class="title">欠款</view>
					<view class="text">{{arrears}}</view>
				</view>
				<view class="refundPrice">
					<view class="title">已退款</view>
					<view class="text">{{refundPrice}}</view>
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
				<textarea placeholder="收款备注:" v-model="params.remark"/>
			</view>

			<view class="button" @click="en">确定{{text}}</view>
			
		</view>
		
		<i-message id="message" />
		<!-- 日历 -->
		<uni-calendar 
			:insert="false"
			:lunar="true" 
			:clearDate='true'
			@confirm="enSure"
			ref="calendar"
		/>
	</view>
</template>

<script>
	const { $Message } = require('@/wxcomponents/base/index');
	import uniCalendar from '@/components/uni/uni-calendar/uni-calendar.vue'
	import pickerModule from '@/components/pickerModule.vue'
	import { mapGetters } from 'vuex'
	import { updataReceipt, refund } from '@/util/api/shop.js'
	export default {
		components:{
			pickerModule,
			uniCalendar
		},
		computed:{
			...mapGetters('app',[
				'shopId',
				'get_userInfo'
			]),
			...mapGetters('shopArr',[
				'get_receipt',
				'get_pay',
				'get_shopAllArr'
			]),
		},
		data() {
			return {
				// 基本信息
				basic:[],
				
				text:null,
				
				shopIdMap: new Map(),
				
				// 接单人
				actor:null,
				
				// 需付
				sumPrice:null,
				// 已付
				incomePrice:null,
				// 欠款
				arrears:null,
				// 退款
				refundPrice:null,
				
				// 不合法数字是否改变
				changeNum:false,
				
				receiptPickerArr:[],
				payPickerArr:[],
				
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
					receptions:null, //接单人	
					remark:null, //收款备注
					saleCategoryId:-1, //销售类别	
					shopId:null, //当前门店ID
				}
			}
		},
		onLoad(op){
			let pages = getCurrentPages();
			let prvePage = pages[pages.length - 2]; //上个页面
			this.basic = prvePage.data.basic
			this.sumPrice = prvePage.data.money.sumPrice
			this.incomePrice = prvePage.data.money.incomePrice
			this.refundPrice = prvePage.data.money.refundPrice
			this.arrears = this.sumPrice - this.incomePrice
			// 录入订单ID
			this.params.entryId = Number(op.id)
			
			if(op.type === 'collection'){
				this.text = '收款'
			}else{
				this.text = '退款'
			}
			uni.setNavigationBarTitle({
				title: '前期' + this.text
			})
		},
		mounted(){
			this.shopIdMap = new Map(this.get_shopAllArr.map(item => [item.shopId, item.shopName]))
			this.getParams()
			this.getPickerArr()
		},
		methods: {
			// 基本赋值
			getParams(){
				// 收款门店
				this.params.shopId = this.shopId
				this.params.receiptShopId = this.shopId
				this.params.receiptUser = this.get_userInfo.userId
				// 接单人
				let receptions = []
				let name = []
				let employeePerformances = []
				this.basic.orderActorVos.forEach((i)=>{
					receptions.push(i.actorId)
					name.push(i.actorName)
					let arr = {
						actorId:i.actorId,
						resultsRatio:1,
					}
					employeePerformances.push(arr)
				})
				
				this.actor = name
				this.params.receptions = receptions
				this.params.employeePerformances = employeePerformances
				// 当前时间戳
				this.params.receiptTime = Date.parse(new Date())
			},
			
			// 收款项目picker
			getPickerArr(){
				let arr = []
				this.get_receipt.forEach((i)=>{
					let lis ={
						id:i.id,
						name:i.name
					}
					arr.push(lis)
				})
				arr.shift()
				this.receiptPickerArr = arr
				this.params.name = this.receiptPickerArr[0].name
				
				let arr2 = []
				this.get_pay.forEach((i)=>{
					let lis2 = {
						id:i.id,
						name:i.name
					}
					arr2.push(lis2)
				})
				arr2.shift()
				this.payPickerArr = arr2
				this.params.billEntryReceiptDtos[0].payCategoryId = this.payPickerArr[0].id
				this.params.billEntryReceiptDtos[0].payName = this.payPickerArr[0].name
			},
			
			// 获取收款项目
			getReceiptId(e){
				this.params.name = e.name
			},

			// 获取支付方式
			getPayId(e){
				this.params.billEntryReceiptDtos[0].payCategoryId = e.id
				this.params.billEntryReceiptDtos[0].payName = e.name
			},
		
			// 打开日历
			openCalendar(){
				this.$refs.calendar.open()
			},
			// 日历返回
			enSure(e){	
				this.params.receiptTime = Date.parse(new Date(e.fulldate))
			},
			
			// 输入金额
			money(e){
				if(this.text == '收款'){
					if(Number(e.detail.value) > Number(this.arrears)){
						this.changeNum = true
						$Message({
							content: '超过应付金额',
							type: 'warning'
						});
					}
				}else{
					if(Number(e.detail.value) > (Number(this.incomePrice) + Number(this.refundPrice))){
						this.changeNum = true
						$Message({
							content: '超过已付金额',
							type: 'warning'
						});
					}
				}
			},
			moneyBlur(){
				if(this.changeNum){
					if(this.text == '收款'){
						this.params.billEntryReceiptDtos[0].incomePrice = Number(this.arrears)
					}else{
						this.params.billEntryReceiptDtos[0].incomePrice = Number(this.incomePrice) + Number(this.refundPrice)
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
			updataReceipt(){
				updataReceipt(this.params).then(res=>{
					if(res.data.code===200){
						this.back('收款')
					}
				})
			},
			
			// 退款
			refund(){
				refund(this.params).then(res=>{
					if(res.data.code===200){
						this.back('退款')
					}
				})
			},
			// 提交
			en(){
				if(this.text === '收款'){
					this.updataReceipt()
				}else{
					this.refund()
				}
			},
			
		},
	}
</script>

<style lang="scss">
	@import '../components/updataPriceStyle.scss';
</style>
