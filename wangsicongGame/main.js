var __main = function() {
    var images = {
        mianbao: 'imgs/面包.jpg',
        sicong: 'imgs/吃面包.jpg',
        tropht: 'imgs/奖杯.png',
        bg: 'imgs/夺冠背景2.jpg',
    }
    RockingGame.instance(30, images, function(g){
        var s = Scene.new(g)
        g.runWithScene(s)
    })
}

__main()
