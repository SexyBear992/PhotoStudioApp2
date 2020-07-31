/***********************************  编辑服务人员  **************************************/
<template>
	<view>
		<view class="bigBox">
			<!-- 接单人员 -->
			<view class="listBox">
				<view class="title">接单人员：</view>
				<view class="textBox" @click="gotEnterpriseAll('RECEPTION')">
					<view class="text">{{showPeception}}</view>
					<image src="https://7068-photostudioapp-1302515241.tcb.qcloud.la/newIcon/down.png" mode=""></image>
				</view>
			</view>
			<!-- 专服人员 -->
			<view class="listBox">
				<view class="title">专服人员：</view>
				<view class="textBox" @click="gotEnterpriseAll('SERVICE')">
					<view class="text">{{showService}}</view>
					<image src="https://7068-photostudioapp-1302515241.tcb.qcloud.la/newIcon/down.png" mode=""></image>
				</view>
			</view>
			<!-- 网销人员 -->
			<view class="listBox">
				<view class="title">网销人员：</view>
				<view class="textBox" @click="gotEnterpriseAll('NETWORK_SALES')">
					<view class="text">{{showNetwork}}</view>
					<image src="https://7068-photostudioapp-1302515241.tcb.qcloud.la/newIcon/down.png" mode=""></image>
				</view>
			</view>
	
			<view class="save" @click="save">保存</view>
	
			<!-- 联系人模态框 -->
			<addressModal v-if="addressShow" :show="showTextFa" :type="addressType" @close="closeAddress" @ok="addressInfo"></addressModal>
		</view>
	</view>
</template>

<script>
	import { getOrderDetails, updataActor } from '@/util/api/shop.js'
	import addressModal from '../../../../openOrder/openInfo/components/addressModal.vue'
	export default {
		components:{
			addressModal
		},
		filters:{
			actor(arr){
				if(arr){
					if(arr.length > 0){
						return arr.join('/')
					}else{
						return '未选择'
					}
				}
			},
		},
		data() {
			return {
				// 显示模态框
				addressShow:false,
				// 联系人类型
				addressType:null,
				// 传给子组件
				showTextFa:null,
				
				// 显示数据
				showPeception:'请选择',
				showService:'请选择',
				showNetwork:'请选择',
				
				actorInfo:{
					orderId:null,
					receptions:[],
					services:[],
					networkSales:[]
				}
			};
		},
		onLoad(option){
			this.actorInfo.orderId = Number(option.id)
			getOrderDetails({orderId:Number(option.id)}).then(res=>{
				let data = res.data.data
				data.orderActorVos.forEach((i)=>{
					// 接单人员 RECEPTION
					if(i.positionType === 'RECEPTION'){
						let rArr = []
						rArr.push(i)
						this.actorInfo.receptions = rArr
						this.showPeception =  this.filterActor(rArr)
					}
					// // 专服人员 SERVICE
					if(i.positionType === 'SERVICE'){
						let sArr = []
						sArr.push(i)
						this.actorInfo.services = sArr
						this.showService = this.filterActor(sArr)
					}
					// // 网销人员 NETWORK_SALES
					if(i.positionType === 'NETWORK_SALES'){
						let nArr = []
						nArr.push(i)
						this.actorInfo.networkSales = nArr
						this.showNetwork = this.filterActor(nArr)
					}
				})
			})
		},
		methods:{
			// 打开模态框
			gotEnterpriseAll(type){
				this.addressType = type
				this.addressShow = true
				if(type === 'RECEPTION'){
					this.showTextFa = this.showPeception
				}else if(type === 'SERVICE'){
					this.showTextFa = this.showService
				}else if(type === 'NETWORK_SALES'){
					this.showTextFa = this.showNetwork
				}
			},
			
			// 关闭模态框
			closeAddress(){
				this.addressShow = false
				this.showTextFa = null
			},
			
			// 过去数据显示名字
			filterActor(arr){
				if(arr.length > 0){
					let show = []
					arr.forEach((i)=>{
						show.push(i.actorName)
					})
				  return show.join('/')
				}
			},
			
			// 模态框返回值
			addressInfo(e){
				let arr = []
				e.info.map((i)=>{
					let a = {
						actorId:i.id,
						main:i.main || false
					}
					arr.push(a)
				})
				if(this.addressType === 'RECEPTION'){
					this.showPeception = e.show
					this.actorInfo.receptions = arr
				}else if(this.addressType === 'SERVICE'){
					this.showService = e.show
					this.actorInfo.services = arr
				}else if(this.addressType === 'NETWORK_SALES'){
					this.showNetwork = e.show
					this.actorInfo.networkSales = arr
				}
				this.addressShow = false
				this.showTextFa = null
			},
			
			// 保存
			save(){
				updataActor(this.actorInfo).then(res=>{
					if(res.data.code === 200){
						uni.navigateBack({
							delta: 1
						})
					}
				})
			},
		},
	}
</script>

<style lang="scss">
.bigBox{
		.listBox{
			display: flex;
			font-size: 28rpx;
			padding: 0 20rpx;
			margin: 30rpx;
			height: 80rpx;
			line-height: 80rpx;
			border-bottom: 1rpx solid #DDDDDD;
			.title{
				width: 270rpx;
			}
			.textBox{
				display: flex;   
				.text{
					max-width: 360rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				image{
					width: 15rpx;
					height: 15rpx;
					margin: 40rpx 0 0 5rpx;
				}
			}
			.lunar{
				width:100%
			}
		}
		.textareaBox{
			margin: 30rpx;
			font-size: 28rpx;
			.title{
				padding: 0 20rpx;
			}
			.textarea{
				padding:20rpx;
				width: 650rpx;
				border-bottom: 1rpx solid #DDDDDD
			}
		}
		.save{
			width:650rpx;
			height:80rpx;
			line-height:80rpx;
			color:#FFFFFF;
			background-color: #61A3FF;
			text-align: center;
			margin: 130rpx auto;
			border-radius: 40rpx;
		}
	}
</style>
