/**
 * Created by feng on 2017/8/7.
 */

//等待对象
var Waiter = function () {
    var dfd = []; //注册了的等待对象容器
    var doneArr = []; //成功回调方法容器
    var failArr = []; //失败回调方法容器
    var slice = [].slice;
    var that = this;

    //监控对象类
    var Primise = function () {
        this.resolved = false; //监控对象是否解决成功状态
        this.rejected = false; //监控对象是否解决失败状态
    };
    Primise.prototype = {
        resolve : function () {
            this.resolved = true; //设置当前监控对象解决success

            if (!dfd.length) {

                //没有监控对象则返回
                return;
            };

            //遍历所有监控对象
            for (var i = dfd.length - 1; i >= 0; i--) {

                //如果有人以一个监控对象没有被解决或解决失败则返回
                if (dfd[i] && !dfd[i].resolved || dfd[i].rejected) {
                    return;
                };
                dfd.splice(i, 1);
            };
            _exec(doneArr); //执行解决成功的回调
        },
        reject : function () {
            this.rejected = true; //设置当前监控对象解决fail

            if (!dfd.length) {

                //没有监控对象则返回
                return;
            };
            dfd.splice(0); //清除所有的监控对象
            _exec(failArr); //执行解决失败回调
        }
    };

    //创建监控对象
    that.Deferred = function () {
        return new Primise();
    };

    //回调执行方法
    function _exec(arr) {
        var i = 0,
            len = arr.length;
        for (; i < len; i++) {
            try {
                arr[i] && arr[i]();
            } catch (e) {

            }
        }
    };
    that.when = function () {

        //异步监控方法 参数：监控对象
        dfd = slice.call(arguments); //设置监控对象
        var i = dfd.length;
        for (--i; i >= 0; i--) {

            if (!dfd[i] || dfd[i].resolved || dfd[i].rejected || !dfd[i] instanceof Primise) {
                dfd.splice(i, 1);
            }
        };
        return that;
    };
    that.done = function () {

        //解决成功回调
        doneArr = doneArr.concat(slice.call(arguments));
        return that;
    };
    that.fail = function () {

        //解决失败回调
        failArr = failArr.concat(slice.call(arguments));
        return that;
    }
};
var waiter = new Waiter();
var first = function () {
    var dtd = waiter.Deferred(); //创建监听对象
    setTimeout(function () {
        console.log('first finish');
        dtd.resolve();
    }, 5000);
    return dtd;
};
var second = function () {
    var dtd = waiter.Deferred();
    setTimeout(function () {
        console.log('second finish');
        dtd.resolve();
    }, 10000)
};
waiter.when(first, second).done(function () {
    console.log('success');
}, function () {
    console.log('success again');
}).fail(function () {
    console.log('fail');
});
