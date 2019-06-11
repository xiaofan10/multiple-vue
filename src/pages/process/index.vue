<template>
  <div class="page">
    <mt-progress :value="value" ></mt-progress>
    <div class="ec-wrap">
    </div>
    <button @click="loadProcess">重跑</button>

    <wtx-process className="xxxx" :is-animate="true" :value="value" :barHeight="20" extra="<div>'6个(50.0%)'</div>"></wtx-process>
    <wtx-process label="测试" :value="value1" :barHeight="20" prev="我是前缀" suff="我是后缀"></wtx-process>
    <wtx-process label="啦啦露露" :value="value2" :barHeight="20" :isVertical="false"></wtx-process>
    <transition name="fade">
    <p v-if="show">hello</p>
  </transition>
  </div>
</template>

<script>
export default {
  data () {

    return {
      value: 20,
      value1: 80,
      value2: 70,
      show: false,
    }
  },
  mounted() {
  },
  computed: {

  },
  methods: {
    loadProcess() {
      this.value = 80;
      this.value1 = 10;
      this.value2 = 30;
      this.show = true;
    }
  }
}
</script>

<style lang="sass">
@import '../../assets/styles/global.scss';
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
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
.xx {
}

// .wtx-process {
//   position: relative;
//   display: flex;
//   height: 30px;
//   line-height: 30px;
//   .wtx-process-content {
//     position: relative;
//     flex: 1;
//     & > * {
//       display: felx;
//     }
//     .wtx-process-runway {
//       position: absolute;
//       transform: translate(0, -50%);
//       top: 50%;
//       left: 0;
//       right: 0;
//       background-color: #ebebeb;
//       height: 3px;
//     }
//     .wtx-process-process {
//       position: absolute;
//       display: block;
//       background-color: #26a2ff;
//       top: 50%;
//       transform: translate(0, -50%);
//       height: 3px;
//     }
//     .animate {
//       transition: all .5s ease-in;
//     }
//   }
// }
</style>

