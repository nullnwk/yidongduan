/**
 * Created by Administrator on 2017/12/3.
 */

$(function () {

    $(".btn1").on("click", function () {
        getCode();
    });``
    $(".btnPwd").on("click",function () {
        var changePwdUrl =new URLSearchParams(location.search);
        var url = changePwdUrl.get("pass");
        // console.log(url);
        var newPass = $(".newPass1").val();
        changePwd(url,newPass);
    });


});

var changePwd = function (oldPassword,newPassword) {
    $.ajax({
        url:'/user/updatePassword',
        type:'POST',
        data:{
            oldPassword:oldPassword,
            newPassword:newPassword
        },
        beforeSend: function () {
            if($(".pass1").val() == ""){
                mui.toast('请输入密码');
                return false;
            }
            if($(".newPass1").val() == ""){
                mui.toast('请输入新密码');
                return false;
            }
            if($(".pass1").val() == $(".newPass1").val()){
                mui.toast("新旧密码不能一致");
                return false;
            }
            if($(".newPass1").val() != $(".verifypPass1").val()){
                mui.toast("请确认密码");
                return false;
            }
            if($('.code1').val() == '') {
                mui.toast("请点击按钮获取验证码");
                // return 和return false 在阻止ajax提交的是 尤其是jquery中  return不能阻止 只能用return false
                return false;
            }
        },
        success:function(data){
            console.log(data);
        }

    })
};
var getCode = function(){
    $.ajax({
        type: 'get',
        url: '/user/vCode',
        data:{},
        success:function(data){
            console.log(data);
        }
    })
};