/**
 * Created by feng on 2017/7/26.
 */
//抽象工厂模式

function VehicleFactory(sub, sup) {

    //判断工厂中是否有该抽象类
    if (typeof VehicleFactory[sup] === 'function') {

        //缓存类
        function F() {

        };
        F.prototype = new VehicleFactory[sup]();
        sub.constructor = sub;
        sub.prototype = new F();
    } else {
        throw new Error('未创建该抽象类');
    }
};
VehicleFactory.car = function () {
    this.type = 'car';
};
VehicleFactory.car.prototype = {
    getProce: function () {
        return new Error('抽象方法不可调用');
    },
    getSpeed: function () {
        return new Error('抽象方法不可调用');
    }
};
VehicleFactory.bus = function () {
    this.type = 'bus';
};
VehicleFactory.bus.prototype = {
    getProce: function () {
        return new Error('抽象方法不可调用');
    },
    getSpeed: function () {
        return new Error('抽象方法不可调用');
    }
};