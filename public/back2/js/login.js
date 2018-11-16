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
        }
      }
    }
  }

})