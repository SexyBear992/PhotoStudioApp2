<template>
	<view>
		<view class="titleTop">主 联系人</view>
		<view class="listBox">
			<view class="title">姓名</view>
			<input type="text" placeholder="姓名" v-model="params.name"/>
		</view>
		<view class="listBox">
			<view class="title">性别</view>
			<picker
				@change="enList"
				:value="index" 
				:range="sexArr" 
			>
				<view class="picker">
					<view class="text">{{sexArr[index]}}</view>
					<i-icon class="icon" type="enter" size="16" color="#80848f"/>
				</view>
			</picker>
		</view>
		<view class="listBox">
			<view class="title">手机</view>
			<input type="number" placeholder="手机" v-model="params.phone"/>
		</view>
		<view class="listBox">
			<view class="title">Q Q</view>
			<input type="number" placeholder="QQ" v-model="params.qqNumber"/>
		</view>
		<view class="listBox">
			<view class="title">微信</view>
			<input type="text" placeholder="姓名"/>
		</view>
		<!-- 客户区域 -->
		<category :city="params.city" :province="params.province" :region="params.region" @getCategory="getCategory"></category>
		<!-- 来源 -->
		<userSource :soureId="params.soureId" @getOrigin="getOrigin"></userSource>
		<!-- 生日 -->
		<view class="listBox">
			<view class="title">生日</view>
			<view class="dayRight">
				<view @click="openCalendar" class="time">{{showTime}}</view>
				<view class="lunar">
					<span v-if="Boolean(params.birthdayLunar)">农历</span>
					<span v-else>新历</span>
					<switch @change="changeLunar" :checked="Boolean(params.birthdayLunar)" color="#61a3ff" class="switch"/>
				</view>
			</view>
		</view>
		<!-- 老客姓名 -->
		<view class="listBox">
			<view class="title">老客姓名</view>
			<input type="text" placeholder="老客姓名" v-model="params.regularCustomerName"/>
		</view>
		<!-- 老客手机 -->
		<view class="listBox">
			<view class="title">老客手机</view>
			<input type="number" placeholder="老客手机" v-model="params.regularCustomerPhone"/>
		</view>
		
		<view class="button" v-if="oldUser" @click="save('update')">修改录入</view>
		<view class="button" v-else @click="save('add')">保存录入</view>
		
		<!-- 日历 -->
		<uni-calendar 
			:insert="false"
			:lunar="true" 
			:clearDate='true'
			@confirm="enSure"
			ref="calendar"
		/>
		<i-message id="message" />
		
	</view>
</template>

