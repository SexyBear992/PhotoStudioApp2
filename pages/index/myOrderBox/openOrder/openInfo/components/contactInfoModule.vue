/*****************  客户联系人信息模块  *****************/
<template>
	<view>
		<view class="box">
			<view class="title">客户联系人信息</view>
			<view class="addButBox">
				<view class="add" @click="addUser">新增</view>
			</view>
			<!-- 第一联系人 -->
			<view class="userBox" v-for="(item,index) in newCustomerContactDtos" :key="index">
				
				<view class="addButBox" v-if="index > 0 && isUserSec">
					<view class="add" @click="remove(index)">删除</view>
				</view>
				
				<cell :title="'昵称'" :list="callNameListToCell" @changeValue="changeCallName($event,index)" :callNameIndex="item.sex ? 1 : 0"></cell>
				<!-- <cell v-if="index === 1" :title="'昵称'" :list="callNameListToCell" @changeValue="changeCallName($event,index)" :callNameIndex="callNameIndexS"></cell> -->
				
				<view class="listBox">
					<view class="listTitle">姓名</view>
					<input type="text" placeholder="姓名" v-model="item.name"/>
				</view>
				
				<view class="listBox">
					<view class="listTitle">手机</view>
					<input  placeholder="手机" type="number" v-model="item.mobile" :disabled="!isChackMobile"/>
				</view>
				
				<view class="listBox">
					<view class="listTitle">QQ</view>
					<input  placeholder="QQ" type="number" v-model="item.qq"/>
				</view>
				
				<view class="listBox">
					<view class="listTitle">微信</view>
					<input type="text" placeholder="微信" v-model="item.wechat"/>
				</view>
				
				<Lunar  :timeTitle="'生日'" @typeTimeValue="birthday($event,index)"></Lunar>
				
				<view class="bottom"></view>
			</view>
			
			<customerMadal v-if="customerMadal" :customerData="customerData" @cancel="cancel" @ok="ok"></customerMadal>
		</view>
	</view>
</template>

