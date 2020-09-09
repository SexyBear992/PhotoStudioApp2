<template>
	<view>
		<view class="box">
			<view class="titleTop">订单套系内容</view>
			<!-- 服务等级 -->
			<openInfoPicker
				:changeId="params.serviceCategoryId" 
				:title="'服务等级'" 
				:categoryName="'get_serviceCategory'" 
				:getId.sync="params.serviceCategoryId"
			></openInfoPicker>
			<!-- 教师等级 -->
			<openInfoPicker 				
				:changeId="params.teacherCategoryId"  
				:title="'教师等级'" 
				:categoryName="'get_teacherCategory'" 
				:getId.sync="params.teacherCategoryId"
			></openInfoPicker>
			<!-- 选择套系 -->
			<choosePrice @getPrice="getPrice" :type="type"></choosePrice>
			<!-- 子订单内容 -->
			<priceItem 				
				v-if="params.assemblyId" 
				:piceId="params.assemblyId" 
				:type="type"
				:getOrderItem.sync="params.orderItem"
			></priceItem>
		</view>
	</view>
</template>

<script>
	import openInfoPicker from './components/openInfoPicker.vue'
	import choosePrice from './components/price/choosePrice.vue'
	import priceItem from './components/price/priceItem.vue'
	export default {
		props:['type','giftInfo'],
		components:{
			openInfoPicker,
			choosePrice,
			priceItem
		},
		data(){
			return{
				params:{
					serviceCategoryId:null, // 服务等级
					teacherCategoryId:null, // 老师等级
					assemblyCategoryId:null,  // 套系类别ID
					assemblyId:null,  // 套系ID
					assemblyName:null,  // 套系名称
					assemblyPrice:null,  // 套系价格
				}
			}
		},
		methods:{
			// 获取套系信息
			getPrice(e){
				this.params = e
			},
			// 保存订单
			save(){
				return this.params
			},
		},
		watch:{
			giftInfo:{
				deep:true,
				handler(){
					this.params.orderGiftDto = this.giftInfo.params
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './components/moduleStyle.scss';
</style>
