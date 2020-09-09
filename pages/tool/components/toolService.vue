<template>
	<view>
		<view class="titleBox">
			<view class="title">服务名称</view>
			<view class="title">服务价格</view>
			<view class="title">服务人数</view>
		</view>
		<view class="infoBox">
			<checkbox-group @change="change">
				<label class="textBox" v-for="item in info" :key="item.id">
					<view class="check">
						<checkbox :value="item.id" style="transform:scale(0.7)"/>
					</view>
					<view class="fText">{{item.name}}</view>
					<view class="text">{{item.salePrice}}</view>
					<view class="text">{{item.peopleNumber}}</view>
				</label>
			</checkbox-group>
		</view>
	</view>
</template>

<script>
	export default{
		props:['info'],
		data(){
			return{
				// 选择ID
				checkId:null,
			}
		},
		methods:{
			// 多选返回
			change(e) {
				this.checkId = e.detail.value
				let needArr = this.info.filter((i)=>{
					if(this.checkId.includes(String(i.id))){
						return i
					}
				})	
				this.$emit('getTools',needArr)
			},
		}
	}
</script>

<style lang="scss">
	@import './toolTypeModulStyle';
</style>
