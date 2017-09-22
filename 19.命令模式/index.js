/**
 * Created by feng on 2017/7/31.
 */

//命令模式
var ViewCommand = (function () {
    var tpl = {
        product : [
            '<div>',
                '<img src="{#src#}">',
                '<p>{#text#}</p>',
            '</div>'
        ].join(''),
        title : [
            '<div class="title">',
                '<div class="main">',
                    '<h2>{#title#}</h2>',
                    '<p>{#tips#}</p>',
                '</div>',
            '</div>'
        ].join('')
    },
    html ='';
    function formStr(str, obj) {
        return str.replace(/\{#(\w+)#\}/g, function (match, key) {
            return obj[key];
        })
    }

    var Action = {
        create : function (data, view) {

            //创建方法
            if (data.length) {
                for (var i = 0, len = data.length; i < len; i++) {
                    html += formStr(tpl[view], data[i]);
                }
            } else {
                html += formStr(tpl[view], data);
            }
        },
        display : function (container, data, view) {

            //展示方法
            if (data) {
                this.create(data, view);
            };
            document.getElementById(container).innerHTML = html;
            html = '';
        }
    };
    return function excute(msg) {
        msg.param = Object.prototype.toString.call(msg.param) === '[Object Array]' ?　msg.param : [msg.param];
        Action[msg.command].apply(Action, msg.param)
    }
})();

//data
var productD = [
    {
        src : '',
        text : 'a'
    },
    {
        src : '',
        text : 'b'
    },
    {
        src : '',
        text : 'c'
    }
];
var titleD = {
    title : 'a ti',
    tips : 'a is'
};
ViewCommand({
    command : 'display',
    param : ['title', titleD, 'title']
});
ViewCommand({
    command : 'create',
    param: [
        {
            src : '',
            text : 'a',
        }, 'product'
    ]
})