var log = function() {
    console.log.apply(console, arguments)
}

var e = function(selector) {
    return document.querySelector(selector)
}

var es = function(selector) {
    return document.querySelectorAll(selector)
}

var appendHtml = function(element, html) {
	element.insertAdjacentHTML('beforeend', html)
}

var bindEvent = function(element, eventName, callback) {
    element.addEventListener(eventName, callback)
}

var toggleClass = function(element, className) {
    if (element.classList.contains(className)) {
        element.classList.remove(className)
    } else {
        element.classList.add(className)
    }
}

var removeClassAll = function(className) {
    var selector = '.' + className
    var elements = document.querySelectorAll(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        e.classList.remove(className)
    }
}

var addClassAll = function (selector, className) {
  var elements = document.querySelectorAll(selector)
  for (var i = 0; i < elements.length; i++) {
      var e = elements[i]
      e.classList.add(className)
  }
}

var bindAll = function(selector, eventName, callback) {
    var elements = document.querySelectorAll(selector)
    for(var i = 0; i < elements.length; i++) {
        var e = elements[i]
        bindEvent(e, eventName, callback)
    }
}

// find 函数可以查找 element 的所有子元素
var find = function(element, selector) {
    return element.querySelector(selector)
}

//更过js套路汇总
// data-XX=''   读取  dataset.XX

//动画的增加删除
var playAnimation = function(selector, animation) {

    // 让它开始播放动画
    selector.classList.add(animation)
    // 绑定一个 animationend 事件, 在动画结束后删除动画 class
    selector.addEventListener('animationend', function(){
        selector.classList.remove(animation)
    })
    selector.removeEventListener('animationend', function(){
        selector.classList.remove(animation)
    })
}
