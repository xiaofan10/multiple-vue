<template>
  <div class="w-tab-wrap">
    <div class="w-tab-top">
      <div class="w-tab-bar" ref="tabBarStyle">
        <div
          :class="['w-tab-ink-bar',{'w-tab-ink-bar-animated': animated}]"
          :style="{width: tabBottomBar.width + 'px',transform: 'translate3D(' + tabBottomBar.scrollLeft +'px,0,0)'}"
        ></div>
        <div
          v-for="(item, index) in tabData"
          class="w-tab-tab"
          @click="getSlideBarInfo"
          :data-index="index"
        >
          {{item}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    animated: {
      type: Boolean,
      default: true,
    }
  },
  data() {
    return {
      tabData: ['选项卡特别长特别长特别长','选项','选项卡3','选项卡4','选项卡3','选项卡4'],
      tabBottomBar: {
        width: 'auto',
        scrollLeft: 'auto',
      },
      index: 0,

    }
  },

  methods: {
    formateTabData () {

    },
    getSlideBarInfo (e) {
      const { tabData, slideBarWidth } = this;
      const index  = e ? e.target.dataset.index : 0;
      this.index = index;
      let me = this;
      this.$nextTick(() => {
        const w = this.$refs.tabBarStyle.clientWidth;
        this.tabBottomBar.width = w / tabData.length;
        this.tabBottomBar.scrollLeft = w / tabData.length * index;
      })
    }
  },
  mounted () {
    this.getSlideBarInfo();
  }
}
</script>

<style lang="scss" scoped type="text/css">
  .w-tab-wrap {
    .w-tab-top {
      position: relative;
      .w-tab-bar {
        display: flex;
        .w-tab-ink-bar {
          position: absolute;
          bottom: 1px;
          height: 2px;
          width: auto;
          background-color: #38adff;
        }
        .w-tab-ink-bar-animated {
          transition: transform .3s cubic-bezier(0.86,0,.07,1);
        }

        .w-tab-tab {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          border-top: 1px solid rgba(31,56,88,.1);
          border-bottom: 1px solid rgba(31,56,88,.1);
          font-size: 14px;
          height: 42px;
          line-height: 42px;
          box-sizing: border-box;
          color: rgba(31,56,88,.6);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;

          &.active {
            font-weight: bold;
          }
        }
      }
    }
  }
</style>


