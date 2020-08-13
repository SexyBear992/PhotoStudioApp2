/************************************ 拍照 选片 看板 取件 安排页面 **************************************/
<template>
	<view>
		<view class="bigBox">
			<detailMoudel v-if="detailInfo" :info="detailInfo"></detailMoudel>
			
			<pzMain 
				v-if="indexType === 'pz'" 
				:listInfo="listInfo" 
				:get_shopAllArr="get_shopAllArr" 
				:get_schedule="get_schedule"
				:oId="detailInfo.orderId"
				@refresh="getOrdetItemList"
			></pzMain>
			<xpMain
				v-if="indexType === 'xp'"
				:listInfo="listInfo"
				:get_shopAllArr="get_shopAllArr" 
				:get_schedule="get_schedule"
				@refresh="getOrdetItemList"
			></xpMain>
			<kbMain 
				v-if="indexType === 'kb'"
				:listInfo="listInfo"
				:get_shopAllArr="get_shopAllArr" 
				:get_schedule="get_schedule"
				@refresh="getOrdetItemList"
			></kbMain>
			<qjMain 
				v-if="indexType === 'qj'"
				:listInfo="listInfo"
				:get_shopAllArr="get_shopAllArr" 
				:get_schedule="get_schedule"
				@refresh="getOrdetItemList"
			></qjMain>
			
		</view>
		<i-message id="message" />
	</view>
</template>

<script>
	import { 
		getAllOrderItem, //获取订单详情
		getOrdetItemListPhoto, //拍照详情
		getOrdetItemListChoose, //选片详情
		getOrdetItemListWatch, //看板详情
		getOrdetItemListPickup, //取件详情
	} from '@/util/api/shop.js'
	import { mapGetters, mapActions } from 'vuex'
	import pzMain from './mainBox/pzMain.vue'
	import xpMain from './mainBox/xpMain.vue'
	import kbMain from './mainBox/kbMain.vue'
	import qjMain from './mainBox/qjMain.vue'
	import detailMoudel from '@/components/detailMoudel.vue'
	export default {
		components:{
			detailMoudel,
			pzMain,
			xpMain,
			kbMain,
			qjMain
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
				/**************  上级页面赋值 ***************/
				// 页面类型
				indexType:null,
				// 需要查询的订单号
				orderNo:null,
				// 当前子订单下标
				itemIndex:null,
				
				/**************  获取订单信息赋值 ***************/
				// 订单详情
				detailInfo:null,
				// 子订单ID
				itemId:null,
				
				// 取消档期模态框
				delModalShow:false,
				// 取消档期ID
				cancleId:null,
				
				// 子订单详情
				listInfo:null,
			};
		},
		onLoad(option){
			this.orderNo = option.orderNo
			this.itemIndex = option.index
			this.indexType = option.indexType
			let title 
			switch(this.indexType){
				case 'pz':
					title = '安排拍照'
					break;
				case 'xp':
					title = '安排选片'
					break;
				case 'kb':
					title = '安排看板'
					break;
				case 'qj':
					title = '安排取件'
					break
			}
			uni.setNavigationBarTitle({
				title:title
			})
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
					if(res.data.code === 200){
						let data = res.data.data.records[0]
						// 通过订单号获取下标为0的唯一信息内容
						// 赋值订单详情
						this.detailInfo = data
						// 赋值子订单详情
						this.itemId = data.orderItemBasisVos[index].itemId
						this.getOrdetItemList()
						
						let pages = getCurrentPages()
						let currPage = pages[pages.length - 1]
						currPage.setData({
							options: {
								'itemNo': data.orderItemBasisVos[index].itemNo,
								'name': data.orderItemBasisVos[index].name,
								'type': data.type,
								'itemId': data.orderItemBasisVos[index].itemId
							}
						})
					}
				})
			},
		
			/************** 以下根据类型判断 **************/ 
			// 获取详情列表
			getOrdetItemList(){
				switch(this.indexType){
					case 'pz':
						this.getOrdetItemListPhoto()
						break;
					case 'xp':
						this.getOrdetItemListChoose()
						break;
					case 'kb':
						this.getOrdetItemListWatch()
						break;
					case 'qj':
						this.getOrdetItemListPickup()
						break
				}
			},
			
			// 拍照详情
			getOrdetItemListPhoto(){
				getOrdetItemListPhoto({itemId:this.itemId}).then(res=>{
					this.listInfo  = res.data.data
				})
			},
			// 选片详情
			getOrdetItemListChoose(){
				getOrdetItemListChoose({itemId:this.itemId}).then(res=>{
					this.listInfo  = res.data.data
				})
			},
			// 看板详情
			getOrdetItemListWatch(){
				getOrdetItemListWatch({itemId:this.itemId}).then(res=>{
					this.listInfo  = res.data.data
				})
			},

			// 取件详情
			getOrdetItemListPickup(){
				getOrdetItemListPickup({itemId:this.itemId}).then(res=>{
					this.listInfo = res.data.data
				})
			}
			
		}
	}
</script>

<style lang="scss">

</style>
