$(function() {
  
  var currentPage = 1;
  var pageSize = 5;

  render();

  // 渲染
  function render() {
    $.ajax({
      type: "get",
      url:"/category/queryTopCategoryPaging",
      data: {
        page: currentPage,
        pageSize: pageSize,
      },
      dataType: "json",
      success: function( info ) {
        console.log( info );
        // 结合模板引擎渲染
        var htmlStr = template("firstTpl",info); 
        $('tbody').html(htmlStr);
  
        // 分页初始化
        $('#paginator').bootstrapPaginator({
          // 版本号
          bootstrapMajorVersion: 3,
          // 总页数
          totalPages: Math.ceil( info.total / info.size),
          // 当前页
          currentPage: info.page,
          // 添加点击事件
          onPageClicked: function( a, b, c, page ) {
            // 更新当前页
            currentPage = page;
            render();
          }
        })
  
      }
    })
  }

  // 添加点击事件
  $('#addBtn').click(function() {
    // 显示添加模态框
    $('#addModal').modal("show");
  })   

  // 表单校验功能
  $('#form').bootstrapValidator({
    // 配置校验体表
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    // 字段列表
    fields: {
      categoryName: {
        // 校验规则
        validators: {
          // 非空
          notEmpty: {
            message: "请输入一级分类"
          }
        }
      }
    }
  })

  // 阻止默认的提交
  $('#form').on("success.form.bv", function( e ) {
    e.preventDefault();

    // 通过ajax 提交
    $.ajax({
      type: "post",
      url: "/category/addTopCategory",
      data: $('#form').serialize(),
      dataType: "json",
      success: function( info ) {
        console.log( info );
        if ( info.success ) {
          // 添加成功
          // 关闭模态框
          $('#addModal').modal("hide");
          // 重新渲染第一页
          currentPage = 1;
          render();

          // 重置表单的内容和状态
          // resetForm( true ) 表示内容和状态都重置
          // resetForm()   表示只重置状态
          $('#form').data("bootstrapValidator").resetForm(true);

        }
      }
    })
  })

})