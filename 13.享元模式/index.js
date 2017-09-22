/**
 * Created by feng on 2017/7/27.
 */

//享元模式
var Flyweight = function() {

    //已创建的元素
    var created = [];

    //创建一个新闻包装容器
    function create() {
        var dom = document.createElement('div');

        //将容器插入新闻列表容器中
        document.getElementById('container').appendChild(dom);
        created.push(dom);
        return dom;
    }
    return {

        //获取创建新闻元素的方法
        getDiv : function() {

            //已创建的元素如果小于当前页元素总个数，则创建

            if (created.length < 5) {
                return create();
            } else {

                //获取第一个元素，并插入最后面
                var div = created.shift();
                created.push(div);
                return div;
            }
        }
    }
}();
var paper = 0,
    num = 5,
    len = article.length;
for (var i = 0; i < 5; i++) {

    if (article[i]) {

        //通过享元类获取创建的元素并且写入新闻内容
        Flyweight.getDiv().innerHTML = article[i];
    }
}
document.getElementById('next_page').onclick = function() {

    if (article.length < 5) {
        return;
    };
    var n = ++paper * num % len, //获取当前页数的第一条新闻索引
        j = 0; //循环变量

    for (; j < 5; j++) {

        //如果存在第n + j条则插入
        if (article[n + j]) {
            Flyweight.getDiv().innerHTML = article[n + j];
        } else if (article[n + j - len]) {
            Flyweight.getDiv().innerHTML = article[n + j - len];
        } else {
            Flyweight.getDiv().innerHTML = ''
        }
    }
}
