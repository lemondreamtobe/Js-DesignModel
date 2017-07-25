/**
 * Created by feng on 2017/7/25.
 */
var Book = function (id, name, price) {

    //私有属性
    var num = 1;

    //私有方法
    function sayId() {

    };

    //公有方法或者特权方法
    this.getName = function () {

    }; //this.getPrice, this.setName, this.setPrice

    //公有属性
    this.id = id;

    //构造器
    this.setName(name);
    this.setPrice(name);
}