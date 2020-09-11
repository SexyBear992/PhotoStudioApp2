/********************** 保留金录入 *************************/
<template>
	<view>
		<view class="bigBox">
			<!-- 称呼 -->
			<view class="listBox">
				<view class="title">称呼</view>
				<pickerModule my-img="imgMargin" :arrInfo="pickerSexArr" @getId="getSexId"></pickerModule>
			</view>
			
			<!-- 客户名称 -->
			<view class="listBox">
				<view class="title">客户名称</view>
				<input type="text" v-model="params.customer.name" placeholder="请输入"/>
			</view>
			
			<!-- 客户电话 -->
			<view class="listBox">
				<view class="title">客户电话</view>
				<input type="text" v-model="params.customer.mobile" placeholder="请输入"/>
			</view>
			
			<!-- 客户微信 -->
			<view class="listBox">
				<view class="title">客户微信</view>
				<input type="text" v-model="params.customer.wechat" placeholder="请输入"/>
			</view>
			
			<!-- 客户备注 -->
			<view class="remarkBox">
				<textarea placeholder="客户备注:" v-model="params.customer.remark"/>
			</view>
						
			<!-- 录单人 -->
			<view class="listBox">
				<view class="title">录单人</view>
				<view>{{get_userInfo.anotherName}}</view>
			</view>
			
			<!-- 保留金额 -->
			<view class="listBox">
				<view class="title">保留金额</view>
				<input type="text" v-model="params.money" placeholder="请输入" />
			</view>
			
			<!-- 收款方式 -->
			<view class="listBox">
				<view class="title">收款方式</view>
				<pickerModule my-img="imgMargin" :arrInfo="pickerPayArr" @getId="getPayId"></pickerModule>
			</view>
			
			<!-- 收款备注 -->
			<view class="remarkBox">
				<textarea placeholder="收款备注:" v-model="params.remark"/>
			</view>
			
			<view class="button" @click="add">录入保留金</view>
			
		</view>
	</view>
</template>

<script>
	const { $Message } = require('@/wxcomponents/base/index');
	import pickerModule from '@/components/pickerModule.vue'
	import { mapGetters } from 'vuex'
	import { addRetention } from '@/util/api/shop.js'
	export default{
		components:{
			pickerModule
		},
		computed:{
			...mapGetters('app',[
				'shopId',
				'get_userInfo'
			]),
			...mapGetters('shopArr',[
				'get_pay'
			])
		},
		data(){
			return{
				pickerSexArr:[{name:'先生',id:true},{name:'女士',id:false}],
				// picker支付数组
				pickerPayArr:[],
				
				params:{
					createUser:null, //录入人id
					customer:{ //客户信息对象
						id:null, //id
						mobile:null, //手机号
						name:null, //姓名
						remark:null, //客户备注
						sex:true, //性别
						wechat:null, //微信号
					},
					money:null, //金额
					payType:null, //支付方式
					payTypeName:null, //支付方式名称
					remark:null, //收款备注
					shopId:null, //门店ID
				},
			}
		},
		mounted(){
			// 录单人
			this.params.createUser = this.get_userInfo.userId
			this.params.shopId = this.shopId
			this.getPayArr()
		},
		methods:{
			// 称呼返回
			getSexId(e){
				this.params.customerContactAddDto.sex = e.id
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
		
			// 录入保留金
			add(){
				addRetention(this.params).then(res=>{
					if(res.data.code === 200){
						let pages = getCurrentPages();
						let prvePage = pages[pages.length - 2]; //前一页
						prvePage.setData({
							isChange: true
						})
						$Message({
							content: '录入成功',
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
		},
	}
</script>

<style lang="scss" scoped>
	@import '@/pagesCashier/orderCashier/collection/components/updataPriceStyle.scss';
</style>
