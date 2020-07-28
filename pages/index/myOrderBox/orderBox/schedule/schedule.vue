<template>
	<view>
		
		<view></view>
		<!-- <steps :title=""></steps> -->
		
	</view>
</template>

<script>
	import steps from './components/steps.vue'
	import { getAllOrder } from '@/util/api/shop.js'
	export default {
		components:{
			steps
		},
		data() {
			return {
				// 订单信息
				orderInfo:null,
				// 进度信息
				stepsArr:[],
				
				parmas:{
					isSearchCount:true,
					limit:10,
					page:1,
					orderNo:null
				}
			};
		},
		onLoad(option){
			this.parmas.orderNo = option.orderNo
		},
		mounted(){
			// 获取订单信息
			this.getOrder()
		},
		methods:{
			getOrder(){
				getAllOrder(this.parmas).then(res=>{
					this.orderInfo = res.data.data.records
					let datas = res.data.data.records[0] 
					this.stepsArr = [
						{
							title:'拍照',
							photoStatus: datas.photoStatus,
							photoUpdateTime: datas.photoUpdateTime
						},
						{
							title:'修片',
							repairStatus: datas.repairStatus,
							repairUpdateTime: datas.repairUpdateTime
						},
						{
							title:'选片',
							chooseStatus: datas.chooseStatus,
							chooseUpdateTime: datas.chooseUpdateTime
						},
						{
							title:'精修',
							refineStatus: datas.refineStatus,
							refineUpdateTime: datas.refineUpdateTime
						},
						{
							title:'看版',
							watchStatus: datas.watchStatus,
							watchUpdateTime: datas.watchUpdateTime
						},
						{
							title:'设计',
							designStatus: datas.designStatus,
							designUpdateTime: datas.designUpdateTime
						},
						{
							title:'发件',
							senderStatus: datas.senderStatus,
							senderUpdateTime: datas.senderUpdateTime
						},
						{
							title:'回件',
							returnStatus: datas.returnStatus,
							returnUpdateTime: datas.returnUpdateTime
						},
						{
							title:'取件',
							pickupStatus: datas.pickupStatus,
							pickupUpdateTime: datas.pickupUpdateTime
						},
					]
					console.log(this.stepsArr)
				})
			}
		},

	}
</script>

<style lang="scss">

</style>
