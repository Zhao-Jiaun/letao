$(function() {
  // 已进入页面, 发送请求, 获取数据进行渲染
  var currentPage = 1;
  var pageSize = 5;

  render();

  // 根据currentPage 和pageSize 请求对应的数据
  function render() {
    $.ajax({
      type: "get",
      url:"/category/querySecondCategoryPaging",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function( info ) {
        console.log( info );
        // 根据模板进行渲染
        var htmlStr = template("secondTpl", info);
        $('tbody').html( htmlStr );
      }
    })
  }
})