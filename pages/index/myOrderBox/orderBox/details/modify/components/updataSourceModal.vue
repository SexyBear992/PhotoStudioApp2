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
					<pickerModule class="textBox" my-img="imgMargin" :arrInfo="pickerSource" :nowName="nowSourceName" @getId="getSourceId"></pickerModule>
				</view>
				
				<!-- 介绍人 -->
				<view class="listBox">
					<view class="titleB">
						<view class="title">介绍人：</view>
					</view>
					<view class="textBox">
						<input class="input" type="text" v-model="sourceInfo.referrerName" placeholder="介绍人" />
					</view>
				</view>
				
				<!-- 手机号码 -->
				<view class="listBox">
					<view class="titleB"> 
						<view class="title">手机号码：</view>
					</view>
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
	import pickerModule from '@/components/pickerModule.vue'
	import { mapGetters } from 'vuex'
	import { updataSource } from '@/util/api/shop.js'
	export default {
		components:{
			pickerModule
		},
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
				pickerSource:[],
				nowSourceName:null,
				
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
				let arr = []
				this.get_origin.forEach((i)=>{
					let lis ={
						id:i.id,
						name:i.name
					}
					arr.push(lis)
				})
				arr[0].name = '请选择'
				arr[0].id = null
				this.pickerSource = arr
				this.nowSourceName = this.originIdMap.get(this.sourceInfo.originId)
			},
			getSourceId(e){
				this.sourceInfo.originId = e.id
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
	@import './updataModal.scss';
	/deep/.imgMargin{
		margin: 18rpx 0 0 5rpx !important;
	}
</style>