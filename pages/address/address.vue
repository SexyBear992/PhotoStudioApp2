/************************************   选择联系人  ************************************/
<template>
	<view>
		<view class="bigBox">
			<view class="serach">
				<picker @change="bindPickerChange" :value="pickerIndex" :range="pickerArr">
					<view class="uni-input">
						<view class="text">{{pickerArr[pickerIndex]}}</view>
						<i-icon type="unfold" size="15" color="#80848f"/>
					</view>
				</picker>
				</picker>
				<input type="text" placeholder="查询联系人" v-model="keyWork"/>
			</view>
			
			
			<view class="contentBox" v-if="!keyWork">
				<checkbox-group @change="checkboxChange">
					<view class="checkBox" v-for="item in showArr" :key="item.id">
						<checkbox :value="item.id" :checked="item.checked" />
						<view class="text">{{ item.anotherName }}</view>
					</view>
				</checkbox-group>
			</view>
			
			<view class="contentBox" v-if="keyWork">
				<checkbox-group @change="checkboxChange">
					<view v-for="item in serachArr" :key="item.id">
						<view class="content">
							<checkbox :value="item.id" :checked="item.checked" />{{ item.anotherName }}
						</view>
					</view>
				</checkbox-group>
			</view>
			
			<view @click="num" class="back">确定</view>
		</view>
	</view>
</template>

<script>
	import { getAccountAllArr } from '@/util/api/user.js'
	export default {
		computed:{
			// 搜索数组
			serachArr() {
				let serachArr = []
				this.showArr.forEach((i)=>{
					if(i.anotherName.indexOf(this.keyWork) !== -1){
						serachArr.push(i)
					}
				})
				return serachArr
			}
		},
		data() {
			return {
				// 类型
				type:null,
				// 员工类型
				addressType:null,
				// 所有员工
				allArr:[],
				// 已选员工
				show:null,
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
			};
		},
		onLoad(option){
			this.type = option.type
			this.addressType = this.typefilterCN(option.type)
			this.show = option.show
		},
		mounted(){
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
					this.allArr = res.data.data
					this.filterArr(this.typefilter(this.addressType))
				})
			},
			
			// 筛选条件
			bindPickerChange(e){
				this.pickerIndex = e.detail.value
				let filterName = this.pickerArr[e.detail.value]
				this.filterArr(this.typefilter(filterName))
			},
			
			// 选择联系人返回
			checkboxChange(e){
				let arr = this.allArr.filter((i)=>{
					return e.detail.value.includes(String(i.id))
				})
				this.enArr = arr
				let show = this.enArr.map((i)=>{
					return i.anotherName
				})
				
				this.showText = show.join('/')
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
			
			// 获取中文类型
			typefilterCN(type){
				const result = new Map([
					[ 'RECEPTION', '接单人'],
					[ 'SERVICE', '专服人员'],
					[ 'NETWORK_SALES', '网销人员' ],
					[ 'PHOTOGRAPHER', '摄影师' ],
					[ 'PHOTOGRAPHER_ASSISTANT', '摄影师助理' ],
					[ 'MAKEUP', '化妆师' ],
					[ 'MAKEUP_ASSISTANT', '化妆师助理' ],
					[ 'INSTRUCTOR', '引导师' ],
					[ 'INSTRUCTOR_ASSISTANT', '引导师助理' ],
					[ 'VIDEOGRAPHER', '录像师' ],
					[ 'REPAIRGRAPHER', '初修师' ],
					[ 'REFINEGRAPHER', '精修师' ],
					[ 'DESIGNGRAPHER', '设计师' ],
					[ 'SENDERGRAPHER', '发片师' ],
					[ 'WATCHGRAPHER', '看版师' ],
					[ 'CHOOSEGRAPHER', '选片师' ],
					[ 'PICKUPGRAPHER', '取件师' ],
					[ 'COLORGRAPHER', '调色师' ],
					[ 'ACCOUNTANT', '会计师' ],
					[ 'PERSONNEL', '人事' ],
					[ 'STORE_MANAGER', '店长' ],
					[ 'WAREHOUSE_MANAGER', '仓管员' ],
					[ 'VIDEOCLIPGRAPHER', '剪辑师' ],
					[ 'ELECTIVEGRAPHER', '选修师' ]
				])
					return result.get(type)
			},
			
			// 筛选员工
			filterArr(data){
				// 过滤掉无关员工
				let newArr =this.allArr.filter((i)=>{
				 return	i.positionTypes.includes(data)
				})
				newArr.forEach((i)=>{
					if(this.show.split('/').includes(i.anotherName)){
						this.$set(i,'checked',true)
						this.enArr.push(i)
					}
				})
				this.showArr = newArr
				let show = this.enArr.map((i)=>{
					return i.anotherName
				})
				
				this.showText = show.join('/')
			},
			
			// 判断数量
			num(){
				if(this.type === 'RECEPTION'){
					if(this.enArr.length > 4){
						uni.showToast({
							title:'接单人不能超过4位',
							icon:'none'
						})
					}else{
						this.enArr[0].main = true
						this.back()
					}
				}else if(this.type === 'SERVICE'){
					if(this.enArr.length > 1){
						uni.showToast({
							title:'专服人员不能超过1位',
							icon:'none'
						})
					}else{
						this.enArr[0].main = true
						this.back()
					}
				}else if(this.type === 'NETWORK_SALES'){
					if(this.enArr.length > 1){
					uni.showToast({
							title:'网销人员不能超过1位',
							icon:'none'
						})
					}else{
						this.enArr[0].main = true
						this.back()
					}
				}
			},
			
			// 返回
			back(){
				var pages = getCurrentPages();
				var prevPage = pages[pages.length - 2]; //上一个页面
				prevPage.setData({
					address: {
						'enArr':this.enArr,
						'show':this.showText,
						'type':this.type
					}
				})
				uni.navigateBack({//返回
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bigBox{
		font-size: 28rpx;
		.serach{
			display: flex;
			margin: 30rpx;
			.uni-input{
				flex: 1;
				padding: 10rpx;
				border: 1rpx solid #61A3FF;
				border-radius: 10rpx;
				display: flex;
				justify-content: space-between;
				.text{
					margin-right: 30rpx;
				}
			}
			input{
				flex: 3;
				padding: 8rpx;
				border: 1rpx solid #61A3FF;
				border-radius: 10rpx;
				margin-left: 30rpx;
			}
		}
		.contentBox{
			margin: 0 30rpx;
			.checkBox{
				display: flex;
				margin-bottom: 30rpx;
				.text{
					margin-left: 20rpx;
					height: 24px;
					line-height: 24px;
				}
			}
		}
		.back{
			position: fixed;
			bottom: 30rpx;
			width: 600rpx;
			color: #FFFFFF;
			background-color: #61A3FF;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			border-radius: 40rpx;
			margin: 0 auto;
			margin-left: 50%;
			transform: translateX(-50%);
		}
	}
</style>
