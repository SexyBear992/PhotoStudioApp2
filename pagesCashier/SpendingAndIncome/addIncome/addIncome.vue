<template>
	<view>
		<view class="bigBox">
			<!-- 收入项目 -->
			<view class="listBox">
				<view class="title">收入项目</view>
				<input type="text" v-model="params.name" placeholder="请输入" />
			</view>
			<!-- 付款人 -->
			<view class="listBox">
				<view class="title">付款人</view>
				<input type="text" v-model="params.payer" placeholder="请输入" />
			</view>
			<!-- 录单人 -->
			<view class="listBox">
				<view class="title">录单人</view>
				<view>{{get_userInfo.anotherName}}</view>
			</view>
			<!-- 收入金额 -->
			<view class="listBox">
				<view class="title">收入金额</view>
				<input type="number" v-model="params.money" placeholder="请输入"/>
			</view>
			<!-- 收入方式 -->
			<payPicker :title="'收入方式'" :getId.sync="params.payType" :getName.sync="params.typeName"></payPicker>
			<!-- 收入时间 -->
			<view class="listBox">
				<view class="title">收入时间</view>
				<view class="text" @click="openCalendar">
					<view>{{params.receiptTime | time}}</view>
					<image class="my-img" src="https://lyfz-saas-erp-system.oss-cn-hangzhou.aliyuncs.com/AppletsFile/down.png" mode=""></image>
				</view>
			</view>
			<!-- 订单备注 -->
			<view class="remarkBox">
				<textarea placeholder="订单备注:" v-model="params.remark"/>
			</view>
			
			<view class="button" @click="add">录入其他收入</view>
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
	import { addOtherReceiptList } from '@/util/api/shop.js'
	import { mapGetters } from 'vuex'
	import payPicker from '@/pagesCashier/components/payPicker.vue'
	import uniCalendar from '@/components/uni/uni-calendar/uni-calendar.vue'
	export default {
		components:{
			uniCalendar,
			payPicker,
		},
		computed:{
			...mapGetters('app',[
				'shopId',
				'get_userInfo'
			]),
		},
		data() {
			return {
				reception:'请选择',
				
				params:{
					money:null, //金额
					name:null, //项目名称	
					payType:null, //进账方式		
					payer:null, //付款人	
					receiptTime:null, //收入时间
					remark:null, //项目备注	
					shopId:null, //门店ID
					typeName:null, //进账方式名称
				},
			};
		},
		mounted(){
			this.params.shopId = this.shopId
			this.params.receiptTime = Date.parse(new Date())
		},
		methods:{	
			// 打开日历
			openCalendar(){
				this.$refs.calendar.open()
			},
			// 日历返回
			enSure(e){	
				this.params.receiptTime = Date.parse(new Date(e.fulldate))
			},
			
			add(){
				addOtherReceiptList(this.params).then(res=>{
					if(res.data.code === 200){
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
					}
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	@import '@/pagesCashier/orderCashier/collection/components/updataPriceStyle.scss';
</style>
