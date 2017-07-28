/**
 * Created by feng on 2017/7/28.
 */


//解耦请求的发送者和接收者的耦合

//先发送请求， 传入dealData来判断返回的类型
var sendData = function (url, data, dealType, dom) {
    Gm.Ajax.get(url,data, dealData);
};

//根据不同的类型做不同的处理
var dealData = function (data, dealType, dom) {
    var dataType = Object.prototype.toString.call(data);
    switch (dataType) {
        case 'a' :

            //
            break
        case 'b' :

            //
            break;


    };
};

//最后的一条职责
var doSomething = function () {

    //最后做事的函数
}