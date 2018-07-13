
class Scene extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()
    }

    setup() {
      const game = this.game
      this.numberOfEnemies = 10
      this.bullets = []
      this.enemyBullets = []
      this.bg = GuaImage.new(game, 'sky')
      this.cloud = Cloud.new(game)
      this.player = Player.new(game)

      // this.player = GuaImage.new(game, 'player')
      // this.player.x = 100
      // this.player.y = 150

      this.addElement(this.bg)
      this.addElement(this.cloud)
      this.addElement(this.player)
      // enemy3
      this.addEnemies()
    }

    addEnemies() {
      var es = []
      for (var i = 0; i < this.numberOfEnemies; i++) {
        var e = Enemy.new(this.game)
        es.push(e)
        this.addElement(e)
      }
      this.enimies = es
    }

    setupInputs() {
      var game = this.game
      // var that = this
      game.registerAction('a', () => {
          this.player.moveLeft()
      })
      game.registerAction('d', () => {
          this.player.moveRight()
      })
      game.registerAction('w', () => {
          this.player.moveUp()
      })
      game.registerAction('s', () => {
          this.player.moveDown()
      })
      game.registerAction('j', () => {
          this.player.fire()
      })

      this.game.registerAction('r', () => {
        var s = Scene.new(this.game)
        this.game.replaceScene(s)
      })
    }

    update() {
      super.update()
      this.cloud.y += 1

      for (var i = 0; i < this.numberOfEnemies; i++) {
        for (var j = 0; j < this.bullets.length; j++) {
          if (this.enimies[i].collide(this.bullets[j])) {
            this.enimies[i].kill()
            this.bullets[j].destory()
            this.score += 10
          }
        }
      }

      for (var i = 0; i < this.enemyBullets.length; i++) {
        if (this.player.collide(this.enemyBullets[i])) {
          this.player.kill()
          this.enemyBullets[i].destory()
        }
      }

      for (var i = 0; i < this.numberOfEnemies; i++) {
        if (this.player.collide(this.enimies[i])) {
          this.player.kill()
          this.enimies[i].kill()
        }
      }
      ////
      // log('text', this.bullets)
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
      let life = `生命值：${this.player.lifes}`
      this.game.context.fillText(life, 10, 80);
      if (!this.player.alive) {
        let restart = `按R重新开始游戏`
        this.game.context.fillText(restart, 150, 300);
      }
    }
}
