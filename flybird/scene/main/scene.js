class Scene extends GuaScene {
    constructor(game) {
        super(game)

        this.init()
        this.setupInputs()
    }
    init() {
      this.bird = bird.new(this.game)
      this.bg = GuaImage.new(this.game, 'bg')
      this.land = Land.new(this.game)
      this.pipes = Pipes.new(this.game)
      this.score = Score.new(this.game)
      this.end = GuaImage.new(this.game, 'end')

      this.addElement(this.bg)
      this.addElement(this.pipes)
      this.addElement(this.land)
      this.addElement(this.score)
      this.addElement(this.bird)
      log('space: ', this.pipes.pipes[0].x, this.bird.x, this.pipes.pipes[0].w)
      this.tep = this.bird.x - this.pipes.pipes[0].x - this.pipes.pipes[0].w + 2
      this.pipeSpace = this.pipes.pipeSpace
      log('space: ', this.tep)
      this.game.score = -2
    }
    update() {
      super.update()
      if (this.bird.alive) {
        this.updateScore()
      }
      let pipes = this.pipes.pipes
      for (var i = 0; i < pipes.length; i++) {
        if (this.bird.collide(pipes[i])) {
          this.bird.kill()
          this.pipes.stop()
          this.land.stop()
          this.addEnd()
        }
      }
      // log('text', this.pipes.pipes.length)
    }

    addEnd() {
      this.end.x = 50
      this.end.y = 140
      this.addElement(this.end)
      this.game.registerAction('r', () => {
        var s = SceneTitle.new(this.game)
        this.game.replaceScene(s)
      })
    }

    updateScore() {
      // let space = this.pipes.pipeSpace + this.pipes.pipe.w
      if (this.tep % this.pipeSpace === 0) {
        this.game.score += 1
        console.log('score: ', this.game.score, this.tep)
      }
      this.tep += 5
    }

    draw() {
      super.draw()
      if (!this.bird.alive) {
        this.drawText()
      }
    }

    drawText() {
      this.game.context.font = '25px serif'
      this.game.context.fillStyle = 'white'
      let restart = `按R重新开始游戏`
      this.game.context.fillText(restart, 58, 210);
    }

    setupInputs() {
      this.game.registerAction('j', () => {
          this.bird.jump()
      })

      this.game.registerAction('p', () => {
          this.game.pause = !this.game.pause
      })
    }
}
