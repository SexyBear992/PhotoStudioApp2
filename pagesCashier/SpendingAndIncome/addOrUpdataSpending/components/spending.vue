/********************** 修改或添加支出订单组件 **************************/
<template>
	<view class="bigBox">
		<!-- 支出项目 -->
		<spendingPicker :nowSpending="params.itemId" :getId.sync="params.itemId" :getName.sync="params.itemName"></spendingPicker>
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
		<shopPicker :title="'支出门店'" :nowShop="params.expenditureShop" :getId.sync="params.expenditureShop"></shopPicker>
		<!-- 支付金额 -->
		<view class="listBox">
			<view class="title">支付金额</view>
			<input type="number" v-model="params.money" placeholder="请输入"/>
		</view>
		<!-- 支付方式 -->
		<payPicker :nowPay="params.payCategoryId" :getId.sync="params.payCategoryId"></payPicker>
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
	import spendingPicker from '@/pagesCashier/components/spendingPicker.vue'
	import payPicker from '@/pagesCashier/components/payPicker.vue'
	import shopPicker from '@/pagesCashier/components/shopPicker.vue'
	import list from '@/components/detailWorkMain/personList.vue'
	export default {
		props:['spendingDetail','addressSpending','calendarTime'],
		components:{
			spendingPicker,
			shopPicker,
			payPicker,
			list,
		},
		computed:{
			...mapGetters('app',[
				'shopId',
				'get_userInfo'
			]),
			...mapGetters('shopArr',[
				'get_spending',
			])
		},
		data(){
			return{
				// 录单人
				anotherName:null,
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
			this.anotherName = this.get_userInfo.anotherName
			this.params.shopId = this.shopId
			this.params.expenditureShop = this.shopId
			this.params.payTime = Date.parse(new Date())
			if(this.spendingDetail){
				this.getParams()
			}
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
				// 金额
				this.params.money = data.money
				// 支付方式
				this.params.payCategoryId = data.payCategoryId
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
			
			// 取款人
			goAddress(){
				uni.navigateTo({
					url:'/pages/address/address?type=RECEPTION' + '&show=' + this.reception + '&num=1'
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
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/pagesCashier/orderCashier/collection/components/updataPriceStyle.scss';
</style>

