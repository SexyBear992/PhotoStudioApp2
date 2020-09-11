<template>
	<view>
		<view class="listBigBox" v-for="item in pageDetails" :key="item.id">
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
	import detailKbMain from '@/components/detailWorkMain/detailKbMain.vue'
	import detailPzMain from '@/components/detailWorkMain/detailPzMain.vue'
	import detailQjMain from '@/components/detailWorkMain/detailQjMain.vue'
	import detailXpMain from '@/components/detailWorkMain/detailXpMain.vue'
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
	}
</script>

<style lang="scss" scoped>
	.listBigBox{
		margin: 30rpx;
		box-shadow: 0rpx 7rpx 29rpx 6rpx rgba(0, 0, 0, 0.03);
		background-color: #FFFFFF;
	}
	.ts{
		font-size: 28rpx;
		text-align: center;
		margin: 30rpx 0 ;
	}
</style>
