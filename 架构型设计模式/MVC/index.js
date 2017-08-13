/**
 * Created by feng on 2017/8/13.
 */

//MVC
$(function () {
    var MVC = MVC || {};
    MVC.model = function () {

        //内部数据对象
        var M = {};

        //服务器获取的数据
        M.data ={};

        //配置数据，页面加载时提供
        M.conf = {};
        return {
            getData: function (m) {
                return M.data[m];
            },
            getConf: function (c) {
                return M.conf[c];
            },
            setData: function (m, v) {
                M.data[m] = v;
                return this;
            },
            setConf: function (c, v) {
                M.conf[c] = v;
                return this;
            }
        }
    }();
    MVC.view = function () {

        //模型数据层对象操作方法引用
        var M = MVC.model;
        //内部视图创建方法对象
        var V = {};
        return function (v) {
            //根据视图名称返回视图，由于获取的是一个方法，这里需要将该方法执行一次以获取相应的视图
            V[v]();
        }
    }();
    MVC.ctrl = function () {

        //模型数据对象操作方法引用
        var M = MVC.model;

        //视图数据层对象操作方法引用
        var V = MVC.view;
        var C = {};
    }();
})