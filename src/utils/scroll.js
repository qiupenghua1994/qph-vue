
function onScrollTopChange(fn) {
  window.onscroll = function () {
    var t = document.documentElement.scrollTop || document.body.scrollTop;
    fn(t);
  };
}
export default {
  onScrollTopChange:onScrollTopChange
}
