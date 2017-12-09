/**
 * Created by Administrator on 2017/11/27.
 */

//跳转到登录页
$(function () {
    getUserInfo();
    //进入个人中心
    var user_h = document.querySelector(".user_h");
    user_h.addEventListener("click", function () {
        window.location.href="user1.html";
    });
    $(".zhanghao").on("click", function () {
        window.location.href="changePwd.html?pass="+$(".tel").attr("data-id");
    });

    $(".btn").on("click",function () {
        quitLogin();
    })
});

//登录显示信息
var getUserInfo  =function () {
    $.ajax({
        type: 'get',
        url: ' /user/queryUserMessage',
        data: null,
        success:function (data) {
            console.log(data);
            if(data.error == 400) {
                location.href = './register.html?returnUrl='+location.href;
            }else{
                var userInfo = template("userInfo",data);
                $(".user_h").html(userInfo);
            }
        }
    })
};




//退出登录
var quitLogin = function () {
  $.ajax({
      type: 'get',
      url: "/user/logout",
      data: null,
      success:function (data) {
          console.log(data);
          if(data.success == true) {
              location.href = '../index.html';
          }
      }
  })
};