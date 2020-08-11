<template>
	<!-- 内容 -->
	<view class="mainBox">
		<!-- 预约时间 -->
		<view class="listBox">
			<view class="list">
				<view class="text">预约时间：</view>
				<view class="text">{{item.reservationDate | time}}</view>
			</view>	
		</view>
		<!-- 拍照类型  预约门店 -->
		<view class="listBox">
			<view class="list">
				<view class="text">拍照类型：</view>
				<view class="text">{{item.processType | processType}}</view>
			</view>
			<view class="list">
				<view class="text">预约门店：</view>
				<view class="text">{{shopIdMap.get(item.reservationShopId)}}</view>
			</view>
		</view>
		<!-- 预约档期  拍照状态 -->
		<view class="listBox">
			<view class="list">
				<view class="text">预约档期：</view>
				<view class="text">{{scheduleMap.get(item.groupTypeCategoryId)}}({{item.isOnline | isOnline}})</view>
			</view>
			<view class="list">
				<view class="text">拍照状态：</view>
				<view class="text">{{item.processStatus | processStatus}}</view>
			</view>
		</view>
		<!-- 拍摄景点 -->
		<view class="listBox">
			<view class="list">
				<view class="text">拍摄景点：</view>
				<view class="text arr">{{item.completePhotoDataJson.photoDataPlaceJsons | photoDataArr}}</view>
			</view>	
		</view>
		<!-- 拍摄服装 -->
		<view class="listBox">
			<view class="list">
				<view class="text">拍摄服装：</view>
				<view class="text arr">{{item.completePhotoDataJson.photoDataDressJsons | photoDataArr}}</view>
			</view>	
		</view>
		
		<!-- 摄化人员 -->
		<view class="personnel" v-if="item.orderItemProcessActorVos">
			<view class="pTitleBox">
				<view class="cross"></view>
				<view class="pTitle">摄化人员</view>
				<view class="cross"></view>
			</view>
			
			<view class="personBox">
				<view class="listBox">				
					<view class="list">
						<view class="text">摄影师：</view>
						<view class="text arr">{{item.orderItemProcessActorVos | actor('PHOTOGRAPHER')}}</view>
					</view>
					<view class="list">
						<view class="text">摄影师助理：</view>
						<view class="text arr">{{item.orderItemProcessActorVos | actor('PHOTOGRAPHER_ASSISTANT')}}</view>
					</view>		
				</view>
				
				<view class="listBox">
					<view class="list">
						<view class="text">化妆师：</view>
						<view class="text arr">{{item.orderItemProcessActorVos | actor('MAKEUP')}}</view>
					</view>
					<view class="list">
						<view class="text">化妆师助理：</view>
						<view class="text arr">{{item.orderItemProcessActorVos | actor('MAKEUP_ASSISTANT')}}</view>
					</view>		
				</view>
				
				<view class="listBox">
					<view class="list">
						<view class="text">引导师：</view>
						<view class="text arr">{{item.orderItemProcessActorVos | actor('INSTRUCTOR')}}</view>
					</view>
					<view class="list">
						<view class="text">引导师助理：</view>
						<view class="text arr">{{item.orderItemProcessActorVos | actor('INSTRUCTOR_ASSISTANT')}}</view>
					</view>		
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'
	export default{
		props:['item','get_schedule','get_shopAllArr'],
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
					return name
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
						return name
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
			}
		},
		mounted(){
			this.shopIdMap = new Map(this.get_shopAllArr.map(item => [item.shopId, item.shopName]))
			this.scheduleMap = new Map(this.get_schedule.map(item => [item.id, item.name]))
		}
	}
</script>

<style lang="scss" scoped>
	.mainBox{
		padding: 30rpx;
		background-color: #FFFFFF;
		box-shadow:0rpx 7rpx 29rpx 6rpx rgba(0, 0, 0, 0.03);
		border-radius:0rpx 0rpx 10rpx 10rpx;
		font-size: 24rpx;
		.listBox{
			display: flex;
			justify-content: space-between;
			padding-bottom: 30rpx;
			.list{
				flex: 0.8;
				display: flex;
			}
			.arr{
				flex: 0.5;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.list:nth-child(2){
				flex: 0.5;
			}
		}
		.personnel{
			margin-bottom: 30rpx;
			.pTitleBox{
				margin-bottom: 30rpx;
				display: flex;
				justify-content: space-between;
				.cross{
					width: 215rpx;
					height: 4rpx;
					background-color: #DDDDDD;
					margin-top: 22rpx;
				}
				.pTitle{
					font-size: 32rpx;
				}
			}
			.listBox{
				.list{
					flex: 1;
					overflow: hidden;
					.arr{
						flex: 0.9;
					}
				}
			}
		}
		.butBox{
			border-top: 1rpx solid #DDDDDD;
			display: flex;
			flex-direction: row-reverse;
			padding-top: 30rpx;
			
			.but{
				padding: 10rpx 30rpx; 
				border-radius: 50rpx;
				border: 1rpx solid #DDDDDD;
				margin-left: 30rpx;
			}
			.but:nth-child(1){
				border: none;
				background-color: #61A3FF;
				color: #FFFFFF;
				box-shadow:0rpx 7rpx 14rpx 1rpx rgba(97,163,255,0.27);
			}
		}
	}
		
</style>
