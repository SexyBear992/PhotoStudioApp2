/***********************  新增套系内容  *************************/
<template>
	<view>
		<view class="addListBox">
				<view class="tableTitle">
					<view class="title" v-for="(item,index) in title" :key="index">{{item}}</view>
				</view>
				
				<view class="tableInfo" v-for="(item,index) in list" :key="index">
					<i-swipeout 
						:actions="actions" 
						:toggle="toggle2"
						@change="handlerCloseButton(index)"
					>
						<view slot="content" class="listInfo">
							<!-- 名字 -->
							<view class="textFirst">{{item.name}}</view>
							<!-- 单价 -->
							<view class="text price">{{item.salePrice}}</view>
							<!-- P数 -->
							<input class="text" type="number" v-model="item.countP" v-if="item.countP"/>
							<!-- 类型 -->
							<view class="text" v-if="item.type">{{item.type | type}}</view>
							<!-- 景点类型 -->
							<view class="text" v-if="item.placeType">{{item.placeType | type}}</view>
							<!-- 人数 -->
							<input class="text" type="number" v-model="item.peopleNumber" v-if="item.peopleNumber"/>
							<!-- 数量 -->
							<input class="text" type="number" v-model="item.count" v-if="item.count"/>
						</view>
					</i-swipeout>
				</view>
			</view>
	</view>
</template>

<script>
	export default {
		props:['list','title'],
		filters:{
			type(type){
				const result = new Map([
					['INT', '内景'],
					['OUT', '外景'],
					['NONE', '无']
				])
				return result.get(type)
			}
		},
		data() {
			return {
				// 滑动菜单按钮
				actions : [
					{
						name : '删除',
						color : '#fff',
						fontsize : '20',
						width : 80,
						icon : 'none',
						background : '#ed3f14'
					},
				],
				toggle2 : false,
				
			};
		},
		mounted(){
		},
		methods:{
			
			handlerCloseButton(index){
				this.list.splice(index, 1)
				this.$emit('deletList',this.list)
			},
		},
		watch:{
		}
	}
</script>

<style lang="scss" scoped>
	.addListBox{
		.tableTitle{
			display: flex;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			margin: 0 30rpx;
			background-color: #e5edff;
			color: #61a3ff;
			.title{
				width: 20%;
				margin-right: 10rpx;
			}
			.title:nth-of-type(1){
				width: 40%;
			}
		}
		.tableInfo{
			margin: 0 30rpx;
			.listInfo{
				display: flex;
				text-align: center;
				.textFirst{
					width: 40%;
					margin-right: 10rpx;
				}
				.text{
					width: 20%;
					margin-right: 10rpx;
				}
				.price{
					color: #FF0000;
				}
				input{
					background-color: #FFFFFF;
				}
			}
		}
	}
</style>
