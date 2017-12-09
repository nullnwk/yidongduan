$(function () {
    var flag = true;
    $(".header-l").on("click", function () {
        if (flag) {
            $(".com-l").hide();
            $(".com-r").css("padding", "10px 10px 20px 10px");
            $(".header-l").css("position", "fixed");
            flag = false;
        } else {
            $(".com-l").slideDown(1000);
            $(".com-r").css("padding", "10px 10px 20px 190px");
            $(".header-l").css("position", "");
            flag = true;
        }
    });
//点击退出按钮，退出到login
    $(".btnT").on("click", function () {
        $.ajax({
            url: "/employee/checkRootLogin",
            type: "get",
            data: {},
            success: function (data) {
                if (data.success == true) {
                    location.href = "./login.html";
                }
            }

        })


    });


    getFirst();
    $("body").on("click", ".ensureBtn", function () {
        var form1 = $("#form").serialize();
        console.log(form1);
        addFirst(form1);
    });
});


//数据加载到页面上
var getFirst = function (page, pageSize) {
    $.ajax({
        url: "/category/queryTopCategoryPaging",
        type: "get",
        data: {
            page: page || 1,
            pageSize: pageSize || 5

        },
        success: function (data) {
            console.log(data);
            var firstCode = template("firstCode", data);
            $("tbody").html(firstCode);

            $(".pagination").bootstrapPaginator({
                bootstrapMajorVersion: 3,    //版本
                currentPage: data.page,    //当前页数
                numberOfPages: 5,    //最多显示Page页
                totalPages: Math.ceil(data.total / data.size),    //所有数据可以显示的页数
                onPageClicked: function (e, originalEvent, type, page) {
                    getFirst(page)
                }
            });
        }
    })
};
//点击按钮添加分类
var addFirst = function (data) {
    $.ajax({
        type: "post",
        url: "/category/addTopCategory",
        data: data,
        success: function (data) {
            console.log(data);
            if (data.success == true) {
                $("#addModal").modal("hide");
                getFirst();
            }

        }

    })
};