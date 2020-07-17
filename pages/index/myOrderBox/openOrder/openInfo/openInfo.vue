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
					shopId:null,
					orderShopId:null,
					groupCategoryId:null
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
