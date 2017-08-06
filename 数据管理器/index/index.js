/**
 * Created by Administrator on 2017/8/6.
 */

/*
    数据访问对象类
 */
var BaseLocalStorge = function (id, time) {

    this.id = id;
    this.time = time || '|-|';
};
BaseLocalStorge.prototype = {
    status : {
        SUCCESS : 0,
        FAILURE : 1,
        OVERFLOW : 2,
        TIMEOUT : 3 //过期
    },

    //保存本地存储链接
    storge : localstorage || window.localStorage,

    //获取本地存储数据库数据真实字段
    getKey : function (key) {
        return this.id + key;
    },
    set : function (key, val, callback, time) {

        var status = this.status.SUCCESS,
            key = this.get(key);
        try {
            time = new Date(time).getTime() || time.getTime();
        } catch(e) {
            time = new Date().getTime() + 1000*60*60*24*31;
        };
        try {
            this.storge.setItem(key, time + this.time + val);
        } catch(e) {
            status = this.status.OVERFLOW;
        }
        callback && callback.call(this, status, key, val);
    },
    get : function (key, callback) {
        var status = this.status.SUCCESS,
            key = this.getKey(key),
            value = null,
            timeLength = this.time.length,
            that = this,
            index,
            time,
            result;
        try{
            value = that.storge.getItem(key);
        } catch (e) {
            result = {
                status : that.status.FAILURE,
                value : null
            };
            callback && callback.call(this, result.status, result.value);
            return result;
        };

        if (value) {
            index = value.indexOf(that.time);
            time = +value.slice(0, index);

            if (new Date(time),getTime() > new Date().getTime() || time == 0) {
                value = value.slice(index + timeLength);
            } else {
                value = null;
                status = that.status.TIMEOUT;
                that.remove(key);
            }
        } else {
            status = that.status.FAILURE;
        };
        result = {
            status : status,
            value : value
        };
        callback && callback.call(this, result.status, result.value);
        return result;
    },
    remove : function (key, callback) {
        var status = this.status.FAILURE,
            key = this.getKey(key),
            value = null;
        try {
            value = this.storge.getItem(key);
        } catch (e) {

        };

        if (value) {
            try {
                this.storge.removeItem(key);
                status = this.status.SUCCESS;
            } catch (e) {

            }
        };
        callback && callback.call(this, status, status > 0 ? null : value.slice(value.indexOf(this,time) + this.time.length));
    }
}