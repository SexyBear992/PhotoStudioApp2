/************************************** 套系子订单内容 *********************************/
<template>
	<view>
		<i-notice-bar icon="systemprompt" closable>
		    左滑列表可会改列表进行操作
		</i-notice-bar>
		<view class="bigBox">
			<view class="addBox">
				<view class="add" @click="add">添加</view>
			</view>
			<!-- 标题 -->
			<view class="titleBox">
				<view class="title" v-for="(item,index) in titleBox" :key="index">{{item}}</view>
			</view>
		
			<view class="listBox" v-for="(item, index) in itemInfo" :key="index">
				<i-swipeout
					i-class="i-swipeout-demo-item" 
					:actions="actions"
					:toggle="toggle" 
					:unclosable="true" 
					@change="handlerCloseButton($event,index)"
					i-class-item="myitem"
				>
					<view slot="content">
						<i-cell i-class="cellClass">
							<!-- 商品 -->
							<view class="textBox" v-if="type === 'product'">
								<view class="text">{{item.name}}</view>
								<view class="text">{{item.pSalePrice}}</view>
								<view class="text">{{item.countP}}</view>
								<view class="text">{{item.countNum}}</view>
							</view>
							<!-- 服装 -->
							<view class="textBox" v-if="type === 'dress'">
								<view class="text">{{item.name}}</view>
								<view class="text">{{item.salePrice}}</view>
								<view class="text">{{item.type | type}}</view>
								<view class="text">{{item.count}}</view>
							</view>
							<!-- 景点 -->
							<view class="textBox"  v-if="type === 'place'">
								<view class="text">{{item.name}}</view>
								<view class="text">{{item.salePrice}}</view>
								<view class="text">{{item.placeType | type}}</view>
								<view class="text"></view>
							</view>
							<!-- 服务 -->
							<view class="textBox"  v-if="type === 'service'">
								<view class="text">{{item.name}}</view>
								<view class="text">{{item.salePrice}}</view>
								<view class="text">{{item.peopleNumber}}</view>
								<view class="text">{{item.count}}</view>
							</view>
							
						</i-cell>
					</view>
				</i-swipeout>
			</view>
			
			<view class="noData" v-if="itemInfo.length <= 0 ">暂无数据</view>
		</view>
		
		<toolModal v-if="toolModalShow" :faType="type" @close="close" @enSure="enSure"></toolModal>
		
		<updataModal v-if="showUpdataModal" :faType="type" :info="updataInfo" @close="close" @ok="updataOK"></updataModal>
		
	</view>
</template>

