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
