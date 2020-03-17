import Vue from 'vue'
import App from './App'
import router from './router/index'
/* Element-UI */
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
/* store */
import store from './store/index'
/* 过滤器 */
import * as filters from "./filters"
/* mock模拟数据 */
import Mock from './mock/mock'
/* 本地化时间 */
import moment from 'moment'
import FreeComponent from './freecomponents/index'
import TitComponent from './titcomponents/index'

Vue.config.productionTip = false
Vue.use(Element, {size: 'small', zIndex: 2000})
Vue.use(FreeComponent)
Vue.use(TitComponent)
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.prototype.$moment = moment;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  filters,
  Mock,
  render: h => h(App)
})
