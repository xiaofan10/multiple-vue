<template>
  <div class="page">
    <div class='tab'>
      <wv-tabs :line-width='68' color='#666666' active-color='#16A1FC' background-colo='#f00'>
        <wv-tab title="收入" color='#666666' active-color='#16A1FC' background-colo='#f00'>
          <wtx-card>
            <template v-slot:header>
              总收入
            </template>
          </wtx-card>
        </wv-tab>
        <wv-tab title='礼品支出'>
          <div>
            内容
          </div>
        </wv-tab>
      </wv-tabs>
    </div>
  </div>

</template>

<script>
export default {
  data () {

    return {

    }
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/global.scss';
body {
  background: #f2f2f2;
}
.page {
  background: #f2f2f2;
  .tab {
    .wv-tab {
      color: #666666 !important;
    }
    .wv-tab--active {
      color: #16A1FC !important;
    }
    .wv-tabs__line {
      background-color: #16A1FC !important;
    }
  }

  // .card-wrap {
  //   display: flex;
  //   justify-content: center;
  //   padding-top: 1.5rem;

  //   .content-wrap {
  //     width: 20.9rem;
  //     height: 23.3rem;
  //     background: #FFFFFF;
  //     box-shadow: 0 2px 10px 0 rgba(0,0,0,0.10);
  //     border-radius: 0 0 4px 4px;
  //   }
  // }

}


</style>

