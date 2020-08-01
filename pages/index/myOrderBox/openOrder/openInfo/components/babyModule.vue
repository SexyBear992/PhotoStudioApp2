/*******************************  宝宝模块  *********************************/

<template>
	<view>
		<view class="box">
			<view class="title">宝宝信息</view>
			
			<view class="addBut">
				<view class="but" @click="addBaby">新增</view>
			</view>
			
			<view class="userBox" v-for="(item,index) in newCustomerBabyDtos" :key="index">
				
				<view class="addBut" v-if="index > 0">
					<view class="but" @click="remove(index)">删除</view>
				</view>
				
				<cell :title="'昵称'" :list="callNameListToCell" @changeValue="changeCallName($event,index)" :callNameIndex="callNameIndex"></cell>
				
				<view class="listBox">
					<view class="listTitle">姓名</view>
					<input type="text" placeholder="姓名" v-model="item.name"/>
				</view>
				
				<Lunar  :timeTitle="'生日'" @typeTimeValue="birthday($event,index)"></Lunar>
				
				<view class="bot" v-if="item.zodiac !== null">
					<view class="listTitle">生肖</view>
					<view class="text">{{item.zodiac}}</view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	import cell from '@/components/cell.vue'
	import Lunar from '@/components/Lunar.vue'
	import { getCallName } from '@/util/api/goods.js'
	export default{
		props:['type'],
		components:{
			cell,
			Lunar
		},
		data(){
			return{
				// 昵称数组
				callNameList:[],
				// cell所需的昵称数组
				callNameListToCell:[],
				
				// 第一联系人 昵称下标
				callNameIndex:0,
				
				// 新增宝宝信息
				newCustomerBabyDtos:[]
				
			}
		},
		mounted(){
			this.getCallName()
			this.addBaby()
		},
		methods:{
			
			// 获得昵称
			getCallName(){
				getCallName({isAdults:false , type:this.type}).then(res=>{
					this.callNameList = res.data.data
					this.callNameListToCellFun()
				})
			},
			// 创建数组模块
			callNameListToCellFun(){
				let arr = this.callNameList.map((i)=>{
					return i.name
				})
				this.callNameListToCell = arr
			},
			
			// 新增宝宝
			addBaby(){
				let arr = {
					birthdayLunar:false,	//生日是农历还是阴历		
					birthdayStr:null,	//出生日期		
					birthdayTime:null,	//出生日期		
					callName:null,	//宝宝称呼		
					display:false,	//是否显示		
					name:null,	//宝宝姓名		
					sex:false,	//性别
					zodiac:null //生肖
				}
				if(this.newCustomerBabyDtos.length >= 3){
					uni.showToast({
						title:'宝宝不能超过三个',
						icon:'none'
					})
				}else{
					this.newCustomerBabyDtos.push(arr)
				}
			},
			
			// 生日返回
			birthday(e,index){
				this.newCustomerBabyDtos[index].zodiac = e.zodiac
				this.newCustomerBabyDtos[index].birthdayLunar = e.typeLunar
				this.newCustomerBabyDtos[index].birthdayTime = e.typeTime
				this.newCustomerBabyDtos[index].birthdayStr = e.typeStr
			},
			
			// 删除宝宝
			remove(index){
				this.newCustomerBabyDtos.splice(index,1)
			},
			changeCallName(e,index){
				this.newCustomerBabyDtos[index].callName = e
				this.callNameList.some((i)=>{
					if(i.name === e){
						this.newCustomerBabyDtos[index].sex = i.sex
					}
				})
			},
		
			// 保存
			save(){
				return this.newCustomerBabyDtos
			},
		},
		watch:{
			// newCustomerBabyDtos:{
			// 	deep:true,
			// 	handler(){
			// 		console.log('宝宝信息',this.newCustomerBabyDtos)
			// 	}
			// }
		}
	}
</script>

<style lang="scss" scoped>
	.title{
		font-size: 38rpx;
		margin-left: 30rpx;
		margin-top: 30rpx;
		font-weight: bold;
	}
	.addBut{
		display: flex;
		flex-direction: row-reverse;
		font-size: 28rpx;
		padding: 0 30rpx;
	}
	.listBox{
		height: 80rpx;
		display: flex;
		margin: 0 30rpx;
		border-bottom: 1rpx solid #f9f9f9;
		font-size: 28rpx;
		line-height: 80rpx;
		input{
			width: 550rpx;
			margin-left: 30rpx;
			margin-top: 18rpx;
		}
	}
	.bot{
		height: 80rpx;
		display: flex;
		margin: 0 30rpx;
		border-bottom: 1rpx solid #f9f9f9;
		font-size: 28rpx;
		line-height: 80rpx;
		.text{
			margin-left: 30rpx;
		}
	}
</style>
