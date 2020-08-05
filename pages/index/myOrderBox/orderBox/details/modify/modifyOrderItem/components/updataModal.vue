<template>
	<view class="bigBox">
		<view class="box">
			<view class="titleBox">
				<view class="title">修改</view>
				<view  @click="close">
					<i-icon type="close" size="15" color="#80848f"/>
				</view>
			</view>
			
			<!-- 景点 -->
			<view class="mainBox" v-if="faType === 'PLACE'">
				<view class="listBox">
					<view class="titleB">
						<view class="title">备注：</view>
					</view>
					<view class="textBox">
						<textarea type="text" v-model="updatInfo.remark"  placeholder="备注" />
					</view>
				</view>
			</view>
			
			<view class="mainBox" v-if="faType === 'GOODS' ">
				<view class="listBox">
					<view class="titleB">
						<view class="title">P数：</view> 
					</view>
					<view class="textBox">
						<input type="number" class="text" placeholder="P数" v-model="updatInfo.countP" />
					</view>
				</view>
				
				<view class="listBox">
					<view class="titleB">
						<view class="title">数量：</view>
					</view>
					<view class="textBox">
						<input type="number" class="text" placeholder="数量" v-model="updatInfo.countNum" />
					</view>
				</view>
				
				<view class="listBox">
					<view class="titleB">
						<view class="title">加急时间：</view>
					</view>
					<view class="textBox">
						<view class="text" @click="openCalendar">{{updatInfo.expeditedTime | time}}</view>
						<image src="https://7068-photostudioapp-1302515241.tcb.qcloud.la/newIcon/down.png" mode=""></image>
					</view>
				</view>
				
				<view class="listBox">
					<view class="titleB">
						<view class="title">取件方式：</view>
					</view>
					<pickerModule my-img="imgMargin" :arrInfo="pickerPickUp" :nowName="nowPickUpName" @getId="getPickUpId"></pickerModule>
				</view>
				
				<view class="listBox">
					<view class="titleB">
						<view class="title">备注：</view>
					</view>
					<view class="textBox">
						<textarea type="text" v-model="updatInfo.remark"  placeholder="备注" />
					</view>
				</view>
				
			</view>
			
			<view class="mainBox" v-if="faType === 'DRESSINFO' || faType === 'SERVICES'">
				<view class="listBox">
					<view class="titleB">
						<view class="title">数量：</view>
					</view>
					<view class="textBox">
						<input type="text" class="text" placeholder="数量" v-model="updatInfo.count" />
					</view>
				</view>
				
				<view class="listBox">
					<view class="titleB">
						<view class="title">备注：</view>
					</view>
					<view class="textBox">
						<textarea type="text" v-model="updatInfo.remark"  placeholder="备注" />
					</view>
				</view>
			</view>
			
			<view class="okBox">
				<view class="ok" @click="ok">确定修改</view>
			</view>
		</view>
	</view>
</template>

<script>
	import pickerModule from '@/components/pickerModule.vue'
	import { mapGetters, mapActions} from 'vuex'
	export default{
		components:{
			pickerModule
		},
		props:['info','faType','urgentTime'],
		computed:{
			...mapGetters('shopArr',[
				'get_pickUp'
			])
		},
		data(){
			return{
				// 过滤取件方式
				pickUpIdMap: new Map(),  
				
				// 取件方式picker
				pickerPickUp:[],
				nowPickUpName:null,
				
				updatInfo:{},
			}
		},
		mounted(){
			this.pickUpIdMap = new Map(this.get_pickUp.map(item => [item.id, item.name]))
			this.getParmas()
		},
		methods:{
			...mapActions('shopArr',[
				'act_pickUp'
			]),
			// 获得parmas
			getParmas(){
				let data = this.info
				if(this.faType === 'GOODS'){
					this.act_pickUp()
					let arr = {
						countNum:data.countNum,
						countP:data.countP,
						expeditedTime:data.expeditedTime,
						id:data.id,
						pickupModeCategoryId:data.pickupModeCategoryId,
						remark:data.remark
					}
					this.updatInfo = arr
				}else if(this.faType === 'DRESSINFO'){
					let arr = {
						count: data.count,
						id: data.id,
						remark: data.remark,
					}
					this.updatInfo = arr
				}else if(this.faType === 'SERVICES'){
					let arr = {
						count: data.count,
						id: data.id,
						remark: data.remark,
					}
					this.updatInfo = arr
				}else if(this.faType === 'PLACE'){
					let arr = {
						id:data.id,
						remark:data.remark
					}
					this.updatInfo = arr
				}
				
			},
			
			// 创建取件方式数组
			newchangPickUpId(){
				let arr = []
				this.get_pickUp.forEach((i)=>{
					let lis ={
						id:i.id,
						name:i.name
					}
					arr.push(lis)
				})
				arr[0].name = '请选择'
				arr[0].id = null
				this.pickerPickUp = arr
				this.nowPickUpName = this.pickUpIdMap.get(this.updatInfo.pickupModeCategoryId)
			},
			getPickUpId(e){
				this.updatInfo.pickupModeCategoryId = e.id
			},
			
			// 打开日历
			openCalendar(){
				this.$emit('openCalendar')
			},
			
			// 关闭
			close(){
				this.$emit('close')
			},
			// 修改
			ok(){
				this.$emit('ok',this.updatInfo)
			}
		},
		watch:{
			info(){
				this.getParmas()
			},
			updatInfo:{
				deep:true,
				handler(){
					console.log('监听数据变化',this.updatInfo)
				}
			},
			// 加急时间
			urgentTime(){
				this.updatInfo.expeditedTime = this.urgentTime
			},
			// 取件方式
			get_pickUp(){
				this.pickUpIdMap = new Map(this.get_pickUp.map(item => [item.id, item.name]))
				this.newchangPickUpId()
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../components/updataModal.scss';

	.okBox{
		display: flex;
		flex-direction: row-reverse;
		padding: 30rpx;
		border-top: 1rpx solid #DDD;
		.ok{
			width: 150rpx;
			height: 60rpx;
			font-size: 28rpx;
			text-align: center;
			line-height: 60rpx;
			border-radius: 10rpx;
			border: 1rpx solid #DDDDDD;
		}
	}
	/deep/.imgMargin{
		margin: 18rpx 0 0 5rpx !important;
	}
</style>
