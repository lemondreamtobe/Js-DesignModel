/**
 * Created by feng on 2017/7/31.
 */
$('#next_page').on('click', function () {
    var news = $('#news_content');
    var page = news.data('page');
    getPageData(page, function () {
        news.data('page', page + 1);
    });
});
function getPageData(page, fn) {
    $.post('', {page: page}, function (res) {

        if (res.errNo == 0) {
            showPage(page, res.data);
            fn && fn();
        }
    });
};
function showPage(page, data) {

    //...
};

//备忘录
var Page = (function () {

    var cache = {};
    return function (page, fn) {

        //判断数据是否在缓存中
        if (cache[page]) {

            //恢复该页状态，显示该页内容
            showPage(page, cache[page]);
        } else {
            $.post('', {page: page}, function (res) {

                if (res.errNo == 0) {
                    showPage(page, res.data);
                    cache[page] = res.data;
                    fn && fn();
                } else {

                    //error
                }
            });
        }
    }
})();