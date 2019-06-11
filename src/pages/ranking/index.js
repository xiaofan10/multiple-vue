import Vue from 'vue'
// import ElementUI from 'element-ui'
import { Row, Col } from 'element-ui'

import ECharts from 'vue-echarts/components/ECharts.vue'
import 'echarts/lib/chart/pie'
import App from './index.vue'
import utils from '../../utils/utils.js'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Row)
Vue.use(Col)
utils.setAdaptionBig()

new Vue({
  render: (h) => h(App)
}).$mount('#root')
