<template>
	<view>
		<view class="listBox" v-for="(item,index) in info" :key="index">
			<view class="time">{{item.time}}</view>
			<view class="infoBox" v-for="(list,i) in item.data" @click="infoDetails(list.id)" :key="i">
				<view class="avatarBox">
					<image :src="url+'icon_tjfb@2x.png'" class="avatar" mode=""></image>
					<view class="text">系</view>
				</view>
				<view class="info">
					<view class="title">{{list.title}}</view>
					<view class="text">{{list.text}}</view>
				</view>
			</view>
		</view>
		
		
		<tabBar :index="4"></tabBar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:'https://7068-photostudioapp-1302515241.tcb.qcloud.la/icon/',
				info:[
					{
						time:'2020-6-27',
						data:[
								{
									id:1,
									title:"您有一条2019年6月27的选样新任务,快去看看吧!",
									text:'订单号：JX190527015 女士：飞飞 电话：17894281971 男士：刘兴龙 电话：12349812356'
								},
								{
									id:2,
									title:"您有一条2019年6月12的选样新任务,快去看看吧!",
									text:'订单号：JX190527015 女士：飞飞 电话：17894281971 男士：刘兴龙 电话：12349812356'
								},
							]
					},
					{
						time:'2020-6-26',
						data:[
								{
									id:3,
									title:"您有一条2019年6月26的选样新任务,快去看看吧!",
									text:'订单号：JX190527015 女士：飞飞 电话：17894281971 男士：刘兴龙 电话：12349812356'
								},
								{
									id:4,
									title:"您有一条2019年6月26的选样新任务,快去看看吧!",
									text:'订单号：JX190527015 女士：飞飞 电话：17894281971 男士：刘兴龙 电话：12349812356'
								},
								{
									id:5,
									title:"您有一条2019年6月26的选样新任务,快去看看吧!",
									text:'订单号：JX190527015 女士：飞飞 电话：17894281971 男士：刘兴龙 电话：12349812356'
								},
							]
					}
				]
			};
		},
		methods:{
			// 消息详情
			infoDetails(d){
				// 传信息ID给消息详情页
				uni.navigateTo({
					url:'../infoDetails/infoDetails?infoId=' + d 
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.listBox{
		.time{
			font-size: 24rpx;
			color: #898994;
			background-color: #e6e5f5;
			padding: 10rpx 30rpx;
		}
		.infoBox{
			display: flex;
			border-bottom: 1rpx solid #BBBBBB;
			.avatarBox{
				width: 88rpx;
				height: 88rpx;
				padding: 30rpx;
				position: relative;
				image{
					width: 88rpx;
					height: 88rpx;
				}
				.text{
					position: absolute;
					top: 48rpx;
					left: 54rpx;
					color: #FFFFFF;
					font-size: 40rpx;
					
				}
			}
			
			.info{
				margin: auto 0;
				.title,.text{
					width: 600rpx;
					white-space:nowrap;		
					overflow:hidden;
					text-overflow:ellipsis;
				}
				.title{
					font-size: 36rpx;
				}
				.text{
					font-size: 28rpx;
					color: #747474;
				}
			}
		}
	}
</style>
