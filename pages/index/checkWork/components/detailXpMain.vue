<template>
	<view class="bigBox">
		<view class="listInfo">
			<view class="mainBox">
				<!-- 预约时间 -->
				<view class="listBox">
					<view class="list">
						<view class="text">预约时间：</view>
						<view class="info">{{item.reservationDate | time}} {{item.reservationTime | reservationTime}}</view>
					</view>	
				</view>
				
				<!-- 预约门店 预约档期 -->
				<view class="listBox">
					<view class="list">
						<view class="text">预约门店：</view>
						<view class="info">{{shopIdMap.get(item.successShopId) | shopId}}</view>
					</view>	
					<view class="list">
						<view class="text">预约档期：</view>
						<view class="info">{{scheduleMap.get(item.groupTypeCategoryId)}}({{item.isOnline | isOnline}})</view>
					</view>	
				</view>
				
				<!-- 选片状态 选片时间 -->
				<view class="listBox">
					<view class="list">
						<view class="text">选片状态：</view>
						<view class="info">{{item.processStatus | status}}</view>
					</view>	
					<view class="list">
						<view class="text">选片时间：</view>
						<view class="info">{{item.successTime | time}}</view>
					</view>	
				</view>
				
				<!-- 选片师 -->
				<view class="listBox">
					<view class="list">
						<view class="text">选片师：</view>
						<view class="info arr" v-if="item.actorNameVo">{{item.actorNameVo | actor}}</view>
						<view class="info arr" v-else>{{item.actorNameVos | actor}}</view>
					</view>	
				</view>
			</view>
		</view>
		
		
		<i-message id="message" />
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default{
		props:['item'],
		computed:{
			...mapGetters('shopArr',[
				// 门店
				'get_shopAllArr',
				// 预约档期
				'get_schedule'
			])
		},
		filters:{
			// 门店
			shopId(text){
				if(text){
					return text
				}else{
					return '未选择门店'
				}
			},
			// 线上线下
			isOnline(boo){
				if(boo){
					return '线上'
				}else{
					return '线下'
				}
			},
			// 选片状态
			status(type){
				const result = new Map([
					['NOT_PROCESSING', '未开始'],
					['PROCESSING', '选片中'],
					['COMPLETE', '选片完成']
				])
				return result.get(type)
			},
			// 人员
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

<style lang="scss">
	@import  './detailMainStyle.scss';
</style>
