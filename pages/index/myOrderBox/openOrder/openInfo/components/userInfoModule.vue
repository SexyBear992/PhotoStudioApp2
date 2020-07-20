/*****************  客户信息模块  *****************/
<template>
	<view>
		<view class="title">客户信息</view>
		
		<cell :title="'客户区域'" :list="categoryList" @changeValue="categoryId"></cell>
		
		<!-- 通过订单类型判断是否显示 -->
		<Lunar v-if="timeTitle" :timeTitle="timeTitle" @typeTimeValue="typeTimeValue"></Lunar>
		

	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	import cell from '@/components/cell.vue'
	import Lunar from '@/components/Lunar.vue'
	export default{
		props:['type'],
		components:{
			cell,
			Lunar,
		},
		computed:{
			...mapGetters('shopArr',[
				'get_category'
			])
		},
		data(){
			return{
				// 区域数组
				categoryList:[],
				
				// 时间标题
				timeTitle:null,
				
				// 客户信息模板信息
				userInfoValue:{
					// 区域ID
					categoryId:null,
					// 订单类型时间
					typeTime:null,
					// 	订单类型时间是否农历
					typeLunar:false,
					// 时间为农历传
					typeStr:null,
				}
			}
		},
		mounted(){
			this.newCategoryList()
			switch(this.type){
				case 'hs':
					this.timeTitle = '结婚日期'
					break;
				case 'ym':
					this.timeTitle = '预产日期'
					break;
				case 'fw':
					this.timeTitle = '服务日期'
			}
		},
		methods:{
			/*********************************   组件选择返回值模块   *********************************/
			categoryId(e){
				// console.log(e)
				this.get_category.some((i)=>{
					if(i.name === '客户区域'){
						this.userInfoValue.categoryId = null
					}else if(i.name === e){
						this.userInfoValue.categoryId = i.id
					}
				})
			},
			// 时间返回值
			typeTimeValue(e){
				this.userInfoValue.typeTime = e.typeTime
				this.userInfoValue.typeLunar = e.typeLunar
				this.userInfoValue.typeStr = e.typeStr
			},
			
			/*************   创建门店数组模块  picker只能传数组，需把接口返回的对象封装为数组 **********/
			// 创建来源数组
			newCategoryList(){
				// 获取所有门店 创建新的list赋值
				let arr = this.get_category.map((i)=>{
					return i.name
				})
				this.categoryList = arr
			},
					
		},
		watch:{
			get_category(){
				this.newCategoryList()
			},
			userInfoValue:{
				deep:true,
				handler(newVal,oldVal){
					this.$emit('userInfoValue',this.userInfoValue)
				}
			}
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
</style>
