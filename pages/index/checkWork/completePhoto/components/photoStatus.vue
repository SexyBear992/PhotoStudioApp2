<template>
	<view>
		<view class="box">
			<view class="title">拍照状态</view>
			<pickerModule my-img="imgMargin" :arrInfo="statusArr" :nowName="nowStatusName" @getId="getStatus"></pickerModule>
		</view>
	</view>
</template>

<script>
	import pickerModule from '@/components/pickerModule.vue'
	export default{
		props:['status'],
		components:{
			pickerModule
		},
		data(){
			return{
				statusMap:new Map([
					['NOT_PROCESSING','未拍照'],
					['PROCESSING','拍照中'],
					['COMPLETE','已拍照']
				]),
				statusArr:[
					{id:'NOT_PROCESSING',name:'未拍照'},
					{id:'PROCESSING',name:'拍照中'},
					{id:'COMPLETE',name:'已拍照'},
				],
				nowStatusName:null,
			}
		},
		methods:{
			getStatus(e){
				this.$emit('getId',e.id)
			}
		},
		watch:{
			status(){
				this.nowStatusName = this.statusMap.get(this.status)
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/pages/index/arrange/components/component.scss';
</style>
