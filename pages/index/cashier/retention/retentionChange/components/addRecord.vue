/********************** 保留金充值 *************************/
<template>
	<view>
		<view class="bigBox">
			<!-- 客户姓名 -->
			<view class="listBox">
				<view class="title">客户姓名</view>
				<view class="text">{{basic.name}}</view>
			</view>
			<!-- 手机号 -->
			<view class="listBox">
				<view class="title">手机号</view>
				<view class="text">{{basic.mobile}}</view>
			</view>
			<!-- 录单人 -->
			<view class="listBox">
				<view class="title">录单人</view>
				<view class="text">{{get_userInfo.anotherName}}</view>
			</view>
			<!-- 门店 -->
			<view class="listBox">
				<view class="title">{{text}}门店</view>
				<pickerModule my-img="imgMargin" :arrInfo="pickerShopArr" :nowName="nowShopName" @getId="getShopId"></pickerModule>
			</view>
			
			<!-- 保留金充值 -->
			<view class="listBox">
				<view class="title">{{text}}金额</view>
				<input type="text" placeholder="请输入" v-model="params.money"/>
			</view>
			
			<!-- 方式 -->
			<view class="listBox">
				<view class="title">{{text}}方式</view>
				<pickerModule my-img="imgMargin" :arrInfo="pickerPayArr" @getId="getPayId"></pickerModule>
			</view>
			
			<!-- 记录类型 -->
			<view v-if="type === 'refund'" class="listBox">
				<view class="title">记录类型</view>
				<pickerModule my-img="imgMargin" :arrInfo="pickerTypeArr" @getId="getTypeId" :nowName="'退款'"></pickerModule>
			</view>
			
			<!-- 备注 -->
			<view class="remarkBox">
				<textarea :placeholder="text+'备注'" v-model="params.remark"/>
			</view>
			
			<view class="button" @click="addRecord">确定{{text}}</view>
			
		</view>
	</view>
</template>

<script>
	const { $Message } = require('@/wxcomponents/base/index');
	import pickerModule from '@/components/pickerModule.vue'
	import { addRetentionRecord } from '@/util/api/shop.js'
	import { mapGetters } from 'vuex'
	export default{
		props:['retentionId','basic','type'],
		components:{
			pickerModule
		},
		computed:{
			...mapGetters('app',[
				'shopId',
				'get_userInfo'
			]),
			...mapGetters('shopArr',[
				'get_shopAllArr',
				'get_pay'
			])
		},
		data(){
			return{
				text:null,
				// picker门店数组
				pickerShopArr:[],
				nowShopName:null,
				// picker支付数组
				pickerPayArr:[],
				// 记录类型
				pickerTypeArr:[
					{name:'退款',id:'REFUND'},
					{name:'订单退款',id:'ORDERREFILL'},
					{name:'订单扣款',id:'ORDERREFUND'},
				],
				params:{
					createUser:null, //录入人
					evidence:null, //扣款凭证
					money:null, //金额
					payType:null, //支付方式
					payTypeName:null, //支付方式名称
					recordId:null, //收款记录ID
					remark:null, //备注
					retentionId:null, //保留金ID
					shopId:null, //门店ID
					type:null,
				},
			}
		},
		mounted(){
			if(this.type === 'topUp'){
				this.text = '收款'
				this.type = 'REFILL'
			}else{
				this.text = '退款'
				this.type = 'REFUND'
			}
			this.params.createUser = this.get_userInfo.userId
			this.params.shopId = this.shopId
			this.params.retentionId = this.retentionId
			this.getShopArr()
			this.getPayArr()
		},
		methods:{
			getShopArr(){
				let arr = []
				this.get_shopAllArr.forEach((i)=>{
					let lis ={
						id:i.shopId,
						name:i.shopName
					}
					arr.push(lis)
					if(this.shopId === i.shopId){
						this.nowShopName = i.shopName
					}
				})
				this.pickerShopArr = arr
			},
			// 获取门店ID
			getShopId(e){
				this.parmas.shopId = e.id
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
				this.params.payType = this.pickerPayArr[0].id
				this.params.payTypeName = this.pickerPayArr[0].name
			},
			// 支付方式返回
			getPayId(e){
				this.params.payType = e.id
				this.params.payTypeName = e.name
			},	
			// 记录类型返回
			getTypeId(e){
				this.params.type = e.id
			},
			// 充值
			addRecord(){
				addRetentionRecord(this.params).then(res=>{
					if(res.data.code === 200){
						let pages = getCurrentPages();
						let prvePage = pages[pages.length - 2]; //前一页
						prvePage.setData({
							isChange: true
						})
						$Message({
							content: this.text + '成功',
							type: 'success'
						});
						setTimeout(()=>{
							uni.navigateBack({
								delta:1,
							})
						},1000)
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/pages/index/cashier/orderCashier/collection/components/updataPriceStyle.scss';
</style>
