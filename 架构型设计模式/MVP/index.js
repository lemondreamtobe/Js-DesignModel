/**
 * Created by Administrator on 2017/8/20.
 */

~(function (window) {
    var MVP = function () {

    };
    MVP.model = function () {
        //数据层
        var M = {};
        M.data = {};
        M.conf = {};
        return {
            getData: function (m) {
                return M.data[m];
            },
            setData: function (m, v) {
                M.data[m] = v;
                return v;
            },
            getConf: function (c) {
                return M.conf[c];
            },
            setConf: function (c ,v) {
                M.conf[c] = v;
                return v;
            }
        }
    }();
    MVP.view = function () {
        //视图层
        var REPLACDKEY = '__REPLACEKEY__';
        function getHTML(str, replacePos) {
            function eachArray(arr, fn) {
                for(var i = 0, len =arr.length; i < len; i++) {
                    fn(i, arr[i], len);
                }
            }
        };
        function formateItem(str, rep) {
            return str.replace(new RegExp(REPLACDKEY, 'g'), rep);
        };
        return function (str) {
            var part = str.replace(/^\s+|\s$/g, '')
                .replace(/^\s+(>)\s+/g, '$1')
                .split('>'),
                html = REPLACDKEY,
                item,
                nodeTpl;
            eachArray(part, function (partIndex, partValue, partLen) {
                item = partValue.split('+');
                nodeTpl = REPLACDKEY;
                eachArray(item, function (itemIndex, itemValue, itemLen) {
                    nodeTpl = formateItem(nodeTpl, getHTML(itemValue, itemIndex===itemLen - 1?(partIndex
                     ===partLen - 1? '' : 'in'):'add'));
                })
                html = formateItem(html, nodeTpl);
            });
            return html;
        }
    }()
    MVP.presenter = function () {
        //管理层
    };
    MVP.init = function () {
        //MVP入口
    }
    window.MVP = MVP;// 全局中设立
})(window)