/**************************** 预约标签 *****************************/
<template>
	<view>
		<view class="box">
			<view class="title">预约标签</view>
			<pickerModule my-img="imgMargin" :arrInfo="labelArr" :nowName="nowLabelName" @getId="getLabel"></pickerModule>
		</view>
	</view>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'
	import pickerModule from '@/components/pickerModule.vue'
	export default{
		props:['labelId'],
		components:{
			pickerModule,
		},
		computed:{
			...mapGetters('shopArr',[
				'get_label'
			])
		},
		data(){
			return{
				// 过滤标签分组
				labelMap: new Map(),
				
				// picker拍照标签
				labelArr:[],
				nowLabelName:null,
			}
		},
		created(){
			this.act_label()
		},
		methods:{
			...mapActions('shopArr',[
				'act_label'
			]),
			
			// 档期标签数组
			getLabelArr(){
				let arr = []
				this.get_label.forEach((i)=>{
					let lis = {
						id: i.id,
						name: i.name
					}
					arr.push(lis)
				})
				arr[0].name = '请选择'
				this.labelArr = arr
			},
			// 获得当前档期标签数组
			getNowLabel(){
				this.nowLabelName = this.labelMap.get(this.labelId)
			},
			// 获得选择档期标签返回ID
			getLabel(e){
				if(e.name === '请选择'){
					this.$emit('getId',null)
				}else{
					this.$emit('getId',e.id)
				}
			},
		},
		watch:{
			get_label(){
				this.labelMap = new Map(this.get_label.map(item => [item.id, item.name]))
				this.getLabelArr()
				this.getNowLabel()
			},
			labelId(){
				this.getNowLabel()
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './component.scss';
</style>
