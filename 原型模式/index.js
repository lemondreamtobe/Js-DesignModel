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
