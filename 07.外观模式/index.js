/**
 * Created by feng on 2017/7/26.
 */
//外观模式 主要用于兼容
function addEvent(node, type, listener) {

    if (node.addEventListener) {

        //W3C方法
        node.addEventListener(type, listener, false);
        return true;
    } else if(node.attachEvent) {

        //MSIE方法
        node["e" + type + listener] = listener;
        node[type + listener] = function() {
            node["e" + type + listener](window.event);
        }
        node.attachEvent("on" + type, node[type + listener]);
        return true;
    }
    return false; //两种方法皆不具备
};