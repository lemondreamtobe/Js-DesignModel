/**
 * Created by feng on 2017/8/7.
 */

/*
    加载执行
 */
//惰性载入函数，避免if分支过多造成的运行缓慢，两种方法
function createXHR() {

    if (typeof XMLHttpRequest != 'undefined') {
        return new XMLHttpRequest();
    } else if (typeof ActiveXObject != 'undefined') {

        if (typeof arguments.callee.activeXString != 'string') {
            var versions = ['MSXML2.XMLHttp.6.0', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp'],
                i,
                len;
            for (i = 0, len = versions.length;i < len; i++) {
                try{
                    new ActiveXObject(versions[i]);
                    arguments.callee.activeXString = versions[i];
                    break;
                } catch(ex) {
                    //over
                }
            }
        };
        return new ActiveXObject(arguments.callee.activeXString);
    } else {
        throw Error('no xhr')
    }
};
//第一种，函数被调用时处理函数
function createXHR() {

    if (typeof XMLHttpRequest != 'undefined') {
        createXHR = function()  { return new XMLHttpRequest();}
    } else if (typeof ActiveXObject != 'undefined') {
        createXHR = function()  {
            if (typeof arguments.callee.activeXString != 'string') {
                var versions = ['MSXML2.XMLHttp.6.0', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp'],
                    i,
                    len;
                for (i = 0, len = versions.length;i < len; i++) {
                    try{
                        new ActiveXObject(versions[i]);
                        arguments.callee.activeXString = versions[i];
                        break;
                    } catch(ex) {
                        //over
                    }
                }
            };
            return new ActiveXObject(arguments.callee.activeXString);
        };
    } else {
        createXHR = function()  {
            throw Error('no xhr')
        };
    };
    return createXHR();
};
//第二种，声明的时候指定适当的函数
var createXHR = (function() {

    if (typeof XMLHttpRequest != 'undefined') {
        return function()  {
            new XMLHttpRequest();
        };
    } else if (typeof ActiveXObject != 'undefined') {
        return function() {
            if (typeof arguments.callee.activeXString != 'string') {
                var versions = ['MSXML2.XMLHttp.6.0', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp'],
                    i,
                    len;
                for (i = 0, len = versions.length;i < len; i++) {
                    try{
                        new ActiveXObject(versions[i]);
                        arguments.callee.activeXString = versions[i];
                        break;
                    } catch(ex) {
                        //over
                    }
                }
            };
            return new ActiveXObject(arguments.callee.activeXString);
        };
    } else {
        return function() {
            throw Error('no xhr')
        };
    }
})();