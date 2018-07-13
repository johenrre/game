var log = function() {
    console.log.apply(console, arguments)
}
var aixin = function () {
   for (var y = 1.4; y > -1.5; y -= 0.1) {
     for (var x = -1.5; x < 1.5; x +=0.05) {
       var a = x * x + y * y - 1
       var b = a * a * a - x * x * y * y * y
       if (b < 0) {
          log('*')
       } else {
         log(' ')
       }
     }
     log('回车')
   }
}

aixin()
