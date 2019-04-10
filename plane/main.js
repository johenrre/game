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
        bullet: 'img/bullet.png',
        cloud: 'img/cloud.png',
        player: 'img/player.png',
        sky: 'img/bg.jpg',
        enemy1: 'img/enemy1.png',
        enemy2: 'img/enemy2.png',
        enemy3: 'img/enemy3.png',
        enemy2_down1: 'img/enemy2_down1.png',
        enemy2_down2: 'img/enemy2_down2.png',
        enemy2_down3: 'img/enemy2_down3.png',
        enemy2_down4: 'img/enemy2_down4.png',
        enemy1_down1: 'img/enemy1_down1.png',
        enemy1_down2: 'img/enemy1_down2.png',
        enemy1_down3: 'img/enemy1_down3.png',
        player_down1: 'img/player_down1.png',
        player_down2: 'img/player_down2.png',
        player_down3: 'img/player_down3.png',
    }
    var game = GuaGame.instance(30, images, function(g){
        var s = Scene.new(g)
        g.runWithScene(s)
    })

    enableDebugMode(game, true)
}

__main()
