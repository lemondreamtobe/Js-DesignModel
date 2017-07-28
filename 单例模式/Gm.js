/**
 * Created by feng on 2017/7/26.
 */

//单例模式，主要用作管理命名空间
var Gm = {
    Event: {

    },
    Ajax: {
        post: function(url, pData, success, error, complete) {

            if(!$ && !jQuery) {
                alert('not find jquery');
                return;
            }
            $.ajax({
                type: "post",
                url: url,
                data: JSON.stringify(pData),
                contentType: "application/json",
                dataType: 'json',
                async: true,
                cache: false,
                error: function(ret) {
                    error && error(ret);
                    return;
                },
                success: function(ret) {
                    success && success(ret);
                    return;
                },
                complete: function (ret) {
                    complete && complete(ret);
                    return;
                }
            });
        },
        get: function(url, pData, success, error) {

            if(!$ && !jQuery) {
                alert('not find jquery');
                return;
            }
            $.ajax({
                type: "get",
                url: url,
                data: pData,
                async: true,
                cache: false,
                error: function(msg) {
                    error && error(msg);
                },
                success: function(ret) {
                    success && success(ret);
                }
            });
        }
    },
    Dom: {

    },
    Tools: {

    },
    String: {
        trim: function (s) {
            return s.replace(/(^\s*)|(\s*$)/g, "");
        }
    },
    Boolean: {
        isCompatible: function (other) {

            //使用能力检测来检查必要条件
            if (other === false || !Array.prototype.push || !Object.hasOwnProperty || !document.createElement || !document.getElementsByTagName) {
                return false;
            } else {
                return true;
            }
        },
        isIE: function () {

            if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE8.0") {
                return true;
            } else {
                return false;
            };
        },
        isValidIP: function (ip) {
            var reSpaceCheck = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/;

            if (reSpaceCheck.test(ip)) {
                ip.match(reSpaceCheck);

                if (RegExp.$1 <= 255 && RegExp.$1 >= 0
                    && RegExp.$2 <= 255 && RegExp.$2 >= 0
                    && RegExp.$3 <= 255 && RegExp.$3 >= 0
                    && RegExp.$4 <= 255 && RegExp.$4 >= 0)
                {
                    return true;
                }
                else{
                    return false;
                }
            }
            else{
                return false;
            }
        }
    },
    Regxp: {

    },
    Date: {
        /**
         * 为日期对象添加格式化输出
         * 调用： new Date().Format("yyyy-MM-dd") or new Date().Format("yyyy-MM-dd hh:mm:ss")
         */
        dateFormat: function(date, fmt) {
            var o = {
                "M+": date.getMonth() + 1, //月份
                "d+": date.getDate(), //日
                "h+": date.getHours(), //小时
                "m+": date.getMinutes(), //分
                "s+": date.getSeconds(), //秒
                "q+": Math.floor((date.getMonth() + 3) / 3), //季度
                "S": date.getMilliseconds() //毫秒
            };
            if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            for(var k in o)
                if(new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        },

        /**
         * 根据秒数时间字符串      72s =》 01:12
         * @param {Object} num
         */
        getDurationStr: function(num) {
            var seconds = Math.floor(num % 60);
            var minites = Math.floor(num / 60 % 60);
            var hours = Math.floor(num / 60 / 60);
            var ret = "";
            ret += " " + (hours < 10 ? ("0" + hours) : hours) + ":";
            ret += (minites < 10 ? ("0" + minites) : minites) + ":";
            ret += seconds < 10 ? ("0" + seconds) : seconds;
            return ret;
        },
    }
};
