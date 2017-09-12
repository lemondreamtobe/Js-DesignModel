/**
 * Created by feng on 2017/7/26.
 */
//装饰者模式
var decorator = function(input , fn) {
    var input = document.getElementById(input);

    if (typeof input.onclick === 'function') {
        var oldClickFn = input.onclick;
        input.onclick = function() {
            oldClickFn();
            fn();
        }
    } else {
        input.onclick = fn;
    }
}