<template>
  <div class="wtx-card-wrap">
    <div class="wtx-card-header">
      <slot name="header">
        <div class="wtx-card-header-title">{{title}}</div>
        <div class="wtx-card-header-extra">{{extra}}</div>

      </slot>
    </div>
    <div class="wtx-card-content">
      <slot></slot>
    </div>
    <div class="wtx-card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    extra: {
      type: String,
    },
    title: {
       type: String,
    }
  },
  data () {
    return {

    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/styles/global.scss';
.wtx-card-wrap {
    padding-top: 1.5rem;
    width: 100%;
    min-height: 23.3rem;
    background: #FFFFFF;
    box-shadow: 0 2px 10px 0 rgba(0,0,0,0.10);
    border-radius: 0 0 px2rem(4) px2rem(4);
    color:#333;
    .wtx-card-header {
      .wtx-card-header-title {
        font-size: px2rem(18);
      }
      .wtx-card-header-extra {
        font-size: px2rem(18);
      }
    }
}
</style>

