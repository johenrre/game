
class Scene extends RockingScene {
    constructor(game) {
        super(game)
        this.score = 0
        this.setup()
        this.setupInputs()
    }

    setup() {
      const game = this.game
      this.bg = RockingImage.new(game, 'bg')
      this.trophy = Trophy.new(game)
      this.sicong = Sicong.new(game)
      this.bullets = []

      this.addElement(this.bg)
      this.addElement(this.trophy)
      this.addElement(this.sicong)
    }

    setupInputs() {
      var game = this.game
      game.registerAction('w', () => {
        this.sicong.moveUp()
      })
      game.registerAction('s', () => {
        this.sicong.moveDown()
      })
      game.registerAction('j', () => {
        this.sicong.fire()
      })
    }

    update() {
      super.update()

      for (var i = 0; i < this.bullets.length; i++) {
        if (this.trophy.collide(this.bullets[i])) {
          this.trophy.destory()
          this.bullets[i].destory()
          this.score += 10
        }
      }
    }
    draw() {
      super.draw()
      this.drawText()
    }

    drawText() {
      this.game.context.font = '25px serif'
      this.game.context.fillStyle = 'white'
      let score = `分数：${this.score}分`
      this.game.context.fillText(score, 10, 50);
    }
}
