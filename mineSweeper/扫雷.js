// //
//  [1 1 1 9 1 0，
//   9 1 1 1 1 0，
//   2 9 1 0 0 0，
//   1 1 1 1 1 1，
//   0 0 0 1 9 1，
//   0 0 0 1 1 1，
//  ]
//
//
// // 1.如果点到 0 显示周围9个
// // 2.如果0周围9个数字里有0
//
//  1.得到周围8个数字 2.给8个数字显示出来  3.如果其中有0 在执行whenzero
var clickaaa = function(array, x, y) {
    var n = array.length
    var a = ['id', 'cell']
    var className = 'clicked'
    var className2 = 'show'
    if (x >= 0 && x < n && y >= 0 && y < n) {
          a.push(x)
          a.push(y)
          var Id = '#' + a.join('-')
          var element = e(Id)
          element.classList.add(className)
          element.firstChild.classList.add(className2)

        //  if (array[x][y] == 0) {
        //     whenzero(array, x, y)
        //  }
    }
}


var leftClicked = function(x, y, element) {
  	var a = showmap(x, y)
    element.classList.add('clicked')
    element.firstChild.classList.add('show')
  	if (a == 0) {
  		whenzero(x, y)
  	}
}

var clickPos = function(x, y) {
	if( x < 0 || x > 11 ) {
		return
	}
	if( y < 0 || y > 11 ) {
		return
	}
	var id = `#id-cell-${x}-${y}`
	var a = e(id)
	if( !a.classList.contains('clicked') ) {
		 leftClicked(x, y, a)
	}
}

var whenzero = function (x, y) {
    for(var i = x - 1; i <= x + 1; i++) {
    	for(var j = y - 1; j <= y + 1; j++) {
      	clickPos(i, j)
    	}
    }
}

//制作显示页面的地图
var content = function (a, b) {
   for (var i = 0; i < a; i++) {
      var t1 = `
          <div class="square-line-${i}"></div>
      `
      var ele = e('.container')
      appendHtml(ele, t1)
     for (var j = 0; j < b; j++) {
       var t = `
        <div class="square" id="id-cell-${i}-${j}"><span class="value"></span></div>
       `
       var selector = '.square-line-' + i
       var element = e(selector)
       appendHtml(element, t)
     }
   }
}
var container = function (grade) {
   if (grade == '中级') {
     var t = `
     <div class="container" style='width: 300px; height: 300px;'></div>
     `
     var ele = e('.item')
     appendHtml(ele, t)
     content(12, 12)
   } else if (grade == '高级') {
     var t = `
     <div class="container" style='width: 500px; height: 500px;'></div>
     `
     var ele = e('.item')
     appendHtml(ele, t)
     content(20, 20)
   }
}



//制作显示页面的地图
// var map = area()

// 给所有地图中的元素绑定area数
var bindArea = function (map) {
   var squares = es('.square')
   for (var i = 0; i < squares.length; i++) {
       //取id 给span的value添加innerhtml
       var a = squares[i].id
       var x = a.split('-')[2]
       var y = a.split('-')[3]
       var t = showmap(x, y)
       if (t == 9) {
          t = '雷'
       } else if (t == 0) {
          t = ''
       }
       sle = squares[i].firstChild
       sle.innerHTML = t
   }
}
// 对地图绑定‘click’事件
/* 1. 对所有suqare绑定事件
   2. 可能点到提示数字 给他div加上clicked 给span加上 show
   3.可能点到 雷 给所有 div加上clicked  给所有span加上 show
   4.点到0 （暂时不考虑）
*/
var showmap = function (x, y) {
   return map[x][y]
}

//得到map的对应的值
// getValue = function (id) {
//   var x = id.split('-')[2]
//   var y = id.split('-')[3]
//   return map[x][y]
// }

var winGame = function (leishu) {
   var a = es('.square')
   var nub = 0
   for (var i = 0; i < a.length; i++) {
     if (a[i].classList.contains('clicked')) {
          nub += 1
     }
   }
   // 总数144
   if (nub == winnub) {
     log('texxxx', winnub)
      alert('恭喜你赢了！')
      stopTime()
   }
}

const textbeginTime = function () {
   var selector = '.clicked'
   var selector2 = '.white'
   var a = es(selector).length
   var b = es(selector2).length
   var time = e('#id-span-time')
   if (a == 0 && b == 0) {
       time.innerHTML = 0
       beginTime(time)
   }
}

const beginTime = function (a) {
  var time = a
  timeSetint = setInterval(function() {
    var t = parseInt(time.innerHTML) + 1
    time.innerHTML = t
    }, 1000)
}
const stopTime = function () {
  if (timeSetint == 0) {
     return
  } else {
    clearInterval(timeSetint)
  }
}

var bindAllSquare = function (map) {
   var selector ='.square'
   bindAll(selector, 'click', function (event) {
      textbeginTime()
      var a = event.target.id
      var x = a.split('-')[2]
      var y = a.split('-')[3]
      var t = showmap(x, y)
      var className = 'clicked'
      var className2 = 'show'
      var selector2 = '.value'
      if (t == 9) {
         addClassAll(selector, className)
         addClassAll(selector2, className2)
         alert('你输了！')
         stopTime()
      } else if (t == 0) {
           event.target.classList.add(className)
          //显示周围9个数
          whenzero(parseInt(x), parseInt(y))
      } else {
         event.target.classList.add(className)
         event.target.firstChild.classList.add(className2)
      }
      winGame()
   })
   //右击绑定事件
   document.oncontextmenu = function(e){
        // e.preventDefault();
        var e = window.event
        if(e.button == "2"){
            var element = e.target
          if (element.classList.contains('square')) {
            e.preventDefault();
            className = 'white'
            toggleClass(element, className)
            var whites = document.querySelectorAll('.white')
            var nn = document.querySelector('#id-span-mines')
            nn.innerHTML = leinubs - whites.length
          }
        }
    }
  //  document.onmousedown = function(e){
  //       e.preventDefault();
  //       var e = e || window.event
  //       if(e.button == "2"){
  //           log(e.target)
  //       }
  //   }
}

var leinub = function (a) {
  leinubs = a
  var nn = e('#id-span-mines')
  nn.innerHTML = a
}

// 对难度绑定click事件
var bindlever = function () {
  var selector ='.start'
  bindAll(selector, 'click', function (event) {
       stopTime()
       var time = e('#id-span-time')
       time.innerHTML = 0
      // textbeginTime()
       var lever = event.target.value
      //  map = area(lever
      log('text', lever)
      var className = 'clicked'
      var className1 = 'white'
      var className2 = 'show'
      removeClassAll(className)
      removeClassAll(className1)
      removeClassAll(className2)
      // 6 12 20
      if (lever == 6) {
         window.map = area(15)
         window.winnub = 129
         bindArea()
         leinub(15)
      } else if (lever == 12) {
        window.map = area(20)
        window.winnub = 124
        bindArea()
        leinub(20)
      } else if (lever == 20) {
        window.map = area(25)
        window.winnub = 119
        bindArea()
        leinub(25)
      }
  })
}

var __main = function () {
  window.leinubs = 15
  window.winnub = 129
  window.timeSetint = 0
  window.map = area(15)
  container('中级')
  bindArea(map)
  bindAllSquare(map)
  bindlever()
}

__main()
