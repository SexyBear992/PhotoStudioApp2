<template>
	<view>
		<!-- 开单信息模块 -->
		<InfoModule @InfoModuleValue="InfoModuleValue"></InfoModule>
		<button type="default" @click="save"> 提交</button>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	import InfoModule from './components/InfoModule.vue'
	export default {	
		components:{
			InfoModule
		},
		computed:{
			...mapGetters('app',[
				'shopId'
			]),
		},
		data() {
			return {
				openOrderData:{
					// 当前商店ID
					shopId:null,
					// 选择商店ID
					orderShopId:null,
					// 订单分组ID
					groupCategoryId:null,
					// 订单分类ID
					orderCategoryId:null,
					// 下单时间
					orderTime:null,
					// 风格
					likeStyle:null,
				}
			};
		},
		onLoad(option){
			// 赋值小程序标题
			uni.setNavigationBarTitle({
				title: option.typeName
			});
		},
		mounted(){
			// 赋值当前门店ID
			this.openOrderData.shopId = this.shopId
		},
		methods:{
			// 提交
			save(){
				console.log(this.openOrderData)
			},
			// 组件传值 选择结果
			InfoModuleValue(e){
				// 选择门店ID
				this.openOrderData.orderShopId = e.orderShopId
				this.openOrderData.groupCategoryId = e.groupCategoryId
				this.openOrderData.orderCategoryId = e.orderCategoryId
				this.openOrderData.orderTime = e.orderTime
				this.openOrderData.likeStyle = e.likeStyle
			}
		},
		watch:{
			shopId(){
				// 赋值当前门店ID
				this.openOrderData.shopId = this.shopId
			}
		}
	}
</script>

<style lang="scss">

</style>
