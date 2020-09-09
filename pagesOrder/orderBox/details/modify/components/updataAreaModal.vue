/************************************ 编辑客户区域 ***********************************/
<template>
	<view class="bigBox">
		<view class="box">
			
		
			<view class="titleBox">
				<view class="title">编辑客户区域</view>
				<view class="close" @click="cancel">
					<i-icon type="close" size="18" color="#80848f"/>
				</view>
			</view>
				
				
			<view class="mainBox">
				<view class="listBox">
					<view class="titleB">
						<view class="title">客户区域：</view>
					</view>
					<pickerModule my-img="imgMargin" :arrInfo="pickerArea" :nowName="nowAreaName" @getId="getAreaId"></pickerModule>
				</view>
			</view>
				
			
				
			<view class="but">
				<view class="cancel" @click="cancel">取消</view>
				<view class="ok" @click="ok">保存</view>
			</view>
		</view>
	</view>
</template>

<script>
	import pickerModule from '@/components/pickerModule.vue'
	import { updataArea } from '@/util/api/shop.js'
	import { mapGetters } from 'vuex'
	export default{
		components:{
			pickerModule
		},
		props:["openInfo"],
		computed:{
			...mapGetters('shopArr',[
				// 区域
				'get_category',
			])
		},
		data(){
			return{
				// 过滤区域
				categoryIdMap: new Map(),  
				
				// 区域picker
				pickerArea:[],
				nowAreaName:null,
				
				areaInfo:{}
			}
		},
		mounted(){
			this.categoryIdMap = new Map(this.get_category.map(item => [item.id, item.name]))
			let info = {
				categoryId: this.openInfo.customerGroupVo.categoryId,
				groupId:this.openInfo.customerGroupVo.id,
			}
			this.areaInfo = info
			this.newchangareaId()
		},
		methods:{
			// 创建来源数组
			newchangareaId(){
				let arr = []
				this.get_category.forEach((i)=>{
					let lis ={
						id:i.id,
						name:i.name
					}
					arr.push(lis)
				})
				arr[0].name = '请选择'
				arr[0].id = null
				this.pickerArea = arr
				this.nowAreaName = this.categoryIdMap.get(this.openInfo.customerGroupVo.categoryId)
			},
			
			getAreaId(e){
				this.areaInfo.categoryId = e.id
			},
			
			// 保存
			ok(){
				updataArea(this.areaInfo).then(res=>{
					if(res.data.code === 200){
						this.$emit('ok')
					}
				})
			},
			// 取消
			cancel(){
				this.$emit('cancel')
			}
		},
	}
</script>

<style lang="scss" scoped>
	@import './updataModal.scss';
	/deep/.imgMargin{
		margin: 18rpx 0 0 5rpx !important;
	}
</style>
