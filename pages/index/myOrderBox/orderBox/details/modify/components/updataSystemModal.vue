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
					<view class="titleB">
						<view class="title">套系名称：</view>
					</view>
					<view class="textBox">
						<view class="text">{{assemblyName}}</view>
					</view>
				</view>
				
				<view class="listBox">
					<view class="titleB">
						<view class="title">服务级别：</view>
					</view>
					<picker @change="serviceChange" :value="serviceIndex" :range="serviceIdList">
						<view class="textBox">
							<view class="text">{{serviceIdList[serviceIndex]}}</view>
							<image src="https://7068-photostudioapp-1302515241.tcb.qcloud.la/newIcon/down.png" mode=""></image>
						</view>
					</picker>
				</view>
				
				<view class="listBox">
					<view class="titleB">
						<view class="title">老师级别：</view>
					</view>
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
	@import './updataModal.scss';
</style>