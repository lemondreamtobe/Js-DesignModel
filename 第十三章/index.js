/**
 * Created by feng on 2017/7/26.
 */

//桥接模式
function Speed(x, y) {
    this.x = x;
    this.y = y;
};
Speed.prototype.run = function () {
    this.x++;
    this.y++;
};
function Speak(w) {
    this.word = w;
};
Speak.prototype.say = function () {
    console.log(this.word);
};

function People(x, y, w) {
    this.speed = new Speed(x, y);
    this.say = new Speak(w);
};
People.prototype.init = function () {
    this.speed.run();
    this.say.say();
};
var lin = new People(10, 10, 'hi');
lin.init();
