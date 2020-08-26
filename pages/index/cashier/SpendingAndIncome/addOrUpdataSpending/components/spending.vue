/********************** 修改或添加支出订单组件 **************************/
<template>
	<view class="bigBox">
		<!-- 支出项目 -->
		<view class="listBox">
			<view class="title">支出项目</view>
			<pickerModule my-img="imgMargin" :arrInfo="pickerSpendingArr" :nowName="spendingName" @getId="getSpendingId"></pickerModule>
		</view>
		<!-- 取款人 -->
		<view class="listBox">
			<list :title="'取款人'" :show="reception" @goAddress="goAddress"></list>
		</view>
		<!-- 录单人 -->
		<view class="listBox">
			<view class="title">录单人</view>
			<view>{{anotherName}}</view>
		</view>
		<!-- 支出门店 -->
		<view class="listBox">
			<view class="title">支出门店</view>
			<pickerModule my-img="imgMargin" :arrInfo="pickerShopArr" :nowName="shopName" @getId="getShopId"></pickerModule>
		</view>
		<!-- 支付金额 -->
		<view class="listBox">
			<view class="title">支付金额</view>
			<input type="number" v-model="params.money" placeholder="请输入"/>
		</view>
		<!-- 支付方式 -->
		<view class="listBox">
			<view class="title">支付方式</view>
			<pickerModule my-img="imgMargin" :arrInfo="pickerPayArr" :nowName="payName" @getId="getPayId"></pickerModule>
		</view>
		<!-- 支付时间 -->
		<view class="listBox">
			<view class="title">支付时间</view>
			<view class="text" @click="openCalendar">
				<view>{{params.payTime | time}}</view>
				<image class="my-img" src="https://lyfz-saas-erp-system.oss-cn-hangzhou.aliyuncs.com/AppletsFile/down.png" mode=""></image>
			</view>
		</view>
		<!-- 订单备注 -->
		<view class="remarkBox">
			<textarea placeholder="订单备注:" v-model="params.remark"/>
		</view>
		
		<view v-if="spendingDetail" class="button" @click="updata">修改店面支出</view>
		<view v-else class="button" @click="add">录入店面支出</view>
	</view>
</template>

<script>
	const { $Message } = require('@/wxcomponents/base/index');
	import { mapGetters } from 'vuex'
	import { addExpenditure, updateExpenditure } from '@/util/api/shop.js'
	import pickerModule from '@/components/pickerModule.vue'
	import list from '@/pages/index/arrange/components/personList.vue'
	export default {
		props:['spendingDetail','addressSpending','calendarTime'],
		components:{
			pickerModule,
			list,
		},
		computed:{
			...mapGetters('app',[
				'shopId',
				'get_userInfo'
			]),
			...mapGetters('shopArr',[
				'get_spending',
				'get_shopAllArr',
				'get_pay'
			])
		},
		data(){
			return{
				// 录单人
				anotherName:null,
				
				// picker项目数组
				pickerSpendingArr:[],
				spendingName:'请选择',
				// picker门店数组
				pickerShopArr:[],
				shopName:null,
				// picker支付数组
				pickerPayArr:[],
				payName:'现金',
				
				reception:'请选择',
				
				params:{
					expenditureShop:null, //支出门店
					expenditureType:1, //1店面支出， 2财务支出
					itemId:null, //支出项目ID
					itemName:null, //项目名称
					money:null, //金额
					payCategoryId:null, //支付方式
					payTime:null, //支付时间
					receipt:null, //发票/收据/合同
					remark:null, //备注
					shopId:null, //录入门店
					withdrawUser:null, //取款人ID
				},
			}
		},
		mounted(){
			if(this.spendingDetail){
				this.getParams()
			}else{
				this.anotherName = this.get_userInfo.anotherName
				this.params.shopId = this.shopId
				this.params.expenditureShop = this.shopId
				this.params.payTime = Date.parse(new Date())
			}
			this.getSpendingArr()
			this.getPickerShopArr()
			this.getPayArr()
		},
		methods:{
			// 基本赋值
			getParams(){
				let data = this.spendingDetail
				// 支出门店
				this.params.expenditureShop = data.expenditureShop
				// 订单ID
				this.params.id = data.id
				// 支出项目ID
				this.params.itemId = data.itemId
				this.get_spending.some((i)=>{
					if(i.id === data.itemId){
						this.spendingName = i.name
						this.params.itemName = i.name
					}
				})
				// 金额
				this.params.money = data.money
				// 支付方式
				this.params.payCategoryId = data.payCategoryId
				this.get_pay.some((i)=>{
					if(i.id === data.payCategoryId){
						this.payName = i.name
					}
				})
				// 支付时间
				this.params.payTime = data.payTime
				// 凭证
				this.params.receipt = data.receipt
				// 备注
				this.params.remark = data.remark
				// 取款人
				this.params.withdrawUser = data.withdrawUser.actorId
				this.reception = data.withdrawUser.actorName
				// 录单人
				this.anotherName = data.createUser.actorName
				// 录入门店
				this.params.shopId = this.shopId
			},
			
			// 支出项目数组
			getSpendingArr(){
				let arr = []
				this.get_spending.forEach((i)=>{
					let lis ={
						id:i.id,
						name:i.name
					}
					arr.push(lis)
				})
				arr[0].name = '请选择'
				arr[0].id = null
				this.pickerSpendingArr = arr
			},
			// 支出项目返回
			getSpendingId(e){
				this.params.itemId = e.id
				this.params.itemName = e.name
			},	
			// 门店数组
			getPickerShopArr(){
				let arr = []
				this.get_shopAllArr.forEach((i)=>{
					let lis ={
						id:i.shopId,
						name:i.shopName
					}
					arr.push(lis)
					if(this.shopId === i.shopId){
						this.shopName = i.shopName
					}
				})
				this.pickerShopArr = arr
			},
			// 门店返回
			getShopId(e){
				this.params.expenditureShop = e.id
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
				this.params.payCategoryId = this.pickerPayArr[0].id
				this.payName = this.pickerPayArr[0].name
			},
			// 支付方式返回
			getPayId(e){
				this.params.payCategoryId = e.id
			},	
			// 取款人
			goAddress(){
				uni.navigateTo({
					url:'../../../../address/address?type=RECEPTION' + '&show=' + this.reception
				})
			},
			// 打开日历
			openCalendar(){
				this.$emit('openCalendar')
			},		
		
			// 跳转
			backPage(){
				let pages = getCurrentPages();
				let prvePage = pages[pages.length - 2]; //前一页
				prvePage.setData({
					isChange: true
				})
				$Message({
					content: '新增成功',
					type: 'success'
				});
				setTimeout(()=>{
					uni.navigateBack({
						delta:1,
					})
				},1000)
			},
			// 添加
			add(){
				addExpenditure(this.params).then(res=>{
					if(res.data.code === 200){
						this.backPage()
					}
				})
			},
			// 修改
			updata(){
				updateExpenditure(this.params).then(res=>{
					if(res.data.code === 200){
						this.backPage()
					}
				})
			},
		},
		watch:{
			addressSpending:{
				deep:true,
				handler(){
					this.reception = this.addressSpending.show
					this.params.withdrawUser = this.addressSpending.enArr[0].id
				}
			},
			calendarTime(){
				this.params.payTime = this.calendarTime
			},
			params:{
				deep:true,
				handler(){
					console.log('监听',this.params)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/pages/index/cashier/orderCashier/collection/components/updataPriceStyle.scss';
</style>

