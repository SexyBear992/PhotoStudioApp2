<template>
	<view class="bigBox">
		<view class="textBox">
			<view class="text">{{item.itemNo}}</view>
			<view class="text">入册/入底：{{item.bookCount | count}}/{{item.bottomCount | count}}</view>
			<view class="text">
				<view>{{text}}师：</view>
				<span>{{list.actorNameVos | actor}}</span>
			</view>
			<view class="text">
				<view>{{text}}期限：</view>
				<span>{{list.expireTime | time}}</span>
			</view>
		</view> 
		<view class="butBox">
			<view class="but" v-if="list.process" @click="button('UPDATE')">修改</view>
			<view class="but" v-else @click="button('ADD')">安排{{text}}</view>
		</view>
		
	</view>
</template>

<script>
	export default{
		props:['item','type'],
		filters:{
			count(num){
				if(num){
					return num
				}else{
					return 0
				}
			},
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
			actor(arr){
				if(arr){
					let nameArr = []
					arr.forEach((i)=>{
						nameArr.push(i.actorName)
					})
					return nameArr.join('/')
				}else{
					return '待安排'
				}
			},
		},
		data(){
			return{
				text:null,
				list:[],
				showName:null,
				process:null,
			}
		},
		mounted(){
			switch(this.type){
				case 'cx':
					this.text = '初修'
					this.process = 'REPAIR'
					break
				case 'jx':
					this.text = '精修'
					this.process = 'REFINE'
					break
				case 'sj':
					this.text = '设计'
					this.process = 'DESIGN'
					break
				case 'fp':
					this.text = '发片'
					this.process = 'SENDER'
					break
			}
			this.getList()
		},
		methods:{
			getList(){
				this.item.orderItemProcessDigitalProcessVos.forEach((i)=>{
					if(i.process === this.process){ this.list = i }
				})
				this.list.itemId = this.item.itemId
			},
			button(type){
				this.list.dataStatus = type
				this.$emit('onButton',this.list)
			}
		},
		watch:{
			item(){
				this.getList()
			},
		},
	}
</script>

<style lang="scss" scoped>
	@import './digitalButtonStyle.scss';
</style>
