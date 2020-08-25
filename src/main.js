import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/index.scss'

Vue.config.productionTip = false
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from './component-src/element-ui/lib/element-ui.common'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import Navigation from 'vue-navigation'

Vue.use(ElementUI)
Vue.use(Antd)
Vue.use(Navigation, {router,keyName: 'ok-ok'})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
