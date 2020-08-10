/**************************** 档期分组 *****************************/
<template>
	<view>
		<view class="box">
			<view class="title">档期分组</view>
			<pickerModule my-img="imgMargin" :arrInfo="scheduleArr" :nowName="nowScheduleName" @getId="getSchedule"></pickerModule>
		</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	import pickerModule from '@/components/pickerModule.vue'
	import { getPhotoTemplate } from '@/util/api/shop.js'
	export default{
		props:['type','date','shopId'],
		components:{
			pickerModule,
		},
		computed:{
			...mapGetters('shopArr',[
				// 预约档期
				'get_schedule',
			])
		},
		data(){
			return{
				// 过滤档期分组
				scheduleMap: new Map(),
				// 预约模板
				templateMap:new Map([
					['ALL','任意订单'],
					['WEDDING_DRESS','婚纱订单'],
					['BABY','儿童订单'],
					['PREGNANT','孕妈订单'],
					['PORTRAY','写真订单'],
					['SERVICE','服务订单'],
					['WEDDING','婚庆订单'],
				]),
				
				// picker档期分组
				scheduleArr:[{id:null,name:'请选择预约时间'}],
				nowScheduleName:null,
				
			}
		},
		mounted(){
			this.scheduleMap = new Map(this.get_schedule.map(item => [item.id, item.name]))
		},
		methods:{
			// 获得预约模板
			getPhotoTemplate(){
				let params = {
					controlType:this.type,
					reservationDate:this.date,
					reservationShopId:this.shopId,
				}
				getPhotoTemplate(params).then(res=>{
					let data = res.data.data
					const online = new Map([
						[true,'线上'],
						[false,'线下'],
					])
					let arr = []
					data.forEach((i)=>{
						let lis = {
							id:i.id,
							name:`${this.scheduleMap.get(i.groupTypeCategoryId)}[${online.get(i.isOnline)}]${this.templateMap.get(i.controlType)}`
						}
						arr.push(lis)
					})
					this.scheduleArr = arr
					// 赋值默认模板ID
					this.$emit('getId',arr[0].id)
				})
			},
			getSchedule(e){
				this.$emit('getId',e.id)
			}
		},
		watch:{
			date(){
				this.getPhotoTemplate()
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import './component.scss';
</style>
