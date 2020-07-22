/*****************  客户联系人信息模块  *****************/
<template>
	<view>
		<view class="box">
			<view class="title">客户联系人信息</view>
			<!-- 第一联系人 -->
			<view class="userBox">
				
				<cell :title="'昵称'" :list="callNameListToCell" @changeValue="changeCallNameFirst" :callNameIndex="callNameIndexF"></cell>
				
				<view class="listBox">
					<view class="listTitle">姓名</view>
					<input type="text" placeholder="姓名" v-model="newCustomerContactDtos[0].name"/>
				</view>
				
				<view class="listBox">
					<view class="listTitle">手机</view>
					<input  placeholder="手机" type="number" v-model="newCustomerContactDtos[0].mobile" :disabled="!isChackMobile"/>
				</view>
				
				<view class="listBox">
					<view class="listTitle">QQ</view>
					<input  placeholder="QQ" type="number" v-model="newCustomerContactDtos[0].qq"/>
				</view>
				
				<view class="listBox">
					<view class="listTitle">微信</view>
					<input type="text" placeholder="微信" v-model="newCustomerContactDtos[0].wechat"/>
				</view>
				
				<Lunar  :timeTitle="'生日'" @typeTimeValue="birthdayFirst"></Lunar>
				
				<view class="bottom"></view>
			</view>
			
			<!-- 第二联系人 -->
			<view v-if="isUserSec" class="userBox">
				
				<cell :title="'昵称'" :list="callNameListToCell" @changeValue="changeCallNameSecond" :callNameIndex = "callNameIndexS"></cell>
				
				<view class="listBox">
					<view class="listTitle">姓名</view>
					<input type="text" placeholder="姓名" v-model="newCustomerContactDtos[1].name"/>
				</view>
				
				<view class="listBox">
					<view class="listTitle">手机</view>
					<input  placeholder="手机" type ="number" v-model="newCustomerContactDtos[1].mobile"/>
				</view>
				
				<view class="listBox">
					<view class="listTitle">QQ</view>
					<input placeholder="QQ" type ="number" v-model="newCustomerContactDtos[1].qq"/>
				</view>
				
				<view class="listBox">
					<view class="listTitle">微信</view>
					<input type="text" placeholder="微信" v-model="newCustomerContactDtos[1].wechat"/>
				</view>
				
				<Lunar  :timeTitle="'生日'" @typeTimeValue="birthdaySecond"></Lunar>
				
				<view class="bottom"></view>
			</view>
			
			<customerMadal v-if="customerMadal" :customerData="customerData" @cancel="cancel" @ok="ok"></customerMadal>
		</view>
	</view>
</template>

