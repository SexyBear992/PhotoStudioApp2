/*****************  开单信息模块  *****************/

<template>
	<view>
		<view class="title">开单信息</view>
	
		<view class="oIdBox">
			<view class="left">
				<view class="oIdtitle">订单号</view>
				<input type="text" v-model="infoValue.orderNo" :placeholder="!infoValue.autoOrderNo?'输入订单号':'生成订单号'" :disabled='infoValue.autoOrderNo'/>				
			</view>
			<switch @change="autoOrderNo" color="#61a3ff" class="switch" :checked='infoValue.autoOrderNo'/>
		</view>
	
		<cell :title="'门店'" :list="shopList" @changeValue="changShopId"></cell>
		
		<view @click="openCalendar">
			<cell :title="'时间'" :time="infoValue.orderTime"></cell>
		</view>
		
		<view @click="gotEnterpriseAll('RECEPTION')">
			<cell :title="'接单'" :text="peception"></cell>
		</view>
		
		<view @click="gotEnterpriseAll('SERVICE')">
			<cell :title="'客服'" :text="service"></cell>
		</view>
		
		<view @click="gotEnterpriseAll('NETWORK_SALES')">
			<cell :title="'网销'" :text="network"></cell>
		</view>
		
		<cell :title="'分类'" :list="orderCategoryIdList" @changeValue="changTypeCategoryId"></cell>
		
		<cell :title="'分组'" :list="groupCategoryIdList" @changeValue="changGroupCategoryId"></cell>

		<view @click="openModal">
			<cell :title="'风格'" :text="likeStyleText"></cell>
		</view>
		
		<!-- 备注 -->
		<view class="remark">
			<view class="title">备注</view>
			<textarea class="textartea" placeholder="订单备注" v-model="infoValue.remark"></textarea>
		</view>
		
		<!-- 日历 -->
		<uni-calendar 
			:insert="false"
			:lunar="true" 
			:clearDate='true'
			@confirm="enSure"
			ref="calendar"
		/>
		<!-- 喜爱风格 -->
		<styleModal v-if="visibleStyle" @cancel="cancelStyle" @ok="enSureStyle" :faCurrent="faCurrent"></styleModal>
		<!-- 联系人模态框 -->
		<addressModal v-if="addressShow" :show="showTextFa" :type="addressType" @close="closeAddress" @ok="addressInfo"></addressModal>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	import styleModal from './styleModal.vue'
	import addressModal from './addressModal.vue'
	import cell from '@/components/cell.vue'
	import uniCalendar from '@/components/uni/uni-calendar/uni-calendar.vue'
	export default {	
		computed:{
			...mapGetters('shopArr',[
				'get_shopAllArr',
				'get_orderTypeArr',
				'get_orderGroup'
			]),
			dateRange() {
				const {
					get_shopAllArr,
					get_orderTypeArr,
					get_orderGroup
				} = this
				return {
					get_shopAllArr,
					get_orderTypeArr,
					get_orderGroup
				}
			}
		},
		components:{
			cell,
			uniCalendar,
			styleModal,
			addressModal
		},
		data(){
			return{
				// 商店数组
				shopList:[],
				// 分类数组
				orderCategoryIdList:[],
				// 分组数组
				groupCategoryIdList:[],
				
			
				
				// 喜爱风格模态框开关
				visibleStyle:false,
				// 已选择喜爱风格模板
				faCurrent:null,
				// 前端显示喜爱风格
				likeStyleText:'喜爱风格',
				
				// 联系人类型
				addressType:null,
				// 联系人模块框
				addressShow:null,
				// 接单人员显示
				peception:'接单人员',
				// 客服人员显示
				service:'客服人员',
				// 网销人员显示
				network:'网销人员',
				// 传给子组件的已选人员
				showTextFa:null,

				// 开单信息模块数据
				infoValue:{
					// 自动生成时间
					autoOrderTime:false,
					// 订单号
					orderNo:null,
					// 是否自动获取订单
					autoOrderNo:true,
					// 门店ID
					orderShopId:null,
					// 订单分组ID
					groupCategoryId:null,
					// 订单时间
					orderTime:null,
					// 订单类别ID
					orderCategoryId:null,
					// 喜爱风格
					likeStyle:null,
					// 备注
					remark:null,
					// 接单人
					receptions:[],
					// 网销人员
					networkSales:[],
					// 专服人员
					services:[],
				}
			}
		},
		mounted(){
			this.newShopList()
			this.newchangTypeCategoryId()
			this.newGroupCategoryId()
			
			// 获取当前时间
			let timestamp = new Date().getTime()
			this.infoValue.orderTime = timestamp
		},
		methods:{
			// 是否自动生成订单号
			autoOrderNo(e){
				this.infoValue.autoOrderNo = e.detail.value
				if(e.detail.value){
					this.infoValue.orderNo = null
				}
			},
			
			/*********************************   组件选择返回值模块   *********************************/
			// 门店选择改变
			changShopId(e){
				this.get_shopAllArr.some((i)=>{
					if(i.shopName === e){
						this.infoValue.orderShopId = i.shopId
					}
				})
			},
			// 分类选择改变
			changTypeCategoryId(e){
				this.get_orderTypeArr.some((i)=>{
					if(i.name === e){
						this.infoValue.orderCategoryId = i.id
					}else{
						this.infoValue.orderCategoryId = null
					}
				})
			},
			// 分组选择改变
			changGroupCategoryId(e){	
				this.get_orderGroup.some((i)=>{
					if(i.name === e){
						this.infoValue.groupCategoryId = i.id
					}else{
						this.infoValue.groupCategoryId = null
					}
				})
			},
			
			
			
			/*************   创建门店数组模块  picker只能传数组，需把接口返回的对象封装为数组 **********/
			// 创建门店数组
			newShopList(){
				// 获取所有门店 创建新的list赋值
				let arr = this.get_shopAllArr.map((i)=>{
					return i.shopName
				})
				this.shopList = arr
			},
			// 创建分类数组
			newchangTypeCategoryId(){
				let arr = this.get_orderTypeArr.map((i)=>{
					return i.name
				})
				this.orderCategoryIdList = arr
			},
			// 创建分组数组
			newGroupCategoryId(){
				let arr = this.get_orderGroup.map((i)=>{
					return i.name
				})
				this.groupCategoryIdList = arr
			},
			
			
			/*********************************   下单时间处理模块   **********************************/
			// 打开日历
			openCalendar(){
				this.$refs.calendar.open()
			},
			// 日历选中确定返回值
			enSure(e){
				this.infoValue.orderTime = Date.parse(new Date(e.fulldate))
			},
			
		
			/*********************************   喜爱风格处理模块   **********************************/
			// 打开喜爱风格模态框
			openModal(){
				this.visibleStyle = true
			},
			// 确定风格
			enSureStyle(e){
				this.faCurrent = e
				this.infoValue.likeStyle= JSON.stringify(e)
				this.likeStyleText = e.join('/')
				this.visibleStyle = false
			},
			// 取消风格
			cancelStyle(){
				this.visibleStyle = false
			},
			
			/*********************************   联系人处理模块   **********************************/
			// 打开模态框
			gotEnterpriseAll(type){
				this.addressType = type
				this.addressShow = true
				if(type === 'RECEPTION'){
					this.showTextFa = this.peception
				}else if(type === 'SERVICE'){
					this.showTextFa = this.service
				}else if(type === 'NETWORK_SALES'){
					this.showTextFa = this.network
				}
				// uni.navigateTo({
				// 	url:'../../../../EnterpriseAll/EnterpriseAll?type=' + type
				// })
			},
			
			// 关闭模态框
			closeAddress(){
				this.addressShow = false
				this.showTextFa = null
			},
			// 模态框返回值
			addressInfo(e){
				let arr = []
				e.info.map((i)=>{
					let a = {
						actorId:i.id,
						main:i.main || false
					}
					arr.push(a)
				})
				if(this.addressType === 'RECEPTION'){
					this.peception = e.show
					this.infoValue.receptions = arr
				}else if(this.addressType === 'SERVICE'){
					this.service = e.show
					this.infoValue.services = arr
				}else if(this.addressType === 'NETWORK_SALES'){
					this.network = e.show
					this.infoValue.networkSales = arr
				}
				this.addressShow = false
				this.showTextFa = null
			},
			
			// 保存订单
			save(){
				return this.infoValue
			},
		},
		watch:{
			dateRange(){
				this.newShopList()
				this.newchangTypeCategoryId()
				this.newGroupCategoryId()
			},
		}
	}
</script>

<style lang="scss">
	.title{
		font-size: 38rpx;
		margin-left: 30rpx;
		margin-top: 30rpx;
		font-weight: bold;
	}
	.oIdBox{
		height: 80rpx;
		display: flex;
		margin: 0 30rpx;
		justify-content: space-between;
		border-bottom: 1rpx solid #f9f9f9;
		.left{
			width: 75%;
			font-size: 28rpx;
			display: flex;
			line-height: 80rpx;
			.oIdtitle{
				margin-right:30rpx
			}
			input{
				margin-top: 19rpx;
				color: #8d8d8d;
			}
		}
		.switch{
			margin-top: 0;
			margin-right: -20rpx;
			margin-top: 10rpx;
			transform:scale(0.5);
		}
	}
	.remark{
		border-bottom: 1rpx solid #f9f9f9;
		margin: 0 30rpx;
		.title{
			font-size: 28rpx;
			font-weight: normal;
			margin: 0;
			margin-right: 30rpx;
			margin-top: 20rpx;
		}
		.textartea {
			margin-top: 20rpx;
			background-color: #f9f9f9;
			max-width:650rpx;
			width:650rpx;
			height: 100rpx;
			padding: 20rpx;
			font-size: 24rpx;
		}
	}
</style>