<script>
	const { $Message } = require('@/wxcomponents/base/index.js');
	import uniCalendar from '@/components/uni/uni-calendar/uni-calendar.vue'
	import category from '../components/category.vue'
	import userSource from '../components/userSource.vue'
	import { addCustomer, updateCustomer } from '@/util/api/common.js'
	export default {
		components:{
			uniCalendar,
			userSource,
			category
		},
		data() {
			return {
				type:null,
				showTime:'生日',
				index:0,
				sexArr:['男','女'],
				// 重复客资信息
				repeatData:null,
				oldUser:null,
				params:{
					birthdayTime:null,	// 生日
					birthdayLunar:0, // 生日是否农历
					callId:null, 
					cid:null, //来源第一层Id
					city:null, //城市
					country:'中国', //国家
					customerContacts:null, //次联系人 宝宝
					customerId:null, //用户Id
					dueDate:null, //孕妈日期
					extend:null,	
					name:null, // 姓名
					phone:null, // 手机
					province:null, //市
					qqNumber:null, // QQ 
					region:null, //区
					regularCustomerName:null, // 老客姓名
					regularCustomerPhone:null, // 老客手机
					sex:'男', // 性别
					sid:null,
					soureId:null, //来源ID
					state:4, 
					wbNumer:null, 
					wxNumber:null, // 微信
					weddingDay:null, //结婚日期
					customerContacts:[],
				}
			};
		},
		onLoad(op){
			this.type = op.type
		},
		onShow(){
			this.$forceUpdate()
			let pages = getCurrentPages()
			let currPages = pages[pages.length - 1]
			this.oldUser = currPages.data.repeatUser
			if(this.oldUser){
				let soureId = [this.oldUser.cid,this.oldUser.sid]
				this.oldUser.soureId = soureId
				Object.assign(this.params,this.oldUser)
				if(this.params.sex === '男'){
					this.index = 0
				}else{
					this.index = 1
				}
			}
		},
		methods:{
			save(type){
				if(this.oldUser){
					delete this.params.customerContacts
					this.params.extend = null
					this.updateCustomer()
				}else{
					if(this.params.name !== null){
						this.addCustomer()
					}else{
						$Message({
								content: '主联系人名字不能为空',
								type: 'warning'
						});
					}
				}
			},
			// 获取客户区域
			getCategory(e){
				Object.assign(this.params,e)
			},
			// 获取客户来源
			getOrigin(e){
				Object.assign(this.params,e)
			},
			openCalendar(){
				this.$refs.calendar.open()
			},
			// 日历选中确定返回值
			enSure(e){
				this.showTime = e.fulldate
				this.params.birthdayTime = `${this.showTime} 0:0:0`
			},
			enList(e){
				this.index = e.detail.value
				this.params.sex = this.sexArr[this.index]
			},
			changeLunar(e){
				if(e.target.value){
					this.params.birthdayLunar = 1
				}else{
					this.params.birthdayLunar = 0
				}
			},
			// 新增
			addCustomer(){
				addCustomer(this.params).then(res=>{
					if(res.data.code === 1000){
						let url
						if(this.type === 'individual'){
							url = '../individualOrder/addIndividual/addIndividual?id=' + res.data.data.customerId
						}else{
							url = '../retention/retentionChange/retentionChange?type=add&id=' + res.data.data.customerId
						}
						uni.redirectTo({
							url:url
						})
					}else if(res.data.code === 5000){
						this.repeatData = res.data.data
						uni.navigateTo({
							url:'./repeat/repeat'
						})
					}
				})
			},
			// 修改
			updateCustomer(){
				updateCustomer(this.params).then(res=>{
					if(res.data.code === 1000){
						let url
						if(this.type === 'individual'){
							url = '../individualOrder/addIndividual/addIndividual?id=' + res.data.data.customerId
						}else{
							url = '../retention/retentionChange/retentionChange?type=add&id=' + res.data.data.customerId
						}
						uni.redirectTo({
							url:url
						})
					}
				})
			},
		},
	}
</script>

<style lang="scss">
	.titleTop{
		font-size: 38rpx;
		margin: 20rpx 30rpx;
		font-weight: bold;
	}
	.listBox{
		display: flex;
		font-size: 28rpx;
		margin: 0 30rpx;
		padding: 20rpx 0;
		border-bottom: 1rpx solid #f9f9f9;
		.title{
			margin-right: 30rpx;
		}
		.dayRight{
			display: flex;
			justify-content: space-between;
			.time{
				width: 450rpx;
			}
			.lunar{
				display: flex;
			}
			.switch{
				margin-top: 0;
				margin-right: -20rpx;
				margin: -10rpx -20rpx -20rpx 0;
				transform:scale(0.5);
			}
		}
		.text{
			color: #8d8d8d;
			width: 480rpx;
		}
		input{
			width: 400rpx;
			margin-top: -7rpx;
		}
		.picker{
			display: flex;
			justify-content: space-between;
			width: 605rpx;
		}
	}
	.button{
		position: fixed;
		bottom: 30rpx;
		width: 600rpx;
		color: #FFFFFF;
		background-color: #61A3FF;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		border-radius: 40rpx;
		font-size: 32rpx;
		margin: 0 auto;
		margin-left: 50%;
		transform: translateX(-50%);
		margin-bottom: 30rpx;
	}
</style>
