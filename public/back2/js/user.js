$(function() {
  var currentPage = 1; //当前页
  var pageSize = 5;

  var currentId;  // 当前正在编辑的用户
  var isDelete;

  // 一进页面， 渲染
  render();

  function render() {
    $.ajax({
      type: "get",
      url: "/user/queryUser",
      data: {
        page: currentPage,
        pageSize: pageSize,
      },
      dataType: "json",
      success: function( info ) {
        console.log( info );
        var htmlStr = template("tmp", info ); 
  
        $('tbody').html( htmlStr );
  
        // 初始化
        $("#paginator").bootstrapPaginator({
          // 版本号
          bootstrapMajorVersion: 3,
          // 总页数
          totalPages: Math.ceil( info.total / info.size),
          // 当前页
          currentPage: info.page,
          // 点击
          onPageClicked: function( a, b, c, page ) {
            console.log( page );
            
            currentPage = page;
            // 重新渲染
            render();
          }
        })
  
      }
    })
  }

  $('.lt_content tbody').on("click", ".btn", function () {
    
    // 显示模态框
    $('#userModal').modal("show");

    // 获取用户 id
    currentId = $(this).parent().data("id");

    // 获取更改的状态(根据按钮类名判断)
    // 禁用按钮 ? 0 : 1
    idDelete = $(this).hasClass("btn-danger") ? 0 : 1;
    
  });

    $('#confirmBtn').click(function() {
      $.ajax({
        type: "post",
        url: "/user/updateUser",
        data: {
          id: currentId,
          isDelete: idDelete,
        },
        dataType: "json",
        success: function( info ) {
          console.log( info );
          if ( info.success) {
            // 关闭模态框
            $('#userModal').modal("hide");
            // 从新渲染
            render();
          }
        }
      })
    })

})