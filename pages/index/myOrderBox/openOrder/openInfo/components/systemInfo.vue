/******************   套系内容    *********************/
<template>
	<view class="bigBox">
		<view class="top">
			<view class="left">
				<view class="allMoney">套系金额{{allMoney}}元</view>
				<view class="giftNum" v-show="giftNumShow">+{{giftPrice}}元 {{giveGift.length}}个</view>
			</view>
			<view class="addGift" @click="addGift">添加礼包</view>
		</view>
		
		<view class="orderItem" v-for="(item,index) in orderItem" :key="index">
			<view class="nameBox">
				<input class="name" type="text" v-model="item.name" />
				<view class="butBox">
					<view class="add" @click="addList(index)">新增</view>
					<view class="del" @click="delList(index)">
						<i-icon type="close" size="15" color="#80848f"/>
					</view>
				</view>
			</view>
			
			<view class="inpBox">
				<!-- 价格 -->
				<view class="listBox">
					<view class="inpTitle">价格</view>
					<input type="number" v-model="item.price"/>
				</view>
				
				<!-- 精修 -->
				<view class="listBox">
					<view class="inpTitle">精修</view>
					<input type="number" v-model="item.refineCount"/>
				</view>
				
				<!-- 拍摄保底张数 -->
				<view class="listBox">
					<view class="inpTitle">拍摄保底张数</view>
					<input type="number" v-model="item.photoCount"/>
				</view>
				
				<!-- 入底 -->
				<view class="listBox">
					<view class="inpTitle">入底</view>
					<input type="number" v-model="item.bottomCount"/>
				</view>
				
				<!-- 入册 -->
				<view class="listBox">
					<view class="inpTitle">入册</view>
					<input type="number" v-model="item.bookCount"/>
				</view>
			</view>
			
			<view class="addList" v-if="item.orderItemGoods.length>0">
				<view class="addListTitle">新增商品</view>
				<addListModal :list="item.orderItemGoods" :title="listTitleGoods" @deletList="deletListGood($event,index)"></addListModal>
			</view>
			
			<view class="addList" v-if="item.orderItemDressInfo.length>0">
				<view class="addListTitle">新增服装</view>
				<addListModal :list="item.orderItemDressInfo" :title="listTitleDress" @deletList="deletListDress($event,index)"></addListModal>
			</view>
			
			<view class="addList" v-if="item.orderItemPlace.length>0">
				<view class="addListTitle">新增景点</view>
				<addListModal :list="item.orderItemPlace" :title="listTitlePlace" @deletList="deletListPlace($event,index)"></addListModal>
			</view>
			
			<view class="addList" v-if="item.orderItemService.length>0">
				<view class="addListTitle">新增商品</view>
				<addListModal :list="item.orderItemService" :title="listTitleService" @deletList="deletListService($event,index)"></addListModal>
			</view>
			
		</view>

		

		<view class="addOrderChild" @click="addOrderChild">增加子单</view>
		
		<delModal v-if="delModalShow" @cancel="cancel" @ok="ok"></delModal>
		
		<toolModal v-if="toolModalShow" @close="close" @enSure="enSure"></toolModal>
		
		<addGiftModal	v-if="addGiftShow" :type="type" @closeAddGift="closeAddGift" @addGiftInfo="addGiftInfo" :giveGift="giveGift" :pIndex="pIndex"></addGiftModal>
	</view>
</template>

