<template>
	<view>
		<view v-for="item in pageDetails" :key="item.id">
			<detailMoudel :info="item"></detailMoudel>
			<detailPzMain v-if="type === 'pz'" :item="item"></detailPzMain>
			<detailXpMain v-if="type === 'xp'" :item="item"></detailXpMain>
			<detailKbMain v-if="type === 'kb'" :item="item"></detailKbMain>
			<detailQjMain v-if="type === 'qj'" :item="item"></detailQjMain>
		</view>
		<view class="ts" v-if="pageDetails.length < 1">暂无数据</view>
	</view>
</template>

<script>
	import detailMoudel from '@/components/detailMoudel.vue'
	import detailKbMain from '@/pages/index/checkWork/components/detailKbMain.vue'
	import detailPzMain from '@/pages/index/checkWork/components/detailPzMain.vue'
	import detailQjMain from '@/pages/index/checkWork/components/detailQjMain.vue'
	import detailXpMain from '@/pages/index/checkWork/components/detailXpMain.vue'
	export default{
		props:['pageDetails','type'],
		components:{
			detailKbMain,
			detailPzMain,
			detailQjMain,
			detailXpMain,
			detailMoudel
		},
		data(){
			return{
				
			}
		},
		watch:{
			pageDetails(){
				console.log('组件',this.pageDetails.length)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.ts{
		font-size: 28rpx;
		text-align: center;
		margin: 30rpx 0 ;
	}
</style>
