<template>
	<view>
		<view class="bigBox">
			<view class="listInfo" v-for="(item,index) in listInfo" :key="item.id">
				
				<xpMainBoxInfo  v-if="item.id" :item="item"></xpMainBoxInfo>
				
				<!-- 按键 -->
				<view class="butBox" v-if="item.id && item.processStatus !== 'COMPLETE'">
					<view class="but" @click="updata(item.id)">修改选片档期</view>
					<view class="but" @click="cancel(item.id)">取消档期</view>
				</view>
				
				<view class="button" v-if="!item.id && item.processStatus !== 'COMPLETE'" @click="updata(item.id)">安排选片档期</view>

			</view>
		</view>
		
		<delModal :title="'取消档期'" v-if="delModalShow" @cancel="close" @ok="ok"></delModal>
		<i-message id="message" />
	</view>
</template>

<script>
	const { $Message } = require('@/wxcomponents/base/index');
	import { deletChooseInfo } from '@/util/api/shop.js'
	
	import delModal from '@/components/delModal.vue'
	import xpMainBoxInfo from './components/xpMainBoxInfo.vue'
	export default{
		props:[
			'listInfo',
		],
		components:{
			delModal,
			xpMainBoxInfo
		},
		data(){
			return{
				// 取消档期模态框
				delModalShow:false,
				// 取消档期ID
				cancleId:null,
			}
		},
		methods:{
			// 修改
			updata(id){
				uni.navigateTo({
					url:'./xpAddorUpdata/xpAddorUpdata?id=' + id
				})
			},
			// 打开取消档期模态框
			cancel(id){
				this.cancleId = id
				this.delModalShow = true		
			},
			// 确定取消档期
			ok(){
				deletChooseInfo({id:this.cancleId}).then(res=>{
					if(res.data.code === 200){
						this.cancleId = null
						this.delModalShow = false
						$Message({
							content: '取消成功',
							type: 'success'
						});
						this.$emit('refresh')
					}
				})
			},
			// 关闭取消模态框
			close(){
				this.cancleId = null,
				this.delModalShow = false
			},
		},
	}
</script>
<style>
	page{
		background-color: #fefefe;
	}
</style>
<style lang="scss" scoped>
	@import './mainStyle.scss';
</style>
