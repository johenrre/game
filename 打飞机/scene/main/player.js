class Player extends GuaImage {
  constructor(game) {
    super(game, 'player') 
    this.game = game
    // this.w = 40
    // this.h = 60
    this.setup()
  }

  setup() {
    this.speend = 10
    this.colddown = 0
    this.x = 250
    this.y = 600
    this.lifes = 10
    this.alive = true
  }

  update() {
    if (this.colddown > 0) {
      this.colddown--
    }
  }

  fire() {
    if (this.colddown == 0) {
      this.colddown = 3
      var x = this.x + this.w / 2
      var y = this.y
      var b = Bullet.new(this.game)
      b.x = x
      b.y = y
      this.scene.addElement(b)
      this.scene.bullets.push(b)
      // log('text', this.scene.bullets, this.scene.elements)
    }
  }

  kill() {
    this.lifes--
    if (this.lifes < 1) {
      this.alive = false
      this.scene.removeElement(this)
      this.boom()
    }
    log('飞机生命', this.lifes)
  }

  boom() {
    log('this.boom')
    let boom = new Boom(this.game, 'player')
    boom.x = this.x
    boom.y = this.y
    this.scene.addElement(boom)
  }

  collide(bullet) {
    return this.alive && rectIntersects1(this, bullet)
  }

  moveX(x) {
    if (x < 0 - this.w / 2) {
        x = - this.w / 2
    }
    if (x > 500 - this.w / 2) {
        x = 500 - this.w / 2
    }
    this.x = x
  }
  moveY(y) {
    if (y < 0) {
        y = 0
    }
    if (y > 700) {
        y = 700
    }
    this.y = y
  }
  moveLeft() {
    this.moveX(this.x -= this.speend)
  }
  moveRight() {
    this.moveX(this.x += this.speend)
  }
  moveUp() {
    this.moveY(this.y -= this.speend)
  }
  moveDown() {
    this.moveY(this.y += this.speend)
  }
}
