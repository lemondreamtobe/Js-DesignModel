/**
 * Created by Administrator on 2017/8/7.
 */

//同步模块模式-SMD

//定义模块管理器单体对象
var  F = F || {};
F.define = function (str, fn) {

    //解析模块路由
    var parts = str.split('.'),
        old = parent = this, //old为当前模块的祖父模块, parent是父模块
        i = len = 0; //i为模块层级， len为模块层级长度

    //第一个模式是模块管理器单体对象，则移除
    if (parents[0] === 'F') {
        parts = parts.slice(1);
    }

    //拼比对define和module模块方法的重写
    if (parts[0] === 'define' || parts[0] === 'module') {
        return;
    }

    //便利路由模块并定义每层模块
    for (len = parts.length; i < len; i++) {

        //如果父模块中不存在当前模块
        if (typeof parent[parts[i]] === 'undefined') {

            //声明当前模块
            parent[parts[i]] = {};
        };
        old = parent; //缓存下一层极的祖父模块
        parent = parent[parts[i]]; //缓存下一层极的父模块
    };

    //如果给定模块方法则定义该模块方法
    if (fn) {
        old[parts[--i]] = fn();
    };
    return this;
}