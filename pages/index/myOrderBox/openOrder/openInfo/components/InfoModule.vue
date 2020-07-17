/*******
	开单信息模块
*******/

<template>
	<view>
		<!-- <view @click="cl"> -->
		<cell :title="'门店'" :list="shopList" @changeValue="changShopId"></cell>
		
		<cell :title="'分组'" :list="groupCategoryId" @changeValue="changGroupCategoryId"></cell>
		<!-- </view> -->
		
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	import cell from '@/components/cell.vue'
	export default {	
		computed:{
			...mapGetters('shopArr',[
				'get_shopAllArr'
			])
		},
		components:{
			cell
		},
		
		data(){
			return{
				// 商店数组
				shopList:[],
				// 分组数组
				groupCategoryId:[],
				infoValue:{
					orderShopId:null,
					groupCategoryId:null
				}
			}
		},
		mounted(){
			this.newShopList()
		},
		methods:{
			// 门店选择改变
			changShopId(e){
				this.get_shopAllArr.some((i)=>{
					if(i.shopName === e){
						this.infoValue.orderShopId = i.shopId
					}
				})
			},
			// 分组选择改变
			changGroupCategoryId(e){
				this.get_shopAllArr.some((i)=>{
					if(i.shopName === e){
						this.infoValue.groupCategoryId = i.shopId
					}else if(e === '订单分组'){
						this.infoValue.groupCategoryId = null
					}
				})
			},
			// 创建门店数组
			newShopList(){
				// 获取所有门店 创建新的list赋值
				let arr = this.get_shopAllArr.map((i)=>{
					return i.shopName
				})
				this.shopList = arr
			},
			// 创建分组数组
			newChangGroupCategoryId(){
				let arr2 = this.get_shopAllArr.map((i)=>{
					return i.shopName
				})
				
				arr2.unshift('订单分组')
				this.groupCategoryId = arr2
			}
		},
		watch:{
			// 监听是否获取门店
			get_shopAllArr(){
				this.newShopList()
			},
			infoValue:{
				deep:true,
				handler(val){
					console.log('值改变',this.infoValue)
					this.$emit('InfoModuleValue',this.infoValue)
				}
			},
		}
	}
</script>

<style>
</style>
