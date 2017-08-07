/**
 * Created by feng on 2017/8/7.
 */
/*
    创建节流器
 */
var throttle = function () {
    var isClear = arguments[0], fn;

    //如果第一个参数是布尔值类型那么第一个参数则表示清除计时器
    if (typeof isClear === 'boolean') {

        //第二个参数则为函数
        fn = arguments[1];
        fn.__throttleID && clearTimeout(fn.__throttleID);
    } else {

        //第一个参数为函数
        fn = isClear;

        //第二个参数为函数执行的参数
        param = arguments[1];
        var p = extend({
            context : null,
            args : [],
            time : 300
        }, param);

        //清楚执行函数计时器句柄
        arguments.callee(true, fn);

        //为函数绑定计时器句柄，延迟执行函数
        fn.__throttleID = setTimeout(function () {

            //执行函数
            fn.apply(p.context, p.args)
        }, p.time)
    }
};
/*
    外观模式封装获取元素
 */
function $(id) {
    return document.getElementById(id);
};
function $tag(tag, container) {
    container = container || document;
    return container.getElementsByTagName(tag);
};

/*
    浮层类
 */
var Layer = function (id) {
    this.container = $(id);
    this.layer = $tag('div', this.container)[0];
    this.lis = $tag('li', this.container);
    this,imgs = $tag('img', this.container);
    this.bindEvent();
};
Layer.prototype = {
    bindEvent : function () {
        //缓存当前对象
        var that = this;

        //隐藏浮层
        function hideLayer() {
            that.layer.className = '';
        }
        function showLayer() {
            that.layer.className = 'show';
        }

        //鼠标移入
        that.on(that.container, 'mouseenter', function () {

            //清除隐藏浮层方法计时器
            throttle(true, hideLayer);

            //延迟显示浮层方法
            throttle(showLayer);
        }).on(that.container, 'mouseleave', function () {

            //延迟浮层隐藏方法
            throttle(hideLayer);

            //清除显示浮层方法计时器
            throttle(true, showLayer);
        });

        //遍历icon绑定事件
        for (var i = 0; i < that.lis.length; i++) {
            that.lis[i].index = i;
            that.on(that.lis[i], 'mouseenter', function () {
                var index = this.index;

                //排除所有img show类
                for (var i = 0; i < that.imgs.length; i++) {
                    that.imgs[i].className = ''
                }

                //目标图片设置show类
                that.imgs[index].className = 'show';

                //从新定义浮层的位置
                that.layer.style.left = -22 + 60 * index + 'px';
            })
        }
    },
    on : function (ele, type, fn) {
        ele.addEventListener ? ele.addEventListener(type, fn, false) : ele.attachEvent('on' + type, fn);
        return this;
    }
};

/*
    图片延迟加载类
 */
function LazyLoad(id) {
    this.container = document.getElementById(id);
    this.imgs = this.getImgs();
    this.init();
};
LazyLoad.prototype = {
    init : function () {
        this.update(); //初始化图片加载
        this.bindEvent(); //窗口绑定事件
    },
    getImgs : function () {
        var arr = [];
        var imgs = this.container.getElementsByTagName('img');
        for (var i = 0, len = imgs.length; i < len; i++) {
            arr.push(imgs[i]);
        };
        return arr;
    },
    update : function () {

        //图片加载都完成了则返回
        if(!this.imgs.length) {
            return;
        }
        var i = this.imgs.length;
        for(--i; i >= 0; i--) {

            //如果图片在可视范围
            if (this.shouldShow(i)) {
                this.imgs[i].src = this.imgs[i].getAttribute('data-src');
                this.imgs.splice(i,1);
            }
        }
    },
    shouldShow : function (i) {
        var img = this.imgs[i],
            scrollTop = document.documentElement.scrollTop || document.body.scrollTop,
            scrollBottom = document.documentElement.clientHeight,
            imgTop = this.pageY(img),
            imgBottom = imgTop + img.offsetHeight;
        if (imgBottom > scrollTop && imgBottom < scrollBottom || (imgTop > scrollTop && imgTop < scrollBottom)) {
            return true;
        } else {
            return false;
        }
    },
    pageY : function (ele) {

        //如果元素有父元素
        if (ele.offsetParent) {
            return ele.offsetTop + this.pageY(ele.offsetParent);
        } else {
            return ele.offsetTop;
        }
    },
    on : function (ele, type, fn) {
        ele.addEventListener ? ele.addEventListener(type, fn, false) : ele.attachEvent('on' + type, fn);
        return this;
    },
    bindEvent : function () {
       var that = this;
       this.on(window, 'resize', function () {

           //节流处理更新图片逻辑
           throttle(that.update, {context : that});
       });
       this.on(window, 'scroll', function () {

           //节流处理更新图片逻辑
           throttle(that.update, {context : that});
       })
    }
}