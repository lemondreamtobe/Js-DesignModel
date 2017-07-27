/**
 * Created by feng on 2017/7/27.
 */

//模板方法模式
//提示框

function Alert(data) {

    if (!data) {
        return;
    } else {
        this.content = data.content;
        this.panel = document.createElement('div');
        this.contentNode = document.createElement('p');
        this.confirmBtn = document.createElement('span');
        this.closeBtn = document.createElement('b');
        this.panel.className = 'alert';
        this.closeBtn.className = 'a_close';
        this.confirmBtn.className = 'a_confirm';
        this.confirmBtn.innerHTML = data.confirm || '确认';
        this.contentNode.innerHTML = this.content;
        this.success = data.success || function () {};
        this.fail = data.fail || function () {};
    }
};
Alert.prototype = {
    constructor: Alert,
    init: function () {
        this.panel.appendChild(this.closeBtn);
        this.panel.appendChild(this.contentNode);
        this.panel.appendChild(this.confirmBtn);
        document.appendChild(this.panel);
        this.bindEvent();
        this.show();
    },
    bindEvent: function () {
        var me = this;
        this.closeBtn.addEventListener('click', function () {
            me.fail();
            me.hide();
        });
        this.confirmBtn.addEventListener('click', function () {
            me.success();
            me.hide();
        });
    },
    hide: function () {
        this.panel.style.display = 'none';
    },
    success: function () {
        this.panel.style.display = 'block';
    }
};

//右侧提示框
function Ralert(data) {
    Alert.call(this);
    this.confirmBtn.className = this.confirmBtn.className + 'right';
};
Ralert.prototype = new Alert();

//标题提示框
function Talert(data) {
    Alert.call(this);
    this.title = data.title;
    this.titleNode = document.createElement('h3');
    this.titleNode.innerHTML = this.title;
};
Talert.prototype = new Alert();
Talert.prototype.init = function () {
    this.panel.insertBefore(this.titleNode, this.panel.firstChild);
    Alert.prototype.init.call(this);
}