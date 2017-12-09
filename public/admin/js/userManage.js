$(function () {

    userManage();
    $("tbody").on("click", ".btn", function () {
        var id = $(this).data("id");
        var isDelete = $(this).hasClass("btn-danger") ? 1 : 0;
        updateUser(id,isDelete);
    })
});

//数据加载到页面上
var userManage = function (page, pageSize) {
    $.ajax({
        url: "/user/queryUser",
        type: "get",
        data: {
            page: page || 1,
            pageSize: pageSize || 5
        },
        success: function (data) {
            console.log(data);
            var userCode = template("userCode", data);
            $("tbody").html(userCode);
        }
    })
};
//点击禁用启用按钮切换
var updateUser = function (id, isDelete) {
    $.ajax({
        type: "post",
        url: "/user/updateUser",
        data: {
            id: id,
            isDelete: isDelete
        },
        success: function (data) {
            if(data.success == true) {
                userManage();
            }
        }
    })
};