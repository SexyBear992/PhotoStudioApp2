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
				<input type="text" v-model="params.customerContactAddDto.name" placeholder="请输入"/>
			</view>
			
			<!-- 客户电话 -->
			<view class="listBox">
				<view class="title">客户电话</view>
				<input type="text" v-model="params.customerContactAddDto.mobile" placeholder="请输入"/>
			</view>
			
			<!-- 客户微信 -->
			<view class="listBox">
				<view class="title">客户微信</view>
				<input type="text" v-model="params.customerContactAddDto.wechat" placeholder="请输入"/>
			</view>
			
			<!-- 项目名字 -->
			<view class="listBox">
				<view class="title">项目名字</view>
				<input type="text" v-model="params.name" placeholder="请输入"/>
			</view>
			
			<!-- 项目类别 -->
			<view class="listBox">
				<view class="title">项目类别</view>
				<pickerModule my-img="imgMargin" :arrInfo="pickerConsumeArr" @getId="getConsumeId"></pickerModule>
			</view>
			
			<!-- 订单金额 -->
			<view class="listBox">
				<view class="title">订单金额</view>
				<input type="number" v-model="params.sumPrice" placeholder="请输入"/>
			</view>
			
			<!-- 订单日期 -->
			<view class="listBox">
				<view class="title">订单日期</view>
				<view class="text" @click="openCalendar">
					<view>{{params.orderTime | time}}</view>
					<image class="my-img" src="https://7068-photostudioapp-1302515241.tcb.qcloud.la/newIcon/down.png" mode=""></image>
				</view>
			</view>
			
			<!-- 接单人 -->
			<view class="listBox">
				<list :title="'接单人'" :show="reception" :type="'RECEPTION'" @goAddress="goAddress"></list>
			</view>
			
			<!-- 录单人 -->
			<view class="listBox">
				<view class="title">录单人</view>
				<view>{{get_userInfo.anotherName}}</view>
			</view>
			
			<!-- 订单备注 -->
			<view class="remarkBox">
				<textarea placeholder="订单备注:" v-model="params.remark"/>
			</view>
		
			<goodsBox :info="params.orderGoodsItemDtos" @del="delGoods"></goodsBox>
			
			<view class="button" @click="addOrder">新增订单</view>
			
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
	import { mapGetters } from 'vuex'
	import { addOrderIndividual } from '@/util/api/shop.js'
	import goodsBox from './components/goodsBox.vue'
	import pickerModule from '@/components/pickerModule.vue'
	import uniCalendar from '@/components/uni/uni-calendar/uni-calendar.vue'
	import list from '@/pages/index/arrange/components/personList.vue'
	export default {
		components:{
			pickerModule,
			list,
			uniCalendar,
			goodsBox
		},
		computed:{
			...mapGetters('app',[
				'shopId',
				'get_userInfo'
			]),
			...mapGetters('shopArr',[
				// 消费类别
				'get_consumeType',
			]),
		},
		data() {
			return {
				reception:'请选择',
				pickerConsumeArr:[],
				pickerSexArr:[{name:'先生',id:true},{name:'女士',id:false}],
				
				params:{
					customerContactAddDto:{ //	客户资料
						id:null, //联系人ID
						mobile:null, //客户手机号码
						name:null, //客户姓名
						sex:true, //客户性别
						wechat:null, //客户微信
					},
					name:null, //项目名称
					orderGoodsItemDtos:null	,//商品数组
					orderTime:null, //订单时间
					receptions:null, //接单人ID
					remark:null, //备注
					saleCategoryId:null, //消费类别
					shopId:null, //门店ID
					sumPrice:null, //总价格
				}
			};
		},
		onShow(){
			let pages = getCurrentPages()
			let currPages = pages[pages.length - 1]
			let tool = currPages.data.tool
			let address = currPages.data.address
			if(address){
				this.reception = address.show
				let ids = []
				address.enArr.forEach((i)=>{
					ids.push(i.id)
				})
				this.params.receptions = ids
			}
			if(tool){
				tool.toolArr.forEach((i)=>{
					let lis ={
						countNum:1,
						defaultP:i.defaultP,
						goodsId:i.id,
						name:i.name,
						pSalePrice:i.pSalePrice,
						remark:null,
						salePrice:i.salePrice,
					}
					this.params.orderGoodsItemDtos.push(lis)
				})
			}
			// 清空
			currPages.setData({
				tool:null,
				address:null,
			})
		},
		mounted(){
			this.getConsumeArr()
			// 赋值当前时间
			this.params.orderTime = Date.parse(new Date())
			// 赋值当前门店
			this.params.shopId = this.shopId
		},
		methods:{
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
			// 消费类型返回
			getConsumeId(e){
				this.params.saleCategoryId = e.id
			},
			// 称呼返回
			getSexId(e){
				this.params.customerContactAddDto.sex = e.id
			},
			
			// 打开日历
			openCalendar(){
				this.$refs.calendar.open()
			},
			// 日历返回
			enSure(e){	
				this.params.orderTime = Date.parse(new Date(e.fulldate))
			},
			// 接单人
			goAddress(){
				uni.navigateTo({
					url:'../../../../address/address?type=RECEPTION' + '&show=' + this.reception
				})
			},
		
			// 删除商品
			delGoods(e){
				this.params.orderGoodsItemDtos.splice(e,1)
			},
			// 新增订单
			addOrder(){
				let pages = getCurrentPages();
				let prvePage = pages[pages.length - 2]; //前一页	
				addOrderIndividual(this.params).then(res=>{
					if(res.data.code === 200){
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
			},
		},
	}
</script>

<style lang="scss" scoped>
	@import '@/pages/index/cashier/orderCashier/collection/components/updataPriceStyle.scss';
</style>
