import App from './App'
import Vue from 'vue'
//底部导航栏
import navBar from '@/components/tabbar/tabbar.vue';
Vue.component('navBar', navBar)
//日历
import calendar from '@/components/calendar/calendar.vue';
Vue.component('calendar', calendar)
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
