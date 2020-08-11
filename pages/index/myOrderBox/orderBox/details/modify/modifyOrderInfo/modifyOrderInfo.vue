/***************************************** 开单信息修改 ************************************************/

<template>
	<view>
		<view class="bigBox">
			<!-- 订单编号 -->
			<view class="listBox">
				<view class="title">订单编号</view>
				<view class="text">{{openInfo.orderNo}}</view>
			</view>

			<!-- 订单门店 -->
			<view class="listBox">
				<view class="title">订单门店</view>
				<view class="text">{{shopIdMap.get(openInfo.orderShopId)}}</view>
			</view>

			<!-- 订单时间 -->
			<view class="listBox">
				<view class="title">订单时间</view>
				<view class="textBox" @click="openCalendar">
					<view class="text">{{openInfo.orderTime | time}}</view>
					<image src="https://7068-photostudioapp-1302515241.tcb.qcloud.la/newIcon/down.png" mode=""></image>
				</view>
			</view>

			<!-- 订单分类 -->
			<view class="listBox">
				<view class="title">订单分类</view>
				<pickerModule my-img="imgMargin" :arrInfo="pickerCategory" :nowName="nowCategoryName" @getId="getCategoryId"></pickerModule>
			</view>

			<!-- 订单分组 -->
			<view class="listBox">
				<view class="title">订单分组</view>
				<pickerModule my-img="imgMargin" :arrInfo="pickerGroup" :nowName="nowGroupName" @getId="getGroupId"></pickerModule>
			</view>

			<!-- 喜爱风格 -->
			<view class="listBox">
				<view class="title">喜爱风格</view>
				<view class="textBox" @click="openModal">
					<view class="text">{{likeStyleText | like}}</view>
					<image src="https://7068-photostudioapp-1302515241.tcb.qcloud.la/newIcon/down.png" mode=""></image>
				</view>
			</view>

			<!-- 订单类型时间 -->
			<view class="listBox" v-if="typeTimeTitle">
				<lunar class="lunar" :title="typeTimeTitle" :typeLunar="openInfo.typeLunar" :typeStr="openInfo.typeStr" :typeTime="openInfo.typeTime"
				 :calendarData="calendarData" @openCal="openCal" ref="lunar"></lunar>
			</view>

			<!-- 备注 -->
			<view class="textareaBox">
				<view class="title">订单备注</view>
				<textarea class="textarea" v-model="openInfo.remark" placeholder="请填写" />
				</view>
			
			<view @click="save" class="save">保存</view>
			
			<!-- 喜爱风格 -->
			<styleModal v-if="visibleStyle" @cancel="cancelStyle" @ok="enSureStyle" :faCurrent="faCurrent"></styleModal>
			
			<!-- 日历 -->
			<uni-calendar 
				:insert="false"
				:lunar="true" 
				:clearDate='true'
				@confirm="enSure"
				ref="calendar"
			/>
			
			<!-- 类型日历 -->
			<uni-calendar 
				:insert="false"
				:lunar="true" 
				:clearDate='true'
				@confirm="enSure2"
				ref="calendar2"
			/>
		</view>
		<i-message id="message" />
	</view>
</template>

