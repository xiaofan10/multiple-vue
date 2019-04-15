import Vue from 'vue'
// import createRouter from '../../router/router'
import MintUI from 'mint-ui'
// import {Button, Cell} from 'mint-ui'
import ECharts from 'vue-echarts/components/ECharts.vue'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'mint-ui/lib/style.css'
import App from './index.vue'
import utils from '../../utils/utils.js'
import Process from '../../components/process/process.vue'

utils.setAdaption()

// const router = createRouter()
Vue.component(
  'v-chart', ECharts
)
Vue.component(
  'wtx-process', Process
)
Vue.use(MintUI)

new Vue({
  // router,
  render: (h) => h(App)
}).$mount('#root')
