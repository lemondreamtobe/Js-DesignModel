/**
 * Created by feng on 2017/7/26.
 */

//代理模式,解决跨域

//站长统计
var count = (function() {
    var img = new Image();
    return function(param) {
        var str = 'http://www.count.com/a.gif?';
        for (var i in param) {
            str += i + '=' + param[i];
        };
        img.src = str;
    }
})();
count({num : 10});

//JSONP
<script type = "text/JavaScript">
    function JSPNPCallBack(res, req) {
        console.log(res, req);
    }
</script>
<script type="text/JavaScript" src="http://localhost/test/jsonp.php?callback=JSONPCallBack&data=getJsonPData"></script>