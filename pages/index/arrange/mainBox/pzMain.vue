<template>
	<view>
		<view class="bigBox">
			<view class="listInfo" v-for="(item,index) in listInfo" :key="item.id">
				
				<!-- 标题 -->
				<view class="titleBox">
					<view class="title">第{{index+1}}次拍摄</view>
				</view>
				
				<view class="mainBox">
					<!-- 预约时间 -->
					<view class="listBox">
						<view class="list">
							<view class="text">预约时间：</view>
							<view class="info">{{item.reservationDate | time}} {{item.reservationTime}}</view>
						</view>	
					</view>
								
					<!-- 拍照类型  预约门店 -->
					<view class="listBox">
						<view class="list">
							<view class="text">拍照类型：</view>
							<view class="info">{{item.processType | processType}}</view>
						</view>
						<view class="list">
							<view class="text">预约门店：</view>
							<view class="info">{{shopIdMap.get(item.reservationShopId)}}</view>
						</view>
					</view>
					
					<!-- 预约档期  拍照状态 -->
					<view class="listBox">
						<view class="list">
							<view class="text">预约档期：</view>
							<view class="info">{{scheduleMap.get(item.groupTypeCategoryId)}}({{item.isOnline | isOnline}})</view>
						</view>
						<view class="list">
							<view class="text">拍照状态：</view>
							<view class="info">{{item.processStatus | processStatus}}</view>
						</view>
					</view>
					
					<!-- 拍摄景点 -->
					<view class="listBox">
						<view class="list">
							<view class="text">拍摄景点：</view>
							<view class="info arr">{{item.completePhotoDataJson.photoDataPlaceJsons | photoDataArr}}</view>
						</view>	
					</view>
					
					<!-- 拍摄服装 -->
					<view class="listBox">
						<view class="list">
							<view class="text">拍摄服装：</view>
							<view class="info arr">{{item.completePhotoDataJson.photoDataDressJsons | photoDataArr}}</view>
						</view>	
					</view>
					
					<!-- 摄化人员 -->
					<view class="personnel" v-if="item.orderItemProcessActorVos">
						<!-- 标题 -->
						<view class="pTitleBox">
							<view class="cross"></view>
							<view class="pTitle">摄化人员</view>
							<view class="cross"></view>
						</view>
						<!-- 内容 -->
						<view class="personBox">
							
							<!-- 摄影师 & 助理 -->
							<view class="listBox">
								<view class="list">
									<view class="text">摄影师：</view>
									<view class="info actor">{{item.orderItemProcessActorVos | actor('PHOTOGRAPHER')}}</view>
								</view>
								<view class="list">
									<view class="text">摄影师助理：</view>
									<view class="info actor">{{item.orderItemProcessActorVos | actor('PHOTOGRAPHER_ASSISTANT')}}</view>
								</view>		
							</view>
							
							<!-- 化妆师 & 助理 -->
							<view class="listBox">
								<view class="list">
									<view class="text">化妆师：</view>
									<view class="info actor">{{item.orderItemProcessActorVos | actor('MAKEUP')}}</view>
								</view>
								<view class="list">
									<view class="text">化妆师助理：</view>
									<view class="info actor">{{item.orderItemProcessActorVos | actor('MAKEUP_ASSISTANT')}}</view>
								</view>		
							</view>
							
							<!-- 引导师 & 助理 -->
							<view class="listBox">
								<view class="list">
									<view class="text">引导师：</view>
									<view class="info actor">{{item.orderItemProcessActorVos | actor('INSTRUCTOR')}}</view>
								</view>
								<view class="list">
									<view class="text">引导师助理：</view>
									<view class="info actor">{{item.orderItemProcessActorVos | actor('INSTRUCTOR_ASSISTANT')}}</view>
								</view>		
							</view>
							
						</view>
					</view>
					
					<!-- 按键 -->
					<view class="butBox">
						<view class="but" @click="addActor(item.id)" v-if="!item.orderItemProcessActorVos">安排摄化人员</view>
						<view class="but" @click="updataActor(item.id)" v-else>修改摄化人员</view>
						<view class="but" @click="change(item.id)">改期</view>
						<view class="but" @click="cancel(item.id)">取消档期</view>
					</view>
					
				</view>
			</view>
			<view class="prompt" v-if="listInfo.length < 1">您暂时还没有预约拍照哦~快去添加吧</view>
			
			<view class="button" @click="addPhoto">添加拍照预约</view>
		</view>
		<i-message id="message" />
		<delModal :title="'取消档期'" v-if="delModalShow" @cancel="close" @ok="ok"></delModal>
	</view>
</template>

<script>
	const { $Message } = require('@/wxcomponents/base/index');
	import delModal from '@/components/delModal.vue'
	import { deletPhotoInfo } from '@/util/api/shop.js' //取消档期
	export default{
		props:[
			'listInfo',
			'get_schedule',
			'get_shopAllArr',
			'oId',
		],
		components:{
			delModal
		},
		filters:{
			// 拍照类型
			processType(state){
				const result = new Map([
					['NORMAL','正常'],
					['RETAKE','重拍'],
					['MAKE_UP','补拍'],
					['ADD','加拍'],
				])
				return result.get(state)
			},
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
			// 服装 景点显示过滤
			photoDataArr(arr){
				if(arr.length <= 0){
					return '无'
				}else{
					let name = []
					arr.forEach((i)=>{
						name.push(i.name)
					})
					return name.join()
				}
			},
			// 摄化人员
			actor(arr,type){
				if(arr){
					let name = []
					arr.map((i)=>{
						if(i.positionType === type){
							name.push(i.actorName)
						}
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
				// 过滤
				shopIdMap: new Map(),
				scheduleMap: new Map(),
				
				// 取消档期模态框
				delModalShow:false,
				// 取消档期ID
				cancleId:null,
			}
		},
		methods:{
			// 新增拍照预约
			addPhoto(){
				uni.navigateTo({
					url:'./pzAddorUpdata/pzAddorUpdata?oId=' +  this.oId
				})
			},
			// 修改拍照预约
			change(id){
				uni.navigateTo({
					url:'./pzAddorUpdata/pzAddorUpdata?oId=' +  this.oId + '&id=' + id
				})
			},
			// 新增人员
			addActor(id){
				uni.navigateTo({
					url:'./pzPerson/pzPerson?id=' + id + '&but=安排'
				})
			},
			// 修改人员
			updataActor(id){
				uni.navigateTo({
					url:'./pzPerson/pzPerson?id=' + id + '&but=修改'
				})
			},
			
			// 打开取消档期模态框
			cancel(id){
				this.cancleId = id
				this.delModalShow = true		
			},
			// 确定取消档期
			ok(){
				deletPhotoInfo({id:this.cancleId}).then(res=>{
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
			}
		},
		watch:{
			get_schedule(){
				this.scheduleMap = new Map(this.get_schedule.map(item => [item.id, item.name]))
				this.shopIdMap = new Map(this.get_shopAllArr.map(item => [item.shopId, item.shopName]))
			}
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
