/*****************   联系人模态框  ***************/
<template>
	<view class="bigBox">
		<view class="box">
			<view class="topBox">
				<view class="title">人员选择</view>
				<view @click="close">
					<i-icon type="close" size="15" color="#80848f"/>
				</view>
			</view>
			
			<view class="serach">
				<picker @change="bindPickerChange" :value="pickerIndex" :range="pickerArr">
					<view class="uni-input">
						<view>{{pickerArr[pickerIndex]}}</view>
						<i-icon type="unfold" size="15" color="#80848f"/>
					</view>
				</picker>
				</picker>
				<input type="text" placeholder="查询联系人" v-model="keyWork"/>
			</view>
			
			<view class="contentBox" v-if="!keyWork">
				<checkbox-group @change="checkboxChange">
					<view v-for="item in showArr" :key="item.id">
						<checkbox :value="item.id" :checked="item.checked" />{{ item.accountName }}
					</view>
				</checkbox-group>
			</view>
			
			<view class="contentBox" v-if="keyWork">
				<checkbox-group @change="checkboxChange">
					<view v-for="item in serachArr" :key="item.id">
						<view class="content">
							<checkbox :value="item.id" :checked="item.checked" />{{ item.accountName }}
						</view>
					</view>
				</checkbox-group>
			</view>
			
			<view class="enSureBox">
				<view class="enSure" @click="enSure">确定</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import { getAccountAllArr } from '@/util/api/user.js'
	export default{
		props:['type','show'],
		filters:{
			
		},
		data(){
			return{
				// 员工类型
				addressType:null,
				// 所有员工
				AllArr:[],
				// 显示员工
				showArr:[],
				// 已选择员工
				enArr:[],
				// 组件显示
				showText:'',
				
				// picker数组
				pickerArr:['摄影师','网销人员','摄影师助理','选片师','设计师','初修师','发片师','精修师','接单人','专服人员'],
				pickerIndex:0,
				
				// 搜索关键字
				keyWork:'',
			}
		},
		computed:{
			// 搜索数组
			serachArr() {
				let serachArr = []
				this.showArr.forEach((i)=>{
					if(i.accountName.indexOf(this.keyWork) !== -1){
						serachArr.push(i)
					}
				})
				return serachArr
			}
		},
		mounted(){
			switch(this.type){
				case 'RECEPTION':
					this.addressType = '接单人'
					break;
				case 'SERVICE':
					this.addressType = '专服人员'
					break;
				case 'NETWORK_SALES':
					this.addressType = '网销人员'
					break;
			}
			this.getAccountAllArr()
		},
		methods:{
			
			// 获取员工列表信息
			getAccountAllArr(){
				for( let i = 0; i<this.pickerArr.length ; i++){
					if( this.addressType === this.pickerArr[i]){
						this.pickerIndex = i
						break
					}
				}
				getAccountAllArr().then(res=>{
					this.AllArr = res.data.data
					// console.log('所有联系人',this.AllArr)
					this.filterArr(this.typefilter(this.addressType))
				})
			},
			
			// 过滤类型
			typefilter(type){
				const result = new Map([
					[ '接单人', 'RECEPTION'],
					[ '专服人员', 'SERVICE'],
					[ '网销人员', 'NETWORK_SALES' ],
					[ '摄影师', 'PHOTOGRAPHER' ],
					[ '摄影师助理', 'PHOTOGRAPHER_ASSISTANT' ],
					[ '化妆师', 'MAKEUP' ],
					[ '化妆师助理', 'MAKEUP_ASSISTANT' ],
					[ '引导师', 'INSTRUCTOR' ],
					[ '引导师助理', 'INSTRUCTOR_ASSISTANT' ],
					[ '录像师', 'VIDEOGRAPHER' ],
					[ '初修师', 'REPAIRGRAPHER' ],
					[ '精修师', 'REFINEGRAPHER' ],
					[ '设计师', 'DESIGNGRAPHER' ],
					[ '发片师', 'SENDERGRAPHER' ],
					[ '看版师', 'WATCHGRAPHER' ],
					[ '选片师', 'CHOOSEGRAPHER' ],
					[ '取件师', 'PICKUPGRAPHER' ],
					[ '调色师', 'COLORGRAPHER' ],
					[ '会计师', 'ACCOUNTANT' ],
					[ '人事', 'PERSONNEL' ],
					[ '店长', 'STORE_MANAGER' ],
					[ '仓管员', 'WAREHOUSE_MANAGER' ],
					[ '剪辑师', 'VIDEOCLIPGRAPHER' ],
					[ '选修师', 'ELECTIVEGRAPHER' ]
				])
					return result.get(type)
			},
			
			// 筛选员工
			filterArr(data){
				// 过滤掉无关员工
				let newArr =this.AllArr.filter((i)=>{
				 return	i.positionTypes.includes(data)
				})
				newArr.forEach((i)=>{
					if(this.show.split('/').includes(i.accountName)){
						this.$set(i,'checked',true)
					}
				})
				this.showArr = newArr
			},
			
			// 筛选条件
			bindPickerChange(e){
				this.pickerIndex = e.detail.value
				let filterName = this.pickerArr[e.detail.value]
				this.filterArr(this.typefilter(filterName))
			},
			
			// 选择联系人返回
			checkboxChange(e){
				let arr = this.AllArr.filter((i)=>{
					return e.detail.value.includes(String(i.id))
				})
				this.enArr = arr
				
				let show = this.enArr.map((i)=>{
					return i.accountName
				})
				
				this.showText = show.join('/')
			},
			
			// 关闭
			close(){
				this.$emit('close')
			},
			// 确定
			enSure(){
				if(this.addressType === '接单人'){
					if(this.enArr.length > 4){
						uni.showToast({
							title:'接单人不能超过4位',
							icon:'none'
						})
					}else{
						this.enArr[0].main = true
						this.$emit('ok',{show:this.showText,info:this.enArr})
					}
				}else if(this.addressType === '专服人员'){
					if(this.enArr.length > 1){
						uni.showToast({
							title:'专服人员不能超过1位',
							icon:'none'
						})
					}else{
						this.enArr[0].main = true
						this.$emit('ok',{show:this.showText,info:this.enArr})
					}
				}else if(this.addressType === '网销人员'){
					if(this.enArr.length > 1){
					uni.showToast({
							title:'网销人员不能超过1位',
							icon:'none'
						})
					}else{
						this.enArr[0].main = true
						this.$emit('ok',{show:this.showText,info:this.enArr})
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bigBox{
		z-index: 9999999;
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,0.5);
		font-size: 28rpx;
		top: 0;
		.box{
			background-color: #FFFFFF;
			width: 600rpx;
			margin: 50% auto;
			transform: translateY(-20%);
			border-radius: 15rpx;
			.topBox{
				padding: 30rpx;
				display: flex;
				justify-content: space-between;
			}
			
			.serach{
				padding: 30rpx;
				display: flex;
				.uni-input{
					border: 1rpx solid #61a3ff;
					display: flex;
					justify-content: space-between;
					width: 150rpx;
					border-radius: 10rpx;
					padding: 5rpx 10rpx;
				}
				input{
					margin-left: 10rpx;
					border-radius: 10rpx;
					border: 1rpx solid #61A3FF;
					padding: 0 10rpx;
				}
			}
			.contentBox{
				padding: 0 30rpx;
				.content{
					height: 50rpx;
					line-height: 50rpx;
				}
			}
			.enSureBox{
				padding: 30rpx;
				display: flex;
				flex-direction: row-reverse;
				.enSure{
					background-color: #61a3ff;
					color: #FFFFFF;
					font-size: 32rpx;
					width: 100rpx;
					height: 55rpx;
					line-height: 55rpx;
					text-align: center;
					border-radius: 10rpx;
				}
			}
		}
	}
</style>
