<template>
  <div class="page">
    <mt-header title="详情">
    </mt-header>
    <div class="ec-wrap">
      <v-chart :options="polar" />
    </div>
  </div>
</template>

<script>
export default {
  data () {

    return {
      polar:{
        title: {
            text: 'ECharts 入门示例'
        },
        tooltip: {},
        xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'line',
            smooth: 1,
            data: [5, 20, 36, 10, 10, 20]
        }]
      }
    }
  }
}
</script>

<style lang="sass">
@import '../../assets/styles/global.scss';
.page {
  width: 100%;
  .ec-wrap {
    width: 100%;
    height: 100%;
    .echarts {
      width: 100%;
    }
  }
}


</style>