<script>
	import { getCustomerMobileList } from '@/util/api/shop.js'
	import { getCallName } from '@/util/api/goods.js'
	import Lunar from '@/components/Lunar.vue'
	import cell from '@/components/cell.vue'
	import customerMadal from './customerMadal.vue'
	export default{
		props:['type'],
		components:{
			Lunar,
			cell,
			customerMadal
		},
		data(){
			return {
				// 昵称数组
				callNameList:[],
				// cell所需的昵称数组
				callNameListToCell:[],
				
				// 是否可删除第二联系人
				isUserSec:true,
				
				// 是否需要通过手机查询
				isChackMobile:true,
				// 手机查询模态框
				customerMadal:false,
				// 手机查询返回值
				customerData:null,
					
				// 新增联系人 保存订单
				newCustomerContactDtos:[],
					
	
			}
		},
		mounted(){
			this.getCallName()
			this.addUser()

			if(this.type === 'WEDDING_DRESS' 
				|| this.type === 'BABY' 
				|| this.type === 'PREGNANT' 
				|| this.type === 'WEDDING'
			){
				this.isUserSec = false
				this.addUser()
				this.newCustomerContactDtos[1].sex = true
			}
		},
		methods:{
			// 新增联系人
			addUser(){
				let arr = {
					birthdayLunar: false, // 是否农历
					birthdayTime: null, // 生日时间
					birthdayStr: null, // 生日时间字符串
					callId: null, // 称呼id
					callName: null, // 称呼
					name: null, // 客户姓名
					display: true, // 订单是否显示
					mobile: null, // 手机号码
					sex: false, // 客户性别
					qq: null, // 客户qq
					wechat: null, // 微信,
					tel: null, // 固定电话
					workUnit: null, // 工作单位
					address: null, // 家庭地址
					otherShow: false
				}
				if(this.newCustomerContactDtos.length >= 2){
					uni.showToast({
						title:'联系人不能超过两个',
						icon:'none'
					})
				}else{
					this.newCustomerContactDtos.push(arr)
				}
			},
			
			// 删除联系人
			remove(index){
				this.newCustomerContactDtos.splice(index,1)
			},
			
			// 获得昵称
			getCallName(){
				getCallName({isAdults:true , type:this.type}).then(res=>{
					this.callNameList = res.data.data
					this.callNameListToCellFun()
				})
			},
		
			/*************   创建数组模块  picker只能传数组，需把接口返回的对象封装为数组 **********/
			callNameListToCellFun(){
				let arr = this.callNameList.map((i)=>{
					return i.name
				})
				this.callNameListToCell = arr
			},
			
			/*********************************   组件选择返回值模块   *********************************/
			//  昵称返回值
			changeCallName(e,index){
				this.callNameList.some((i)=>{
					if(i.name === e){
						this.newCustomerContactDtos[index].callName = i.name
						this.newCustomerContactDtos[index].sex = i.sex
						this.newCustomerContactDtos[index].callId = i.id
					}
				})
			},
			
			//  生日返回
			birthday(e,index){
				this.newCustomerContactDtos[index].birthdayLunar = e.typeLunar
				this.newCustomerContactDtos[index].birthdayTime = e.typeTime
				this.newCustomerContactDtos[index].birthdayStr = e.typeStr
			},
			
			// 选择联系人返回值 取消
			cancel(e){
				this.customerMadal = e
			},
			// 选择联系人返回值 确定
			ok(e){
				this.customerMadal = false
				this.isChackMobile = false
				
				// console.log(this.callNameIndexF)
				this.newCustomerContactDtos[0].address = e[0].address
				this.newCustomerContactDtos[0].birthdayLunar = e[0].birthdayLunar
				this.newCustomerContactDtos[0].birthdayStr = e[0].birthdayStr
				this.newCustomerContactDtos[0].birthdayTime = e[0].birthdayTime
				this.newCustomerContactDtos[0].email = e[0].email
				this.newCustomerContactDtos[0].id = e[0].id
				this.newCustomerContactDtos[0].idCard = e[0].idCard
				this.newCustomerContactDtos[0].mobile = e[0].mobile
				this.newCustomerContactDtos[0].name = e[0].name
				// this.newCustomerContactDtos[0].sex = e[0].sex
				this.newCustomerContactDtos[0].tel = e[0].tel
				this.newCustomerContactDtos[0].wechat = e[0].wechat
				this.newCustomerContactDtos[0].workUnit = e[0].workUnit
				
				if(e[1]){
					this.newCustomerContactDtos[0].address = e[1].address
					this.newCustomerContactDtos[1].birthdayLunar = e[1].birthdayLunar
					this.newCustomerContactDtos[1].birthdayStr = e[1].birthdayStr
					this.newCustomerContactDtos[1].birthdayTime = e[1].birthdayTime
					this.newCustomerContactDtos[1].email = e[1].email
					this.newCustomerContactDtos[1].id = e[1].id
					this.newCustomerContactDtos[1].idCard = e[1].idCard
					this.newCustomerContactDtos[1].mobile = e[1].mobile
					this.newCustomerContactDtos[1].name = e[1].name
					// this.newCustomerContactDtos[1].sex = e[1].sex
					this.newCustomerContactDtos[1].tel = e[1].tel
					this.newCustomerContactDtos[1].wechat = e[1].wechat
					this.newCustomerContactDtos[1].workUnit = e[1].workUnit
				}
			},
		
			// 保存订单
			save(){
				return this.newCustomerContactDtos
			},
		},
		watch:{
			newCustomerContactDtos:{
				deep:true,
				handler(){
					if(this.newCustomerContactDtos[0].mobile){
						if(this.newCustomerContactDtos[0].mobile.length === 11 && this.isChackMobile){
							getCustomerMobileList({mobile : this.newCustomerContactDtos[0].mobile}).then(res=>{
								if(res.data.data.length > 0){
									this.customerData = res.data.data
									this.customerMadal = true
								}
							})
						}
					}
				}
			}
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
	.addButBox{
		display: flex;
		flex-direction: row-reverse;
		padding: 0 30rpx;
		font-size: 28rpx;
		height: 50rpx;
		line-height: 50rpx;
		.add{
			
		}
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
	.bottom{
		border-bottom: 2rpx solid #808080;
		margin: 0 30rpx
	}
</style>
