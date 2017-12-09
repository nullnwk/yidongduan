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

    getSecond();
    $(".TjBtn").on("click", function () {
        getFirst();

    })
    getFirst();
    $(".drop").on("click","a", function () {
        $(".dropdown-text").html($(this).html());
        $('[name="categoryId"]').val($(this).attr('data-id'));
        console.log($(this).html());
    });
    initUpload();
    $(".btn1").on("click", function () {
        setSecond("")
    })

});


//数据加载到页面上
var getSecond = function (page, pageSize) {
    $.ajax({
        type: "get",
        url: "/category/querySecondCategoryPaging",
        data: {
            page: page || 1,
            pageSize: pageSize || 5

        },
        success: function (data) {
            // console.log(data);
            var secondCode = template("secondCode", data);
            $("tbody").html(secondCode);

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

//一级分类添加到表单中
var getFirst = function (page, pageSize) {
    $.ajax({
        url: "/category/queryTopCategoryPaging",
        type: "get",
        data: {
            page: page || 1,
            pageSize: pageSize || 5

        },
        success: function (data) {
            // console.log(data);
            var arr = [];
            $.each(data.rows, function (index, ele) {
                //     arr.push('<li><a data-id="ele.id" href="###">'+ele.categoryName+'</a></li>')
                // })
                // $(".dropdown-menu").html(arr);

                arr.push(`<li><a data-id=${ele.id} href="javascript:;">${ele.categoryName}</a></li>`);
            });
            $(".dropdown-menu").html(arr.join(""));

            console.log(arr.join(""));

        }
        // })
    });
};

//点击按钮，添加二级分类
var setSecond = function () {
    $.ajax({
        url: "/category/addSecondCategory",
        type: "post",
        data:$("form").serialize(),
        success: function (data) {
            if (data.success == true) {
                getSecond();
                $(".modal").modal("hide");
            }
        }
    })
};


//上传图片
// var setPic = function (pic1) {
//     $.ajax({
//         url:"post",
//         type:"/category/addSecondCategoryPic",
//         data:{
//             pic1:pic1
//         },
//         success:function (data) {
//             console.log(data);
//         }
//     })
// };
var initUpload = function () {
    $('.pic1').fileupload({
        dataType: 'json',
        done: function (e, data) {
            console.log(data);
            $('[name="brandLogo"]').val(data.result.picAddr)
            $(".showImg").html('<img id="previewimg" width="100" height="100" src="' + data.result.picAddr + '" alt="">');
        }
    });
};