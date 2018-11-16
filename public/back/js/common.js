$.ajax({
  type: "get",
  url: "/employee/checkRootLogin",
  dataType: "json",
  success: function( info ) {
   console.log(info);
   
    if( info.success ) {
      // 用户已登陆
      console.log("用户已登陆");
      
    }
    if ( info.error === 400 ) {
      location.href = "login.html"
    }
    
  }
})

$(document).ajaxStart(function() {
  NProgress.start();
});

$(document).ajaxStop(function() {
 
    NProgress.done();
  
});

$(function() {
  $('.lt_aside .category').click(function() {
    $(this).next().stop().slideToggle();
  });

  $(".lt_topbar .icon_left").click(function() {
    $('.lt_aside').toggleClass("hidemenu");
    $('.lt_main').toggleClass("hidemenu");
    $('.lt_topbar').toggleClass("hidemenu");
  })

  // 功能3 : 退出功能
  $('.lt_topbar .icon_right').click(function() {
    $('#logoutModal').modal("show");
  });

  // 模态框按钮点击事件
  $('#logoutBtn').click(function() {
    $.ajax({
      type: "get",
      url:"/employee/employeeLogout",
      dataType: "json",
      success: function( info ) {
        // console.log(info);
        if ( info.success ) {
          // 退出成功
          location.href = "login1.html";
        }
      }
    })
  })

})