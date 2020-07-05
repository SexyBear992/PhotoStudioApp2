<template>
	<!-- 候选人选择-->
	<view class="city-select">
		<scroll-view :scroll-top="scrollTop" scroll-y="true" class="city-select-main" id="city-select-main" :scroll-into-view="toView">
			<!-- 预留搜索-->
			<view class="serachBox">
				<view class="city-serach" v-if="isSearch"><input @input="keyInput" placeholder="搜索名字" class="city-serach-input" /></view>
				<view class="moveBox" @click="openDrawer">
					<view class="move"></view>
				</view>
			</view>
			<!-- 候选人列表(搜索前) -->
			<view class="citys" v-if="!serachCity && !chooseCity">
				<view v-for="(city, index) in sortItems" :key="index" v-show="city.isCity">
					<view class="citys-item-letter" :id="'city-letter-' + (city.name === '#' ? '0' : city.name)">{{ city.name }}</view>
						<view class="citys-item" v-for="(item, inx) in city.citys" :key="inx" @click="cityTrigger(item)">
							<checkbox-group @change="checkboxChange($event,item.oldData.cityCode)">
								<checkbox :value="item.cityName" />{{ item.cityName }}
							</checkbox-group>
						</view>
				</view>
			</view>
			<!-- 候选人列表(搜索后)  -->
			<view class="citys" v-if="serachCity">
				<view v-for="(item, index) in searchDatas" :key="index">
					<checkbox-group @change="checkboxChange($event,item.oldData.cityCode)">
						<view class="citys-item" :key="inx" @click="cityTrigger(item)">
							<checkbox :value="item.name" />{{ item.name }}
						</view>
					</checkbox-group>
				</view>
			</view>
			<!-- 候选人列表(选择类型后)  -->
			<view class="citys" v-if="chooseCity &&!serachCity">
				<view class="chooseType">
					{{chooseType}}
				</view>
				<view v-for="(item, index) in chooseDatas" :key="index">
					<checkbox-group @change="checkboxChange($event,item.oldData.cityCode)">
						<view class="citys-item" :key="inx" @click="cityTrigger(item)">
							<checkbox :value="item.name" />
							{{ item.name }}
						</view>
					</checkbox-group>
				</view>
			</view>
		</scroll-view>
		<!-- 候选人选择索引-->
		<view class="city-indexs-view" v-if="!serachCity ">
			<view class="city-indexs">
				<view v-for="(cityIns, index) in handleCity" v-show="cityIns.isCity" :key="index" @click="cityindex(cityIns.forName)">{{ cityIns.name }}</view>
			</view>
		</view>
		<uni-drawer
			mode="right"
			ref='drawer'
			class="drawer"
		>
		    <view style="padding:30rpx;">
		        <view class="uni-title">
					<view class="allCity" @click="allCity">全部</view>
					<view v-for="(item, index) in chooseTypeData" :key="index" @click="chooseDrawer(item)">
						<view class="listName">{{item}}</view>
					</view>
				</view>
		    </view>
		</uni-drawer>

		<view class="sureBut" @click="sureBut">确定</view>
	</view>
</template>