<script>
	import { getCallName, getCustomerMobileList } from '@/util/api/shop.js'
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
				// 开单类型
				AssemblyName:null,
				// 是否有第二联系人
				isUserSec:false,
				// 昵称数组
				callNameList:[],
				// cell所需的昵称数组
				callNameListToCell:[],
				
				// 第一联系人 昵称下标
				callNameIndexF:0,
				// 第二联系人 昵称下标
				callNameIndexS:1,
				
				// 是否需要通过手机查询
				isChackMobile:true,
				// 手机查询模态框
				customerMadal:false,
				// 手机查询返回值
				customerData:null,
					
				// 新增联系人 保存订单
				newCustomerContactDtos:[
					{
						birthdayLunar: false, // 是否农历
						birthdayTime: '', // 生日时间
						birthdayStr: '', // 生日时间字符串
						callId: null, // 称呼id
						callName: '', // 称呼
						name: '', // 客户姓名
						display: true, // 订单是否显示
						mobile: '', // 手机号码
						sex: true, // 客户性别
						qq: '', // 客户qq
						wechat: '', // 微信,
						tel: '', // 固定电话
						workUnit: '', // 工作单位
						address: '', // 家庭地址
						otherShow: false
					},
					{
						birthdayLunar: false, // 是否农历
						birthdayTime: '', // 生日时间
						birthdayStr: '', // 生日时间字符串
						callId: null, // 称呼id
						callName: '', // 称呼
						name: '', // 客户姓名
						display: true, // 订单是否显示
						mobile: '', // 手机号码
						sex: true, // 客户性别
						qq: '', // 客户qq
						wechat: '', // 微信,
						tel: '', // 固定电话
						workUnit: '', // 工作单位
						address: '', // 家庭地址
						otherShow: false
					}],

			}
		},
		mounted(){
			this.AssemblyName =	this.getAssemblyName(this.type)
			this.getCallName()
			if(this.type === 'hs' || 'et' || 'ym' || 'hq'){
				this.isUserSec = true
			}
		},
		methods:{
			
			// 获取套系类型名字
			getAssemblyName(type){
				switch(type){
					case 'hs':
						return 'WEDDING_DRESS';
						break;
					case 'et':
						return 'BABY';
						break;
					case 'ym':
						return 'PREGNANT';
						break;
					case 'xz':
						return 'PORTRAY';
						break;
					case 'fw':
						return 'SERVICE';
						break;
					case 'hq':
						return 'WEDDING';
						break;
				}
			},
			
			// 获得昵称
			getCallName(){
				getCallName({isAdults:true , type:this.AssemblyName}).then(res=>{
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
			// 第一联系人 昵称返回值
			changeCallNameFirst(e){
				this.callNameList.some((i)=>{
					if(i.name === e){
						this.newCustomerContactDtos[0].callName = i.name
						this.newCustomerContactDtos[0].sex = i.sex
						this.newCustomerContactDtos[0].callId = i.id
						// console.log(i.sex)
						// 如果第一联系人性别为男 第一联系人下标为 1
						if(i.sex){
							this.callNameIndexS = 0
							// this.callNameIndexF = 1
						}else{
							this.callNameIndexS = 1
							// this.callNameIndexF = 0							
						}
						this.newCustomerContactDtos[1].callName = this.callNameList[this.callNameIndexS].name
						this.newCustomerContactDtos[1].sex = this.callNameList[this.callNameIndexS].sex
						this.newCustomerContactDtos[1].callId = this.callNameList[this.callNameIndexS].id
					}
				})
	
			},
			// 第二联系人 昵称返回值
			changeCallNameSecond(e){
				this.callNameList.some((i)=>{
					if(i.name === e){
						this.newCustomerContactDtos[1].callName = i.name
						this.newCustomerContactDtos[1].sex = i.sex
						this.newCustomerContactDtos[1].callId = i.id
						if(i.sex){
							this.callNameIndexF = 0
						}else{
							this.callNameIndexF = 1							
						}
						this.newCustomerContactDtos[0].callName = this.callNameList[this.callNameIndexF].name
						this.newCustomerContactDtos[0].sex = this.callNameList[this.callNameIndexF].sex
						this.newCustomerContactDtos[0].callId = this.callNameList[this.callNameIndexF].id
					}
				})
			},
	
			// 第一联系人 生日返回
			birthdayFirst(e){
				this.newCustomerContactDtos[0].birthdayLunar = e.typeLunar
				this.newCustomerContactDtos[0].birthdayTime = e.typeTime
				this.newCustomerContactDtos[0].birthdayStr = e.typeStr
			},
			// 第二联系人 生日返回
			birthdaySecond(e){
				this.newCustomerContactDtos[1].birthdayLunar = e.typeLunar
				this.newCustomerContactDtos[1].birthdayTime = e.typeTime
				this.newCustomerContactDtos[1].birthdayStr = e.typeStr
			},
			
			// 选择联系人返回值 取消
			cancel(e){
				this.customerMadal = e
			},
			// 选择联系人返回值 确定
			ok(e){
				this.customerMadal = false
				this.isChackMobile = false
				this.newCustomerContactDtos[0] = e[0] 
				if(e[0].sex){
					this.callNameIndexS = 0
					this.callNameIndexF = 1
				}else{
					this.callNameIndexS = 1
					this.callNameIndexF = 0							
				}
				this.newCustomerContactDtos[1].callName = this.callNameList[this.callNameIndexS].name
				this.newCustomerContactDtos[1].sex = this.callNameList[this.callNameIndexS].sex
				this.newCustomerContactDtos[1].callId = this.callNameList[this.callNameIndexS].id
				
				if(e[1]){
					this.newCustomerContactDtos[1] = e[1]
				}
			},
		
			// 保存订单
			save(){
				return this.newCustomerContactDtos
			},
		},
		watch:{
			// 第一联系人 内容改变监听
			// newCustomerContactDtos[0]mobile:{
			// 	deep:true,
			// 	handler(newVal,oldVal){
			// 		this.newCustomerContactDtos[0] = this.userDataFirst
				
			// 		// 打开模态框 赋值
			// 		if(this.userDataFirst.mobile.length == 11 && this.isChackMobile){
			// 			getCustomerMobileList({mobile : this.userDataFirst.mobile}).then(res=>{
			// 				if(res.data.data.length > 0){
			// 					this.customerData = res.data.data
			// 					this.customerMadal = true
			// 				}
			// 			})
			// 		}
			// 	}
			// },
			newCustomerContactDtos:{
				deep:true,
				handler(){
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
</script>

<style lang="scss" scoped>
	.title{
		font-size: 38rpx;
		margin-left: 30rpx;
		margin-top: 30rpx;
		font-weight: bold;
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