<script>
	import { 
		getOrderItem, 
		deletOrderGoods, 
		deletOrderDress,
		deletOrderPlace,
		deletOrderService,
		addOrderGoods,
		addOrderDress,
		addOrderPlace,
		updataOrderGoods,
		updataOrderDress,
		updataOrderPlace,
		updataOrderService,
		addOrderService
	} from '@/util/api/shop.js'
	import toolModal from '../../../../openOrder/openInfo/components/toolModal.vue'
	import updataModal from './components/updataModal.vue'
	import { mapGetters } from 'vuex'
	export default {
		components:{
			toolModal,
			updataModal
		},
		computed:{
			...mapGetters('app',[
				'shopId'
			])
		},
		filters:{
			type(type){
				const result = new Map([
					['INT', '内景'],
					['OUT', '外景'],
					['NONE', '无']
				])
				return result.get(type)
			}
		},
		data() {
			return {
				type:null ,
				
				// 标题
				titleBox:[],
				
				// 工具箱模态框
				toolModalShow:false,
				
				// 修改模态框
				showUpdataModal:false,
				// 需要修改数据
				updataInfo:null,
				
				// 滑动显示
				toggle : false,
				// 滑动组件按键
				actions:[
					{
						name : '修改',
						color : '#80848f',
						fontsize : '20',
						width : 80,
						icon : 'brush',
					},
					{
						name : '删除',
						width : 80,
						color : '#fff',
						fontsize : '20',
						icon : 'delete',
						background : '#ed3f14'
					},
					
				],
				
				// 数据列表
				itemInfo:{},
				// 新增数据传参
				itemParams:{
					itemId:null,
					shopId:null,
					orderItemServiceDtos:null,
					orderItemProcessGoodsDtos:null,
					orderItemDressInfoDtos:null,
					orderItemProcessPlaceDtos:null,
					sourceProducts:'ASSEMBLY'
				}
			};
		},
		onLoad(option){
			// product产品 dress服装 place景点 service服务
			this.type = 'dress'
			// this.type = option.type
			// this.itemParams.itemId = option.itemId
			this.itemParams.itemId = 172
			switch(this.type){
				case 'product':
					this.titleBox = ['商品','单价','P数','数量']
					break
				case 'dress':
					this.titleBox = ['服装','单价','类型','数量']
					break
				case 'place':
					this.titleBox = ['景点','单价','类型','']
					break
				case 'service':
					this.titleBox = ['服务','单价','人数','数量']
					break
			}
			this.getOrderItem()
		},
		mounted(){
			this.itemParams.shopId = this.shopId
		},
		methods:{
			// 获取子订单
			getOrderItem(){
				// option.itemId => 172
				getOrderItem({itemId:this.itemParams.itemId}).then(res=>{
					switch(this.type){
						case 'product':
							this.itemInfo = res.data.data.orderItemGoods;
							break;
						case 'dress':
							this.itemInfo = res.data.data.orderItemDressInfo;
							break;
						case 'place':
							this.itemInfo = res.data.data.orderItemPlace;
							break;
						case 'service':
							this.itemInfo = res.data.data.orderItemService;
							break;
					}
				})
			},
			
			// 删除商品
			deletOrderGoods(id){
				deletOrderGoods({id:id}).then(res=>{
					if(res.data.code===200){
						this.getOrderItem()
					}
				})
			},
			
			// 删除服装
			deletOrderDress(id){
				deletOrderDress({id:id}).then(res=>{
					if(res.data.code===200){
						this.getOrderItem()
					}
				})
			},
			
			// 删除景点
			deletOrderPlace(id){
				deletOrderPlace({id:id}).then(res=>{
					if(res.data.code===200){
						this.getOrderItem()
					}
				})
			},
			
			// 删除服务
			deletOrderService(id){
				deletOrderService({id:id}).then(res=>{
					if(res.data.code===200){
						this.getOrderItem()
					}
				})
			},
			
			// 更新商品
			updataOrderGoods(arr){
				updataOrderGoods(arr).then(res=>{
					if(res.data.code===200){
						this.getOrderItem()
					}
				})
			},
			
			// 更新服装
			updataOrderDress(arr){
				updataOrderDress(arr).then(res=>{
					if(res.data.code===200){
						this.getOrderItem()
					}
				})
			},
			
			// 更新景点
			updataOrderPlace(arr){
				updataOrderPlace(arr).then(res=>{
					if(res.data.code===200){
						uni.showToast({
							title:'修改成功'
						},1500)
						setTimeout(()=>{
							this.getOrderItem()
						},1500)
					}
				})
			},
			
			// 更新服务
			updataOrderService(arr){
				updataOrderService(arr).then(res=>{
					if(res.data.code===200){
						this.getOrderItem()
					}
				})
			},
			
			// 点击swipeout返回值
			handlerCloseButton(e,index){
				this.toggle = !this.toggle
				if(e.detail.index === 0){
					this.updataInfo = this.itemInfo[index]
					this.showUpdataModal = true
				}else{
					switch(this.type){
						case 'product':
							this.deletOrderGoods(this.itemInfo[index].id)
							break
						case 'dress':
							this.deletOrderDress(this.itemInfo[index].id)
							break
						case 'place':
							this.deletOrderPlace(this.itemInfo[index].id)
							break
						case 'service':
							this.deletOrderService(this.itemInfo[index].id)
							break
					}
				}
			},
			
			// 打开工具箱模态框
			add(){
				this.toolModalShow = true
			},
			
			// 关闭模态框
			close(){
				this.toolModalShow = false
				this.showUpdataModal = false
			},
		
			// 工具箱模态框返回值
			enSure(e){
				this.toolModalShow = false
				let arr = []
				if(e.type === 'GOODS'){
					e.arr.forEach((i)=>{
						let newArr = {
							countNum:1,
							countP:i.defaultP,
							defaultP:i.defaultP,
							expeditedTime:null,
							goodsId:i.id,
							isSelect:i.isSelect,
							name:i.name,
							pSalePrice:i.pSalePrice,
							pickupModeCategoryId:null,
							remark:null,
							salePrice:i.salePrice,
							sort:0,
							stockStatus:i.stockStatus,
						}
						arr.push(newArr)
						this.itemParams.orderItemProcessGoodsDtos = arr
						addOrderGoods(this.itemParams).then(res=>{
							this.getOrderItem()
						})
					})
				}else if(e.type === 'DRESSINFO'){
					e.arr.forEach((i)=>{
						let newArr = {
							count:1,
							dressInfoId:i.id,	
							name:i.name,
							remark:null,
							salePrice:i.salePrice,
							sort:0,
							type:i.type,
						}
						arr.push(newArr)
					})
					this.itemParams.orderItemDressInfoDtos = arr
					addOrderDress(this.itemParams).then(res=>{
						this.getOrderItem()
					})
				}else if(e.type === 'PLACE'){
					e.arr.forEach((i)=>{
						let newArr = {
							name:i.name,
							placeId:i.id,
							placeType:i.placeType,
							remark:null,
							salePrice:i.salePrice,
							sort:0,
						}
						arr.push(newArr)
					})
					this.itemParams.orderItemProcessPlaceDtos = arr
					addOrderPlace(this.itemParams).then(res=>{
						this.getOrderItem()
					})
				}else if(e.type === 'SERVICE'){
					e.arr.forEach((i)=>{
						let newArr = {
							count: 1,
							name: i.name,
							peopleNumber: i.peopleNumber,
							remark: '',
							salePrice:i.salePrice,
							serviceId:i.id,
							sort:0,
						}
						arr.push(newArr)
					})
					this.itemParams.orderItemServiceDtos = arr
					addOrderService(this.itemParams).then(res=>{
						this.getOrderItem()
					})
				}
			},
		
			// 修改模态框返回
			updataOK(e){
				this.showUpdataModal = false
				switch(this.type){
					case 'product':
						this.updataOrderGoods(e)
						break
					case 'dress':
						this.updataOrderDress(e)
						break
					case 'place':
						this.updataOrderPlace(e)
						break
					case 'service':
						this.updataOrderService(e)
						break
				}
			},
		},
	}
