/************************************** 工具箱添加页面  *******************************************/
<template>
	<view>
		<view class="bigBox">
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
				
				<!-- 标题 -->
				<view class="titleBox">
					<view class="title"></view>
					<view class="title" v-for="(item,index) in titleArr" :key="index">{{item}}</view>
				</view>
				
				<!-- 产品内容 -->
				<checkbox-group @change="checkboxChange" v-if="toolType === 'GOODS'">
					<label class="uni-list-cell uni-list-cell-pd textBox" v-for="item in toolList" :key="item.id">
						<view class="check">
							<checkbox :value="item.id" style="transform:scale(0.7)"/>
						</view>
						<view class="text f">{{item.name}}({{item.defaultP}})</view>
						<view class="text">{{item.pSalePrice}}</view>
						<view class="text">{{item.number}}</view>
					</label>
				</checkbox-group>
				
				<!-- 服装内容 -->
				<checkbox-group @change="checkboxChange" v-if="toolType === 'DRESSINFO'">
					<label class="uni-list-cell uni-list-cell-pd textBox" v-for="item in toolList" :key="item.id">
						<view class="check">
							<checkbox :value="item.id" style="transform:scale(0.7)"/>
						</view>
						<view class="text f">{{item.name}}</view>
						<view class="text">{{item.salePrice}}</view>
						<view class="text">{{item.type | type}}</view>
					</label>
				</checkbox-group>
				
				<!-- 景点内容 -->
				<checkbox-group @change="checkboxChange" v-if="toolType === 'PLACE'">
					<label class="uni-list-cell uni-list-cell-pd textBox" v-for="item in toolList" :key="item.id">
						<view class="check">
							<checkbox :value="item.id" style="transform:scale(0.7)"/>
						</view>
						<view class="text f">{{item.name}}</view>
						<view class="text">{{item.salePrice}}</view>
						<view class="text">{{item.placeType | type}}</view>
					</label>
				</checkbox-group>
				
				<!-- 服务内容 -->
				<checkbox-group @change="checkboxChange" v-if="toolType === 'SERVICES'">
					<label class="uni-list-cell uni-list-cell-pd textBox" v-for="item in toolList" :key="item.id">
						<view class="check">
							<checkbox :value="item.id" style="transform:scale(0.7)"/>
						</view>
						<view class="text f">{{item.name}}</view>
						<view class="text">{{item.salePrice}}</view>
						<view class="text">{{item.peopleNumber}}</view>
					</label>
				</checkbox-group>
				<view class="noToolList" v-if="toolList.length === 0 ">暂无数据</view>
				
				<!-- 分页 -->
				<page :current="body.page" :total="toolListLen" @pageChange="pageChange" v-if="toolListLen>1"></page>
				
				<!-- 确定 -->
				<view class="enSureBox">
					<view class="enSure" @click="enSure">添加</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { getGoodsToolList, getPlaceToolList, getServicesToolList, getDressInfoToolList } from '@/util/api/goods.js'
	import { mapGetters,mapActions } from 'vuex'
	import page from '@/components/page.vue'
	export default {
		components:{
			page
		},
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
		data() {
			return {
				// 标题
				titleArr:[],
				// 需添加的下标
				addIndex:null,
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
			};
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
		onLoad(option){
			this.addIndex = option.index
			this.body.shopId = Number(this.shopId)
			this.toolType = option.type
			switch(option.type){
				case 'GOODS':
					this.titleArr = ['商品名称(默认P数)','销售价','库存']
					break
				case 'DRESSINFO':
					this.titleArr = ['服装名称','服装价格','内外景']
					break
				case 'PLACE':
					this.titleArr = ['景点名称','拍摄价格','景点类型']
					break
				case 'SERVICES':
					this.titleArr = ['服务名称','服务价格','服务人数']
					break
			}
			this.getToolList()
			if(option.type !== 'DRESSINFO'){
				this.act_toolType(option.type)				
			}
		},
		methods:{
			...mapActions('shopArr',[
				'act_toolType'
			]),
			
			// 获取工具箱内容
			getToolList(){
				if(this.toolType === 'GOODS'){
					getGoodsToolList(this.body).then(res=>{
						this.toolList = res.data.data.records
						this.toolListLen = Math.ceil(res.data.data.total/res.data.data.size)
					})
				}else if(this.toolType === 'DRESSINFO'){
					let arr = this.get_shopAllArr.map((i)=>{
						return i.shopName
					})
					arr.unshift('门店选择')
					this.toolTypeList = arr
					
					getDressInfoToolList(this.body).then(res=>{
						this.toolList = res.data.data.records
						this.toolListLen = Math.ceil(res.data.data.total/res.data.data.size)
					})
				}else if(this.toolType === 'PLACE'){
					getPlaceToolList(this.body).then(res=>{
						this.toolList = res.data.data.records
						this.toolListLen = Math.ceil(res.data.data.total/res.data.data.size)
					})
				}else if(this.toolType === 'SERVICES'){
					getServicesToolList(this.body).then(res=>{
						this.toolList = res.data.data.records
						this.toolListLen = Math.ceil(res.data.data.total/res.data.data.size)
					})
				}
			},
			
			// 工具箱分页
			pageChange(e){
				const type = e;
				if (type === 'next') {
					this.body.page += 1
					this.getToolList()
				} else if (type === 'prev') {
					this.body.page -= 1
					this.getToolList()
				}
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
			
			// 多选返回
			checkboxChange: function (e) {
				this.checkId = e.detail.value
			},
			
			// 确定选择
			enSure(){
				let needArr = this.toolList.filter((i)=>{
					if(this.checkId){
						if(this.checkId.includes(String(i.id))){
							return i
						}
					}
				})
				
				var pages = getCurrentPages();
				var prevPage = pages[pages.length - 2]; //上一个页面
				prevPage.setData({
					tool: {
						'toolArr':needArr,
						'type':this.toolType,
						'index':this.addIndex
					}
				})
				uni.navigateBack({//返回
					delta: 1
				})
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

<style lang="scss">
	.bigBox{
		.serachBox{
			margin: 30rpx;
			display: flex;
			justify-content: space-between;
			.uni-input{
				border-radius: 10rpx;
				border: 1rpx solid #61A3FF;
				padding: 10rpx;
				display: flex;
				.text{
					margin-right: 20rpx;
					width: 130rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
			input{
				padding: 8rpx;
				border-radius: 10rpx;
				border: 1rpx solid #61A3FF;
			}
			.serachBut{
				background-color: #61A3FF;
				color: #FFFFFF;
				border-radius: 10rpx;
				padding: 10rpx;
			}
		}
		.main{
			margin: 0 30rpx;
			.titleBox{
				display: flex;
				justify-content: space-between;
				text-align: center;
				.title{
					flex: 1;
				}
				.title:nth-child(2){
					flex: 1.7;
				}
				.title:nth-child(1){
					flex: 0.3;
				}
			}
			.textBox{
				margin-top: 30rpx;
				display: flex;
				justify-content: space-between;
				.check{
					flex: 0.3;
				}
				.text{
					flex: 1;
					text-align: center;
				}
				.f{
					flex: 1.7;
				}
			}
		}
		.enSure{
			width: 600rpx;
			height: 80rpx;
			margin-top: 30rpx;
			line-height: 80rpx;
			border-radius: 40rpx;
			background-color: #61A3FF;
			color: #FFFFFF;
			text-align: center;
			margin-left: 50%;
			transform: translateX(-50%);
		}
	}
</style>
