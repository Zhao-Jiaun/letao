$(function() {

  $('#form').bootstrapValidator({

    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
  
    // 配置校验字段
    fields: {
      username: {
        // 进行多个规则配置
        validators: {
          // 非空校验
          notEmpty: {
            // 校验提醒
            message: "用户名不能为空"
          },
          // 长度校验
          stringLength: {
            min: 2,
            max: 6,
            message: "用户名长度必须式2-6位"
          },
          // 设置回调函数的提示信息
          callback: {
            message: "用户名不存在"
          }
        }
      },
  
      password: {
        validators: {
          notEmpty: {
            message: "密码不能为空"
          },
          stringLength: {
            min: 6,
            max: 12,
            message: "密码长度必须是6-12位"
          },
           // 设置回调函数的提示信息
           callback: {
            message: "密码不存在"
          }
        }
      }
    }
  
  });

  $('#form').on("success.form.bv", function( e ) {
    // 阻止默认的表单提交
    e.preventDefault();

    console.log("校验通过, 通过ajax提交");
    
    $.ajax({
      type: "post",
      url: "/employee/employeeLogin",
      data: $('#form').serialize(),
      dataType: "json",
      success: function( info ) {
        console.log(info);
        if( info.success ) {
          location.href = "index.html";
        }
        if ( info.error === 1000 ) {
          // alert("用户名不存在");

          $("#form").data("bootstrapValidator").updateStatus("username", "INVALID","callback")
        }
        if ( info.error === 1001 ) {
          // alert("密码错误")

          $("#form").data("bootstrapValidator").updateStatus("password","INVALID","callback")
        }
        
      }
    })
})

  $('[type="reset"]').click(function() {
    $('#form').data("bootstrapValidator").resetForm();
  })

})