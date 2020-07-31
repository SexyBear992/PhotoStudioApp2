<template>
	<view class="bigBox">
		
		<view class="add" @click="add">新增</view>
		<view class="babyList" v-for="(item, index) in babyDtos" :key="item.id">
			<view v-if="index > 0">删除</view>
			<babyList :shopId="personnelInfo.shopId" :info="item" :callNameList="babyCallNameList"></babyList>
		</view>
		
		<view class="save">保存</view>
		
	</view>
</template>

<script>
	import babyList from './babyList/babyList.vue'
	import { getCallName } from '@/util/api/shop.js'
	import { mapGetters } from 'vuex'
	import { getOrderDetails, updataPersonnel } from '@/util/api/shop.js'
	export default {
		components:{
			babyList
		},
		computed:{
			...mapGetters('app',[
				'shopId'
			])
		},
		data() {
			return {
				// 订单类型
				type:null,
				// 是否有宝宝
				isBaby:false,
		
				// 宝宝昵称列表
				babyCallNameList:[],
				// 客户昵称列表
				personCallNameList:[],
				
				// 客户picker
				personPicerList:[],
				personIndex:0,
				
				// 宝宝列表
				babyDtos:[],
				
				personnelInfo:{
					// 新增宝宝
					addCustomerBabyDtos:[],
					// 新增客户
					addCustomerContactDtos:[],
					// 客户组ID
					groupId:null,
					// 当前门店ID
					shopId:null,
					// 修改宝宝
					updateCustomerBabyDtos:[],
					// 修改客户
					updateRelationCustomerContactDtos:[]
				}
			};
		},
		onLoad(option){
			// option.id 244
			getOrderDetails({orderId:Number(268)}).then(res=>{
				let data = res.data.data
				this.type = data.type
				if(data.type === 'BABY'){
					this.isBaby = true
					this.getCallName(false)
				}
				this.getCallName(true)
				this.personnelInfo.groupId = data.customerGroupVo.id,
				this.personnelInfo.updateRelationCustomerContactDtos = data.customerGroupVo.relationCustomerContactVos
				this.babyDtos = data.customerGroupVo.customerBabyVos
			})
		},
		mounted(){
			this.personnelInfo.shopId = this.shopId
		},
		methods:{
			add(){
				let info={
					birthdayLunar:null,	
					birthdayStr:null,
					birthdayTime:null,
					callName:'男宝',
					display:false,
					name:null,
					sex:true,
					zodiac:null,
				}
				this.babyDtos.push(info)
			},
			// 获得昵称
			getCallName(bool){
				getCallName({isAdults:bool , type:this.type}).then(res=>{
					if(bool){
						this.personCallNameList = res.data.data
					}else{
						this.babyCallNameList = res.data.data
					}
				})
			},
		},
	}
</script>

<style lang="scss" scoped>
.bigBox{
	
	// .listBox{
	// 	display: flex;
	// 	font-size: 28rpx;
	// 	padding: 0 20rpx;
	// 	margin: 30rpx;
	// 	height: 80rpx;
	// 	line-height: 80rpx;
	// 	border-bottom: 1rpx solid #DDDDDD;
	// 	.title{
	// 		width: 270rpx;
	// 	}
	// 	.textBox{
	// 		display: flex;   
	// 		.text{
	// 			max-width: 360rpx;
	// 			overflow: hidden;
	// 			text-overflow: ellipsis;
	// 			white-space: nowrap;
	// 		}
	// 		image{
	// 			width: 15rpx;
	// 			height: 15rpx;
	// 			margin: 40rpx 0 0 5rpx;
	// 		}
	// 	}
	// }

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
