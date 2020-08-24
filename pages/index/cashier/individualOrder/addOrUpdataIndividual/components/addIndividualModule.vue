<template>
	<view class="bigBox">
		<!-- 称呼 -->
		<view class="listBox">
			<view class="title">称呼</view>
			<pickerModule my-img="imgMargin" :arrInfo="pickerSexArr" :nowName="nowSex" @getId="getSexId"></pickerModule>
		</view>
		
		<!-- 客户名称 -->
		<view class="listBox">
			<view class="title">客户名称</view>
			<input type="text" v-model="params.customerContactAddDto.name" placeholder="请输入"/>
		</view>
		
		<!-- 客户电话 -->
		<view class="listBox">
			<view class="title">客户电话</view>
			<input type="text" v-model="params.customerContactAddDto.mobile" placeholder="请输入"/>
		</view>
		
		<!-- 客户微信 -->
		<view class="listBox">
			<view class="title">客户微信</view>
			<input type="text" v-model="params.customerContactAddDto.wechat" placeholder="请输入"/>
		</view>
		
		<!-- 项目名字 -->
		<view class="listBox">
			<view class="title">项目名字</view>
			<input type="text" v-model="params.name" placeholder="请输入"/>
		</view>
		
		<!-- 项目类别 -->
		<view class="listBox">
			<view class="title">项目类别</view>
			<pickerModule my-img="imgMargin" :arrInfo="pickerConsumeArr" :nowName="nowConsume"  @getId="getConsumeId"></pickerModule>
		</view>
		
		<!-- 订单金额 -->
		<view class="listBox">
			<view class="title">订单金额</view>
			<input type="number" v-model="params.sumPrice" placeholder="请输入"/>
		</view>
		
		<!-- 订单日期 -->
		<view class="listBox">
			<view class="title">订单日期</view>
			<view class="text" @click="openCalendar">
				<view>{{params.orderTime | time}}</view>
				<image class="my-img" src="https://7068-photostudioapp-1302515241.tcb.qcloud.la/newIcon/down.png" mode=""></image>
			</view>
			<view v-else>
				<view>{{params.orderTime | time}}</view>
			</view>
		</view>
		
		<!-- 接单人 -->
		<view class="listBox">
			<list :title="'接单人'" :show="reception" :type="'RECEPTION'" @goAddress="goAddress"></list>
		</view>
		
		<!-- 录单人 -->
		<view class="listBox">
			<view class="title">录单人</view>
			<view>{{get_userInfo.anotherName}}</view>
		</view>
		
		<!-- 订单备注 -->
		<view class="remarkBox">
			<textarea placeholder="订单备注:" v-model="params.remark"/>
		</view>
	
		<goodsBox :info="params.orderGoodsItemDtos" @del="delGoods"></goodsBox>
		
		<view class="button" @click="addOrder">新增订单</view>
		
	</view>
</template>

<script>
	import goodsBox from './components/goodsBox.vue'
	import pickerModule from '@/components/pickerModule.vue'
	import list from '@/pages/index/arrange/components/personList.vue'
	import { addOrderIndividual } from '@/util/api/shop.js'
	export default {
		components:{
			pickerModule,
			list,
			goodsBox
		},
		computed:{
			...mapGetters('app',[
				'shopId',
				'get_userInfo'
			]),
			...mapGetters('shopArr',[
				// 消费类别
				'get_consumeType',
			]),
		},
		data() {
			return {
				reception:'请选择',
				pickerConsumeArr:[],
				nowConsume:'请选择',
				pickerSexArr:[{name:'先生',id:true},{name:'女士',id:false}],
				nowSex:'先生',
				
				params:{
					customerContactAddDto:{ //	客户资料
						id:null, //联系人ID
						mobile:null, //客户手机号码
						name:null, //客户姓名
						sex:true, //客户性别
						wechat:null, //客户微信
					},
					name:null, //项目名称
					orderGoodsItemDtos:null	,//商品数组
					orderTime:null, //订单时间
					receptions:null, //接单人ID
					remark:null, //备注
					saleCategoryId:null, //消费类别
					shopId:null, //门店ID
					sumPrice:null, //总价格
				}
			};
		},
	}
</script>

<style>
</style>
