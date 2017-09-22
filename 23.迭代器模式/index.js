/**
 * Created by Administrator on 2017/7/31.
 */

//迭代器模式

var Iterator = function (items, container) {

    var container = container && document.getElementById(container) || document;
    var items = container.getElementsByTagName(items);
    var length = items.length;
    var index = 0;
    var splice = [].splice; //保存原生的splice方法
    return {
        first : function () {
            index = 0;
            return items[index];
        },
        second : function () {

            //取最后一个
            index = length - 1;
            return items[index];
        },
        pre : function () {

            if (--index > 0) {
                return items[index];
            } else {
                index = 0;
                return null;
            }
        },
        next : function () {

            if (++index < length) {
                return items[index];
            } else {
                index = length -1;
                return null;
            }
        },
        get : function (num) {
            index = num >= 0 ? num % length : num % length + length;
            return items[index];
        },
        dealEach : function (fn) {

            var args = splice.call(arguments, 1);
            for (var i = 0; i < length; i++) {
                fn.apply(items[i], args);
            }
        },
        dealItem : function (num, fn) {
            fn.apply(this.get(num), splice.call(arguments, 2));
        },
        exclusive : function (num, allFn, numFn) {

            //排他
            this.dealEach(allFn);

            if (Object.prototype.toString.call(num) === '[object Array]') {

                for (var i = 0, len = num.length; i < len; i++) {
                    this.dealItem(num[li], numFn);
                }
            } else {
                this.dealItem(num, numFn);
            }
        }
    }
}