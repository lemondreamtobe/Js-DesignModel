/**
 * Created by feng on 2017/7/26.
 */

//工厂方法模式

//安全的工厂方法
function Factory(type, content) {

    if (this instanceof Factory) {
        var s = new this[type](content);
        return s;
    } else {
        return new Factory(type, content);
    }
}; //先执行到else里的语句，这时候this instanceof Factory - true,然后对原型的方法进行new
Factory.prototype = {
    a: function (content) {
        console.log(content);
    },
    b: function (content) {
        console.log(content);
    },
    c: function (content) {
        console.log(content);
    }
};