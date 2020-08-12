<template>
	<view>
		<view class="box">
			<view class="title">通知状态</view>
			<pickerModule my-img="imgMargin" :arrInfo="noticeArr" :nowName="nowNoticeName" @getId="getNotice"></pickerModule>
		</view>
	</view>
</template>

<script>
	import pickerModule from '@/components/pickerModule.vue'
	export default{
		components:{
			pickerModule
		},
		props:['notice'],
		data(){
			return{
				noticeMap:new Map([
					[true,'已通知'],
					[false,'未通知'],
				]),
				
				// picker通知状态
				noticeArr:[{id:true,name:'已通知'},{id:false,name:'未通知'}],
				nowNoticeName:null,
			}
		},
		mounted(){
			this.nowNoticeName = this.noticeMap.get(this.notice)
		},
		methods:{
			getNotice(e){
				this.$emit('getId',e.id)
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './component.scss';
</style>
