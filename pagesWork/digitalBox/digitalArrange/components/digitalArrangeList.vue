<template>
	<view class="bigBox">
		<view class="textBox">
			<view class="text">{{item.itemNo}}</view>
			<view class="text">入册/入底：{{item.bookCount | count}}/{{item.bottomCount | count}}</view>
			<view class="text">
				<view>{{text}}师：</view>
				<span>{{showName}}</span>
			</view>
			<view class="text">
				<view>{{text}}期限：</view>
				<span>{{time}}</span>
			</view>
		</view> 
		<view class="butBox">
			<view class="but" v-if="list.process" @click="button">修改</view>
			<view class="but" v-else @click="button">安排{{text}}</view>
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
		},
		data(){
			return{
				text:null,
				list:[],
				time:null,
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
			this.item.orderItemProcessDigitalProcessVos.forEach((i)=>{
				if(i.process === this.process){
					this.list = i 
				}
			})
			if(this.list.expireTime){
				let dt = new Date(Number(this.list.expireTime))
				let y = dt.getFullYear()
				let m = (dt.getMonth() + 1).toString().padStart(2, 0)
				let d = dt.getDate().toString().padStart(2, 0)
				this.time = `${y}-${m}-${d}`
			}else{
				this.time = '待安排'
			}
			if(this.list.actorNameVos){
				let name = []
				let arr = this.list.actorNameVos
				arr.forEach((i)=>{
					name.push(i.actorName)
				})
				this.showName = name.join('/')
			}else{
				this.showName = '待安排'
			}	

		},
		methods:{
			// type show
			button(){
				this.$emit('onButton',this.list)
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './digitalButtonStyle.scss';
</style>
