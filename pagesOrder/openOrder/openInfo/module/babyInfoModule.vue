<template>
	<view>
		<view class="box" v-if="params.length > 0">
			<view class="titleTop">宝宝信息</view>
			<view v-for="(item,index) in params" :key="index">
				<callName :callNameArr="callNameArr" :callName.sync="item.callName"></callName>
				<!-- 姓名 -->
				<view class="bigBox">
					<view class="left">
						<view class="title">姓名</view>
						<view class="text">{{item.name}}</view>
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
		props:['secondContact'],
		components:{
			callName
		},
		data(){
			return{
				callNameArr:[],
				params:[],
			}
		},
		mounted(){
			this.getCallName()
		},
		methods:{
			// 获取昵称
			getCallName(){
				getCallName({type:'BABY',isAdults:false}).then(res=>{
					this.callNameArr = res.data.data
				})
			},
			save(){
				return this.params
			}
		},
		watch:{
			secondContact(){
				let baby = this.secondContact.filter((i)=>{ return i.type === 2})
				let babyArr = []
				baby.forEach((i)=>{
					let p = {
						birthdayStr:null, //出生日期	
						birthdayLunar:(i.birthdayLunar == 0) ? false : true,	//是否农历
						birthdayTime:Boolean(i.birthdayTime) ? Date.parse(new Date(i.birthdayTime.split(/[ ]+/)[0])) : null,	//出生日期
						callName:null, //宝宝称呼	
						ccId:i.ccId, //从客户ID	
						customerId:i.customerId, //主客户ID		
						display:true, //是否显示	
						name:i.name, //宝宝姓名	
						sex:Boolean(i.sex === '男') ? true : false,	//性别
						zodiac:null, 
					}
					babyArr.push(p)
				})
				this.params = babyArr
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
