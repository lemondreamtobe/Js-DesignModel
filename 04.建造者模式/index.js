/**
 * Created by feng on 2017/7/26.
 */

//建造者模式
function a() {

    //
};
a.prototype = {

    //
};
function b() {

    //
};
b.prototype = {

    //
};
function c() {

    //
};
c.prototype = {

    //
};
function abc() {
    var heti = new a();
    heti.name = new b();
    heti.age = new c();
    return heti;
}

//建造者模式构成的对象也可以说是一种复合对象