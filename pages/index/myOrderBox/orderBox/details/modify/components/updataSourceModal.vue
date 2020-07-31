/************************************ 编辑客户来源 ***********************************/
<template>
	<view class="bigBox">
		<view class="box">
				
			<view class="titleBox">
				<view class="title">编辑客户来源</view>
				<view class="close" @click="cancel">
					<i-icon type="close" size="18" color="#80848f"/>
				</view>
			</view>
				
			<view class="mainBox">
				<!-- 客户来源 -->
				<view class="listBox">
					<view class="title">客户来源</view>
					<picker @change="sourceIdChange" :value="sourceIndex" :range="sourceIdList">
						<view class="textBox">
							<view class="text">{{sourceIdList[sourceIndex]}}</view>
							<image src="https://7068-photostudioapp-1302515241.tcb.qcloud.la/newIcon/down.png" mode=""></image>
						</view>
					</picker>
				</view>
				
				<!-- 介绍人 -->
				<view class="listBox">
					<view class="title">介绍人</view>
					<view class="textBox">
						<input class="input" type="text" v-model="sourceInfo.referrerName" placeholder="介绍人" />
					</view>
				</view>
				
				<!-- 手机号码 -->
				<view class="listBox">
					<view class="title">手机号码</view>
					<view class="textBox">
						<input class="input" type="number" v-model="sourceInfo.referrerMobile" placeholder="手机号码" />
					</view>
				</view>
			</view>
			
				
				
			<view class="but">
				<view class="cancel" @click="cancel">取消</view>
				<view class="ok" @click="ok">保存</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	import { updataSource } from '@/util/api/shop.js'
	export default {
		props:['openInfo'],
		computed:{
			...mapGetters('shopArr',[
				// 来源
				'get_origin',
			])
		},
		data() {
			return {
				// 过滤来源
				originIdMap: new Map(),  
				
				// 来源picker
				sourceIndex:0,
				sourceIdList:[],
				
				sourceInfo:{}
			};
		},
		mounted(){
			this.originIdMap = new Map(this.get_origin.map(item => [item.id, item.name]))
			let info = {
				groupId:this.openInfo.customerGroupVo.id,
				originId:this.openInfo.customerGroupVo.originId,
				referrerMobile:this.openInfo.customerGroupVo.referrerMobile,
				referrerName:this.openInfo.customerGroupVo.referrerName,
			}
			this.sourceInfo = info
			this.newchangSourceId()
		},
		methods:{
			// 创建来源数组
			newchangSourceId(){
				let arr = this.get_origin.map((i)=>{
					return i.name
				})
				arr[0] = '请选择'
				this.sourceIdList = arr
				
				// 已经选择来源名字
				let nowsourceName = this.originIdMap.get(this.sourceInfo.originId)
				if(nowsourceName){
					this.sourceIndex = this.sourceIdList.findIndex((i)=>{
						return i === nowsourceName
					})
				}else{
					this.sourceIndex = 0
				}
			},
			
			sourceIdChange(e){
				this.sourceIndex = e.detail.value
				this.get_origin.some((i)=>{
					if(i.name === this.sourceIdList[e.detail.value]){
						this.sourceInfo.originId = i.id
					}else if(this.sourceIdList[e.detail.value] === '请选择'){
						this.sourceInfo.originId = null
					}
				})
			},
			
			// 取消
			cancel(){
				this.$emit('cancel')
			},
			// 保存
			ok(){
				updataSource(this.sourceInfo).then(res=>{
					if(res.data.code === 200){
						this.$emit('ok')
					}
				})
			},
		},
	}
</script>

<style lang="scss" scoped>
	.bigBox{
		z-index: 9999999;
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,0.5);
		top: 0;
		color: #8d8d8d;
		.box{
			background-color: #FFFFFF;
			width: 550rpx;
			margin: 50% auto;
			transform: translateY(-20%);
			border-radius: 15rpx;
			.titleBox{
				display: flex;
				justify-content: space-between;
				color: #000000;
				padding: 30rpx;
				border-bottom: 1rpx solid #DDD
			}
			.mainBox{
				padding: 50rpx;
				.listBox{
					font-size: 28rpx;
					display: flex;
					color: #000000;
					padding: 20rpx 0;
					.title{
						width: 170rpx;
					}
					.textBox{
						display: flex;
						image{
							width: 15rpx;
							height: 15rpx;
							margin: 18rpx 0 0 5rpx;
						}
						input{
							width: 270rpx;
							border: 1rpx solid #DDD;
							border-radius: 10rpx;
							padding: 0 10rpx;
						}
					}
				}
			}
			
			.but{
				display: flex;
				text-align: center;
				height: 80rpx;
				line-height: 80rpx;
				border-top: 1rpx solid #f9f9f9;
				.cancel{
					width: 50%;
				}
				.ok{
					width: 50%;
					border-left: 1rpx solid #f9f9f9;
					color: #61a3ff;
				}
			}
		}
	}
</style>