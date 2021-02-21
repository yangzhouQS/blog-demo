import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/index.scss'
import devPkg from './components/dev-pkg/index.js'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from './component-src/element-ui/lib/element-ui.common'
import './views/row/index.scss'
import './xe-config.js'
import 'font-awesome/css/font-awesome.css'
import VueVirtualScroller from 'vue-virtual-scroller'
import Vant from 'vant';
import 'vant/lib/index.css';
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)
Vue.use(Vant);
Vue.use(VueVirtualScroller)
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(devPkg)
new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
