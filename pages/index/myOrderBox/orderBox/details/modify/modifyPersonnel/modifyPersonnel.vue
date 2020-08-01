/*****************************  修改客户信息  *******************************/
<template>
	<view class="bigBox">
		<view class="mainBox" v-if="isBaby">
			<view class="titleBox">
				<view class="title">宝宝信息</view>
				<view class="add" @click="addBaby">新增</view>
			</view>
			<view class="infoList" v-for="(item, index) in babyDtos" :key="item.id">
				<view class="delBox">
					<view class="del" v-if="index > 0" @click="delBaby(index)">删除</view>
				</view>
				<babyList ref="baby" :info="item" :callNameList="babyCallNameList"></babyList>
			</view>
		</view>
		
		<view class="mainBox">
			<view class="titleBox">
				<view class="title">客户信息</view>
				<view class="add" @click="addPerson">新增</view>
			</view>
			<view class="infoList" v-for="(item,index) in personDtos" :key="item.id">
				<view class="delBox">
					<view class="del" v-if="index > 0" @click="delPerson(index)">删除</view>
				</view>
				<personList ref="person" :info="item" :callNameList="personCallNameList"></personList>
			</view>
		</view>
		
		<view class="save" @click="save">保存</view>
		
	</view>
</template>

<script>
	import babyList from './list/babyList.vue'
	import personList from './list/personList.vue'
	import { getCallName } from '@/util/api/goods.js'
	import { mapGetters } from 'vuex'
	import { getOrderDetails, updataPersonnel } from '@/util/api/shop.js'
	export default {
		components:{
			babyList,
			personList
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
				
				// 宝宝列表
				babyDtos:[],
				// 客户列表
				personDtos:[],
				
				// 接口params
				personnelInfo:{
					// 新增宝宝
					addCustomerBabyDtos:[],
					// 新增客户
					addCustomerContactDtos:[],
					// 删除宝宝的ID
					deleteBabyIds:[],
					// 删除用户的ID
					deleteRelationIds:[],
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
			getOrderDetails({orderId:Number(option.id)}).then(res=>{
				let data = res.data.data
				this.type = data.type
				if(data.type === 'BABY'){
					this.isBaby = true
					this.getCallName(false)
				}
				this.getCallName(true)
				// 客户组ID
				this.personnelInfo.groupId = data.customerGroupVo.id,
				// 获取客户列表
				this.personDtos = data.customerGroupVo.relationCustomerContactVos
				// 获取宝宝列表
				this.babyDtos = data.customerGroupVo.customerBabyVos
			})
		},
		mounted(){
			// 当前门店ID
			this.personnelInfo.shopId = this.shopId
		},
		methods:{
			// 添加宝宝
			addBaby(){
				let info={
					birthdayLunar:null,	
					birthdayStr:null,
					birthdayTime:null,
					callName:this.babyCallNameList[0].name,
					display:true,
					name:null,
					sex:this.babyCallNameList[0].sex,
					zodiac:null,
				}
				if(this.babyDtos.length >= 3){
					uni.showToast({
						title:'宝宝不能超过三个',
						icon:'none'
					})
				}else{
					this.babyDtos.push(info)
				}
			},
			
			// 新增客户
			addPerson(){
				let info = {
					address: null,
					birthdayLunar: null,
					birthdayStr: null,
					birthdayTime: null,
					callName: this.personCallNameList[0].name,
					display: true,
					mobile: null,
					name: null,
					qq: null,
					sex: this.personCallNameList[0].sex,
					tel: null,
					wechat: null,
					workUnit: null,
				}
				if(this.personDtos.length >= 2){
					uni.showToast({
						title:'客户不能超过两个',
						icon:'none'
					})
				}else{
					this.personDtos.push(info)
				}
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
			
			// 删除宝宝
			delBaby(index){
				// 获取删除对象
				let delBaby = this.babyDtos[index]
				if(delBaby.id){
					this.personnelInfo.deleteBabyIds.push(delBaby.id)
				}
				this.babyDtos.splice(index,1)
			},
			// 删除客户
			delPerson(index){
				// 获取删除对象
				let delPerson = this.personDtos[index]
				if(delPerson.id){
					this.personnelInfo.deleteRelationIds.push(delPerson.id)
				}
				this.personDtos.splice(index,1)
			},
			
			save(){
				// 新增宝宝
				let newBaby = []
				// 修改宝宝
				let updataBaby = []
				// 新增客户
				let newPerson = []
				// 修改客户
				let updataPerson = []
				if(this.isBaby){
					this.$refs.baby.forEach((i)=>{
						let babyInfo = i.save()
						if(babyInfo.id){
							updataBaby.push(babyInfo)
						}else{
							newBaby.push(babyInfo)
						}
					})
				}
				this.$refs.person.forEach((i)=>{
					let personInfo = i.save()
					if(personInfo.id){
						updataPerson.push(personInfo)
					}else{
						newPerson.push(personInfo)
					}
				})
				// 新增宝宝
				this.personnelInfo.addCustomerBabyDtos = newBaby
				// 新增客户
				this.personnelInfo.addCustomerContactDtos = newPerson
				// 修改宝宝
				this.personnelInfo.updateCustomerBabyDtos = updataBaby
				// 修改客户
				this.personnelInfo.updateRelationCustomerContactDtos = updataPerson
				
				updataPersonnel(this.personnelInfo).then(res=>{
					if(res.data.code === 200){
						uni.navigateBack({
							delta:1
						})
					}
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
.bigBox{
	.mainBox{
		.titleBox{
			display: flex;
			justify-content: space-between;
			border-left: 8rpx solid #61A3FF;
			margin: 10rpx 30rpx;
			.title{
				margin-left: 30rpx;
			}
			.add{
				background-color: #61A3FF;
				font-size: 24rpx;
				width: 80rpx;
				height: 40rpx;
				border-radius: 10rpx;
				line-height: 40rpx;
				text-align: center;
				color: #FFFFFF;
				margin: auto 0;
			}
		}
		.infoList{
			.delBox{
				display: flex;
				flex-direction: row-reverse;
				.del{
					background-color: #FF0000;
					font-size: 24rpx;
					width: 80rpx;
					height: 40rpx;
					border-radius: 10rpx;
					line-height: 40rpx;
					text-align: center;
					color: #FFFFFF;
					margin: auto 30rpx;
				}
			}
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
