<template>
	<view class="bigBox">
		<view class="box">
			<view class="titleBox">
				<view class="title">安排{{text}}</view>
				<view class="close" @click="cancel">
					<i-icon type="close" size="18" color="#80848f"/>
				</view>
			</view>
			
			<view class="mainBox">
				<list 
					:title="text + '师'" 
					:show="show" 
					:type="addressType" 
					fa-title="faTitle"
					fa-text="faText"
					@goAddress="goAddress"
				></list>
				
				<view class="timeBox">
					<view class="titleT">完成期限</view>
					<view class="text" @click="openCalendar">
						{{params.expireTime | times}}
						<image class="my-img" src="https://lyfz-saas-erp-system.oss-cn-hangzhou.aliyuncs.com/AppletsFile/down.png" mode=""></image>
					</view>
				</view>
			</view>
			
			<view class="butBox">
				<view class="but" @click="updataRepair">确定</view>
			</view>
		</view>
		
		<!-- 日历 -->
		<uni-calendar 
			:insert="false"
			:lunar="true" 
			:clearDate='true'
			@confirm="enSure"
			ref="calendar"
		/>
		<i-message id="message" />
	</view>
</template>

<script>
	import uniCalendar from '@/components/uni/uni-calendar/uni-calendar.vue'
	import list from '@/components/detailWorkMain/personList.vue'
	import { updateDigital } from '@/util/api/shop.js'
	import { mapGetters } from 'vuex'
	export default{
		props:['info','type','showName'],
		components:{
			uniCalendar,
			list
		},
		computed:{
			...mapGetters('app',[
				'shopId',
			]),
		},
		filters:{
			times(time){
				if(time){
					let dt = new Date(Number(time))
					let y = dt.getFullYear()
					let m = (dt.getMonth() + 1).toString().padStart(2, 0)
					let d = dt.getDate().toString().padStart(2, 0)
					return `${y}-${m}-${d}`
				}else{
					return '待安排'
				}
			},
		},
		data(){
			return{
				text:null,
				show:'请选择',
				addressType:null,
				params:{
					shopId:null,
					actorIds:null,
					expireTime:null,
				},
			}
		},
		mounted(){
			this.params = this.info
			switch(this.type){
				case 'cx':
					this.text = '初修'
					this.addressType = 'REPAIRGRAPHER'
					break
				case 'jx':
					this.text = '精修'
					this.addressType = 'REFINEGRAPHER'
					break
				case 'sj':
					this.text = '设计'
					this.addressType = 'DESIGNGRAPHER'
					break
				case 'fp':
					this.text = '发片'
					this.addressType = 'SENDERGRAPHER'
					break
			}
			// 门店
			this.params.shopId = this.shopId
			// 人员
			if(this.info.actorNameVos){
				let nameArr = []
				this.info.actorNameVos.forEach((i)=>{
					nameArr.push(i.actorName)
				})
				let nameId = []
				this.info.actorNameVos.forEach((i)=>{
					nameId.push(i.actorId)
				})
				this.params.actorIds = nameId
				this.show = nameArr.join('/')
			}
			delete this.params.actorNameVos
		},
		methods:{
			updataRepair(){
				updateDigital(this.params).then(res=>{
					if(res.data.code === 200){
						this.$emit('ok')
					}
				})
			},
			// 关闭模态框
			cancel(){
				this.$emit('close')
			},	
			goAddress(){
				uni.navigateTo({
					url:'/pages/address/address?type=' + this.addressType + '&show=' + this.show
				})
			},
			// 打开日历
			openCalendar(){
				this.$refs.calendar.open()
			},
			// 确定时间
			enSure(e){
				this.params.expireTime = Date.parse(new Date(e.fulldate))
			},
			
		},
		watch:{
			// 修改名字
			showName:{
				deep:true,
				handler(){
					this.show = this.showName.show
					this.params.actorIds = this.showName.enArr.map((i)=>{ return i.id})
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	/deep/.faTitle{
		width: 200rpx !important;
	}
	/deep/.faText{
		max-width: 200rpx !important;
	}
	.bigBox{
		z-index: 2;
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,0.5);
		top: 0;
		color: #8d8d8d;
		.box{
			background-color: #FFFFFF;
			width: 550rpx;
			margin: 50% auto;
			border-radius: 15rpx;
		}
		.titleBox{
			display: flex;
			justify-content: space-between;
			color: #000000;
			padding: 30rpx;
			border-bottom: 1rpx solid #DDD;
			.title{
				font-size: 32rpx;
				color: #333333;
				text-align: center;
				font-weight: bold;
			}
		}
		
		.mainBox{
			padding: 30rpx;
			.timeBox{
				display: flex;
				margin-top: 30rpx;
				.titleT{
					width: 200rpx
				}
				.text{
					max-width: 200rpx;
				}
			}
		}
		.butBox{
			display: flex;
			flex-direction: row-reverse;
			padding: 30rpx;
			.but{
				background-color: #61A3FF;
				color: #FFFFFF;
				padding: 10rpx;
				border-radius: 10rpx;
			}
		}

		
		image{
			width: 15rpx;
			height: 15rpx;
			margin: 18rpx 0 0 5rpx;
		}	
	}
</style>
