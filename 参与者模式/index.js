/**
 * Created by feng on 2017/8/7.
 */

/*
    bind的异国战场
 */

var btn = document.getElementById('btn');
var div = document.getElementsByTagName('div')[0];
function test(e) {
    console.log(e, this);
};
//        var bindFn = test.bind();
//        btn.addEventListener('click', bindFn);

//        var bindFn = test.bind(btn);
//        btn.addEventListener('click', bindFn);

var bindFn = test.bind(div);
btn.addEventListener('click', bindFn);