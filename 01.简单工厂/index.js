/**
 * Created by feng on 2017/7/25.
 */

//简单工厂模式
//通过实例化对象创建
function factory(name) {

    //A B C为三个类
    switch (name) {
        case 'a' :

            // return new A();
            break;

        case 'b' :

            //return new B();
            break;

        case 'c' :

            //return new C();
            break;
    };
};

//创建新对象后包装增强
function  factory2(type, text) {
    var o = new Object();
    o.content = text;
    o.show = function () {

    };

    if (type == 'a') {

        //
    };

    if (type == 'b') {

        //
    };

    if (type == 'c') {

        //
    };
    return o;
};

//两者区别在于对多个类 和 单个对象