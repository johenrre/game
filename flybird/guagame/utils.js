var e = sel => document.querySelector(sel)

var log = console.log.bind(console)

var imageFromPath = function(path) {
    var img = new Image()
    img.src = path
    return img
}

var rectIntersects = function(a, b) {
    var o = a
    if (b.y > o.y && b.y < o.y + o.h) {
        if (b.x > o.x && b.x < o.x + o.w) {
            return true
        }
    }
    return false
}

var rectIntersects2 = function(a, b) {
  var o = a
  var d = b
  var px, py;

  px = o.x <= d.x ? d.x : o.x;
  py = o.y <= d.y ? d.y : o.y;

  // 判断点是否都在两个对象中
  if (px >= o.x && px <= o.x + o.w && py >= o.y && py <= o.y + o.h && px >= d.x && px <= d.x + d.w && py >= d.y && py <= d.y + d.h) {
      return true;
  } else {
      return false;
  }
}

const randomBetween = function (start, end) {
  var n = Math.random() * (end - start + 1)
  return Math.floor(n + start)
}
