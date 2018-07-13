class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)

        this.init()
        this.setupInputs()
    }
    init() {
      this.bird = bird.new(this.game)
      this.bg = GuaImage.new(this.game, 'bg')
      this.land = Land.new(this.game)
      this.score = Score.new(this.game)
      this.biaoti = GuaImage.new(this.game, 'biaoti')
      this.biaoti.x = 50
      this.biaoti.y = 140
      this.updown = false
      this.count = 5
      this.step = 0
      this.bird.gy = 4

      this.addElement(this.bg)
      this.addElement(this.land)
      this.addElement(this.score)
      this.addElement(this.biaoti)
      this.addElement(this.bird)
    }
    update() {
      super.update()
      this.bird.rotation = 0
      this.step += 1
      if (this.step === this.count) {
        this.step = 0
        this.updown = !this.updown
      }
      this.bird.vy = this.updown ? this.bird.vy * -1 : this.bird.vy
    }

    draw() {
      super.draw()
      this.drawText()
    }
    drawText() {
      this.game.context.font = '25px serif'
      this.game.context.fillStyle = 'white'
      let restart = `按J开始游戏`
      this.game.context.fillText(restart, 74, 210);
    }


    setupInputs() {
      this.game.registerAction('j', () => {
        var s = Scene.new(this.game)
        this.game.replaceScene(s)
      })
    }
}
