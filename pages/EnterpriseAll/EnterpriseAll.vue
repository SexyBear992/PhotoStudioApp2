/****************  全部员工 通讯录页面   *******************/
<template>
	<view>
		<addressBox
			:formatName="formatName"
			:activeCity="activeCity"
			:hotCity="hotCity"
			:obtainCitys="AllArr"
			:isSearch="true"
			ref="citys"
		></addressBox>
	</view>
</template>

<script>
	import addressBox from './components/addressBook/addressIndex.vue'
	import { getAccountAllArr } from '@/util/api/user.js'
	export default {
		components:{
			addressBox
		},
		data() {
			return {
				// 员工类型
				type:null,
				// 所有员工
				AllArr:[],
				//需要构建索引参数的名称（注意：传递的对象里面必须要有这个名称的参数）
				formatName: 'accountName',
				
			};
		},
		onLoad(option){
			this.type = option.type
		},
		mounted(){
			this.getAccountAllArr()
		},
		methods:{
			// 获取员工列表信息
			getAccountAllArr(){
				getAccountAllArr().then(res=>{
					// 过滤掉无关员工
					let newArr =res.data.data.filter((i)=>{
					 return	i.positionTypes.includes(this.type)
					})
					this.AllArr = newArr
					console.log(newArr)
				})
			},
		}
	}
</script>

<style lang="scss">

</style>
