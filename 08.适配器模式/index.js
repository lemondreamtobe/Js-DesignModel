/**
 * Created by feng on 2017/7/26.
 */
//适配器模式

//jquery适配器
window.A = A = jQuery;

//适配异类框架
A.g = function(id) {
    return document.getElementById(id);
}
//适配
A.g = function(id) {
    return $(id).get(0);
}

//参数适配器
function adapetParams(obj) {
    var _adapter = {
        name : 'me',
        title : 'design',
        color : 'white',
        size : 100
    };
    for (var i in _adapter) {
        _adapter[i] = obj[i] || _adapter[i];
    };

    //或者extend(_adapter, obj);
};

//数据适配
var arr = ['js', 'book', 'web', '2017'];
var obj = {
    language : arr[0],
    type : arr[1],
    aim : arr[2],
    time : arr[3]
};
function adaptObj(arr) {
    return {
        language : arr[0],
        type : arr[1],
        aim : arr[2],
        time : arr[3]
    }
};

//服务器端数据适配
function adaptAjaxData(data) {
    return [data['key1'], data['key2'], data['key3']];
};
ajax({
    url: '/api/bmgl_bm',
    type: 'get',
    data: []
}).then(ret => {
    doSomething(adaptAjaxData(ret));
});