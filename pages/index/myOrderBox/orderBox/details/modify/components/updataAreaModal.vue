/************************************ 编辑客户区域 ***********************************/
<template>
	<view class="bigBox">
		<view class="box">
			
		
			<view class="titleBox">
				<view class="title">编辑客户区域</view>
				<view class="close" @click="cancel">
					<i-icon type="close" size="18" color="#80848f"/>
				</view>
			</view>
				
				
			<view class="mainBox">
				<view class="listBox">
					<view class="title">客户区域：</view>
					<picker @change="areaIdChange" :value="areaIndex" :range="areaIdList">
						<view class="textBox">
							<view class="text">{{areaIdList[areaIndex]}}</view>
							<image src="https://7068-photostudioapp-1302515241.tcb.qcloud.la/newIcon/down.png" mode=""></image>
						</view>
					</picker>
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
	import { updataArea } from '@/util/api/shop.js'
	import { mapGetters } from 'vuex'
	export default{
		props:["openInfo"],
		computed:{
			...mapGetters('shopArr',[
				// 区域
				'get_category',
			])
		},
		data(){
			return{
				// 过滤区域
				categoryIdMap: new Map(),  
				
				// 区域picker
				areaIndex:0,
				areaIdList:[],
				
				areaInfo:{}
			}
		},
		mounted(){
			this.categoryIdMap = new Map(this.get_category.map(item => [item.id, item.name]))
			let info = {
				categoryId: this.openInfo.customerGroupVo.categoryId,
				groupId:this.openInfo.customerGroupVo.id,
			}
			this.areaInfo = info
			this.newchangareaId()
		},
		methods:{
			// 创建来源数组
			newchangareaId(){
				let arr = this.get_category.map((i)=>{
					return i.name
				})
				arr[0] = '请选择'
				this.areaIdList = arr
				
				// 已经选择来源名字
				let nowareaName = this.categoryIdMap.get(this.openInfo.customerGroupVo.categoryId)
				if(nowareaName){
					this.areaIndex = this.areaIdList.findIndex((i)=>{
						return i === nowareaName
					})
				}else{
					this.areaIndex = 0
				}
			},
			
			areaIdChange(e){
				this.areaIndex = e.detail.value
				this.get_category.some((i)=>{
					if(i.name === this.areaIdList[e.detail.value]){
						this.areaInfo.categoryId = i.id
					}else if(this.areaIdList[e.detail.value] === '请选择'){
						this.areaInfo.categoryId = null
					}
				})
			},
			
			// 保存
			ok(){
				updataArea(this.areaInfo).then(res=>{
					if(res.data.code === 200){
						this.$emit('ok')
					}
				})
			},
			// 取消
			cancel(){
				this.$emit('cancel')
			}
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
					padding: 20rpx 0;
					font-size: 28rpx;
					display: flex;
					color: #000000;
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
