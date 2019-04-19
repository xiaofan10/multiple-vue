<template>
  <div class="page">
    <mt-header title="详情">
      <!-- <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link> -->
    </mt-header>
    <div class="ec-wrap">
      <v-chart :options="polar" />
      <v-chart :options="pie" />
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
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
        },
        grid: {
      containLabel: true,
    },
        series: [{
            name: '销量',
            radius : '55%',
            type: 'pie',
            data: [
               {value:335, name:'直接访问'},
              {value:310, name:'邮件营销'},
              {value:234, name:'联盟广告'},
              {value:135, name:'视频广告'},
              {value:1548, name:'搜索引擎'}
            ]
        }]
      },
      pie:  {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        show: true,
        orient: 'horizontal',
        bottom: 0,
        itemWidth: 5,
        itemHeight: 5,
        icon: "circle",
        data:['直接访问','邮件营销'],
        formatter: function (name) {
          return"<div>"+name+"</div>"
        }
    },
    grid: {
      containLabel: true,
    },
    series: [
        {
            name:'访问来源',
            type:'pie',
            radius: ['30%', '40%'],
            avoidLabelOverlap: true,
            label: {
                formatter: '{b}: \n {c}个 \n ({d}%)',
                align: 'center',
                // normal: {
                //     show: true,
                // },

                // emphasis: {
                //     show: true,
                //     textStyle: {
                //         fontSize: '30',
                //         fontWeight: 'bold'
                //     }
                // }
            },

            labelLine: {
                normal: {
                    show: true
                }
            },

            data:[
                {value:635, name:'直接访问'},
                {value:310, name:'邮件营销'},

            ],

        }
    ]
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

