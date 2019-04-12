<template>
  <div class="page">
    <mt-progress :value="value" :bar-height="20"></mt-progress>
    <div class="ec-wrap">
    </div>
    <button @click="loadProcess">重跑</button>
  </div>
</template>

<script>
export default {
  data () {

    return {
      value: 20,

    }
  },
  mounted() {
  },
  computed: {

  },
  methods: {
    loadProcess() {
      let a = this.value;
      let b = 0;
      this.timer = setInterval(() => {
        if( b>a) {
          clearInterval(this.timer)
        } else {
          b += 1
          this.value = b
        }
      }, 10)
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

