/**************************** 预约门店 *****************************/
<template>
	<view>
		<view class="box">
			<view class="title" v-if="title">{{title}}</view>
			<view class="title" v-else>预约门店</view>
			<pickerModule my-img="imgMargin" :arrInfo="shopArr" :nowName="nowShopName" @getId="getShopId"></pickerModule>
		</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	import pickerModule from '@/components/pickerModule.vue'
	export default{
		props:['shopId','title'],
		components:{
			pickerModule,
		},
		computed:{
			...mapGetters('shopArr',[
				// 门店
				'get_shopAllArr',
			])
		},
		data(){
			return{
				shopIdMap:new Map(),
				
				// picker门店
				shopArr:[],
				nowShopName:null,
			}
		},
		mounted(){
			this.shopIdMap = new Map(this.get_shopAllArr.map(item => [item.shopId, item.shopName]))
			// 门店
			this.getPickerArr()
			this.getNowShop()
		},
		methods:{
			// 门店数组
			getPickerArr(){
				let arr = []
				this.get_shopAllArr.forEach((i)=>{
					let lis ={
						id:i.shopId,
						name:i.shopName
					}
					arr.push(lis)
				})
				this.shopArr = arr
			},
			// 获取当前门店
			getNowShop(){
				this.nowShopName = this.shopIdMap.get(this.shopId)
			},
			// 获取选择门店返回ID
			getShopId(e){
				this.$emit('getId',e.id)
			},
		},
	}
</script>

<style lang="scss" scoped>
	@import './component.scss';
</style>
