import Vue from 'vue'
import App from './App'
import store from './store'
// 导航栏
import tabBar from './components/tabbar.vue'

// 封装request
// 全局使用stroe
Vue.prototype.$store = store;
Vue.config.productionTip = false

// 导入导航栏组件
Vue.component('tabBar', tabBar)

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()

Vue.filter('time',function(dataStr,pattern = ''){
	if(dataStr){
		let dt = new Date(Number(dataStr))
		let y = dt.getFullYear()
		let m = (dt.getMonth() + 1).toString().padStart(2, 0)
		let d = dt.getDate().toString().padStart(2, 0)
		return `${y}-${m}-${d}`
	}else{
		return '未选定时间'
	}
})