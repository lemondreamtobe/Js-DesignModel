/**
 * Created by feng on 2017/8/7.
 */

var A = A || {};
A.root = document.getElementById('container');
A.strategy = {
    'listPart' : function (data) {
        var s = document.createElement('div'),
            ul = '',
            ldata = data.data.li,
            tpl = [
                '<h2>{#h2#}</h2>',
                '<p>{#p#}</p>',
                '<ul>{#ul#}</ul>'
            ].join(''),
            liTpl = [
                '<li>',
                    '<strong>{#strong#}</strong>',
                    '<span>{#span#}</span>',
                '</li>'
            ].join('');
        data.id && (s.id = data.id);
        for (var i = 0,len = ldata.length; i < len; i++) {

            //如果有列表数据
            if (ldata[i].em || ldata[i].span) {

                //列表字符串追加一项列表项
                ul += A.formateString(liTpl, ldata[i]);
            }
        }
        data.data.ul = ul;
        s.innerHTML = A.formateString(tpl, data,data);
        A.root.appendChild(s);
    },
    'codePart' : function () {
        
    },
    'onlyTitle' : function () {
        
    },
    'guide' : function () {

    }
};

//视图入口
A.init = function (data) {

    //根据传输的视图类型创建视图
    this.strategy[data.type](data);
};
A.formateString = function (str, data) {
    return str.replace(/\{#(\w+)#\}/g, function (match, key) {
        return typeof  data[key] === undefined ? '' : data[key]
    })
};

//模板生成器
A.view = function (name) {

    //模板库
    var V = {
        code : '<pre><code>{#code#}</code></pre>',
        img : '<img src="{#src#}" alt="{#alt#}" title="{#title#}" />',
        part : '<div id="{#id#}" class="{#class#}">{#part#}</div>',
        theme : [
            '<div>',
                '<h1>{#title#}</h1>',
                '{#content#}',
            '</div>'
        ].join('')
    }

    //如果参数是一个数组，则返回多行模板
    if (Object.prototype.toString.call(name) === '[object Array') {
        var tpl = '';
        for (var i = 0, len = name.length; i < len; i++) {
            tpl += arguments.callee(name[i]);
        }
        return tpl;
    } else {
        return V[name] ? V[name] : ('<' + name + '>{#' + name + '#}</' + name +'>');
    }
}