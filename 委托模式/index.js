/**
 * Created by Administrator on 2017/8/6.
 */

/*
    事件代理运用的就是运用该思维
 */
var parent = document.getElementById('#parent');
parent.addEventListener('click', function (e) {
    var e = e || window.event,
        target = e.target || e.srcElement;

    if (target.id === 'aim') {

        //do something
    };
});

/*
    还可以防止内存泄漏
 */

/*
    也可以数据分发节省资源
 */
var Deal = {
    banner : function () {

        //do something
    },
    aside : function () {

        //do something
    },
    message : function () {

        //do something
    }
};
$.get('xxx', function (res) {

    for (var i in res) {
        Deal[i] && Deal[i](res[i]);
    }
})