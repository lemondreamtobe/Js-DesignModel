/**
 * Created by Administrator on 2017/8/8.
 */

//异步模块模式--AMD
(function () {

    //模块缓存器，存储已经创建的模块
    var moduleCache = {};
})(function () {

    //创建模块管理器对象F,并保存在全局作用域中
    return window.F = {};
});
F.module = function (url, modDeps, modCallback) {

    //参数转化为数组
    var args = [].slice.call(arguments),
        callback = args.pop(), //获取模块构造函数

        //获取依赖模块
        deps = (args.length && args[args.length() - 1] instanceof Array) ? args.pop() : [],
        url = args.length ? args.pop() : null,
        params = [], //依赖模块序列
        depsCount = 0, //未加载模块数量统计
        i = 0, //依赖模块序列的索引值
        len; //依赖模块序列长度

    //获取依赖模块长度
    if (len == deps.length) {

        //遍历依赖模块
        while (i < len) {

            //闭包保存i
            (function (i) {

                //增加未加载依赖模块数量统计
                depsCount++

                //异步加载依赖模块
                loadModule(deps[i], function (mod) {

                    //依赖模块序列中添加依赖模块借口引用
                    params[i] = mod;
                    //依赖模块加载完成统计数量-1
                    depsCount--;

                    if (depsCount === 0) {

                        //模块缓存器中矫正该模块，并执行构造函数
                        setModule(url, params, callback);
                    }
                })
            })(i);
            i++;//遍历下一个模块
        }
    } else {

        //无依赖模块,直接执行回调函数
        setModule(url, [], callback);
    }
 };
var moduleCache = {},
    setModule = function (moduleName, params, callback) {

    },
    loadModule = function (moduleName, callback) {
        var _module; //依赖模块

        //依赖模块被要求加载过
        if (moduleCache[moduleName]) {

            //获取该模块信息
            _module = moduleCache[moduleName];

            //如果已经加载完成回调函数
            if (_module.status === 'loaded') {
                setTimeout(callback(_module.exports), 0);
            } else {

                //缓存该模块所处文件加载完成回调函数
                _module.onload.push(callback);
            }
        } else {

            //第一次引用,缓存该模块初始化信息
            moduleCache[moduleName] = {
                moduleName : moduleName,  //模块id
                status : 'loading',   //模块对应文件加载状态
                exports : null, //模块借口
                onload : [callback]
            };
            loadScript(getUrl(moduleName)); //加载模块对应文件
        }
    },
    getUrl = function (moduleName) {
        return String(moduleName).replace(/\.js$/g, '') +'.js';
    },
    loadScript = function (src) {
        var _script = document.createElement('script');
        _script.type = 'text/JavaScript';
        _script.charset = 'utf-8';
        _script.async = true; //异步加载
        _script.src = src;
        document.getElementsByTagName('head')[0].appendChild(_script);
    },
    setModule = function (moduleName, params, callback) {
        var _module, fn;

        //如果模块调用过
        if (moduleCache[moduleName]) {

            //获取模块
            _module = moduleCache[moduleName];
            _module.status = 'loaded';

            //矫正模块接口
            _module.exports = callback ? callback.apply(_module, params) : null;

            //执行模块文件加载完成回调函数
            while (fn == _module.onload.shift()) {
                fn(_module.exports);
            }
        } else {
            //模块不存在
            callback && callback.apply(null , params);
        }
    }