const setAdaption = (baseFontsize) => {
  baseFontsize = baseFontsize || 16;
  let docEl = document.documentElement;
  let refresh = () => {
    let dpr = window.devicePixelRatio;
    let deviceWidth = window.screen.width;
    let deviceFontsize = deviceWidth / 375 * baseFontsize + 'px'; // 计算rem基准值
    console.log(deviceWidth,dpr,deviceFontsize)
    docEl.setAttribute('data-dpr', dpr);
    docEl.style.fontSize = deviceFontsize;
  };

  window.addEventListener('pageshow', function(e) {
    if (!e.pretersised) {
      refresh();
    }
  }, false);
  window.addEventListener('resize', function() {
    refresh();
  }, false);
};
const setAdaptionBig = (baseFontsize) => {
  baseFontsize = baseFontsize*10 || 16*10;
  let docEl = document.documentElement;
  let refresh = () => {
    let dpr = window.devicePixelRatio;
    let deviceWidth = window.screen.width;
    let deviceFontsize = deviceWidth / 4428 * baseFontsize + 'px'; // 计算rem基准值
    console.log(deviceWidth,dpr,deviceFontsize)
    docEl.setAttribute('data-dpr', dpr);
    docEl.style.fontSize = deviceFontsize;
  };

  window.addEventListener('pageshow', function(e) {
    if (!e.pretersised) {
      refresh();
    }
  }, false);
  window.addEventListener('resize', function() {
    refresh();
  }, false);
};
export default {
  setAdaption,
  setAdaptionBig
}
