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
					<view class="titleB">
						<view class="title">客户来源：</view>
					</view>
					<picker
						@change="enList"
						:value="index" 
						:range="originArr" 
						mode = multiSelector 
						@columnchange="changeList"
					>
						<view class="textBox">
							<view class="text">{{source}}</view>
							<image src="https://lyfz-saas-erp-system.oss-cn-hangzhou.aliyuncs.com/AppletsFile/down.png" mode=""></image>
						</view>
					</picker>
				</view>	
				<!-- 介绍人 -->
				<view class="listBox">
					<view class="titleB">
						<view class="title">介绍人：</view>
					</view>
					<view class="textBox">
						<input class="input" type="text" v-model="params.referrerName" placeholder="介绍人" />
					</view>
				</view>
				<!-- 手机号码 -->
				<view class="listBox">
					<view class="titleB"> 
						<view class="title">手机号码：</view>
					</view>
					<view class="textBox">
						<input class="input" type="number" v-model="params.referrerMobile" placeholder="手机号码" />
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
				// 显示
				source:'请选择',
				
				originArr:[[],[]],
				index:[0,0],
				secondArr:null,	
				// 所有列表
				list:null,
				getIndex:false,
				params:{}
			};
		},
		mounted(){
			let info = {
				originJson:this.openInfo.customerGroupVo.originJson,
				orderId:this.openInfo.orderId,
				referrerMobile:this.openInfo.customerGroupVo.referrerMobile,
				referrerName:this.openInfo.customerGroupVo.referrerName,
			}
			this.params = info
			if(this.params.originJson.cid){
				this.getIndex = true
			}
			this.getArr()
		},
		methods:{
			getArr(){
				if(this.get_origin.length > 0){
					let arr = this.get_origin.filter((i)=>{
						return i.sourceList.length > 0
					})
					this.list = arr
					// picker的一维项
					this.originArr[0] = arr.map((i)=>{return i.name})
					if(this.getIndex){
						this.index[0] = this.list.findIndex((i)=>{ return i.cid === this.params.originJson.cid })
					}
					this.getSecond()
				}else{
					$Message({
						content: '请重试',
						type: 'error'
					});
				}
			},
			// 通过一维获取二维
			getSecond(){
				// 获取当前一维项的二维数组
				this.secondArr = this.list[this.index[0]].sourceList
				this.originArr[1] = this.secondArr.map((i)=>{return i.name})
				if(this.getIndex){
					this.index[1] = this.secondArr.findIndex((i)=>{ return i.sid === this.params.originJson.sid })
					this.show()
					this.getIndex = false
				}
				this.$forceUpdate()
			},
			// 滚动改变
			changeList(e){
				let ind = e.detail.column
				this.index[ind] = e.detail.value
				this.getSecond()
			},
			// 确定选择
			enList(e){
				// 获取选择的一维数据
				let first = this.list[this.index[0]]
				// 获取选择的二维数据
				let second = first.sourceList[this.index[1]]
				this.params.originJson.cid = first.cid
				this.params.originJson.sid = second.sid
				this.params.originJson.cname = first.name
				this.params.originJson.sname = second.name
				this.show()
			},
			show(){
				// 获取选择的一维数据
				let first = this.list[this.index[0]]
				// 获取选择的二维数据
				let second = this.secondArr[this.index[1]]
				this.source = `${first.name}/${second.name}`
			},
			
			// 取消
			cancel(){
				this.$emit('cancel')
			},
			// 保存
			ok(){
				updataSource(this.params).then(res=>{
					if(res.data.code === 200){
						this.$emit('ok')
					}
				})
			},
		},
	}
</script>

<style lang="scss" scoped>
	@import './updataModal.scss';
</style>