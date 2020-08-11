/**************************************  安排拍照 **********************************************/
<template>
	<view>
		<detailMoudel v-if="detailInfo" :info="detailInfo"></detailMoudel>
		
		<!-- 拍摄详情操作 -->
		<view class="arrangeInfo" v-for="(item,index) in listInfo" :key="item.id">
			<!-- 标题 -->
			<view class="titleBox">
				<view class="title">第{{index+1}}次拍摄</view>
			</view>
			
				<mainModule :item="item" :get_shopAllArr="get_shopAllArr" :get_schedule="get_schedule"></mainModule>
			
				<!-- 按键 -->
				<view class="butBox">
					<view class="but" @click="addActor(item.id)" v-if="!item.orderItemProcessActorVos">安排摄化人员</view>
					<view class="but" @click="updataActor(item.id)" v-else>修改摄化人员</view>
					<view class="but" @click="change(item.id)">改期</view>
					<view class="but" @click="cancel(item.id)">取消档期</view>
				</view>
			
		</view>
		
		
		<!-- 提醒 -->
		<view class="ts" v-show="listInfo.length < 1">您暂时还没有预约拍照哦~快去添加吧</view>
		
		<delModal :title="'取消档期'" v-if="delModalShow" @cancel="close" @ok="ok"></delModal>
		
		<view class="button" @click="addPhoto">+添加拍照预约</view>
		
		<i-message id="message" />
	</view>
</template>

<script>
	import mainModule from './components/mainModule.vue'
	import { mapGetters, mapActions } from 'vuex'
	import delModal from '@/components/delModal.vue'
	import detailMoudel from '@/components/detailMoudel.vue'
	import { getAllOrderItem, getOrdetItemList, deletPhotoInfo } from '@/util/api/shop.js'
	export default {
		components:{
			detailMoudel,
			delModal,
			mainModule
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
				
				// 取消档期模态框
				delModalShow:false,
				// 取消档期ID
				cancleId:null,
				
				// 拍摄详情
				listInfo:null,
			
				
				// 传给下一页
				nextItemNo:null,
				nextName:null,
				nextStatus:null,
			};
		},
		onLoad(option){
			this.orderNo = option.orderNo
			this.itemIndex = option.index
			// 获取预约档期
			this.act_schedule()
		},
		onShow(){
			this.getAllOrderItem(this.orderNo,this.itemIndex)
			// this.getAllOrderItem('200727003','0')
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
			
			// 新增摄化
			addPhoto(){
				uni.navigateTo({
					url:'./AddorUpdataItem/AddorUpdataItem?itemNo=' + this.nextItemNo + '&name=' + this.nextName + '&type=' + this.type + '&oId=' +  this.detailInfo.orderId + '&itemId=' + this.itemId
				})
			},
			// 修改摄化
			change(id){
				uni.navigateTo({
					url:'./AddorUpdataItem/AddorUpdataItem?itemNo=' + this.nextItemNo + '&name=' + this.nextName + '&type=' + this.type + '&oId=' +  this.detailInfo.orderId + '&itemId=' + this.itemId + '&id=' + id
				})
			},
			
			// 新增人员
			addActor(id){
				uni.navigateTo({
					url:'./AddorUpdataPerson/AddorUpdataPerson?itemNo=' + this.nextItemNo + '&name=' + this.nextName + '&type=' + this.type + '&id=' + id + '&but=安排'
				})
			},
			// 修改人员
			updataActor(id){
				uni.navigateTo({
					url:'./AddorUpdataPerson/AddorUpdataPerson?itemNo=' + this.nextItemNo + '&name=' + this.nextName + '&type=' + this.type + '&id=' + id + '&but=修改'
				})
			},
			
			// 打开取消档期模态框
			cancel(id){
				this.cancleId = id
				this.delModalShow = true		
			},
			// 确定取消档期
			ok(){
				deletPhotoInfo({id:this.cancleId}).then(res=>{
					if(res.data.code === 200){
						this.cancleId = null
						this.delModalShow = false
						this.getOrdetItemList()
					}
				})
			},
			// 关闭取消模态框
			close(){
				this.cancleId = null,
				this.delModalShow = false
			}
		},
	}
</script>

<style>
	page{
		background-color: #fdfdfd;
	}
</style>
<style lang="scss">
	@import '../../convention/arrangeStyle.scss';

</style>