<script>
import citySelect from './candidates.js'
import uniDrawer from "@/components/uni/uni-drawer/uni-drawer.vue"
export default {
	components: {uniDrawer},
	props: {
		//传入要排序的名称
		formatName: {
			type: String,
			default: 'cityName'
		},
		//候选人数据
		obtainCitys: {
			type: Array,
			default: () => []
		},
		//是否有搜索
		isSearch: {
			type: Boolean,
			default: true
		},
		typeName :{
			type:String,
		}
	},
	data() {
		return {
			toView: 'city-letter-Find', //锚链接 初始值
			scrollTop: 0, //scroll-view 滑动的距离
			cityindexs: [], // 候选人索引
			activeCityIndex: '', // 当前所在的候选人索引
			handleCity: [], // 处理后的候选人数据
			serachCity: '', // 搜索的候选人
			cityData: [],
			needName:[], //选择的候选人
			chooseCity:'' ,//抽屉中选择
			chooseType:''  //抽屉选择类型
		}
	},
	computed: {
		/**
		 * @desc 候选人列表排序
		 * @return  Array
		 */
		sortItems() {
			for (let index = 0; index < this.handleCity.length; index++) {
				if (this.handleCity[index].isCity) {
					let cityArr = this.handleCity[index].citys
					cityArr = cityArr.sort(function(a, b) {
						var value1 = a.unicode
						var value2 = b.unicode
						return value1 - value2
					})
				}
			}
			return this.handleCity
		},
		/**
		 * @desc 搜索后的候选人列表
		 * @return Array
		 */
		searchDatas() {
			var searchData = []
			for (let i = 0; i < this.cityData.length; i++) {
				if (this.cityData[i][this.formatName].indexOf(this.serachCity) !== -1) {
					searchData.push({
						oldData: this.cityData[i],
						name: this.cityData[i][this.formatName]
					})
				}
			}
			return searchData
		},
		
		chooseTypeData() {
			var searchData = []
			for (let i = 0; i < this.cityData.length; i++) {
				searchData.push(this.cityData[i].cityType)
			}
			let newArr =  Array.from(new Set(searchData))
			return newArr
		},
		chooseDatas(){
			var searchData = []
			for (let i = 0; i < this.cityData.length; i++) {
				if(this.cityData[i].cityType == this.chooseType){
					searchData.push({
						oldData: this.cityData[i],
						name: this.cityData[i][this.formatName],
					})
				}
			}
				
			return searchData
			
		}
	},
	created() {
		// 初始化候选人数据
		this.cityData = this.obtainCitys
		this.initializationCity()
		this.buildCityindexs()
	},
	watch: {
		obtainCitys(newData) {
			this.updateCitys(newData)
		}
	},
	methods: {
		/**
		 * @desc 初始化
		 */
		updateCitys(data) {
			if (data && data.length) {
				this.cityData = data
				this.initializationCity()
				this.buildCityindexs()
			}
		},
		/**
		 * @desc 监听输入框的值
		 */
		keyInput(event) {
			this.serachCity = event.detail.value
		},
		/**
		 * @desc 初始化候选人数据
		 * @return undefind
		 */
		initializationCity() {
			this.handleCity = []
			const cityLetterArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '#']
			for (let index = 0; index < cityLetterArr.length; index++) {
				this.handleCity.push({
					name: cityLetterArr[index],
					isCity: false, // 用于区分是否含有当前字母开头的候选人
					citys: [], // 存放候选人首字母含是此字母的数组
					forName: 'city-letter-' + cityLetterArr[index] //label的绑定
				})
			}
		},
		/**
		 * @desc 得到候选人的首字母
		 * @param str String
		 */
		getLetter(str) {
			return citySelect.getFirstLetter(str[0])
		},
		/**
		 * @desc 构建候选人索引
		 * @return undefind
		 */
		buildCityindexs() {
			this.cityindexs = []
			for (let i = 0; i < this.cityData.length; i++) {
				// 获取首字母
				const cityLetter = this.getLetter(this.cityData[i][this.formatName]).firstletter
				// 获取当前候选人首字母的unicode，用作后续排序
				const unicode = this.getLetter(this.cityData[i][this.formatName]).unicode

				const index = this.cityIndexPosition(cityLetter)
				if (this.cityindexs.indexOf(cityLetter) === -1) {
					this.handleCity[index].isCity = true
					this.cityindexs.push(cityLetter)
				}

				this.handleCity[index].citys.push({
					cityName: this.cityData[i][this.formatName],
					unicode: unicode,
					oldData: this.cityData[i]
				})
			}
		},
		/**
		 * @desc 滑动到候选人索引所在的地方
		 * @param id String 候选人索引
		 */
		cityindex(id) {
			this.toView = id
			// //创建节点查询器
			// const query = uni.createSelectorQuery().in(this)
			// var that = this
			// that.scrollTop = 0
			// //滑动到指定位置(解决方法:重置到顶部，重新计算，影响:页面会闪一下)
			// setTimeout(() => {
			// 	query
			// 		.select('#city-letter-' + (id === '#' ? '0' : id))
			// 		.boundingClientRect(data => {
			// 			// console.log("得到布局位置信息" + JSON.stringify(data));
			// 			// console.log("节点离页面顶部的距离为" + data.top);
			// 			data ? (that.scrollTop = data.top) : void 0
			// 		})
			// 		.exec()
			// }, 0)
		},
		/**
		 * @desc 获取候选人首字母的unicode
		 * @param letter String 候选人索引
		 */
		cityIndexPosition(letter) {
			if (!letter) {
				return ''
			}
			const ACode = 65
			return letter === '#' ? 26 : letter.charCodeAt(0) - ACode
		},
		/** @desc 候选人列表点击事件
		 *  @param Object
		 */
		cityTrigger(item) {
			// 传值到父组件
			this.$emit('cityClick', item.oldData ? item.oldData : item)
		},
		
		// 多选返回值
		checkboxChange: function(e,id){
			if((e.target.value).length != 0){
				let arr = {id , name:e.target.value[0]}
				this.needName.push(arr)
			}else{
				let newArr = this.needName.filter(item => item.id !== id);
				this.needName = newArr
			}
		},
		// 确定提交
		sureBut(){
			let arr = []

			this.needName.forEach(e=>{
				arr.push(e.name)
			})
			let str = arr.toString().replace(/,/g,"/")
			
			if(this.typeName == 'pickOrder'){
				this.$store.commit('pickOrder',str)
			}else if(this.typeName == 'CustomerService'){
				this.$store.commit('CustomerService',str)
			}else if(this.typeName == 'NetSales'){
				this.$store.commit('NetSales',str)
			}else if(this.typeName == 'references'){
				this.$store.commit('references',str)
				let _this = this
				this.cityData.forEach((i)=>{
					if(i.cityName == str){
						_this.$store.commit('sourcePhone',i.phone)					
					}
				})
			}
			uni.navigateBack({
				delta:1
			})
		},
		// 抽屉打开
		openDrawer(){
			this.$refs.drawer.open()
		},
		// 抽屉中数据选择
		chooseDrawer(i){
			this.$refs.drawer.close()
			this.chooseCity = '唐山'
			this.chooseType = i
		},
		// 抽屉中选择全部
		allCity(){
			this.$refs.drawer.close()
			this.chooseCity = ''
		},
	},
}
</script>

