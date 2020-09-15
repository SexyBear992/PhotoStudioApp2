<template>
	<view class="bigBox">
		<!-- 收款门店 -->
		<shopPicker :nowShop="params.receiptShopId" :getId.sync="params.receiptShopId"></shopPicker>
		<!-- 收款人 -->
		<view class="listBox">
			<view class="title">收款人</view>
			<view class="text">{{get_userInfo.anotherName}}</view>
		</view>
		<!-- 消费订单 -->
		<itemPicker :itemList="itemList" :getId.sync="params.itemId" :getNo.sync="params.markNo"></itemPicker>
		<!-- 消费类别 -->
		<consumePicker :getId.sync="params.saleCategoryId" :getName.sync="params.saleName"></consumePicker>
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
		<payPicker :getId.sync="params.billEntryReceiptDtos[0].payCategoryId" :getName.sync="params.billEntryReceiptDtos[0].payName"></payPicker>
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
		
		<view class="button" @click="add">添加退款</view>
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
	import { mapGetters } from 'vuex'
	import uniCalendar from '@/components/uni/uni-calendar/uni-calendar.vue'
	import shopPicker from '@/pagesCashier/components/shopPicker.vue'
	import itemPicker from '@/pagesCashier/components/itemPicker.vue'
	import consumePicker from '@/pagesCashier/components/consumePicker.vue'
	import payPicker from '@/pagesCashier/components/payPicker.vue'
	import list from '@/components/detailWorkMain/personList.vue'
	import { addLateReceipt, getItemNo } from '@/util/api/shop.js'
	export default{
		props:['recordId','oId','enAddressInfo'],
		components:{
			uniCalendar,
			shopPicker,
			consumePicker,
			itemPicker,
			payPicker,
			list
		},
		computed:{
			...mapGetters('app',[
				'shopId',
				'get_userInfo'
			]),
			...mapGetters('shopArr',[
				// 门店
				'get_shopAllArr',
			]),
		},
		data(){
			return{
				shopIdMap:new Map(),
				showText:false,
				// 子订单数据
				itemList:null,
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
			this.params.receiptShopId = this.shopId
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
				})
			},
			// 接单人
			goAddress(){
				uni.navigateTo({
					url:'/pages/address/address?type=RECEPTION' + '&show=' + this.reception + '&num=1'
				})
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