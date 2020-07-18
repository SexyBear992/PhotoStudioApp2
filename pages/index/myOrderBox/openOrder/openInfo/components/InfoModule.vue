/*****************  开单信息模块  *****************/

<template>
	<view>
		<view class="title">开单信息</view>
	
		<cell :title="'门店'" :list="shopList" @changeValue="changShopId"></cell>
		
		<view @click="openCalendar">
			<cell :title="'时间'" :time="infoValue.orderTime"></cell>
		</view>
		
		<view @click="gotEnterpriseAll('RECEPTION')">
			<cell :title="'接单'" :text="'接单人员'"></cell>
		</view>
		
		<view @click="gotEnterpriseAll('SERVICE')">
			<cell :title="'客服'" :text="'客服人员'"></cell>
		</view>
		
		<view @click="gotEnterpriseAll('NETWORK_SALES')">
			<cell :title="'网销'" :text="'网销人员'"></cell>
		</view>
		
		<cell :title="'分类'" :list="orderCategoryIdList" @changeValue="changTypeCategoryId"></cell>
		
		<cell :title="'分组'" :list="groupCategoryIdList" @changeValue="changGroupCategoryId"></cell>

		<view @click="openModal">
			<cell :title="'风格'" :text="likeStyleText"></cell>
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
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	import styleModal from './styleModal.vue'
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
			styleModal
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
				
				// 开单信息模块数据
				infoValue:{
					orderShopId:null,
					groupCategoryId:null,
					orderTime:null,
					orderCategoryId:null,
					likeStyle:null,
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
			
			/*********************************   工作人员处理模块   **********************************/
			// 跳转到通讯录
			gotEnterpriseAll(type){
				uni.navigateTo({
					url:'../../../../EnterpriseAll/EnterpriseAll?type=' + type
				})
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
		
		},
		watch:{
			dateRange(){
				this.newShopList()
				this.newchangTypeCategoryId()
				this.newGroupCategoryId()
			},
			/*******************************   深度监听开单信息模块值   *******************************/ 
			infoValue:{
				deep:true,
				handler(newVal,oldVal){
					console.log('深度监听模块信息',this.infoValue)
					this.$emit('InfoModuleValue',this.infoValue)
				}
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
</style>
