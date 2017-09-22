/**
 * Created by feng on 2017/7/28.
 */

//状态模式雏形
//主要用于简化分支判断流程
var Result = function () {
    var States = {
        state0 : function () {

            //0的结果
        },
        state1 : function () {

            //1的结果
        },
        state2 : function () {

            //2的结果
        }
    };
    function show(result) {

        //这种写法很简洁，要多学习
        States['state' + result] && States['state' + result]();
    };
    return {
        show: show
    }
}()

//超级玛丽
var MarryState = function () {

    //内部状态私有变量
    var _currentState = {},
        states = {
            jump : function () {
                console.log('jump');
            },
            move : function () {
                console.log('move');
            },
            shoot : function() {
                console.log('shoot');
            },
            squat : function() {
                console.log('squat');
            }
        };

    //动作控制类
    var Action = {
        changeState : function() {

            //组合动作通过传递多个参数实现
            var arg = arguments;

            //重置内部状态
            _currentState = {};

            //如果有动作就添加动作
            if (arg.length) {
                for (var i = 0, len = arg.length; i < len; i++) {
                    _currentState[arg[i]] = true;
                }
            };
            return this;
        },
        goes : function() {
            console.log('触发一次动作');

            for (var i in _currentState) {

                states[i] && states[i]();
            };
            return this;
        }
    };
    return {
        change : Action.changeState,
        goes : Action.goes
    }
}
var marry = new MarryState();
    marry.change('jump', 'shoot').goes().goes().change('squat').goes();
