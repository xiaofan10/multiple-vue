<template>
  <div class="page">
    <el-row class="ranking-wrap">
      <div class="link-ring"></div>
      <div class="coin"></div>
      <el-col class="ranking-col-left" :span="12">
        <div class="ranking-title-wrap">
          <div class="ranking-title"></div>
        </div>
        <ul class="ranking-list">
          <li class="ranking-list-item" v-for="(item, index) in rankingDataExpert" >
            <div class="ranking-list-item-left">
              <img v-if="index < 3" class="ranking-num" :src="'https://wx-miniprogram-source.oss-cn-beijing.aliyuncs.com/h5img/ranking_'+(index+1)+'.png'"></img>
              <div v-else class="ranking-num">
                {{index + 1}}
              </div>
            </div>
            <div class="ranking-list-item-right">
              <div class="ranking-userinfo">
                <img class="ranking-user-avator" :src="item.avatar" alt="">
                <div class="ranking-user-name">{{item.nickname}}</div>
              </div>
              <div class="ranking-gameinfo">
                  捕中{{item.number}}次
              </div>
            </div>
          </li>
        </ul>
      </el-col>
      <el-col class="ranking-col-right" :span="12">
        <div class="ranking-title-wrap">
          <div class="ranking-title"></div>
        </div>
        <ul class="ranking-list">
          <li class="ranking-list-item" v-for="(item, index) in rankingDataGames">
            <div class="ranking-list-item-left">
              <img v-if="index < 3" class="ranking-num" :src="'https://wx-miniprogram-source.oss-cn-beijing.aliyuncs.com/h5img/ranking_'+(index+1)+'.png'"></img>
              <div v-else class="ranking-num">
                {{index + 1}}
              </div>
            </div>
            <div class="ranking-list-item-right">
              <div class="ranking-userinfo">
                <img class="ranking-user-avator" :src="item.avatar" />
                <div class="ranking-user-name">{{item.nickname}}</div>
              </div>
              <div class="ranking-gameinfo">
                  游戏{{item.number}}次
              </div>
            </div>
          </li>
        </ul>
      </el-col>
    </el-row>
    <div class="footer">
      <div class="footer-left">
        <img class="popular-sign" src="https://wx-miniprogram-source.oss-cn-beijing.aliyuncs.com/h5img/popular_sign.png" alt="">
        <ul class="footer-list-wrap">
          <li class="footer-list-item" v-for="item in popularData">
            <div class="footer-list-item-top">
              <img class="picture" :src="item.giftPicUrl" />
            </div>
            <div class="footer-list-item-bottom">
              <div class="footer-title">抓取次数</div>
              <div class="footer-text">{{item.catchCount}}次</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="footer-right">
        <div class="footer-logo"></div>
        <div class="footer-qrcode-wrap">
          <div class="footer-qrcode-wrap-top">
            <div class="footer-qrcode-item">
              <!-- <img class="footer-qrcode" src="https://wx-miniprogram-source.oss-cn-beijing.aliyuncs.com/img/integral/mini_program_code.png" /> -->
              <canvas class="footer-qrcode store-qrcode" id="canvas"></canvas>
              <div class="footer-qrcode-type">店铺二维码</div>
            </div>
             <div class="footer-qrcode-item">
              <img id="code" class="footer-qrcode" src="https://wx-miniprogram-source.oss-cn-beijing.aliyuncs.com/h5img/program_code.png" />
              <div class="footer-qrcode-type">玩天下APP</div>
            </div>
          </div>
          <div class="footer-qrcode-wrap-bottom"></div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import QRCode from 'qrcode'

