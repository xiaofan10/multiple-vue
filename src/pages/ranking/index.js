import Vue from 'vue'
// import ElementUI from 'element-ui'
import { Row, Col } from 'element-ui'
import axios  from 'axios'
import { uuid } from '../../utils/uuid.js'
import 'echarts/lib/chart/pie'
import App from './index.vue'
import utils from '../../utils/utils.js'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Row)
Vue.use(Col)
Vue.prototype.$axios = axios;
Vue.prototype.$uuid = uuid;
Vue.prototype.utils = utils;
new Vue({
  render: (h) => h(App)
}).$mount('#root')
