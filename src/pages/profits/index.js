import Vue from 'vue'
// import createRouter from '../../router/router'
// import MintUI from 'mint-ui'
import WeVue from 'we-vue'
import 'we-vue/lib/style.css'
// import {Button, Cell} from 'mint-ui'
import ECharts from 'vue-echarts/components/ECharts.vue'
import 'echarts/lib/chart/pie'
// import 'mint-ui/lib/style.css'
import App from './index.vue'
import Tab from '../../components/tab/tab.vue'
import Card from '../../components/card/card.vue'
import utils from '../../utils/utils.js'

utils.setAdaption()

// const router = createRouter()
Vue.component(
  'v-chart', ECharts,
)
Vue.component(
  'wtx-tab', Tab
)
Vue.component('wtx-card', Card)
Vue.use(WeVue)

new Vue({
  // router,
  render: (h) => h(App)
}).$mount('#root')
