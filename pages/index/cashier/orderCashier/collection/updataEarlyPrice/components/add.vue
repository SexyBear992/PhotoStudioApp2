<template>
	<view class="bigBox">
		<!-- 收款门店 -->
		<view class="listBox">
			<view class="title">收款门店</view>
			<pickerModule my-img="imgMargin" :arrInfo="pickerShopArr" :nowName="nowShopName" @getId="getShopId"></pickerModule>
		</view>
		<!-- 收款人 -->
		<view class="listBox">
			<view class="title">收款人</view>
			<view class="text">{{get_userInfo.anotherName}}</view>
		</view>
		<!-- 消费订单 -->
		<view class="listBox">
			<view class="title">消费订单</view>
			<pickerModule my-img="imgMargin" :arrInfo="pickerItemArr"  @getId="getItemId"></pickerModule>
		</view>
		<!-- 消费类别 -->
		<view class="listBox">
			<view class="title">消费类别</view>
			<pickerModule my-img="imgMargin" :arrInfo="pickerConsumeArr"  @getId="getConsumeId"></pickerModule>
		</view>
		<!-- 消费项目 -->
		<view class="listBox">
			<view class="title">消费项目</view>
			<input type="text" v-model="params.name" placeholder="请输入"/>
		</view>
		<!-- 消费金额 -->
		<view class="listBox">
			<view class="title">消费金额</view>
			<input type="number" v-model="params.sumPrice" placeholder="请输入"/>
		</view>
		<!-- 收款时间 -->
		<view class="listBox">
			<view class="title">收款时间</view>
			<view class="text" @click="openCalendar">
				<view>{{params.receiptTime | time}}</view>
				<image class="my-img" src="https://lyfz-saas-erp-system.oss-cn-hangzhou.aliyuncs.com/AppletsFile/down.png" mode=""></image>
			</view>
		</view>
		<!-- 接单人 -->
		<view class="listBox">
			<list :title="'接单人'" :show="reception" :type="'RECEPTION'" @goAddress="goAddress"></list>
		</view>
		<!-- 支付方式 -->
		<view class="listBox">
			<view class="title">支付方式</view>
			<pickerModule my-img="imgMargin" :arrInfo="pickerPayArr"  @getId="getPayId"></pickerModule>
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
		
		<view class="button" @click="add">添加退款</view>
	</view>
</template>

