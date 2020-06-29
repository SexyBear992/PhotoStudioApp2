<template>
	<view>
		<!-- 	@cityClick="cityClick" -->
		 <city-select
		 	:formatName="formatName"
		 	:activeCity="activeCity"
		 	:hotCity="hotCity"
		 	:obtainCitys="obtainCitys"
		 	:isSearch="true"
			:typeName="typeName"
		 	ref="citys"
		 ></city-select>
	</view>
</template>

<script>
	import candidates1 from './candidates1.js'
	import candidates2 from './candidates2.js'
	import candidates3 from './candidates3.js'
	import citySelect from '@/components/candidates/candidates.vue'
	export default {
		components: {
			citySelect
		},
		data() {
			return {
				// 候选人类型
				typeName:'',
				//需要构建索引参数的名称（注意：传递的对象里面必须要有这个名称的参数）
				formatName: 'cityName',
				//显示的城市数据
				obtainCitys: []
			};
		},
		onLoad(type){
			this.typeName = type.type
		},
        methods: {
        },
		mounted(){
			if(this.typeName == 'pickOrder'){
				this.obtainCitys = candidates1
			}else if(this.typeName == 'CustomerService'){
				this.obtainCitys = candidates2
			}else{
				this.obtainCitys = candidates3
			}
		}
	}
</script>

<style lang="scss">

</style>
