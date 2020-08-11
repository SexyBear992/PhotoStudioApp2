<template>
	<view>
		<detailMoudel v-if="detailInfo" :info="detailInfo"></detailMoudel>
		
		<!-- 拍摄详情操作 -->
		<view class="arrangeInfo" v-for="(item,index) in listInfo" :key="item.id">
			<!-- 标题 -->
			<view class="titleBox">
				<view class="title">第{{index+1}}次拍摄</view>
			</view>
			
			
		</view>
		
		<i-message id="message" />
	</view>
</template>

<script>
	import detailMoudel from '@/components/detailMoudel.vue'
	import { mapGetters, mapActions } from 'vuex'
	import { getAllOrderItem, getOrdetItemList, deletPhotoInfo } from '@/util/api/shop.js'
	export default {
		components:{
			detailMoudel,
		},
		computed:{
			...mapGetters('shopArr',[
				// 门店
				'get_shopAllArr',
				// 预约档期
				'get_schedule'
			])
		},
		data() {
			return {
				// 需要查询的订单号
				orderNo:null,
				// 当前子订单下标
				itemIndex:null,
				
				
				// 订单类型
				type:null,
				// 订单详情
				detailInfo:null,
				// 子订单ID
				itemId:null,
				
				// 拍摄详情
				listInfo:null,
			};
		},
		onLoad(option){
			this.orderNo = option.orderNo
			this.itemIndex = option.index
			// 获取预约档期
			this.act_schedule()
		},
		onShow(){
			// this.getAllOrderItem(this.orderNo,this.itemIndex)
			this.getAllOrderItem('200727003','0')
		},
		methods:{
			...mapActions('shopArr',[
				'act_schedule'
			]),
			// 获取订单信息
			getAllOrderItem(e,index){
				getAllOrderItem({ orderNo: e }).then(res=>{
					let data = res.data.data.records[0]
					// 传给下一页订单号
					this.nextItemNo = data.orderItemBasisVos[index].itemNo
					// 传给下一页订单名
					this.nextName = data.orderItemBasisVos[index].name
					// 传给下一页状态
					this.nextStatus = data.orderItemBasisVos[index].pickupStatus
					// 通过订单号获取下标为0的唯一信息内容
					// 赋值订单类型
					this.type = data.type
					// 赋值订单详情
					this.detailInfo = data
					// 赋值子订单详情
					this.itemId = data.orderItemBasisVos[index].itemId
					this.getOrdetItemList()
				})
			},
			
			
			// 获取拍照预约列表
			getOrdetItemList(){
				getOrdetItemList({itemId:this.itemId}).then(res=>{
					this.listInfo  = res.data.data
				})
			},
			
		}
	}
</script>

<style lang="scss">
	@import '../../convention/arrangeStyle.scss';
</style>
