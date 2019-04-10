class Sicong extends RockingImage {
  constructor(game) {
    super(game, 'sicong') 
    this.game = game
    this.setup()
  }

  setup() {
    this.speend = 10
    this.colddown = 0
    this.x = 50
    this.y = 250
    this.w = 100
    this.h = 150
  }

  update() {
    if (this.colddown > 0) {
      this.colddown--
    }
  }

  fire() {
    if (this.colddown == 0) {
      this.colddown = 20
      var x = this.x + this.w / 2
      var y = this.y
      var b = Bullet.new(this.game)
      b.x = x
      b.y = y
      this.scene.addElement(b)
      this.scene.bullets.push(b)
    }
  }

  moveY(y) {
    if (y < 0) {
        y = 0
    }
    if (y > 500) {
        y = 500
    }
    this.y = y
  }

  moveUp() {
    this.moveY(this.y -= this.speend)
  }

  moveDown() {
    this.moveY(this.y += this.speend)
  }

}
