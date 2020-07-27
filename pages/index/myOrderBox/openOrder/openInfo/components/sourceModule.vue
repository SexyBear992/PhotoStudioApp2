/*****************  客户来源模块  *****************/
<template>
	<view>
		<view class="title">客户来源</view>
		
		<cell :title="'客户来源'" :list="sourceList" @changeValue="sourceId"></cell>
		
		<!-- 介绍人 -->
		<view class="referrer">
			<view class="left">
				<view class="referrerTitle">介绍人</view>
				<input type="text" placeholder="介绍人名字" v-model="sourceValue.referrerName" />
			</view>
			
			<view class="referrerBut">选择介绍人</view>
		</view>
		<!-- 介绍人电话 -->
		<view class="referrer">
			<view class="left">
				<view class="referrerTitle">手机号码</view>
				<input type="text" placeholder="介绍人手机号码" v-model="sourceValue.referrerMobile" />
			</view>
		</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	import cell from '@/components/cell.vue'
	export default {
		components:{
			cell
		},
		computed:{
			...mapGetters('shopArr',[
				'get_origin'
			])
		},
		data(){
			return{
				// 来源数组
				sourceList:[],
				
				// 客户来源模板信息
				sourceValue:{
					// 来源ID
					originId:null,
					// 介绍人
					referrerName:null,
					// 介绍人手机号码
					referrerMobile:null
				}
			}
		},
		mounted(){
			this.newSourceList()
		},
		methods:{
			
			/*********************************   组件选择返回值模块   *********************************/
			sourceId(e){
				this.get_origin.some((i)=>{
					if(i.name === '客户来源'){
						this.sourceValue.originId = null
					}else if(i.name === e){
						this.sourceValue.originId = i.id
					}
				})
			},
			
			/*************   创建门店数组模块  picker只能传数组，需把接口返回的对象封装为数组 **********/
			// 创建来源数组
			newSourceList(){
				// 获取所有门店 创建新的list赋值
				let arr = this.get_origin.map((i)=>{
					return i.name
				})
				this.sourceList = arr
			},
		
			/*********************************   工作人员处理模块   **********************************/
			// 跳转到通讯录
			gotEnterpriseAll(type){
				// uni.navigateTo({
				// 	url:'../../../../EnterpriseAll/EnterpriseAll?type=' + type
				// })
			},
		
		
			// 保存订单
			save(){
				return this.sourceValue
			},
		},
		watch:{
			get_origin(){
				this.newSourceList()
			},
		}
	}
</script>

<style lang="scss">
	.title{
		font-size: 38rpx;
		margin-left: 30rpx;
		margin-top: 30rpx;
		font-weight: bold;
	}
	.referrer{
		height: 80rpx;
		line-height: 80rpx;
		margin: 0 30rpx;
		display: flex;
		justify-content: space-between;
		border-bottom: 1rpx solid #f9f9f9;
		font-size: 28rpx;
		.left{
			display: flex;
			input{
				margin-top: 18rpx;
				margin-left: 30rpx;
				width: 435rpx;
			}
		}
		.referrerBut{
			font-size: 24rpx;
			color: #578ff4;
			border: 1rpx solid #578ff4;
			border-radius: 10rpx;
			height: 40rpx;
			line-height: 40rpx;
			padding: 0 10rpx;
			margin: auto 0;
		}
	}
</style>
