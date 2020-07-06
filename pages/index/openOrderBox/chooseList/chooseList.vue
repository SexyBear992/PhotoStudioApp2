<template>
	<view>
		<input @input="keyInput" placeholder="搜索名称" class="serach" />
		<view class="topTitle">可选的项目：</view>
		<view class="titleBox">
			<view class="title f">名称</view>
			<view class="title">销售价</view>	
			<view class="title" v-if="type != 'newAttractions'">库存</view>
			<view class="title" v-else>景点类型</view>
		</view>
		<!-- 搜索前 -->
		<checkbox-group @change="checkboxChange" class="checkBox" v-if="serach == ''">
			<label class="uni-list-cell uni-list-cell-pd lb" :class="index%2 == 0?'':'gray'" v-for="(item,index) in addList" :key="index">
				<view class="text f"><checkbox :value="item.title"/>{{item.title}}<span v-if='item.pnum'>({{item.pnum}})</span></view>
				<view class="text">{{item.price}}</view>
				
				<view class="text" v-if="type != 'newAttractions'">{{item.num}}</view>
				<view class="text" v-else>{{item.type}}</view>
			</label>
		</checkbox-group>
		
		<!-- 搜索后 -->
		<checkbox-group @change="checkboxChange" class="checkBox" v-if="serach != ''">
			<label class="uni-list-cell uni-list-cell-pd lb" :class="index%2 == 0?'':'gray'" v-for="(item,index) in searchData" :key="index">
				<view class="text f"><checkbox :value="item.title"/>{{item.title}}({{item.pnum}})</view>
				<view class="text">{{item.price}}</view>
				<view class="text">{{item.num}}</view>
			</label>
		</checkbox-group>
		<view class="ts" v-if="serach != '' && searchData.length <= 0">没有搜索商品</view>
		<view class="sure" @click="sure">确定</view>
	</view>
</template>

<script>
	import newProduct from '@/components/childOrder/addListSP.js'
	import newClothing from '@/components/childOrder/addListFZ.js'
	import newAttractions from '@/components/childOrder/addListJD.js'
	import newService from '@/components/childOrder/addListFW.js'
	export default {
		data() {
			return {
				type:null,
				addList:null,
				choose:[],
				serach:'',
				// 搜索列表
				searchData:[]
			};
		},
		onLoad(option){
			this.type = option.type
		},
		mounted(){		
			if(this.type == 'newProduct'){
				this.addList = newProduct
			}else if(this.type == 'newClothing'){
				this.addList = newClothing
			}else if(this.type == 'newAttractions'){
				this.addList = newAttractions
			}else if(this.type == 'newService'){
				this.addList = newService
			}
		},
		methods:{
			checkboxChange: function (e) {
				this.choose = e.target.value
			},
			sure(){
				let arr = []
				this.choose.forEach((l)=>{
					this.addList.forEach((i)=>{
						if(i.title == l){
							arr.push(i)
						}
					})
				})
				let addArr = {type : this.type , arr}
				this.$store.commit('addList',addArr)
				uni.navigateBack({
					delta:1
				})
			},
			keyInput(event) {
				this.serach = event.detail.value
			},
			searchDatas() {
				var searchData = []
				this.addList.forEach((i)=>{
					if((i.title).indexOf(this.serach) !== -1){
						searchData.push(i)
					}
				})
				this.searchData = searchData
			},
		},
		watch:{
			serach(){
				this.searchDatas()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.topTitle{
		font-size: 32rpx;
		margin: 20rpx;
	}
	.titleBox{
		display: flex;
		width: 640rpx;
		margin: 0 auto;
		background-color: #f8f8f9;
		height: 80rpx;
		line-height: 80rpx;
		padding: 0 20rpx;
		font-size: 28rpx;
		.title{
			width: 25%;
			text-align: center;
		}
		.f{
			text-align: left;
			width: 50%;
		}
	}
	.checkBox{
		width: 680rpx;
		margin: 0 auto;
		.lb{
			padding: 0 20rpx;
			display: flex;
			height: 80rpx;
			line-height: 80rpx;
			border-bottom: 1rpx solid #f8f8f9;
			font-size: 28rpx;
			.text{
				width: 25%;
				text-align: center;
			}
			.f{
				text-align: left;
				width: 50%;
			}
		}
		.gray{
			background-color: #f8f8f9;
		}
	}
	.sure{
		width: 300rpx;
		height: 66rpx;
		font-size: 30rpx;
		color: #FFFFFF;
		background-color: #61a3ff;
		text-align: center;
		line-height: 66rpx;
		margin: 30rpx auto;
		border-radius: 33rpx;
	}
	.serach{
		width: 650rpx;
		margin: 20rpx auto;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 28rpx;
		padding: 0 10rpx;
		border: 1rpx solid #4d8cfd;
		border-radius: 3rpx;
	}
	.ts{
		font-size: 30rpx;
		text-align: center;
		margin: 20rpx auto;
	}
</style>