</script>

<style lang="scss" scoped>
	/deep/.myitem{
		padding: 0 !important;
	}
	/deep/.cellClass{
		padding: 12px 0 !important;
	}
	.bigBox{
		.addBox{
			display: flex;
			flex-direction: row-reverse;
			margin: 0 30rpx;
			margin-top: 30rpx;
			.add{
				font-size: 24rpx;
				background-color: #61A3FF;
				width: 80rpx;
				height: 40rpx;
				color: #FFFFFF;
				line-height: 40rpx;
				border-radius: 10rpx;
				text-align: center;
			}
		}
		.titleBox{
			height: 80rpx;
			line-height: 80rpx;
			background-color: #F7F7F7;
			font-size: 28rpx;
			color: #333333;
			margin-top: 20rpx;
			display: flex;
			justify-content: space-between;
			.title{
				flex: 1;
				text-align: center;
			}
			.title:nth-child(1){
				flex: 1.5;
			}
		}
		.textBox{
			color: #999999;
			font-size: 24rpx;
			display: flex;
			justify-content: space-between;
			.text{
				flex: 1;
				text-align: center;
				padding: 10rpx;
			}
			.text:nth-child(1){
				flex: 1.5;
			}
		}
		.noData{
			font-size: 28rpx;
			text-align: center;
			color: #666666;
			margin: 30rpx 0;
		}
	}
</style>
