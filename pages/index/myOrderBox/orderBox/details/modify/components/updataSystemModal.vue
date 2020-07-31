/************************************ 编辑套系信息 ***********************************/
<template>
	<view class="bigBox">
		<view class="box">
				
			<view class="titleBox">
				<view class="title">编辑套系信息</view>
				<view class="close" @click="cancel">
					<i-icon type="close" size="18" color="#80848f"/>
				</view>
			</view>
			
			<view class="mainBox">
				
				<view class="listBox">
					<view class="title">套系名称：</view>
					<view class="textBox">
						<view class="text">{{assemblyName}}</view>
					</view>
				</view>
				
				<view class="listBox">
					<view class="title">服务级别：</view>
					<picker @change="serviceChange" :value="serviceIndex" :range="serviceIdList">
						<view class="textBox">
							<view class="text">{{serviceIdList[serviceIndex]}}</view>
							<image src="https://7068-photostudioapp-1302515241.tcb.qcloud.la/newIcon/down.png" mode=""></image>
						</view>
					</picker>
				</view>
				
				<view class="listBox">
					<view class="title">老师级别：</view>
					<picker @change="teacherChange" :value="teacherIndex" :range="teacherIdList">
						<view class="textBox">
							<view class="text">{{teacherIdList[teacherIndex]}}</view>
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
	import { updataSystem } from '@/util/api/shop.js'
	import { mapGetters } from 'vuex'
	export default{
		props:["openInfo"],
		computed:{
			...mapGetters('shopArr',[
				// 服务
				'get_serviceCategory',
				// 老师
				'get_teacherCategory'
			])
		},
		data(){
			return{
				// 过滤服务
				serviceIdMap: new Map(),  
				// 过滤老师
				teacherIdMap: new Map(),  
				
				// 套系名
				assemblyName:null,
				
				// 服务picker
				serviceIndex:0,
				serviceIdList:[],
				
				// 老师picker
				teacherIndex:0,
				teacherIdList:[],
				
				systemInfo:{}
			}
		},
		mounted(){
			this.serviceIdMap = new Map(this.get_serviceCategory.map(item => [item.id, item.name]))
			this.teacherIdMap = new Map(this.get_teacherCategory.map(item => [item.id, item.name]))
			
			this.assemblyName = this.openInfo.assemblyName
			let info = {
				orderId:this.openInfo.orderId,
				serviceCategoryId:this.openInfo.serviceCategoryId,
				teacherCategoryId:this.openInfo.teacherCategoryId,
			}
			this.systemInfo = info
			this.newchangServiceId()
			this.newchangTeacherId()
		},
		methods:{
			// 创建服务数组
			newchangServiceId(){
				let arr = this.get_serviceCategory.map((i)=>{
					return i.name
				})
				arr[0] = '请选择'
				this.serviceIdList = arr
				
				// 已经选择服务名字	
				let nowServiceName = this.serviceIdMap.get(this.openInfo.serviceCategoryId)
				if(nowServiceName){
					this.serviceIndex = this.serviceIdList.findIndex((i)=>{
						return i === nowServiceName
					})
				}else{
					this.serviceIndex = 0
				}
			},
			
			// 服务picker返回
			serviceChange(e){
				this.serviceIndex = e.detail.value
				this.get_serviceCategory.some((i)=>{
					if(i.name === this.serviceIdList[e.detail.value]){
						this.systemInfo.serviceCategoryId = i.id
					}else if(this.serviceIdList[e.detail.value] === '请选择'){
						this.systemInfo.serviceCategoryId = null
					}
				})
			},
			
			
			// 创建老师数组
			newchangTeacherId(){
				let arr = this.get_teacherCategory.map((i)=>{
					return i.name
				})
				arr[0] = '请选择'
				this.teacherIdList = arr
				
				// 已经选择服务名字	
				let nowTeacherName = this.teacherIdMap.get(this.openInfo.teacherCategoryId)
				if(nowTeacherName){
					this.teacherIndex = this.teacherIdList.findIndex((i)=>{
						return i === nowTeacherName
					})
				}else{
					this.teacherIndex = 0
				}
			},
			
			// 教师picker返回
			teacherChange(e){
				this.teacherIndex = e.detail.value
				this.get_teacherCategory.some((i)=>{
					if(i.name === this.teacherIdList[e.detail.value]){
						this.systemInfo.teacherCategoryId = i.id
					}else if(this.teacherIdList[e.detail.value] === '请选择'){
						this.systemInfo.teacherCategoryId = null
					}
				})
			},
			
			// 保存
			ok(){
				updataSystem(this.systemInfo).then(res=>{
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