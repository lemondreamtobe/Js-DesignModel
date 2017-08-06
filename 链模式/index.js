/**
 * Created by Administrator on 2017/8/2.
 */

//jquery的链模式
var Gm = function (selector, context) {
    return new Gm.fn.init(selector, context);
};
Gm.fn = Gm.prototype = {
    constructor : Gm,
    init : function (selector, context) {
        this.length = 0;
        this.context = context || document;

        //id选择符，按位非 -1 转化成0，转为成布尔值false，挺高效的
        if (~selector.indexOf('#')) {
            this[0] = document.getElementById(selector.slice(1));
            this.length = 1;
        } else {
            var doms = context.getElementsByTagName(selector),
                i = 0,
                len = doms.length;
            for (; i < len; i++) {
                this[i] = doms[i];
            }
            this.length = len;
        }
       this.context = context;
       this.selector = selector;
       return this;
    },
    length : 2,
    size : function () {
        return this.length;
    },
    push : [].push,
    sort : [].sort,
    splice : [].splice
};
Gm.fn.init.prototype = Gm.fn;
Gm.extend = Gm.fn.extend = function () {
    var i = 1,
        len = arguments.length,
        target = arguments[0],
        j;

    if (i == len) {
        target = this;
        i--;
    }
    for (; i < len; i ++) {
        for (j in arguments[i]) {
            target[j] = arguments[i][j];
        }
    }
    return target;
};
Gm.fn.extend({
    on : (function () {

        //W3C
        if (document.addEventListener) {
            return function (type, fn) {
                var i = this.length - 1;
                for (; i >= 0; i--) {
                    this[i].addEventListener(type, fn, false);
                }
                return this;
            }
        } else if (document.attachEvent) {
            return function (type, fn) {
                var i = this.length - 1;
                for (; i >= 0; i--) {
                    this[i].attachEvent(type, fn);
                }
                return this;
            }
        } else {
            return function (type, fn) {
                var i = this.length - 1;
                for (; i >= 0; i--) {
                    this[i]['on' + type] =  fn;
                }
                return this;
            }
        }
    })
});
Gm.extend({
    camelDealer : function (str) {
        return str.replace(/\-(\w)/g, function (all, letter) {
            return letter.toUpperCase();
        });
    }
});
Gm.extend({
    css : function () {
        var arg = arguments,
            len = arg.length;

        //id的情况
        if (this.length < 1) {
            return this;
        }

        if (len === 1) {

            if (typeof arg[0] === 'string') {

                //ie
                if (this[0].currentStyle) {
                    return this[0].currentStyle[name];
                } else {
                    return getComputedStyle(this[0], false)[name];
                }
            }
        } else if (typeof arg[0] === 'object') {
            for (var i in arg[0]) {
                for (var j = this.length - 1; j >= 0; j--) {
                    this[j].style[Gm.camelDealer(i)] == arg[0][i];
                }
            }
        } else if(len === 2) {
            for (var j = this.length - 1; j >= 0; j--) {
                this[j].style[Gm.camelDealer(arg[0])] = arg[i];
            }
        };
        return this;
    }
});
Gm.fn.extend({
    attr : function () {
        var arg = arguments,
            len = arg.length;

        if (this.length < 1) {
            return this;
        }

        if (len === 1) {

            if (typeof arg[0] === 'string') {
                return this[0].getAttribute(arg[0]);
            } else if (typeof arg[0] === 'object') {
                for (var i in arg[0]) {
                    for (var j = this.length -1; j >= 0; j--) {
                        this[j].setAttribute(i, arg[0][i]);
                    }
                }
            }
        } else if (len === 2) {
            for (var j = this.length - 1; j >= 0; j--) {
                this[j].setAttribute(arg[0], arg[1]);
            }
        }
        return this;
    }
});
Gm.fn.extend({
    html : function () {
        var arg = arguments,
            len = arg.length;

        if (len === 0) {
            return this[0] && this[0].innerHTML;
        } else {
            for (var i = this.length -1; i >= 0; i--) {
                this[i].innerHTML = arg[0]
            }
        }
        return this;
    }
})