<template>
	<view>
		<view class="bigBox">
			<view class="listInfo" v-for="(item,index) in listInfo" :key="item.id">
				
				<view class="mainBox" v-if="item.id">
					
					<!-- 预约时间 -->
					<view class="listBox">
						<view class="list">
							<view class="text">预约时间：</view>
							<view class="info">{{item.reservationDate | time}}</view>
						</view>	
					</view>
					
					<!-- 预约门店 档期分组 -->
					<view class="listBox">
						<view class="list">
							<view class="text">预约门店：</view>
							<view class="info">{{shopIdMap.get(item.reservationShopId)}}</view>
						</view>	
						<view class="list">
							<view class="text">档期分组：</view>
							<view class="info">{{scheduleMap.get(item.groupTypeCategoryId)}}({{item.isOnline | isOnline}})</view>
						</view>	
					</view>
					
					<!-- 看板状态 看板时间 -->
					<view class="listBox">
						<view class="list">
							<view class="text">看板状态：</view>
							<view class="info">{{item.processStatus | processStatus}}</view>
						</view>	
						<view class="list">
							<view class="text">看板时间：</view>
							<view class="info">{{item.reservationTime}}</view>
						</view>	
					</view>
					
					<!-- 看板师 -->
					<view class="listBox">
						<view class="list">
							<view class="text">看板师：</view>
							<view class="info arr">{{item.orderItemProcessActorVos | actor}}</view>
						</view>	
					</view>
					
				</view>
				
				<!-- 按键 -->
				<view class="butBox" v-if="item.id">
					<view class="but" @click="updata(item.id)">修改看板档期</view>
					<view class="but" @click="cancel(item.id)">取消档期</view>
				</view>
				
				<view class="button" v-else @click="updata(item.id)">安排看板档期</view>

			</view>
		</view>
		
		<delModal :title="'取消档期'" v-if="delModalShow" @cancel="close" @ok="ok"></delModal>
		<i-message id="message" />
	</view>
</template>

<script>
	const { $Message } = require('@/wxcomponents/base/index');
	import { deletWatchInfo } from '@/util/api/shop.js'
	import delModal from '@/components/delModal.vue'
	export default{
		props:[
			'listInfo',
			'get_schedule',
			'get_shopAllArr',
		],
		components:{
			delModal
		},
		filters:{
			// 线上线下
			isOnline(boo){
				if(boo){
					return '线上'
				}else{
					return '线下'
				}
			},
			// 拍照状态
			processStatus (type) {
				const result = new Map([
					['NOT_PROCESSING', '未拍照'],
					['PROCESSING', '拍照中'],
					['COMPLETE', '拍照完成']
				])
				return result.get(type)
			},
			// 摄化人员
			actor(arr,type){
				if(arr){
					let name = []
					arr.map((i)=>{
						name.push(i.actorName)
					})
					if(name.length > 0){
						return name.join()
					}else{
						return '无'
					}
				}
			}
		},
		data(){
			return{
				shopIdMap: new Map(),
				scheduleMap: new Map(),
				
				// 取消档期模态框
				delModalShow:false,
				// 取消档期ID
				cancleId:null,
			}
		},
		mounted(){
		},
		methods:{
			// 修改
			updata(id){
				uni.navigateTo({
					url:'./kbAddorUpdata/kbAddorUpdata?id=' + id
				})
			},
			
			// 打开取消档期模态框
			cancel(id){
				this.cancleId = id
				this.delModalShow = true		
			},
			// 确定取消档期
			ok(){
				deletWatchInfo({id:this.cancleId}).then(res=>{
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
		watch:{
			get_schedule(){
				if(this.get_schedule){
					this.shopIdMap = new Map(this.get_shopAllArr.map(item => [item.shopId, item.shopName]))
					this.scheduleMap = new Map(this.get_schedule.map(item => [item.id, item.name]))
				}else{
					$Message({
						content: '获取接口失败',
						type: ''
					});
				}
			},
		}
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
