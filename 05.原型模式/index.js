/**
 * Created by feng on 2017/7/26.
 */

//原型模式
function abc() {
    this.name = 'lin';
    this.age = 'age';
};
abc.prototype = {

    //
};
function a() {
    abc.call(this);
    this.type = 'a';
};
a.prototype = new abc();

function b() {
    abc.call(this);
    this.type = 'b';
};
b.prototype = new abc();

//c the same
var oa = new a();

//原型式继承
function inherit(o) {
    function F() {};
    F.prototype = o;
    return new F();
}

//寄生组合继承
function inheritPrototype(sub, sup) {
    var p = inherit(sup.prototype);
    p.constructor = sub;
    sub.prototype = p;
}

function a() {
    this.name = 'me';
};
a.prototype.sayHi = function() {
    console.log('this is me');
};
function b() {
    a.call(this);
    this.foot = 'two';
};

