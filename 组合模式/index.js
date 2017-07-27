/**
 * Created by feng on 2017/7/26.
 */

//组合模式
function News() {
    this.children = [];
    this.element  = null;
};
News.prototype = {
    init: function () {
        throw new Error('rewrite this method');
    },
    add: function () {
        throw new Error('rewrite this method');
    },
    getElement: function () {
        throw new Error('rewrite this method');
    }
};
function Container(id, parent) {

    News.call(this);
    this.id     = id;
    this.parent = parent;
    this.init();
};
function inherit(sub, sup) {
    function F() {};
    F.prototype = sup.prototype;
    var prototype = new F();
    prototype.constructor = sub;
    sub.prototype = prototype;
};
inherit(Container, News);
Container.prototype.init = function () {
    this.element = document.createElement('ul');
    this.element.id = this.id;
    this.element.className = 'new_container';
};
Container.prototype.add = function (child) {
    this.children.push(child);
    this.element.append(child.getElement());
    return this;
};
Container.prototype.getElement = function () {
    return this.element;
};
Container.prototype.show = function () {
    this.parent.appendChild(this.element);
};
function Item(classname) {
    News.call(this);
    this.classname = classname || '';
    this.init();
};
inherit(Item, News);
Item.prototype.init = function () {
    this.element = document.createElement('li');
    this.element.className = this.classname;
};
Item.prototype.add = function (child) {
    this.children.push(child);
    this.element.appendChild(child.getElement());
    return this;
};
Item.prototype.getElement = function () {
    return this.element;
};
function NewsGroup(classname) {
    News.call(this);
    this.classname = classname || '';
    this.init();
};
inherit(NewsGroup, News);
NewsGroup.prototype.init = function () {
    this.element = document.createElement('div');
    this.element.className = this.element;
};
NewsGroup.prototype.add = function (child) {
    this.children.push(child);
    this.element.appendChild(child.getElement());
    return this;
};
function IconNews(text, href, type) {
    News.call(this);
    this.text = text || '';
    this.href = href || '';
    this.type = type || 'video';
    this.init();
};
inherit(IconNews, News);
IconNews.prototype.init = function () {
    this.element = document.createElement('a');
    this.element.innerHTML = this.text;
    this.element.href = this.href;
    this.element.className = 'icon' + this.type;
};
IconNews.prototype.add = function () {};
IconNews.prototype.getElement = function () {
    return this.element;
}