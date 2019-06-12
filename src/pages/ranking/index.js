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
utils.setAdaptionBig()
Vue.prototype.$axios = axios;
Vue.prototype.$uuid = uuid;
// Vue.prototype.$axios = axios.create({
//   baseURL: 'http://39.105.231.43:9001',
//   timeout: 1000,
//   headers,
// });
new Vue({
  render: (h) => h(App)
}).$mount('#root')
