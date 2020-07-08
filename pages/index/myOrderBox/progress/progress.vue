<template>
	<view>
		<view class="main">
			<uni-steps :options="options" direction="column" :active="1"></uni-steps>
		</view>
	</view>
</template>

<script>
	import uniSteps from '@/components/uni/uni-steps/uni-steps.vue'
	export default {
		components: {uniSteps},
		data() {
			return {
				options:[
					{
						title:'邀约',
						desc:'2020-07-08',
					},
					{
						title:'订单',
						desc:'2020-07-08',
					},
					{
						title:'预约',
						desc:'2020-07-08',
					},
					{
						title:'拍照',
						desc:'2020-07-08',
					},
					{
						title:'修片',
						desc:'2020-07-08',
					},
					{
						title:'选片',
						desc:'',
					},
					{
						title:'精修',
						desc:'',
					},
					{
						title:'设计',
						desc:'',
					},
					{
						title:'看板',
						desc:'',
					},
					{
						title:'发片',
						desc:'',
					},
					{
						title:'回件',
						desc:'',
					},
					{
						title:'取件',
						desc:'',
					},
				]
			};
		}
	}
</script>

<style lang="scss">
	.main{
		width: 700rpx;
		margin: 10rpx auto;
	}
</style>
