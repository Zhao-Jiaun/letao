$(function() {
  $('#form').bootstrapValidator({
    // 配置校验图片
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
            // 校验提示
            message: "用户名不能为空"
          },
          // 长度校验
          stringLength: {
            min: 2,
            max: 6,
            message: "长度必须是2-6位"
          },
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
          callback: {
            message: "密码错误"
          }
        }
      }
    }
  });

  $('#form').on("success.form.bv",function( e ) {
    e.preventDefault();

    //  ajax提交
    $.ajax({
      type: "post",
      url: "/employee/employeeLogin",
      data: $('#form').serialize(),
      dataType: "json",
      success: function (info) {
        if ( info.success ) {
          location.href = "index1.html";
        }
        if( info.error === 1000 ) {
          $('#form').data("bootstrapValidator").updateStatus("username","INVALID","callback");
        }
        if (info.error === 1001 ) {
          $('#form').data("bootstrapValidator").updateStatus("password","INVALID","callback");
        }
      }
    })
  })

});