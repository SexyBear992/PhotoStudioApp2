<template>
	<view>
		<view class="box">
			<view class="titleTop">客资来源</view>
			<view class="bigBox">
				<view class="left">
					<view class="title">客户来源</view>
					<view class="text" v-if="params.categoryJson.province">{{params.categoryJson.province | noData('客户来源')}}/{{params.categoryJson.city}}/{{params.categoryJson.region}}</view>
				</view>
			</view>
			<view class="bigBox">
				<view class="left">
					<view class="title">客户区域</view>
					<view class="text">{{params.source | noData('客户区域')}}</view>
				</view>
			</view>
			<view class="bigBox">
				<view class="left">
					<view class="title">老客姓名</view>
					<view class="text">{{params.referrerName | noData('老客手机')}}</view>
				</view>
			</view>
			<view class="bigBox">
				<view class="left">
					<view class="title">老客手机</view>
					<view class="text">{{params.referrerMobile | noData('老客手机')}}</view>
				</view>
			</view>
			<view class="bigBox" v-if="type === 'WEDDING_DRESS'">
				<view class="left">
					<view class="title">结婚日期</view>
					<view class="text">{{params.weddingDay | time}}</view>
				</view>
			</view>
			<view class="bigBox" v-if="type === 'PREGNANT'">
				<view class="left">
					<view class="title">预产日期</view>
					<view class="text">{{params.dueDate | time}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:['mainContact','type'],
		filters:{
			noData(data,text){
				if(data){
					return data
				}else{
					return text
				}
			}
		},
		data(){
			return{
				params:{
					customerId:null, 
					categoryJson:{
						city:null,	//区域省份	
						country:null,	//区域国家	
						province:null,	//区域省份	
						region:null,	//地域区域
					},
					dueDate:null,	//孕期
					originJson:{
						cid:null,	//来源CID
						cname:null,	//来源CNAME	
						sid:null,	//来源SID
						sname:null,	//来源SNAME
					},
					referrerMobile:null,	//推荐人电话
					referrerName:null,	//推荐人姓名
					weddingDay:null,	//婚期
				},
			}
		},
		mounted(){
			let p = this.params
			let m = this.mainContact
			p.customerId = m.customerId
			p.categoryJson.city = m.city
			p.categoryJson.country = m.country
			p.categoryJson.province = m.province
			p.categoryJson.region = m.region
			p.dueDate = Boolean(m.dueDate) ? Date.parse(new Date(m.dueDate)) : null
			p.originJson.cid = m.cid
			p.originJson.cname = m.source.split('-')[0]
			p.originJson.sid = m.sid
			p.originJson.sname = m.source.split('-')[1]
			p.referrerMobile = m.regularCustomerPhone
			p.referrerName = m.regularCustomerName
			p.weddingDay = Boolean(m.weddingDay) ? Date.parse(new Date(m.weddingDay)) : null
		},
		methods:{
			save(){
				return this.params
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './components/moduleStyle.scss';
</style>
