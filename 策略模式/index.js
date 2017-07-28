/**
 * Created by feng on 2017/7/28.
 */

//定义一组算法封装起来，相互可以调用
//demo
var PriceStrategy = function () {

    var strategy = {

        return30 : function (price) {

            //do something
        },
        return40 : function (price) {

            //do something
        },
        return50 : function (price) {

            //do something
        },
        return60 : function (price) {

            //do something
        }
    };
    return function (algo, price) {
        return strategy[algo] && strategy[algo](price);
    };
}();

//在表单验证这块应用度更高