// // 开启进度条
// NProgress.start();

// setTimeout(function() {
//   NProgress.done();
// },500)

$(document).ajaxStart(function() {
  NProgress.start();
});

$(document).ajaxStop(function() {
  setTimeout(function() {
    NProgress.done();
  }, 500);
})