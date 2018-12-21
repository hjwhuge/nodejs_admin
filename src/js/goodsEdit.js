$(function() {
    //接收参数,获取id
    var listId = location.search.slice(1); //?id=0001
    listId = listId.split('=')[1]; //0001
    // console.log(listId);
    let ctg = '';
    $.ajax({
        type: "get", //请求方式
        url: "/html/goods/" + listId, //接口路径
        async: true, //异步
        data: { //传输数据
            id: listId
        },
        success: init
    })

    //查找所有分类
    $.ajax({
        type: "get", //请求方式
        url: "/html/goodsCategory/", //接口路径
        async: true, //异步
        data: {},
        success: category
    })
    //渲染页面数据
    function init(str) {
        console.log(str);
        var data = str.data[0];
        console.log(data);
        ctg = data.classify;
        $('.caption').val(data.goods);
        $('.priceOld').val(data.priceOld);
        $('.priceNow').val(data.priceNow);
        $('.stock').val(data.stock);
    }
    //渲染分类数据
    function category(str) {
        var data = str.data;
        // console.log(data);
        var res = '';
        for (var i = 0; i < data.length; i++) {
            res += `<option value="${data[i].classify}">${data[i].classify}</option>`
        }
        res = `<option vaule="${ctg}">${ctg}</option>` + res;
        $('.category').html(res);
        callback();
        // console.log(res);
    }

    //修改数据
    $('.upd_btn').click(() => {
        var classify = $('#category').find('.layui-this').html();
        var state = $('#putaway').find('em').html();
        if(state == 'ON'){
            state = '下架'
        }else{
            state = '上架'
        }
        $.ajax({
            type: "post", //请求方式
            url: "/html/goods/" + listId, //接口路径
            async: true, //异步
            data: {
                id: listId,
                goods: $('.caption').val(),
                priceOld: $('.priceOld').val(),
                priceNow: $('.priceNow').val(),
                stock: $('.stock').val(),
                state,
                classify
            },
            success: function(data) {
                location.href = '../html/goodList.html';
            }
        })
    });

})