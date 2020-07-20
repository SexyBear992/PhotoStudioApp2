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
			
		</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	import { getSystemNameList } from '@/util/api/shop.js'
	import cell from '@/components/cell.vue'
	export default{
		props:['type'],
		components:{
			cell
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
				array:[[],['1','2']],

				// 多选选择
				piceType:null,
				// 套系类型
				AssemblyName:null,
				// 套系类数组
				systemNameList:null,
				// 套系项数组
				systemNameItem:null,
				
				// 选择的套系名字
				systemName:'请选择',
				index:0,
				// 订单等级数组
				serviceCategoryList:[],
				// 老师级别数组
				teacherCategoryList:[],
				
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
			this.AssemblyName = this.getAssemblyName(this.type)
			// })
		},
		methods:{
			// 套系类改变
			changeList(e){
				// this.array[1]
				console.log(e)
				// 套系类别ID 赋值
				// this.orderPriceValue.assemblyCategoryId 
				
				// let ind = e.detail.value[1]
				// this.piceType = this.array[1][ind]
				// console.log(this.piceType)
			},
			// 选择套系
			enSystem(e){
				console.log('类',this.array[0][e.detail.value[0]])
				console.log(this.get_piceList)
				console.log('项',this.array[1][e.detail.value[1]])
				console.log(this.systemNameItem)
			},
			
			// 获取套系类型名字
			getAssemblyName(type){
				switch(type){
					case 'hs':
						return 'WEDDING_DRESS';
						break;
					case 'et':
						return 'BABY';
						break;
					case 'ym':
						return 'PREGNANT';
						break;
					case 'xz':
						return 'PORTRAY';
						break;
					case 'fw':
						return 'SERVICE';
						break;
					case 'hq':
						return 'WEDDING';
						break;
				}
			},
			
			// 获得该开单对应套系类
			getSystemNameList(){
				getSystemNameList({shopId:this.shopId , type:this.AssemblyName}).then(res=>{
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
			// 获得选择类对应的套系项
			getSystemNameItem(name){
				this.get_piceList.some((i)=>{
					if(i.name === name){
						this.orderPriceValue.assemblyCategoryId = i.id
					}
				})
				this.systemNameItem = this.systemNameList[this.orderPriceValue.assemblyCategoryId].map((i)=>{
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
			
		},
		watch:{
			dateRange(){
				this.newServiceCategoryList()
				this.newTeacherCategoryList() 
			},
			AssemblyName(){
				this.getSystemNameList()
			},
			array:{
				deep:true,
				handler(){
				}
			},
			orderPriceValue:{
				deep:true,
				handler(newVal,oldVal){
					console.log('监听',this.orderPriceValue)
					this.$emit('orderPriceValue',this.orderPriceValue)
				}
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
</style>
