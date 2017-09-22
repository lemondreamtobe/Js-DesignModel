/**
 * Created by feng on 2017/7/27.
 */

//观察者模式
//自定义事件应用观察者模式
function EventTarget(){
    this.handlers = {};
};
EventTarget.prototype = {
    constructor: EventTarget,
    addHandler: function(type, handler) {

        if (typeof this.handlers[type] == 'undefined') {
            this.handlers[type] = [];
        };
        this.handlers[type].push(handler);
    },
    fire: function(event) {

        if (!event.target) {
            event.target = this;
        };

        if (this.handlers[event.type] instanceof Array) {
            var handlers = this.handlers[event.type];
            for (var i = 0, len=handlers.length;i < len; i++) {
                handlers[i](event);
            };
        };
    },
    removeHandler: function(type, handler) {

        if (this.handlers[event.type] instanceof Array) {
            var handlers = this.handlers[type];
            for (var i = 0, len=handlers.length;i < len; i++) {

                if (handlers[i] === handler) {
                    break;
                }
            };
            handlers.splice(i, 1);
        }
    }
};

//把观察者放进闭包里，当页面加载就立即执行
var Observer = (function () {

    //私有变量防止篡改
    var _message = {};
    return {
        regist: function (type, fn) {

            //注册接口
            if (typeof _message[type] === 'undefined') {
                _message[type] = [];
                _message[type].push(fn);
            } else {
                _message[type].push(fn);
            }
        },
        fire: function (type, args) {

            //触发接口
            if (! _message[type]) {
                return;
            } else {
                var events = {
                    type : type,
                    args : args || {}
                }, i = 0, len = _message[type].length;
                for (; i < len; i++) {
                    _message[type][i].call(this, events);
                };

            };
        },
        remove: function (type, fn) {

            //取消接口
            if (_message[type] instanceof Array) {

                var i = _message.length - 1;
                for (; i >= 0; i-- ) {

                    //从最后开始遍历，利用&&的假值优先的语法，达到了代码的简洁
                    _message[type][i] === fn && _message[type].splice(i, 1);
                }
            }
        }
    }
})();
function Student(name ,result) {
    var that = this;
    that.result = result;
    that.name   = name;

    //回答问题的动作
    that.say = function () {
        console.log(that.result);
    };
};
Student.prototype.answer = function (question) {

    //回答问题的方法
    Observer.regist(question, this.say);
    Observer.regist(this.name, Teacher.prototype.angery);
};
Student.prototype.sleep = function (question) {

    console.log(this.name + ' can not answer ' + ' ' + question + ' beacuse Of sleeping');
    Observer.remove(question, this.say);
    Observer.fire(this.name, {name : this.name});
};
function Teacher() {

    //教师类
};
Teacher.prototype.ask = function (question) {
    console.log('上课没多久，老师问学生问题 ' + ':' + question);
    Observer.fire(question);
};
Teacher.prototype.angery = function(args) {
    console.log('李老师看见有人睡觉怒吼地说：' + args.args.name + ' 你给我滚出去！');
}

