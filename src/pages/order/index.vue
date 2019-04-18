<template>
  <div class="page">
    <wtx-tab></wtx-tab>
    <wv-tabs>
      <wv-tab v-for="index in 4" :title="'标签特别长特别长特别特别长特别特别长特别长 ' + index">
        内容
      </wv-tab>
    </wv-tabs>
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

<style lang="sass">
@import '../../assets/styles/global.scss';



</style>

