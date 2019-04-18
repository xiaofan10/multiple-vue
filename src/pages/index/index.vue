<template>
  <div class="app-wrap">
    {{text}}
        <mt-cell title="折线图" is-link to="line.html"></mt-cell>
        <mt-cell title="饼图" is-link to="pie.html"></mt-cell>
        <mt-cell title="进度条" is-link to="process.html"></mt-cell>
        <mt-cell title="选项卡" is-link to="order.html"></mt-cell>
  </div>
</template>

<script>



export default {
  data() {
    return {
      text: "这里是跳转页面，方便开发调试"
    }
  },
  components: {

  }
}
</script>

<style lang="sass" rel="stylesheet/sass">
// @import '../src/assest/styles/global.scss';
  .app-wrap {
    position: relative;
    width: 100vw;


  }
</style>
