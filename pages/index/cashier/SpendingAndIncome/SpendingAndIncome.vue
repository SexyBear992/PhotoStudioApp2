/******************** 支出与收入 ************************/
<template>
	<view>
		<section class="PullScroll-Page">
		  <s-pull-scroll ref="pullScroll" :back-top="true" :pullDown="pullDown" :pullUp="loadData">
				<searchModul ref="searchModul" :sai="true" @search="search"></searchModul>
				<view class="listBigBox" v-for="(item,index) in list" :key="index">
					<SIdetailsModule :info="item"></SIdetailsModule>
				</view>
				<view class="noMove"v-if="showNoMore">没有更多数据</view>
				<view class="button" @click="add">+添加订单</view>
			</s-pull-scroll>
		</section>
	</view>
</template>

<script>
	import sPullScroll from '@/components/s-pull-scroll';
	import searchModul from '@/components/searchModul.vue'
	import SIdetailsModule from './conponents/SIdetailsModule.vue'
	import { getExpenditureList } from '@/util/api/shop.js'
	export default {
		components:{
			searchModul,
			sPullScroll,
			SIdetailsModule
		},
		data() {
			return {
				// 类型
				type:null,
				
				// 总数量
				total:11,
				// 列表
				list: [],
				// 没有更多
				showNoMore:false,
				
				params:{
					expenditureType:1,
					isSearchCount:true,
					limit:10,
					page:1,
				},
			};
		},
		onLoad(op){
			this.type = op.type
			this.refresh();
		},
		methods:{
			getList(){
				if(this.type === 'spending'){
					this.getExpenditureList()
				}
			},
			// 获取列表
			getExpenditureList(){
				getExpenditureList(this.params).then(res=>{
					this.total = res.data.data.total
					const curList = res.data.data.records
					curList.forEach((i)=>{
						this.list.push(i)
					})
				})
			},
			search(e){
				this.params = e
				this.params.expenditureType = 1
				this.getList()
			},
					
			add(){
				console.log('添加订单')
			},
					
			// 组件
			refresh () {
				this.$nextTick(() => {
					this.$refs.pullScroll.refresh();
				});
			},
			pullDown (pullScroll) {
				setTimeout(() => {
					this.loadData(pullScroll);
				}, 200);
			},
			loadData (pullScroll) {
				if (pullScroll.page == 1) {
					this.list = [];
				}
				if(!this.showNoMore){
					this.params.page = pullScroll.page
				}
				if(this.list.length < this.total){
					this.getList()
					this.showNoMore = false
				}else{
					this.showNoMore = true
				}
				pullScroll.success();
			},
			
		}
	}
</script>

<style>
	page{
		background-color: #FDFDFD
	}
</style>
<style lang="scss">
	.listBigBox{
		margin: 30rpx;
		box-shadow: 0rpx 7rpx 29rpx 6rpx rgba(0, 0, 0, 0.03);
		background-color: #FFFFFF;
	}
	.noMove{
		text-align: center;
		margin-bottom: 180rpx;
		font-size: 28rpx;
	}
	.button{
		position: fixed;
		bottom: 30rpx;
		width: 600rpx;
		color: #FFFFFF;
		background-color: #61A3FF;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		border-radius: 40rpx;
		font-size: 32rpx;
		margin: 0 auto;
		margin-left: 50%;
		transform: translateX(-50%);
		margin-bottom: 30rpx;
	}
</style>
