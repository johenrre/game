// var loadLevel = function(game, n) {
//     n = n - 1
//     var level = levels[n]
//     var blocks = []
//     for (var i = 0; i < level.length; i++) {
//         var p = level[i]
//         var b = Block(game, p)
//         blocks.push(b)
//     }
//     return blocks
// }

var enableDebugMode = function(game, enable) {
    if(!enable) {
        return
    }
    window.paused = false
    window.addEventListener('keydown', function(event){
        var k = event.key
        if (k == 'p') {
            // 暂停功能
            window.paused = !window.paused
        } else if ('1234567'.includes(k)) {
            // 为了 debug 临时加的载入关卡功能
        }
    })
    // 控制速度
    document.querySelector('#id-input-speed').addEventListener('input', function(event) {
        var input = event.target
        // log(event, input.value)
        window.fps = Number(input.value)
    })
}

var __main = function() {
    var images = {
        bird1: 'img/bird1.png',
        bird2: 'img/bird2.png',
        bird3: 'img/bird3.png',
        bg: 'img/bg.png',
        land: 'img/land.png',
        pipe_up: 'img/pipe_up.png',
        pipe_down: 'img/pipe_down.png',
        biaoti: 'img/text_ready.png',
        end: 'img/text_game_over.png',
        font1: 'img/1.png',
        font2: 'img/2.png',
        font3: 'img/3.png',
        font4: 'img/4.png',
        font5: 'img/5.png',
        font6: 'img/6.png',
        font7: 'img/7.png',
        font8: 'img/8.png',
        font9: 'img/9.png',
        font0: 'img/0.png',
    }
    var game = GuaGame.instance(30, images, function(g){
        var s = SceneTitle.new(g)
        g.runWithScene(s)
    })

    enableDebugMode(game, true)
}

__main()
