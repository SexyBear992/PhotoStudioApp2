/***********************  新增套系内容  *************************/
<template>
	<view>
		<view class="addListBox">
				<view class="tableTitle">
					<view class="title" v-for="(item,index) in title" :key="index">{{item}}</view>
				</view>
				
				<view class="tableInfo" v-for="(item,index) in sonlist" :key="index">
					<i-swipeout 
						:actions="actions" 
						:toggle="toggle2"
						@change="handlerCloseButton(index)"
					>
						<view slot="content" class="listInfo">
							<!-- 名字 -->
							<view class="textFirst">{{item.name}}</view>
							
							<!-- 商品 -->
							<view v-if="title[0] === '商品'">
								<!-- 商品单价 -->
								<view class="text price">{{item.pSalePrice}}</view>
								<!-- 商品P数 -->
								<input class="text" type="number" v-model="item.orderP"/> 
								<!-- 商品数量 -->
								<input class="text" type="number" v-model="item.orderNum"/>
							</view>
							
							<!-- 服装 -->
							<view v-if="title[0] === '服装'">
								<!-- 服装单价 -->
								<view class="text price">{{item.salePrice}}</view>
								<!-- 服装类型 -->
								<view class="text">{{item.type | type}}</view>
								<!-- 商品数量 -->
								<input class="text" type="number" v-model="item.count"/>
							</view>
							
							<!-- 景点 -->
							<view v-if="title[0] === '景点'">
								<!-- 景点单价 -->
								<view class="text price">{{item.salePrice}}</view>
								<!-- 景点类型 -->
								<view class="text">{{item.placeType | type}}</view>
							</view>
							
							<!-- 服务 -->
							<view v-if="title[0] === '服务'">
								<!-- 服务单价 -->
								<view class="text price">{{item.salePrice}}</view>
								<!-- 服务人数 -->
								<view class="text">{{item.peopleNumber}}</view>
								<!-- 服务数量 -->
								<input class="text" type="number" v-model="item.count"/>
							</view>
													
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
				sonlist : null
			};
		},
		mounted(){
			this.sonlist = this.list
		},
		methods:{
			
			handlerCloseButton(index){
				this.sonlist.splice(index, 1)
				this.$emit('deletList',this.sonlist)
			},
		},
		watch:{
			sonlist:{
				deep:true,
				handler(){
					this.$emit('deletList',this.sonlist)
				}
			}
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
					width: 30%;
					margin-left: 10%;
				}
				>view {
					display: flex;
					width: 60%;
					.text{
						// flex: 1;
						width: 33%;
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
	}
</style>
