<template>
	<view class="bigBox">
		<view class="box">
			<view class="title">安排{{text}}</view>
			
			<list :title="text + '师'" :show="show" :type="addressType" @goAddress="goAddress"></list>
			
			<view class="timeBox">
				<view class="title">完成期限</view>
				<view class="text" @click="openCalendar">
					{{time}}
					<image class="my-img" src="https://7068-photostudioapp-1302515241.tcb.qcloud.la/newIcon/down.png" mode=""></image>
				</view>
			</view>
		
			<view @click="en">确定</view>
		</view>
	</view>
</template>

<script>
	import list from '@/pages/index/arrange/components/personList.vue'
	export default{
		props:['info','type','showName','calendarTime'],
		components:{
			list
		},
		data(){
			return{
				text:null,
				show:'请选择',
				addressType:null,
				time:null,
			}
		},
		mounted(){
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
			// 人员
			let nameArr = []
			this.info.actorNameVos.forEach((i)=>{
				nameArr.push(i.actorName)
			})
			this.show = nameArr.join('/')
			
			// 时间
			if(this.info.expireTime){
				let dt = new Date(Number(this.info.expireTime))
				let y = dt.getFullYear()
				let m = (dt.getMonth() + 1).toString().padStart(2, 0)
				let d = dt.getDate().toString().padStart(2, 0)
				this.time = `${y}-${m}-${d}`
			}else{
				this.time = '待安排'
			}
			console.log(this.type)
		},
		methods:{
			goAddress(){
				uni.navigateTo({
					url:'./../../../address/address?type=' + this.addressType + '&show=' + this.show
				})
			},
			// 打开日历
			openCalendar(){
				this.$emit('openCalendar')
			},
			// 确定
			en(){
				this.$emit('ok')
			},
		},
		watch:{
			// 修改名字
			showName:{
				deep:true,
				handler(){
					this.show = this.showName.show
					console.log('返回得到名字',this.showName)
				}
			},
			// 修改时间
			calendarTime:{
				deep:true,
				handler(){
					this.time = this.calendarTime
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
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
		
		image{
			width: 15rpx;
			height: 15rpx;
			margin: 18rpx 0 0 5rpx;
		}	
	}
</style>
