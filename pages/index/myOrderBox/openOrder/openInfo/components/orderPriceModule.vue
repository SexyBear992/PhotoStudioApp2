/*****************  订单套系内容模块  *****************/
<template>
	<view>
		<view class="box">
			<view class="title">订单套系内容</view>
			
			<cell :title="'服务等级'" :list="serviceCategoryList" @changeValue="changeServiceCategoryId"></cell>
			
			<cell :title="'老师等级'" :list="teacherCategoryList" @changeValue="changeTeacherCategoryId"></cell>
			
			<view class="piceBox">
				<view class="left">
					<view class="piceTitle">套系名字</view>
					<picker 
						@columnchange="changeList" 
						:value="index" 
						:range="array"
						mode = multiSelector
						@change="enSystem"
					>
						<view class="uni-input">{{systemName}}</view>
					</picker>
				</view>
				<image src="https://7068-photostudioapp-1302515241.tcb.qcloud.la/icon/icon_hr@2x.png"></image>
			</view>
			
			<systemInfo ref="systemInfo" v-if="systemName !== '请选择'" :piceId="orderPriceValue.assemblyId" :type="type"></systemInfo>
		</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	import { getSystemNameList, getSystemDetail } from '@/util/api/shop.js'
	import cell from '@/components/cell.vue'
	import systemInfo from './systemInfo.vue'
	export default{
		props:['type'],
		components:{
			cell,
			systemInfo
		},
		computed:{
			...mapGetters('shopArr',[
				'get_serviceCategory',
				'get_teacherCategory',
				'get_piceList'
			]),
			...mapGetters('app',[
				'shopId'
			]),
			dateRange() {
				const {
					get_teacherCategory,
					get_serviceCategory,
					get_piceList
				} = this 
				return {
					get_teacherCategory,
					get_serviceCategory,
					get_piceList
				}
			}
		},
		data(){
			return{
				array:[[],[]],

				// 多选选择
				piceType:null,
				// 套系类数组
				systemNameList:null,
				// 套系项数组
				systemNameItem:null,
				// 类型ID
				piceId:null,
				
				// 选择的套系名字
				systemName:'请选择',
				index:0,
				// 订单等级数组
				serviceCategoryList:[],
				// 老师级别数组
				teacherCategoryList:[],
				
				// 返回父组件内容
				orderPriceValue:{
					// 服务等级
					serviceCategoryId:null,
					// 老师等级
					teacherCategoryId:null,
					// 套系类别ID
					assemblyCategoryId:null,
					// 套系ID
					assemblyId:null,
					// 套系名称
					assemblyName:null,
					// 套系价格
					assemblyPrice:null
				}
			}
		},
		created(){
		},
		mounted(){
			this.newServiceCategoryList()
			this.newTeacherCategoryList()
			// this.get_piceList.filter((i)=>{
			// })
		},
		methods:{
			// 套系类改变
			changeList(e){
				// 当前选择类别名字
				let piceName = this.array[e.detail.column][e.detail.value]
				// 获得类别ID
				this.get_piceList.some((i)=>{
					if(i.name === piceName){
						this.piceId = i.id
					}
				})
				this.getSystemNameItem(piceName)
				// console.log('类别',this.get_piceList)
				// console.log('套系',this.systemNameList)
			},
			// 选择套系
			enSystem(e){
				// 获得类别下标
				let piceIndex = e.detail.value[0]
				// 获得套系下标
				let systemIndex = e.detail.value[1]
				// 获得类别名称
				let piceName = this.array[0][piceIndex]
				// 获得套系名称
				let systemName = this.array[1][systemIndex]
				// 赋值显示套系名称
				this.systemName = systemName
				// 获得类别ID 并赋值
				this.get_piceList.some((i)=>{
					if(i.name === piceName){
						this.orderPriceValue.assemblyCategoryId = i.id
					}
				})
				// 获得套系ID 并赋值
				this.systemNameList[this.orderPriceValue.assemblyCategoryId].some((i)=>{
					if(i.name === systemName){
						this.orderPriceValue.assemblyId = i.id
					}
				})
				// 获取套系详情
				getSystemDetail({id:this.orderPriceValue.assemblyId}).then(res=>{
					this.orderPriceValue.assemblyName = res.data.data.name
					this.orderPriceValue.assemblyPrice = res.data.data.price
				})
			},
			
			// 获得该开单对应套系类
			getSystemNameList(){
				getSystemNameList({shopId:this.shopId , type:this.type}).then(res=>{
					this.systemNameList = res.data.data
					// 套系类ID
					let needId = Object.keys(res.data.data).map(i => parseInt(i, 0))
					// 获取当前开单类型需要的 套系类
					let arr0 = this.get_piceList.filter((i)=>{
						return needId.includes(i.id)
					})
					this.array[0] = arr0.map((i)=>{
						return i.name
					})
					this.getSystemNameItem(this.array[0][0])
				})	
			},
			// 获得选择类别对应的套系
			getSystemNameItem(name){
				this.get_piceList.some((i)=>{
					if(i.name === name){
						this.piceId = i.id
					}
				})
				this.systemNameItem = this.systemNameList[this.piceId].map((i)=>{
					return i.name
				})
				this.array[1] = this.systemNameItem
			},
			
			/*********************************   组件选择返回值模块   *********************************/
			// 服务等级改变
			changeServiceCategoryId(e){
				this.get_serviceCategory.some((i)=>{
					if(e === '套系服务级别'){
						this.orderPriceValue.serviceCategoryId = null
					}else if(i.name === e){
						this.orderPriceValue.serviceCategoryId = i.id
					}
				})
			},
			// 老师等级改变
			changeTeacherCategoryId(e){
				this.get_teacherCategory.some((i)=>{
					if(i.name === '套系老师级别'){
						this.orderPriceValue.teacherCategoryId = null
					}else	if(e === i.name){
						this.orderPriceValue.teacherCategoryId = i.id
					}
				})
			},
			
			
			/*************   创建门店数组模块  picker只能传数组，需把接口返回的对象封装为数组 **********/
			// 创建服务等级数组
			newServiceCategoryList(){
				let arr = this.get_serviceCategory.map((i)=>{
					return i.name
				})
				this.serviceCategoryList = arr
			},
			// 创建教师等级数组
			newTeacherCategoryList(){
				let arr = this.get_teacherCategory.map((i)=>{
					return i.name
				})
				this.teacherCategoryList = arr
			},
			
			//保存订单
			 save(){
				 return this.orderPriceValue
			 },
			 saveOrderItem(){
				 return this.$refs.systemInfo.saveOrderItem()
			 },
			 saveAddGiftInfo(){
				 return this.$refs.systemInfo.saveAddGiftInfo()
			 }
		},
		watch:{
			dateRange(){
				this.newServiceCategoryList()
				this.newTeacherCategoryList() 
			},
			type(){
				this.getSystemNameList()
			},
		}
	}
</script>

<style lang="scss" scoped>
	.title{
		font-size: 38rpx;
		margin-left: 30rpx;
		margin-top: 30rpx;
		font-weight: bold;
	}
	.piceBox{
		font-size: 28rpx;
		margin: 0 30rpx;
		height: 80rpx;
		line-height: 80rpx;
		display: flex;
		justify-content: space-between;
		.left{
			display: flex;
			.piceTitle{
				margin-right: 30rpx;
			}
		}
		image{
			width: 12rpx;
			height: 18rpx;
			padding: 33rpx 0;
		}
	}
	.uni-input{
		color: #808080;
	}
</style>