<script>
	import lunar from '../components/lunar.vue'
	import styleModal from '../../../../openOrder/openInfo/components/styleModal.vue'
	import pickerModule from '@/components/pickerModule.vue'
	import { mapGetters } from 'vuex'
	import { getOrderDetails, updataOrderInfo } from '@/util/api/shop.js'
	import uniCalendar from '@/components/uni/uni-calendar/uni-calendar.vue'
	export default {
		computed:{
			...mapGetters('shopArr',[
				// 门店
				'get_shopAllArr',
				// 类别
				'get_orderTypeArr',
				// 分组
				'get_orderGroup',
			])
		},
		components:{
			uniCalendar,
			styleModal,
			pickerModule,
			lunar
		},
		filters:{
			like(data){
				if(data){
					return data
				}else{
					return '请选择'
				}
			}
		},
		data() {
			return {
				
				// 订单类型
				orderType:null,
				
				// 过滤门店
				shopIdMap: new Map(),  
				// 过滤类别
				typeIdMap: new Map(),  
				// 过滤分组
				groupIdMap: new Map(),  
				
				// 分类picker
				pickerCategory:[],
				nowCategoryName:null,
				
				// 分组picker
				pickerGroup:[],
				nowGroupName:null,
				
				// 喜爱风格模态框开关
				visibleStyle:false,
				// 已选择喜爱风格模板
				faCurrent:null,
				// 前端显示喜爱风格
				likeStyleText:null,
				
				// 类别时间
				typeTimeTitle:null,
				// 类别日历选择值
				calendarData:null,
				
				
				// 数据
				openInfo:{}
			};
		},
		onLoad(option){
			getOrderDetails({orderId:Number(option.id)}).then(res=>{
				let data = res.data.data
				this.orderType = data.type
				let info = {
					// 订单号
					orderNo: data.orderNo,
					// 订单门店
					orderShopId: data.orderShopId,
					// 订单时间
					orderTime: data.orderTime,
					// 订单ID
					orderId: data.orderId,
					// 订单分类
					orderCategoryId:data.orderCategoryId,
					// 订单分组
					groupCategoryId:data.groupCategoryId,
					// 喜爱风格
					likeStyle:data.likeStyle,
					// 是否农历
					typeLunar:data.typeLunar,
					// 农历时间
					typeStr:data.typeStr,
					// 新历时间
					typeTime:data.typeTime,
					// 订单备注
					remark:data.remark
				}
				this.faCurrent = JSON.parse(data.likeStyle)
				if(this.faCurrent){
					this.likeStyleText = JSON.parse(data.likeStyle).join('/')
				}else{
				}
				this.openInfo = info
				this.newchangTypeCategoryId()
				this.newchangeGroupId()
			})
		},
		mounted(){
			this.shopIdMap = new Map(this.get_shopAllArr.map(item => [item.shopId, item.shopName]))
			this.typeIdMap = new Map(this.get_orderTypeArr.map(item => [item.id, item.name]))
			this.groupIdMap = new Map(this.get_orderGroup.map(item => [item.id, item.name]))
		},
		methods:{
			// 创建分类数组
			newchangTypeCategoryId(){
				let arr = []
				this.get_orderTypeArr.forEach((i)=>{
					let lis ={
						id:i.id,
						name:i.name
					}
					arr.push(lis)
				})
				arr[0].name = '请选择'
				arr[0].id = null
				this.pickerCategory = arr
				this.nowCategoryName = this.typeIdMap.get(this.openInfo.orderCategoryId)
			},
			// 分类返回
			getCategoryId(e){
				this.openInfo.orderCategoryId = e.id
			},
			
			// 创建分组数组
			newchangeGroupId(){
				let arr = []
				this.get_orderGroup.forEach((i)=>{
					let lis ={
						id:i.id,
						name:i.name
					}
					arr.push(lis)
				})
				arr[0].name = '请选择'
				arr[0].id = null
				this.pickerGroup = arr
				this.nowGroupName = this.groupIdMap.get(this.openInfo.groupCategoryId)
			},
			
			// 分组返回
			getGroupId(e){
				this.openInfo.groupCategoryId = e.id
			},
		
			// 打开日历
			openCalendar(){
				this.$refs.calendar.open()
			},
		
			// 打开类型日历
			openCal(){
				this.$refs.calendar2.open()
			},
		
			// 日历选中确定返回值
			enSure(e){
				this.openInfo.orderTime = Date.parse(new Date(e.fulldate))
			},
		
			// 类型日历确定返回值
			enSure2(e){
				this.calendarData = e
			},
		
			// 打开喜爱风格模态框
			openModal(){
				this.visibleStyle = true
			},
			
			// 确定风格
			enSureStyle(e){
				this.faCurrent = e
				this.openInfo.likeStyle = JSON.stringify(e)
				this.likeStyleText = e.join('/')
				this.visibleStyle = false
			},
			
			// 取消风格
			cancelStyle(){
				this.visibleStyle = false
			},
			
			// 提交
			save(){
				if(this.typeTimeTitle){
					let lunar =this.$refs.lunar.save()
					this.openInfo.typeLunar = lunar.typeLunar
					this.openInfo.typeStr = lunar.typeStr
					this.openInfo.typeTime = lunar.typeTime
				}
			 updataOrderInfo(this.openInfo).then(res=>{
				 if(res.data.code === 200){
					 uni.navigateBack({
						 delta: 1
					 })
				 }
			 })
			},
		},
		watch:{
			orderType(){
				switch(this.orderType){
					case 'WEDDING_DRESS':
						this.typeTimeTitle = '结婚日期'
						break;
					case 'PREGNANT':
						this.typeTimeTitle = '预产日期'
						break;
					case 'SERVICE':
						this.typeTimeTitle = '服务日期'
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.bigBox{
		.listBox{
			display: flex;
			font-size: 28rpx;
			padding: 0 20rpx;
			margin: 30rpx;
			height: 80rpx;
			line-height: 80rpx;
			border-bottom: 1rpx solid #DDDDDD;
			.title{
				width: 270rpx;
			}
			.textBox{
				display: flex;   
				.text{
					max-width: 360rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				image{
					width: 15rpx;
					height: 15rpx;
					margin: 40rpx 0 0 5rpx;
				}
			}
			.lunar{
				width:100%
			}
		}
		.textareaBox{
			margin: 30rpx;
			font-size: 28rpx;
			.title{
				padding: 0 20rpx;
			}
			.textarea{
				padding:20rpx;
				width: 650rpx;
				border-bottom: 1rpx solid #DDDDDD
			}
		}
		.save{
			width:650rpx;
			height:80rpx;
			line-height:80rpx;
			color:#FFFFFF;
			background-color: #61A3FF;
			text-align: center;
			margin: 10rpx auto;
			border-radius: 40rpx;
		}
	}
	/deep/.imgMargin{
		margin: 40rpx 0 0 5rpx !important;
	}
</style>
