<template>
	<view>
		<view v-for="item in pageDetails" :key="item.id">
			<detailMoudel :info="item"></detailMoudel>
		</view>
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
				console.log('组件',this.pageDetails)
			}
		}
	}
</script>

<style>
</style>