<style lang="scss" scoped>
//宽度转换vw
@function vww($number) {
	@return ($number / 375) * 750 + rpx;
}

view {
	box-sizing: border-box;
}

.serachBox{
	display: flex;
	.city-serach {
		width: 90%;
		color: #4a4a4a;
		padding: 0 vww(10);
	
		&-input {
			margin: vww(10) 0;
			height: vww(40);
			line-height: vww(40);
			font-size: vww(14);
			padding: 0 vww(5);
			border: 1px solid #4d8cfd;
			border-radius: 3px;
		}
	}
	.moveBox{
		padding: 30rpx;
		z-index: 3;
		.move{
			margin-top: 10rpx;
			width: 50rpx;
			height: 50rpx;
			background-color: #4d8cfd;
		}
	}
	
}


.city-select-main {
	position: relative;
	// overflow: scroll;
	// -webkit-overflow-scrolling: touch;
	width: 100%;
	height: 100%;
	background: #f6f5fa;
	// overflow-y: auto;
}

.city-select {
	position: relative;
	width: 100vw;
	height: 100vh;
	background: #f6f5fa;

	// 热门城市
	.hot-title {
		padding-left: vww(23);
		width: 100vw;
		font-size: 14px;
		line-height: vww(40);
		color: #9b9b9b;
	}

	.hot-city {
		padding-left: vww(23);
		padding-right: vww(20);
		overflow: hidden;
		width: 100vw;

		.hot-item {
			float: left;
			padding: 0 vww(5);
			margin-right: vww(16);
			margin-bottom: vww(6);
			overflow: hidden;
			width: vww(100);
			height: vww(31);
			font-size: 14px;
			text-align: center;

			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 1;

			line-height: vww(31);
			color: #4a4a4a;
			background: #fff;
			border: 1px solid #ebebf0;

			&:nth-child(3n) {
				margin-right: 0;
			}
		}

		.hot-hidden {
			display: none;
			margin-right: 0;
		}
	}

	.citys {
		> view {
			padding-left: vww(18);
			width: 100%;
			font-size: 14px;
			background: #fff;

			.citys-item-letter {
				margin-left: vww(-18);
				padding-left: vww(18);
				margin-top: -1px;
				width: 100vw;
				line-height: vww(30);
				color: #9b9b9b;
				background: #f6f5fa;
				border-top: none;
			}

			.citys-item {
				width: 100%;
				line-height: vww(50);
				color: #4a4a4a;
				border-bottom: 1px solid #ebebf0;

				&:last-child {
					border: none;
				}
			}
		}
		.chooseType{
			margin-top: -1px;
			width: 100vw;
			line-height: 60rpx;
			color: #9b9b9b;
			background: #f6f5fa;
			border-top: none;
		}
	}

	.city-indexs-view {
		position: absolute;
		right: 0;
		top: 0;
		z-index: 2;
		display: flex;
		width: vww(20);
		height: 100%;
		text-align: center;

		.city-indexs {
			width: vww(20);
			text-align: center;
			vertical-align: middle;
			align-self: center;

			> view {
				margin-bottom: vww(10);
				width: vww(20);
				font-size: 12px;
				color: #4d8cfd;

				&:last-child {
					margin-bottom: 0;
				}
			}
		}
	}
}
.sureBut{
	z-index: 2;
	position: fixed;
	bottom: 120rpx;
	margin-left: 50%;
	transform: translateX(-50%);
	width: 150rpx;
	height: 50rpx;
	font-size: 28rpx;
	text-align: center;
	line-height: 50rpx;
	color: #FFFFFF;
	border-radius: 25rpx;
	background-color: #61a3ff;
}
.drawer{
	.allCity{
		border-bottom: 1rpx solid #f6f5fa;
		padding: 10rpx 0;
	}
	.listName{
		border-bottom: 1rpx solid #f6f5fa;
		padding: 10rpx 0;
	}
}
</style>
