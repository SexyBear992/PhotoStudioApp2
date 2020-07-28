/********************    工具箱模态框      *********************/
<template>
	<view class="bigBox">
		<view class="toolBox" v-if="isTool">
			<!-- 标题 -->
			<view class="topBox">
				<view class="title">{{toolTitle}}</view>
				<view class="closeBut" @click="close">
					<i-icon type="close" size="15" color="#80848f"/>
				</view>
			</view>
			
			<!-- 查询 -->
			<view class="serachBox">
				
				<picker class="pickerBox" @change="bindPickerChange" :value="pickerIndex" :range="toolTypeList">
					<view class="uni-input">
						<view class="text">{{toolTypeList[pickerIndex]}}</view>
						<i-icon type="unfold" size="15" color="#80848f"/>
					</view>
				</picker>			

				<input type="text" placeholder="名称" v-model="body.name"/>
				
				<view class="serachBut" @click="serach">查询</view>
			</view>
			
			<!-- 内容 -->
			<view class="main">
				
				<view class="titleBox" v-if="toolType === 'GOODS'">
					<view class="title First">商品名称(默认P数)</view>
					<view class="title">销售价</view>
					<view class="title">库存</view>
				</view>
				
				<view class="titleBox" v-if="toolType === 'DRESSINFO'">
					<view class="title First">服装名称</view>
					<view class="title">服装价格</view>
					<view class="title">内外景</view>
				</view>
				
				<view class="titleBox" v-if="toolType === 'PLACE'">
					<view class="title First">景点名称</view>
					<view class="title">拍摄价格</view>
					<view class="title">景点类型</view>
				</view>
				
				<view class="titleBox" v-if="toolType === 'SERVICE'">
					<view class="title First">服务名称</view>
					<view class="title">服务价格</view>
					<view class="title">服务人数</view>
				</view>
				
				<checkbox-group @change="checkboxChange">
					<label class="uni-list-cell uni-list-cell-pd" v-for="item in toolList" :key="item.id">
						<view class="check">
							<checkbox :value="item.id" style="transform:scale(0.7)"/>
						</view>
						<view class="name">{{item.name}}<span v-if="item.defaultP">{{item.defaultP}}</span></view>
						<!-- 价格 -->
						<view class="price">{{item.salePrice}}</view>
						<!-- 库存 -->
						<view class="number" v-if="item.number >= 0">{{item.number}}</view>
						<!-- 内外景 -->
						<view class="number" v-if="item.placeType">{{item.placeType |type}}</view>
						<view class="number" v-if="item.type">{{item.type |type}}</view>
						<!-- 人数 -->
						<view class="number" v-if="item.peopleNumber">{{item.peopleNumber}}</view>
					</label>
				</checkbox-group>
				<view class="noToolList" v-if="toolList.length === 0 ">暂无数据</view>
				
				<!-- 分页 -->
				<i-page :current="body.page" :total="toolListLen" @change="pageChange" v-if="toolListLen>1">
				    <view slot="prev">上一页</view>
				    <view slot="next">下一页</view>
				</i-page>
				<view class="enSureBox">
					<view class="enSure" @click="enSure">确定</view>
				</view>
			</view>
			
		</view>
		
		<view class="listBox" v-else>
			<view class="close">
				<view class="closeBut" @click="close">
					<i-icon type="close" size="15" color="#80848f"/>
				</view>
			</view>
			<view class="textBox">
				<view class="text" @click="goodToolList">商品</view>
				<view class="text" @click="dressToolList">服装</view>
				<view class="text" @click="placeToolList">景点</view>
				<view class="text" @click="servicesToolList">服务</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {getGoodsToolList, getPlaceToolList, getServicesToolList, getDressInfoToolList} from '@/util/api/shop.js'
	import { mapGetters,mapActions } from 'vuex'
	export default{
		filters:{
			type(type){
				const result = new Map([
					['INT', '内景'],
					['OUT', '外景'],
					['NONE', '无']
				])
				return result.get(type)
			}
		},
		data(){
			return{
				// 是否打开工具箱
				isTool:false,
				// 工具箱标题
				toolTitle:null,
				// picker下标
				pickerIndex:0,
				// 工具箱类型
				toolType:null,
				// 工具箱列表
				toolList:null,
				// 工具箱类别列表
				toolTypeList:null,
				// 分页总条数
				toolListLen:null,
				// 请求工具箱包体
				body:{
					// categoryId:null,
					isSearchCount:true,
					limit:10,
					name:'',
					page:1,
					shopId:null,
				},
				
				// 多选返回的数组ID
				checkId:null
			}
		},
		computed:{
			...mapGetters('app',[
				'shopId',
			]),
			...mapGetters('shopArr',[
				'get_toolType',
				'get_shopAllArr'
			]),
		},
		mounted(){
			this.body.shopId = Number(this.shopId)
		},
		methods:{
			...mapActions('shopArr',[
				'act_toolType'
			]),
			// 关闭模态框
			close(){
				this.$emit('close')
			},
			
			// 打开商品工具箱
			goodToolList(){
				this.isTool = true
				this.toolTitle = '商品工具箱'
				this.toolType = 'GOODS'
				this.getToolList()
				this.act_toolType('GOODS')
			},
			// 打开服装工具箱
			dressToolList(){
				this.isTool = true
				this.toolType = 'DRESSINFO'
				this.toolTitle = '服装工具箱'
				this.getToolList()
				
				let arr = this.get_shopAllArr.map((i)=>{
					return i.shopName
				})
				arr.unshift('门店选择')
				this.toolTypeList = arr
			},
			// 打开景点工具箱
			placeToolList(){
				this.isTool = true
				this.toolType = 'PLACE'
				this.toolTitle = '景点工具箱'
				this.getToolList()
				this.act_toolType('PLACE')
			},
			// 打开服务工具箱
			servicesToolList(){
				this.isTool = true
				this.toolType = 'SERVICE'
				this.toolTitle = '服务工具箱'
				this.getToolList()
				this.act_toolType('SERVICES')
			},
		
			// 获取工具箱内容
			getToolList(){
				if(this.toolType === 'GOODS'){
					getGoodsToolList(this.body).then(res=>{
						this.toolList = res.data.data.records
						this.toolListLen = Math.ceil(res.data.data.total/res.data.data.size)
					})
				}else if(this.toolType === 'DRESSINFO'){
					getDressInfoToolList(this.body).then(res=>{
						this.toolList = res.data.data.records
						this.toolListLen = Math.ceil(res.data.data.total/res.data.data.size)
					})
				}else if(this.toolType === 'PLACE'){
					getPlaceToolList(this.body).then(res=>{
						this.toolList = res.data.data.records
						this.toolListLen = Math.ceil(res.data.data.total/res.data.data.size)
					})
				}else if(this.toolType === 'SERVICE'){
					getServicesToolList(this.body).then(res=>{
						this.toolList = res.data.data.records
						this.toolListLen = Math.ceil(res.data.data.total/res.data.data.size)
					})
				}
			},
			// 工具箱分页
			pageChange(e){
				const type = e.detail.type;
				if (type === 'next') {
					this.body.page += 1
					this.getToolList()
				} else if (type === 'prev') {
					this.body.page -= 1
					this.getToolList()
				}
			},
				
			// 多选返回
			checkboxChange: function (e) {
				this.checkId = e.detail.value
			},
			// 选择类返回值
			bindPickerChange(e){
				this.pickerIndex = e.target.value
				// 获取返回名字
				let name = this.toolTypeList[e.target.value]
				// 如果为服装 picker选择为门店 则为选择类型
				if(this.toolType === 'DRESSINFO'){
					delete this.body.categoryId
					this.get_shopAllArr.some((i)=>{
						if(name === '门店选择'){
							delete this.body.shopId
						}else if(i.name = name){
							this.body.shopId = i.shopId
						}
					})
				}else{
					delete this.body.shopId
					this.get_toolType.some((i)=>{
						if(name === '选择类别'){
							delete this.body.categoryId
						}else	if(i.name === name){
							this.body.categoryId = i.id
						}
					})
				}
				
				this.getToolList()
			},
			
			// 查询
			serach(){
				this.getToolList()
			},
			// 确定选择
			enSure(){
				let needArr = this.toolList.filter((i)=>{
					if(this.checkId.includes(String(i.id))){
						return i
					}
				})
				this.$emit('enSure',{arr:needArr,type:this.toolType})
			}
		},
		watch:{
			get_toolType(){
				let arr = this.get_toolType.map((i)=>{
					return i.name
				})
				arr.unshift('选择类别')
				this.toolTypeList = arr
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
		top: 0;
		.listBox{
			width: 550rpx;
			margin: 50% auto;
			border-radius: 15rpx;
			background-color: #FFFFFF;
			.close{
				display: flex;
				flex-direction: row-reverse;
				.closeBut{
					margin: 20rpx;
				}
			}
			.textBox{
				margin: 0 30rpx;
				padding-bottom: 30rpx;
				.text{
					font-size: 32rpx;
					line-height: 70rpx;
				}
			}
		}
		.toolBox{
			width: 650rpx;
			background-color: #FFFFFF;
			border-radius: 15rpx;
			margin: 50% auto;
			transform: translateY(-20%);
			.topBox{
				display: flex;
				justify-content: space-between;
				padding:30rpx;
			}
			.serachBox{
				padding: 0 30rpx;
				display: flex;
				.pickerBox{
					width: 160rpx;
					border: 1rpx solid #F0F0F0;
					border-radius: 10rpx;
					height: 50rpx;
					line-height: 50rpx;
					.uni-input{
						display: flex;
						justify-content: space-around;
						color: #808080;
					}
				}
				input{
					border: 1rpx solid #F0F0F0;
					border-radius: 10rpx;
					height: 50rpx;
					width: 200rpx;
					color: #808080;
					margin-left: 10rpx;
				}
				.serachBut{
					background-color: #61A3FF;
					color: #FFFFFF;
					height: 50rpx;
					line-height: 50rpx;
					width: 70rpx;
					text-align: center;
					border-radius: 10rpx;
					margin-left: 30rpx;
				}
			}
			.main{
				.titleBox{
					display: flex;
					margin: 0 30rpx;
					height: 70rpx;
					line-height: 70rpx;
					text-align: center;
					justify-cotent: space-between;
					color: #515a6e;
					.title{
						width: 25%;
					}
					.First{
						width: 50%;
						margin-left: 12rpx;
					}
				}
				
				.uni-list-cell{
					display: flex;
					justify-content: space-between;
					margin: 0 15rpx;
					.name{
						text-align: center;
						width: 40%;
					}
					.price{
						text-align: center;
						width: 25%;
					}
					.number{
						text-align: center;
						width: 25%;
					}
				}
			}
		}
		.enSureBox{
			display: flex;
			flex-direction: row-reverse;
			padding: 30rpx;
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
</style>
