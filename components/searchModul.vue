/*******************************   订单搜索   *****************************************/
<template>
	<view>
		<view class="search">
			<view class="searchLeft">
				<picker @change="bindPickerChange" :value="index" :range="array">
					<view class="uni-input">
						<view>{{array[index]}}</view>
						<image src="https://7068-photostudioapp-1302515241.tcb.qcloud.la/newIcon/down.png" mode=""></image>
					</view>
				</picker>
				<input type="text" :placeholder="array[index]" v-model="keyword"/>
			</view>
			
			<view class="searchBut" @click="search">
				<i-icon type="search" size="20" color="#80848f" />
			</view>
		</view>
		
		<view class="shopBox" v-if="showShop">
			<image src="https://7068-photostudioapp-1302515241.tcb.qcloud.la/newIcon/shop.png" mode=""></image>		
			<pickerModule my-img="imgMargin" :arrInfo="pickerArr" :nowName="nowPickerName" @getId="getShopId"></pickerModule>
		</view>
	</view>
</template>

<script>
	import pickerModule from '@/components/pickerModule.vue'
	import { mapGetters } from 'vuex'
	export default {
		props:['needShop'],
		components:{
			pickerModule
		},
		computed:{
			...mapGetters('app',[
				'shopId'
			]),
			...mapGetters('shopArr',[
				// 门店
				'get_shopAllArr', 
			])
		},
		data(){
			return{
				// 过滤来源
				shopIdMap: new Map(),  
				
				// 搜索下拉选择
				array:['姓名','手机号','订单号'],
				// 下拉下标
				index:0,
				// 搜索
				keyword:null,
				
				showShop:true,
				
				pickerArr:[],
				nowPickerName:null,
				
				parmas:{
					isSearchCount:true,
					limit:10,
					page:1,
				}
			}
		},
		mounted(){
			if(this.needShop !== null){
				this.showShop = false
			}
			this.shopIdMap = new Map(this.get_shopAllArr.map(item => [item.shopId, item.shopName]))
			this.getPickerArr()
		},
		methods:{	
			getPickerArr(){
				let arr = []
				this.get_shopAllArr.forEach((i)=>{
					let lis ={
						id:i.shopId,
						name:i.shopName
					}
					arr.push(lis)
				})
				this.pickerArr = arr
				this.nowPickerName = this.shopIdMap.get(this.shopId)
			},
			
			// 获取门店ID
			getShopId(e){
				this.parmas.orderShopId = e.id
				this.$emit('search',this.parmas)
			},
			
			// 下拉选择
			bindPickerChange(e){
				this.index = e.detail.value
			},
			// 清空所有选择
			clearParmas(){
				delete this.parmas.contactMobile
				delete this.parmas.orderNo
				delete this.parmas.contactName
			},
			// 搜索
			search(){
				this.parmas.page = 1
				if(this.keyword && this.keyword !== ''){
					let value = this.array[this.index]
					if(value === '姓名'){
						this.clearParmas()
						this.parmas.contactName = this.keyword
					}else if(value === '手机号'){
						this.clearParmas()
						this.parmas.contactMobile = this.keyword
					}else if(value === '订单号'){
						this.clearParmas()
						this.parmas.orderNo = this.keyword
					}
				}else{
					this.clearParmas()
				}
				this.$emit('search',this.parmas)
			},
		}
	
	}
</script>

<style lang="scss" scoped>
	.search{
		background-color: #f8f8f8;
		width: 690rpx;
		height: 80rpx;
		line-height: 80rpx;
		margin: 30rpx auto; 
		display: flex;
		justify-content: space-between;
		.searchLeft{
			display: flex; 
			.uni-input{
				display: flex;
				font-size: 28rpx;
				font-weight: bold;
				padding: 0 30rpx;
				image{
					width: 15rpx;
					height: 15rpx;
					margin: 40rpx 0 0 5rpx;
				}
			}
			input{
				font-size: 28rpx;
				margin-top: 18rpx;
				border-left: 1rpx solid #DDDDDD;
				padding: 0 30rpx;

			}
		}
		.searchBut{
			padding: 0 30rpx;
		}
	}
	.shopBox{
		width: 690rpx;
		margin: 30rpx auto;
		display: flex;
		image{
			width: 28rpx;
			height: 28rpx;
			margin: 6rpx 10rpx 0 0;
		}
	}
	/deep/.imgMargin{
		margin: 18rpx 0 0 5rpx !important;
	}
</style>