<script>
	import { getOrderAssembly } from '@/util/api/goods.js'
	import addListModal from './addListModal.vue'
	import toolModal from './toolModal.vue'
	import delModal from '@/components/delModal.vue'
	import addGiftModal from './addGiftModal.vue'
	export default{
		props:['piceId','type'],
		components:{
			addListModal,
			delModal,
			toolModal,
			addGiftModal
		},
		data(){
			return{
				// 套系总金额
				allMoney:null,
				// 套系内容
				assembledlyItemList:null,
				
				// 套系商品标题
				listTitleGoods:['商品','单价','P数','数量'],
				// 套系服装标题
				listTitleDress:['服装','单价','类型','数量'],
				// 套系景点标题
				listTitlePlace:['景点','单价','类型'],
				// 套系服务标题
				listTitleService:['服务','单价','人数','数量'],
				
				// 删除模态框
				delModalShow:false,
				// 需要删除的下标
				delIndex:null,
				
				// 工具箱模态框
				toolModalShow:false,
				// 打开模态框的下标
				toolModalIndex:null,
				
				// 已选礼包类别
				pIndex:[0,0],
				// 礼包模态框
				addGiftShow:false,
				// 已选礼包
				giveGift:null,
				// 礼包价格
				giftPrice:null,
				// 礼包价格数量显示
				giftNumShow:false,
				
				// 订单详情
				orderItem:[],
			}
		},
		mounted(){
			this.addOrderItem()
			this.getOrderAssembly()
		},
		methods:{
			// 获取套系详情
			getOrderAssembly(){
				getOrderAssembly({id : this.piceId}).then(res=>{
					let assembledlyItemList = res.data.data.assemblyItemList[0]
					this.assembledlyItemList = assembledlyItemList
					// 赋值
					this.orderItem[0].bookCount = assembledlyItemList.bookCount
					this.orderItem[0].bottomCount = assembledlyItemList.bottomCount
					this.orderItem[0].name = assembledlyItemList.name
					this.orderItem[0].price = assembledlyItemList.price
					this.orderItem[0].itemRemindTime = new Date().getTime()
					//  商品 景点 服务 对象
					// 商品 对象
					let orderItemGoodsArr = []
					assembledlyItemList.assemblyItemGoods.forEach((i)=>{
						let orderItemGoods = {
							name: i.name,
							orderP: i.countP,
							defaultP: i.defaultP,
							goodsId: i.goodsId,
							orderNum: i.count,
							pSalePrice: i.pSalePrice,
							stockStatus: i.stockStatus,
							isSelect: i.isSelect,
							salePrice: i.salePrice,
							pickupModeCategoryId: null,
							remark:null,
							sort: null
						}
						orderItemGoodsArr.push(orderItemGoods)
					})
					this.orderItem[0].orderItemGoods = orderItemGoodsArr
					
					// 服装 对象
					let orderItemDressInfoArr = []
					assembledlyItemList.assemblyItemDressInfos.forEach((i)=>{
						let orderItemDressInfo = {
							count: i.count,
							dressInfoId: i.dressInfoId,
							name: i.name,
							salePrice: i.salePrice,
							type: i.type
						}
						orderItemDressInfoArr.push(orderItemDressInfo)
					})
					this.orderItem[0].orderItemDressInfo = orderItemDressInfoArr
					
					// 景点 对象
					let assemblyItemPlacesArr =[]
					assembledlyItemList.assemblyItemPlaces.forEach((i)=>{
						let assemblyItemPlaces = {
							name: i.name,
							placeId: i.placeId,
							placeType: i.placeType,
							salePrice: i.salePrice
						}
						assemblyItemPlacesArr.push(assemblyItemPlaces)
					})
					this.orderItem[0].orderItemPlace = assemblyItemPlacesArr
					
					// 服务 对象
					let assemblyItemServicesArr = []
					assembledlyItemList.assemblyItemServices.forEach((i)=>{
						let assemblyItemServices = {
							name: i.name,
							serviceId:i.serviceId,
							salePrice:i.salePrice,
							peopleNumber:i.peopleNumber,
							count:i.count
						}
						assemblyItemServicesArr.push(assemblyItemServices)
					})
					this.orderItem[0].orderItemService = assemblyItemServicesArr
					
					// console.log('订单详情',this.orderItem)
				})
			},
			
			// 增加子订单
			addOrderItem(){
				let addOrderItem = {
					// 入册
					bookCount:null,
					// 入底
					bottomCount:null,
					// 子订单名称
					name:null,
					// 拍摄张数
					photoCount:1,
					// 子订单价格
					price:null,
					// 精修张数
					refineCount:1,
					// 子订单礼包服务对象
					orderItemDressInfo:[],
					// 子订单商品对象
					orderItemGoods:[],
					// 子订单礼包景点对象
					orderItemPlace:[],
					// 子订单礼包服务对象
					orderItemService:[],
				}
				this.orderItem.push(addOrderItem)
			},
			
			/**********************   套系删除     **************************/ 
			// 删除套系商品某个值
			deletListGood(e,index){
				this.orderItem[index].orderItemGoods = e
			},
			// 删除套系服装某个值
			deletListDress(e,index){
				this.orderItem[index].orderItemDressInfo = e
			},
			// 删除套系景点某个值
			deletListPlace(e,index){
				this.orderItem[index].orderItemPlace = e
			},
			// 删除套系服务某个值
			deletListService(e,index){
				this.orderItem[index].orderItemService = e
			},
		
			// 打开工具箱模态框
			addList(index){
				this.toolModalIndex = index
				this.toolModalShow = true
			},
			// 关闭工具箱模态框
			close(){
				this.toolModalIndex = null
				this.toolModalShow = false				
			},
			// 工具箱模态框确定返回值
			enSure(e){
				if(e.type === 'GOODS'){
					e.arr.forEach((i)=>{
						let orderItemGoods = {
							name: i.name,
							orderP: i.defaultP,
							defaultP: i.defaultP,
							goodsId: i.id,
							orderNum: 1,
							pSalePrice: i.pSalePrice,
							stockStatus: i.stockStatus,
							isSelect: i.isSelect,
							salePrice: i.salePrice,
							pickupModeCategoryId: null,
							remark:null,
							sort: null
						}
						this.orderItem[this.toolModalIndex].orderItemGoods.push(orderItemGoods)
					})
				}else if(e.type === 'DRESSINFO'){
					e.arr.forEach((i)=>{
						let orderItemDressInfo = {
							name: i.name,
							count: 1,
							dressInfoId: i.id,
							salePrice: i.salePrice,
							type: i.type
						}
						this.orderItem[this.toolModalIndex].orderItemDressInfo.push(orderItemDressInfo)
					})
				}else if(e.type === 'PLACE'){
					e.arr.forEach((i)=>{
						let orderItemPlace = {
							name:i.name,
							placeId: i.id,
							placeType:i.placeType,
							salePrice:i.salePrice
						}
						this.orderItem[this.toolModalIndex].orderItemPlace.push(orderItemPlace)
					})
				}else if(e.type === 'SERVICE'){
					e.arr.forEach((i)=>{
						let orderItemService = {
							name: i.name,
							serviceId: i.id,
							salePrice: i.salePrice,
							peopleNumber: i.peopleNumber,
							count: 1
						}
						this.orderItem[this.toolModalIndex].orderItemService.push(orderItemService)
					})
				}
				this.toolModalIndex = null
				this.toolModalShow = false
			},
				
			// 新增子单
			addOrderChild(){
				this.addOrderItem()
			},
			
			// 打开删除模态框
			delList(index){
				this.delIndex = index
				this.delModalShow = true
			}, 
			// 删除模态框返回值 取消
			cancel(){
				this.delIndex = null
				this.delModalShow = false
			},
			// 删除模态框返回值 确定
			ok(){
				this.orderItem.splice(this.delIndex, 1)
				this.delIndex = null
				this.delModalShow = false
			},
		
			// 添加礼包
			addGift(){
				this.addGiftShow = true
			},
			// 礼包模态框关闭
			closeAddGift(){
				this.addGiftShow = false
			},
			// 礼包模态框返回内容
			addGiftInfo(e){
				this.addGiftShow = false
				this.addGiftInfoData = e.info
				this.pIndex = e.index
				this.giveGift = e.show
				
				// console.log('礼包模态框返回长度',e.show.length)
				this.giftPrice = e.info.giftPrice
				
				if(e.show.length > 0){
					this.giftNumShow = true
				}else{
					this.giftNumShow = false
				}
			},
			saveGift(){
				return this.addGiftInfoData
			},
			// 保存
			saveOrderItem(){		
				return this.orderItem
			},
			
		},
		watch:{
			piceId(){
				this.getOrderAssembly()
			},
			orderItem:{
				deep:true,
				handler(){
					if(this.orderItem.length > 0){
						let moneyArr = this.orderItem.map((i)=>{
							return Number(i.price)
						})
						this.allMoney =  moneyArr.reduce((n,m) => n+m)
					}else{
						this.allMoney = 0
					}
				
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bigBox{
		font-size: 28rpx;
		.top{
			display: flex;
			margin: 0 30rpx;
			height: 80rpx;
			line-height: 80rpx;
			justify-content: space-between;
			
			.left{
				display: flex;
				.allMoney{
					color: #FF0000;
				}
				.giftNum{
					margin-left: 15rpx;
				}
			}
			.addGift{
				height: 30rpx;
				line-height: 30rpx;
				margin-top: 20rpx;
				border-radius: 10rpx;
				border: 1rpx solid #61a3ff;
				color: #61a3ff;
				padding: 5rpx 10rpx;
			}
		}
		.orderItem{
			margin-bottom: 20rpx;
			.nameBox{
				background-color: #61a3ff;
				display: flex;
				justify-content: space-between;
				padding: 0 30rpx;
				height: 80rpx;
				.name{
					color: #FFFFFF;
					background-color: #4188ed;
					width: 190rpx;
					height: 40rpx;
					margin-top: 10rpx;
					padding: 8rpx;
					border-radius: 10rpx;
				}
				.butBox{
					display: flex;
					.add{
						color: #61a3ff;
						background-color: #FFFFFF;
						padding: 10rpx;
						height: 40rpx;
						line-height: 40rpx;
						border-radius: 10rpx;
						margin-top: 10rpx
					}
					.del{
						margin-top: 20rpx;
						margin-left: 20rpx;
					}
				}
				
			}
			.inpBox{
				.listBox{
					height: 80rpx;
					line-height: 80rpx;
					margin: 0 30rpx ;
					display: flex;
					border-bottom: 1rpx solid #f9f9f9;
					input{
						margin-left: 30rpx;
						margin-top: 19rpx;
						width: 470rpx;
						color: #808080;
					}
				}
			}
			.addList{
				.addListTitle{
					margin: 0 30rpx;
					height: 80rpx;
					color: #808080;
					line-height: 80rpx;
				}
			}
			
		}
		.addOrderChild{
			width: 130rpx;
			height: 40rpx;
			border: 1rpx solid #61A3FF;
			color: #61A3FF;
			line-height: 40rpx;
			text-align: center;
			margin: 0 auto;
			border-radius: 10rpx;
		}
	}

</style>