<script>
	const { $Message } = require('@/wxcomponents/base/index');
	import { mapGetters } from 'vuex'
	import pickerModule from '@/components/pickerModule.vue'
	import list from '@/pagesWork/arrange/components/personList.vue'
	import { addLateReceipt, getItemNo } from '@/util/api/shop.js'
	export default{
		props:['calendarTime','recordId','oId','enAddressInfo'],
		components:{
			pickerModule,
			list
		},
		computed:{
			...mapGetters('app',[
				'shopId',
				'get_userInfo'
			]),
			...mapGetters('shopArr',[
				// 消费类别
				'get_consumeType',
				// 支付方式
				'get_pay',
				// 门店
				'get_shopAllArr',
			]),
		},
		data(){
			return{
				shopIdMap:new Map(),
				
				// 子订单数据
				itemList:null,
				
				// 门店
				pickerShopArr:[],
				nowShopName:null,
				// 消费类别
				pickerConsumeArr:[],
				// 子订单数组
				pickerItemArr:[],
				// 支付方式
				pickerPayArr:[],
				
				// 接单人
				reception:'请选择',
				
				params:{
					billEntryReceiptDtos:[ //支付方式
						{
							credentials:null,	//收款凭证
							expandField:null,	//扩展字段
							incomePrice:null,	//收款金额
							payCategoryId:null,	//支付方式类别
							payName:null,	//支付方式名称
						}
					],
					employeePerformances:[],	//业绩分配人员
					inputEntryTypeEnum:'ASSEMBLY',	//录入项目类型,可用值:ASSEMBLY,GIFT,GOODS
					itemId:null, //子订单ID
					markNo:null, //关联标志
					name:null, //消费项目
					receiptShopId:null, //收款门店
					receiptTime:null, //收款日期
					receiptUser:null, //收款人
					recordId:null, //账单ID
					remark:null, //收款备注
					saleCategoryId:null, //销售类别
					saleName:null, //销售类别名称
					shopId:null, //当前门店ID
					sumPrice:null, //录入金额
				}
			}
		},
		mounted(){
			this.shopIdMap = new Map(this.get_shopAllArr.map(item => [item.shopId, item.shopName]))
			// 赋值当前时间
			this.params.receiptTime = Date.parse(new Date())
			// 赋值当前门店
			this.params.shopId = this.shopId
			// 赋值账单ID
			this.params.recordId = this.recordId
			// 赋值收款人
			this.params.receiptUser = this.get_userInfo.userId
			this.getItemNo()
		},
		methods:{
			// 获取子订单
			getItemNo(){
				getItemNo({orderId: this.oId}).then(res=>{
					this.itemList = res.data.data
					this.getShopArr()
					this.getConsumeArr()
					this.getPayArr()
					this.getItemArr()
				})
			},
		
			// 门店数组
			getShopArr(){
				let arr = []
				this.get_shopAllArr.forEach((i)=>{
					let lis ={
						id:i.shopId,
						name:i.shopName
					}
					arr.push(lis)
				})
				this.pickerShopArr = arr
				this.params.receiptShopId = this.shopId
				this.nowShopName = this.shopIdMap.get(this.shopId)
			},
			// 消费类别数组
			getConsumeArr(){
				let arr = []
				this.get_consumeType.forEach((i)=>{
					let lis ={
						id:i.id,
						name:i.name
					}
					arr.push(lis)
				})
				arr[0].id = null,
				arr[0].name = '请选择'
				this.pickerConsumeArr = arr
			},
			// 子订单数组
			getItemArr(){
				let arr = [{id:null,name:'请选择'}]
				this.itemList.forEach((i)=>{
					let lis ={
						id:i.id,
						name:i.name
					}
					arr.push(lis)
				})
				this.pickerItemArr = arr
			},
			// 支付方式数组
			getPayArr(){
				let arr = []
				this.get_pay.forEach((i)=>{
					let lis ={
						id:i.id,
						name:i.name
					}
					arr.push(lis)
				})
				arr.shift()
				this.pickerPayArr = arr
				this.params.billEntryReceiptDtos[0].payCategoryId = this.pickerPayArr[0].id
				this.params.billEntryReceiptDtos[0].payName = this.pickerPayArr[0].name
			},
			// 门店返回
			getShopId(e){
				this.params.receiptShopId = e.id
			},
			// 消费类型返回
			getConsumeId(e){
				this.params.saleCategoryId = e.id
				this.params.saleName = e.name
			},
			// 子订单返回
			getItemId(e){
				this.itemList.some((i)=>{
					if(i.id === e.id){
						this.params.markNo = i.itemNo
						this.params.itemId = i.id
					}else if(e.id === null){
						this.params.markNo = null
						this.params.itemId = null
					}
				})
			},
			// 支付方式返回
			getPayId(e){
				this.params.billEntryReceiptDtos[0].payCategoryId = e.id
				this.params.billEntryReceiptDtos[0].payName = e.name
			},		
			// 接单人
			goAddress(){
				uni.navigateTo({
					url:'./../../../../../address/address?type=RECEPTION' + '&show=' + this.reception
				})
			},
			// 打开日历
			openCalendar(){
				this.$emit('openCalendar')
			},
			// 收款金额
			money(e){
				if(this.params.sumPrice === null){
					$Message({
						content: '请填写消费金额',
						type: 'warning'
					});
				}else if(Number(this.params.sumPrice) < Number(e.detail.value)){
					$Message({
						content: '收款金额不得大约消费金额',
						type: 'warning'
					});
				}
			},
			moneyBlur(){
				let money = this.params.billEntryReceiptDtos[0].incomePrice
				if(Number(this.params.sumPrice) < money){
					this.params.billEntryReceiptDtos[0].incomePrice = Number(this.params.sumPrice)
				}
			},
			// 添加收款
			add(){
				addLateReceipt(this.params).then(res=>{
					if(res.data.code === 200){
						uni.navigateBack({
							delta:1
						})
					}
				})
			},
		},
		watch:{
			// 时间
			calendarTime(){
				this.params.receiptTime = this.calendarTime
			},
			// 接单人
			enAddressInfo(){
				this.reception = this.enAddressInfo.show
				let arr = []
				this.enAddressInfo.enArr.forEach((i)=>{
					let lis = {
						actorId: i.id,
						resultsRatio: 1
					}
					arr.push(lis)
				})
				this.params.employeePerformances = arr
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../components/updataPriceStyle.scss';
</style>