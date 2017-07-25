/**
 * Created by feng on 2017/7/25.
 */

//本章节讲述不污染全局作用域的方法

//以下写法污染全局作用域
function a() {

};
function b() {

};
function c() {

};

//用对象字面量收编变量
var abc = {
    a: function () {

    },
    b: function () {

    },
    c: function () {

    }
};

//用构造函数收编变量
var abc = function () {

};  //或者var abc = new Object();
abc.a = function () {

}; //b,c类似

//为了达到能够复用的目地
var abc = function () {
    return {
        a: function () {

        }; //b,c the same
    }
};
var check = abc();
check.a();

//用类复用
var abc = function () {
    this.a = function () {

    }; //b,c the same
};

//用类的原型复用
var abc = function () {

};
abc.prototype = {
    a: function () {

    }; //b,c the same
};

//链式作用
var abc = function () {

};
abc.prototype = {
    a: function () {

        //do something
        return this;
    }; //b,c the same
};

//在原生对象的原型中定义公用方法
Function.prototype.addWay = function (name, fn) {
    this[name] = fn;
};
var abc = function () {

};
abc.addWay(a, function () {

    //do things
    return this;
}); //b, c the same;
abc.a();

//在原生对象的原型中定义原型的方法
Function.prototype.addWay = function (name, fn) {
    this.prototype[name] = fn;
    return this;
};
var father = function () {

};
abc.addWay('a', function () {

    return this;
}).addWay('b', function () {

    return this;
}).addWay('c', function () {

    return this;
});
var abc = new father();
abc.a();
