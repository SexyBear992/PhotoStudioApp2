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
					<view class="titleB">
						<view class="title">客户区域：</view>
					</view>
					<picker
						@change="enList" 
						:value="index" 
						:range="categoryArr"
						mode = multiSelector
						@columnchange="changeList"
					>
						<view class="textBox">
							<view class="text">{{areaShow}}</view>
							<image src="https://lyfz-saas-erp-system.oss-cn-hangzhou.aliyuncs.com/AppletsFile/down.png" mode=""></image>
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
	import area from '@/static/area.js'
	import { updataArea } from '@/util/api/shop.js'
	export default{
		props:["openInfo"],
		data(){
			return{
				areaShow:'请选择',
				categoryArr:[[],[],[]],
				secondArr:null,
				thirdArr:null,
				index:[0,0,0],
				getIndex:false,
				params:{},
			}
		},
		mounted(){
			let info = {
				categoryJson: this.openInfo.customerGroupVo.categoryJson,
				orderId:this.openInfo.orderId,
			}
			this.params = info
			if(this.params.categoryJson.province){
				this.getIndex = true
			}
			this.categoryArr[0] = area.map((i)=>{return i.value})
			
			if(this.getIndex){
				this.index[0] = area.findIndex((i)=>{ return i.value === this.params.categoryJson.province })
			}
			this.getSecond()
		},
		methods:{
			// 获取市辖
			getSecond(){
				// 获取省下标
				let firstIndex = this.index[0]
				this.secondArr = area[firstIndex].children
				this.categoryArr[1] = this.secondArr.map((i)=>{return i.value})
				if(this.getIndex){
					this.index[1] = this.secondArr.findIndex((i)=>{ return i.value === this.params.categoryJson.city })
				}
				this.getThird()
				this.$forceUpdate()
			},
			// 获取区
			getThird(){
				// 获取省下标
				let firstIndex = this.index[0]
				// 获取市辖下标
				let secondIndex = this.index[1]
				this.thirdArr = this.secondArr[secondIndex].children
				this.categoryArr[2] = this.thirdArr.map((i)=>{return i.value})
				if(this.getIndex){
					this.index[2] = this.thirdArr.findIndex((i)=>{ return i.value === this.params.categoryJson.region })
					this.show()
					this.getIndex = false
				}
				this.$forceUpdate()
			},
			changeList(e){
				let ind = e.detail.column
				this.index[ind] = e.detail.value
				this.getSecond()
				this.$forceUpdate()
			},
			enList(e){
				this.params.categoryJson.province = area[this.index[0]].value
				this.params.categoryJson.city = this.secondArr[this.index[1]].value
				this.params.categoryJson.region = this.thirdArr[this.index[2]].value
				this.show()
			},
			show(){
				let first = area[this.index[0]]
				let second = first.children[this.index[1]]
				let third = second.children[this.index[2]]
				this.areaShow = `${first.value}/${second.value}/${third.value}`
			},
			// 保存
			ok(){
				this.params.categoryJson.country = '中国'
				updataArea(this.params).then(res=>{
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
	.text{
		max-width: 300rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