export default {
  data () {
    return {
      rankingDataGames: [],
      rankingDataExpert: [],
      popularData: []
    }
  },
  components: {
    QRCode,
  },
  created () {
    this.storeId = location.href.split('?')[1].split('=')[1];
    this.queryRankingData('expertRankingNew',this.storeId);
    this.queryRankingData('gamesRankingNew',this.storeId);
    this.queryPopularData(this.storeId);
    this.timer = setInterval(() => {
        this.queryRankingData('expertRankingNew',this.storeId);
        this.queryRankingData('gamesRankingNew',this.storeId);
        this.queryPopularData(this.storeId);
    },120000);
  },
  mounted () {
     this.utils.setAdaptionBig(() => {
              this.createQrcode();
          })
  },
  methods: {
    onresize () {
      if(!this.timerOut) {
        this.timerOut = setTimeout(() => {
          this.utils.setAdaptionBig(() => {
              this.createQrcode();
          })
          this.timerOut = null;
        },1000)
      }
    },
    queryRankingData (type, storeId) {
      const timestamp = Date.parse(new Date());
      const MessageID = this.$uuid();
      let ClientID = this.$uuid();
      const headers = {
        'content-type': 'application/json',
        'ClientID': ClientID,
        'Sign': MessageID + ClientID + '5' + timestamp,
        'timestamp': timestamp,
        'MessageID': MessageID,
        'ClientType': '5'
      };
      const data = {
        status: 1,
        type: 2,
        storeId,
        dayStatus: 3
      }
      const instance = this.$axios.create({
        baseURL: 'http://39.105.231.43:9001',
        timeout: 1000,
        headers,
      });
      instance({
        url:`/api/box/ranking/${type}`,
        method: 'POST',
        data
      }).then((res) => {
        const { data } = res;
        if(data.code === 0) {
          data.list.map((item) => {
            if(item.avatar) {
              item.avatar += '/thumbnail';
            } else {
              item.avatar = 'https://wx-miniprogram-source.oss-cn-beijing.aliyuncs.com/img/common/group.png';
            }
          });
          if(type === 'gamesRankingNew') {
            this.rankingDataGames = data.list.splice(0,5);
          } else {
            this.rankingDataExpert = data.list.splice(0,5);
          }
        }
      })
    },
    queryPopularData (storeId) {
      const timestamp = Date.parse(new Date());
      const MessageID = this.$uuid();
      let ClientID = this.$uuid();
      const headers = {
        'content-type': 'application/json',
        'ClientID': ClientID,
        'Sign': MessageID + ClientID + '5' + timestamp,
        'timestamp': timestamp,
        'MessageID': MessageID,
        'ClientType': '5'
      };
      const data = {
        type: 2,
        dayStatus: 3,
        storeId
      }
      const instance = this.$axios.create({
        baseURL: 'http://39.105.231.43:9001',
        timeout: 1000,
        headers,
      });
      instance({
        url:`/api/box/game/mostPopularGift`,
        method: 'POST',
        data
      }).then((res) => {
        const { data } = res;
        if(data.code === 0) {
          data.list.map((item) => {
            if(item.giftPicUrl) {
              item.giftPicUrl += '/thumbnail';
            } else {
              item.giftPicUrl = 'https://wx-miniprogram-source.oss-cn-beijing.aliyuncs.com/img/gifts/lipinmoren.png';
            }
          });
          this.popularData = data.list.splice(0,3);
        }
      })
    },
    createQrcode () {

      const canvas = document.getElementById('canvas');
      const code = document.getElementById('code');
      const width = code.offsetWidth;
      console.log(width)
      QRCode.toCanvas(canvas, `http://www.wantx.com/api/qrcode/scan?storeId=${this.storeId}`, {
        width,
        scale: 1,
        margin: 1,
      },function (error) {
        if (error) console.error(error)
        console.log('success!');
        })
    }
  },
  computed: {

  },
  beforeDestroy () {
    if(this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    if(this.timerOut) {
      clearTimeout(this.timerOut);
      this.timerOut = null;
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/global.scss';

body {

  box-sizing: border-box;
  background: url('https://wx-miniprogram-source.oss-cn-beijing.aliyuncs.com/h5img/bg.png') no-repeat;
  background-size: 100% 100%;
}
.page {

    .ranking-wrap {
      padding: px2rem(62px) px2rem(77px) 0 px2rem(82px);
      width: 100%;
      height:  px2rem(1702px);
      .link-ring {
        position: absolute;
        top: px2rem(137px);
        left: px2rem(2115px);
        width: px2rem(184px);
        height: px2rem(1418px);
        background: url('https://wx-miniprogram-source.oss-cn-beijing.aliyuncs.com/h5img/link_ring.png') no-repeat;
        background-size: 100% 100%;
      }
      .coin {
        position: absolute;
        top: px2rem(105px);
        left: px2rem(7px);
        width: px2rem(150px);
        height: px2rem(132px);
        background: url('https://wx-miniprogram-source.oss-cn-beijing.aliyuncs.com/h5img/coin.png') no-repeat;
        background-size: 100% 100%;
      }
      .ranking-col-left {
        padding: px2rem(2px) px2rem(102px) 0 px2rem(15px);
        height: 100%;
        box-sizing: border-box;
        background: url('https://wx-miniprogram-source.oss-cn-beijing.aliyuncs.com/h5img/ranking_left_bg.png') no-repeat;
        background-size: 100% 100%;
        .ranking-title-wrap {
          .ranking-title {
            margin: 0 auto;
            width: px2rem(696px);
            height: px2rem(148px);
            background: url('https://wx-miniprogram-source.oss-cn-beijing.aliyuncs.com/h5img/talent_list.png') no-repeat;
            background-size: 100% 100%;
          }
        }

      }
      .ranking-col-right {
        padding: px2rem(2px) px2rem(40px) 0 px2rem(110px);
        height: 100%;
        box-sizing: border-box;
        background: url('https://wx-miniprogram-source.oss-cn-beijing.aliyuncs.com/h5img/ranking_right_bg.png') no-repeat;
        background-size: 100% 100%;
        .ranking-title-wrap {
          .ranking-title {
            margin: 0 auto;
            width: px2rem(696px);
            height: px2rem(148px);
            background: url('https://wx-miniprogram-source.oss-cn-beijing.aliyuncs.com/h5img/diligence_list.png') no-repeat;
            background-size: 100% 100%;
          }
        }
      }
      // 排行榜列表样式
      .ranking-list {
        padding: 0 px2rem(69px);
        .ranking-list-item {
          display: flex;
          align-items: center;
          .ranking-list-item-left {
            display: flex;
            align-items: center;
            margin: 0 px2rem(73px) 0 0px;
            font-size: px2rem(100px);
            font-family:SourceHanSansCN-Bold;
            font-weight:bold;
            color:rgba(40,63,95,1);
            .ranking-num {
              display: flex;
              align-items: center;
              justify-content: center;
              width: px2rem(109px);
              height: px2rem(139px);
            }
          }
          .ranking-list-item-right {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: px2rem(70px);
            font-family:SourceHanSansCN-Bold;
            font-weight:bold;
            color:rgba(40,63,95,1);
            border-bottom: px2rem(4px) solid rgba(210,206,135,1);
            height: px2rem(288px);
            .ranking-userinfo {
              display: flex;
              align-items: center;
              .ranking-user-avator {
                margin: 0 px2rem(79px) 0 0;
                width: px2rem(200px);
                height: px2rem(200px);
                box-sizing: border-box;
                background:rgba(255,255,255,1);
                border: px2rem(10px) solid rgba(35,59,88,1);
                border-radius:50%;
              }
              .ranking-user-name {
                max-width: px2rem(700px);
                font-size: px2rem(83px);
                font-family:SourceHanSansCN-Bold;
                font-weight:bold;
                color:rgba(40,63,95,1);
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
              }
            }
          }
        }
        .ranking-list-item:last-child .ranking-list-item-right {
          border-bottom: none;
        }
      }
    }

    .footer {
      display: flex;
      height: px2rem(789px);
      padding-top: px2rem(60px);
      box-sizing: border-box;
      .footer-left {
        display: flex;
        .popular-sign {
          width: px2rem(356px);
          height: px2rem(705px);
        }
        .footer-list-wrap {
          display: flex;
          min-width: px2rem(2110px);
          .footer-list-item {
            margin-right: px2rem(66px);
            height: px2rem(678px);
            box-sizing: border-box;
            background:rgba(229,229,229,1);
            border:px2rem(12px) solid rgba(35,59,88,1);
            .footer-list-item-top {
              position: relative;
              width: px2rem(650px);
              height: px2rem(521px);
              box-sizing: border-box;
              .picture {
                width: 100%;
                height: 100%;
              }
            }
            .footer-list-item-bottom {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 0 px2rem(30px) 0 px2rem(34px);
              width: px2rem(650px);
              height: px2rem(132px);
              box-sizing: border-box;
              border-top: px2rem(12px) solid rgba(35,59,88,1);
              .footer-title {
                font-size: px2rem(61px);
                font-family:SourceHanSansCN-Bold;
                font-weight:bold;
                color:rgba(40,63,95,1);
              }
              .footer-text {
                font-size: px2rem(61px);
                font-family:SourceHanSansCN-Bold;
                font-weight:bold;
                color:rgba(40,63,95,1)
              }
            }
          }
        }
      }
      .footer-right {
        display: flex;
        .footer-logo {
          margin-right: px2rem(106px);
          width: px2rem(669px);
          height: px2rem(728px);
          background: url('https://wx-miniprogram-source.oss-cn-beijing.aliyuncs.com/h5img/footer_kartoon.png') no-repeat;
          background-size: 100% 100%;
        }
        .footer-qrcode-wrap {
          width: px2rem(993px);
          .footer-qrcode-wrap-top {
            display: flex;
            justify-content: space-between;
            margin-bottom: px2rem(37px);
            .footer-qrcode-item {
              display: flex;
              flex-direction: column;
              width: px2rem(477px);
              height: px2rem(563px);
              background:#fff;
              border: px2rem(10px) solid rgba(71,15,24,1);
              box-sizing: border-box;
              .footer-qrcode {
                padding: px2rem(15px) px2rem(10px) px2rem(10px) px2rem(15px);
                width: px2rem(425px);
                height: px2rem(425px);
                background: #fff;
              }
              .footer-qrcode.store-qrcode {
                box-sizing: border-box;
                width: px2rem(445px);
                height: px2rem(445px);
                padding: 0;
              }
              .footer-qrcode-type {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: px2rem(105px);
                font-size: px2rem(56px);
                font-family:SourceHanSansCN-Bold;
                font-weight:bold;
                color:rgba(42,15,32,1);
                background:rgba(249,241,70,1);
              }
            }
          }
          .footer-qrcode-wrap-bottom {
            width: px2rem(993px);
            height: px2rem(66px);
            background: url('https://wx-miniprogram-source.oss-cn-beijing.aliyuncs.com/h5img/qrcode_text.png') no-repeat;
            background-size: 100% 100%;
          }
        }
      }
    }
  }
</style>

