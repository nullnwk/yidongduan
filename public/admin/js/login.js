$(function () {
    $('#form').bootstrapValidator({
        feedbackIcons: {        //提示图标
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            username: {
                message: 'The username is not valid',
                validators: { //校验规则
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    stringLength: {     //输入　长度限制　　校验
                        min: 4,
                        max: 30,
                        message: '用户名长度为4-30位'
                    },
                    callback: {
                        message: "用户名错误"
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    callback: {
                        message: "密码错误"
                    }
                }
            }
        }
    }).on("success.form.bv", function (e) {
        
        e.preventDefault();//阻止submit的默认跳转
        var $form = $(e.target);
        var bv = $form.data("bootstrapValidator");
        $.ajax({
            type: "post",
            url: '/employee/employeeLogin',
            data: $form.serialize(),
            success: function (data) {
                console.log(data);
                if (data.error == 1000) {
                    //  INVALID 非法的
                    //  VALID 合法的
                    bv.updateStatus("username", "INVALID", "callback");
                }
                //  校验密码是否存在
                if (data.error == 1001) {
                    //  INVALID 非法的
                    //  VALID 合法的
                    bv.updateStatus("password", "INVALID", "callback");
                }
                if (data.success == true) {
                    location.href = "./index.html";
                }

            }

        });
    })
})