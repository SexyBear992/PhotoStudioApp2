<template>
	<view>
		<view class="box"  v-if="params.length > 0">
			<view class="titleTop">客户联系人信息</view>
			<view v-for="(item,index) in params" :key="index">
				<!-- 昵称 -->
				<callName :callNameArr="callNameArr" :callName.sync="item.callName"></callName>
				<!-- 性别 -->
				<view class="bigBox">
					<view class="left">
						<view class="title">性别</view>
						<view class="text">{{item.sex ? '男' : '女' }}</view>
					</view>
				</view>
				<!-- 姓名 -->
				<view class="bigBox">
					<view class="left">
						<view class="title">姓名</view>
						<view class="text">{{item.name}}</view>
					</view>
				</view>
				<!-- 电话 -->
				<view class="bigBox">
					<view class="left">
						<view class="title">电话</view>
						<view class="text">{{item.mobile | noData('电话')}}</view>
					</view>
				</view>
				<!-- Q Q -->
				<view class="bigBox">
					<view class="left">
						<view class="title">Q Q</view>
						<view class="text">{{item.qq | noData('QQ')}}</view>
					</view>
				</view>
				<!-- 微信 -->
				<view class="bigBox">
					<view class="left">
						<view class="title">微信</view>
						<view class="text">{{item.wechat | noData('微信')}}</view>
					</view>
				</view>
				<!-- 生日 -->
				<view class="bigBox last">
					<view class="left">
						<view class="title">生日</view>
						<view class="text">{{item.birthdayTime | time}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import callName from './components/callName.vue'
	import { getCallName } from '@/util/api/goods.js'
	export default{
		props:['mainContact','secondContact','type'],
		components:{
			callName
		},
		filters:{
			noData(data,text){
				if(Boolean(data)){
					return data
				}else{
					return text
				}
			},
		},
		data(){
			return{
				// 昵称
				callNameArr:null,
				params:[]
			}
		},
		mounted(){
			this.getCallName()
		},
		methods:{
			// 获取昵称
			getCallName(){
				getCallName({type:this.type,isAdults:true}).then(res=>{
					this.callNameArr = res.data.data
				})
			},
			// 主联系人赋值
			getMainParams(){
				let m = this.mainContact
				let p = {
					address:m.address,	//地址	
					birthdayLunar: (m.birthdayLunar == 0) ? false : true,	//是否农历	
					birthdayTime:Boolean(m.birthdayTime) ? Date.parse(new Date(m.birthdayTime)) : null,	//出生日期	
					callName:null,	//	联系人称呼
					ccId:m.customerId,	//从客户ID	
					customerId:m.customerId,	//主客户ID	
					display:true,	//是否显示	
					email:m.email,	//邮箱
					main:true,	//是否主联系人	
					mobile:m.phone,	//手机号码	
					name:m.name,	//客户姓名	
					qq:m.qqNumber,	//QQ
					sex:Boolean(m.sex === '男') ? true : false,	//性别
					tel:m.telphone,	//固定电话	
					wechat:m.wxNumber,	//微信
				}
				this.params.push(p)
				this.$forceUpdate()
			},
			// 次联系人赋值
			getSecondParams(){
				let s = (this.secondContact.filter((i)=>{return i.type === 1}))[0]
				let p = {
					address:null,	//地址	
					birthdayLunar:(s.birthdayLunar == 0) ? false : true,	//是否农历	
					birthdayTime:Boolean(s.birthdayTime) ? Date.parse(new Date(s.birthdayTime.split(/[ ]+/)[0])) : null,	//出生日期
					callName:null,	//	联系人称呼
					ccId:s.ccId,	//从客户ID	
					customerId:s.customerId,	//主客户ID	
					display:true,	//是否显示	
					email:s.email,	//邮箱
					main:false,	//是否主联系人	
					mobile:s.phone,	//手机号码	
					name:s.name,	//客户姓名	
					qq:s.qqNumber,	//QQ
					sex:Boolean(s.sex === '男') ? true : false,	//性别
					tel:null,	//固定电话	
					wechat:s.wxNumber,	//微信
				}
				this.params.push(p)
				this.$forceUpdate()
			},
			save(){
				return this.params
			}
		},
		watch:{
			mainContact(){
				this.getMainParams()
			},
			secondContact(){
				this.getSecondParams()
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './components/moduleStyle.scss';
	.last{
		border-bottom: 2rpx solid #DDD;
	}
</style>
