<template>
  <div :class="['wtx-process', {'wtx-process-direction': isVertical}, className]">
    <div class="wtx-process-label">
      <div class="wtx-process-label-content">
        <div v-if="prev" class="wtx-process-label-prev" v-html="prev"></div>
        <div class="wtx-process-label-text">{{label}}</div>
        <div v-if="suff" class="wtx-process-label-suff" v-html="suff"></div>
      </div>
      <div v-if="isVertical" class="wtx-process-label-tips" v-html="extra"></div>
    </div>
    <div class="wtx-process-content">
      <div class="wtx-process-runway" :style="runwayBarHeight"></div>
        <div
          :class="['wtx-process-process', {animate: processAnimate}]"
          :style="processBarHeight"
        ></div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    className: {
      type: true,
    },
    label: {
      type: String,
      default: 'Process'
    },
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
    },
    isVertical: {
      type: Boolean,
      default: true,
    },
    extra: {
      type: Element | String,
    },
    prev: {
      type: String
    },
    suff: {
      type: String
    }

  },
  data() {
    return {
      processAnimate: this.isAnimate,
      runwayBarHeight: {
        height: this.barHeight / 16 + 'rem',
      },
      processBarHeight: {
        height: this.barHeight / 16 + 'rem',
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
    console.log(this)
    // 定时器是加载组件后执行更新
    setTimeout(() => {
      this.processBarHeight.width = this.getProcessValue(this.value) + '%';
    },0);
  },
  watch: {
    value (val) {
      // 监听传入value变化，变化后执行
      this.processAnimate = false;
       this.processBarHeight.width = 0;
       setTimeout(() => {
         this.processAnimate = this.isAnimate;
         this.processBarHeight.width = this.getProcessValue(val) + '%';
       },0)
       return val
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/styles/global.scss';

.wtx-process {
  position: relative;
  display: flex;
  &.wtx-process-direction {
    flex-direction: column;
  }
  .wtx-process-label {
    margin: px2rem(5) px2rem(5) px2rem(5) 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: px2rem(16);
    line-height: 1;
    color: #333333;
    letter-spacing: 0;
    text-align: left;
    .wtx-process-label-content {
      display: flex;
      align-items: center;
      .wtx-process-label-prev {
        margin-right: px2rem(5);
      }
      .wtx-process-label-suff {
        margin-left: px2rem(5);
      }
      .wtx-process-label-text {

      }
    }
    .wtx-process-label-tips {
      font-size: px2rem(14);
      color: #666666;
      letter-spacing: 0;
      text-align: left;
      line-height: 1;
    }
  }

  .wtx-process-content {
    display: flex;
    flex: 1;
    align-items: center;
    position: relative;
    line-height: 1;
    border-radius: px2rem(2);
    & > * {
      display: felx;
    }
    .wtx-process-runway {

      background-color: #ebebeb;
      height: px2rem(3);
      width: 100%;
      border-radius: px2rem(2);
    }
    .wtx-process-process {
      position: absolute;
      display: block;
      background: linear-gradient(90deg, #16C6FC 0%, #16A1FC 99%);
      top: 50%;
      transform: translate(0, -50%);
      height: px2rem(3);
      border-radius: px2rem(2);
    }
    .animate {
      transition: width .5s ease-in;
    }
  }
}
</style>

