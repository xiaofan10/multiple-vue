<template>
  <div class="wtx-process">
    <div class="wtx-process-content">
      <div class="wtx-process-runway" :style="runwayBarHeight"></div>
      <!-- <transition> -->
        <div
          :class="['wtx-process-process', {animate: processAnimate}]"
          :style="processBarHeight"
        ></div>
      <!-- </transition> -->
    </div>
  </div>
</template>

<script>

export default {
  props: {
    isAnimate: {
      type: Boolean,
      default: true
    },
    value: {
      type: Number,
      default: 0
    },
    barHeight: {
      type: Number,
      default: 3
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    }
  },
  data() {
    return {
      processAnimate: this.isAnimate,
      runwayBarHeight: {
        height: this.barHeight + 'px'
      },
      processBarHeight: {
        height: this.barHeight + 'px',
        width: '0%'
      }
    }
  },

  computed: {

  },
  methods: {
        getProcessValue (val) {
          // 待完善（没有考虑min值）
          const min = this.min;
          const max = this.max;
          return val / max * 100;
        }
  },
  mounted() {
    setTimeout(() => {
      this.processBarHeight.width = this.getProcessValue(this.value) + '%';
    },0);
  },
  watch: {
    value (val) {
      this.processAnimate = false;
       this.processBarHeight.width = 0;
       setTimeout(() => {
         this.processAnimate = true;
         this.processBarHeight.width = this.getProcessValue(val) + '%';
       },0)
       return val
    }
  }
}
</script>
<style lang="sass">
.wtx-process {
  position: relative;
  display: flex;
  height: 30px;
  line-height: 30px;
  .wtx-process-content {
    position: relative;
    flex: 1;
    & > * {
      display: felx;
    }
    .wtx-process-runway {
      position: absolute;
      transform: translate(0, -50%);
      top: 50%;
      left: 0;
      right: 0;
      background-color: #ebebeb;
      height: 3px;
    }
    .wtx-process-process {
      position: absolute;
      display: block;
      background-color: #26a2ff;
      top: 50%;
      transform: translate(0, -50%);
      height: 3px;
    }
    .animate {
      transition: all .5s ease-in;
    }
  }
}
</style>

