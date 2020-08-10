/**************************** 拍照类型 *****************************/
<template>
	<view>
		<view class="box">
			<view class="title">拍照类型</view>
			<pickerModule my-img="imgMargin" :arrInfo="processArr" :nowName="nowProcessName" @getId="getProcess"></pickerModule>
		</view>
	</view>
</template>

<script>
	import pickerModule from '@/components/pickerModule.vue'
	export default{
		props:['process'],
		components:{
			pickerModule,
		},
		data(){ 
			return{
				// 拍照类型
				processTypeMap: new Map([
					['NORMAL','正常'],
					['RETAKE','重拍'],
					['MAKE_UP','补拍'],
					['ADD','加拍'],
				]),
				
				// picker拍照类型
				processArr:[],
				nowProcessName:null,
			}
		},
		mounted(){
			// 拍照类型
			this.getProcessArr()
			this.getNowProcess()
		},
		methods:{
			// 拍照类型数组
			getProcessArr(){
				this.processArr = [
					{
						id:'NORMAL',
						name:'正常'
					},
					{
						id:'RETAKE',
						name:'重拍'
					},
					{
						id:'MAKE_UP',
						name:'补拍'
					},
					{
						id:'ADD',
						name:'加拍'
					},
				]
			},
			// 获得当前拍照类型
			getNowProcess(){
				this.nowProcessName = this.processTypeMap.get(this.process)
			},
			// 获取选择拍照类型
			getProcess(e){
				console.log(e)
				// this.params.processType = e.id
			},
		},
	}
</script>

<style lang="scss" scoped>
	@import './component.scss';
</style>