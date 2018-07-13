class Enemy extends GuaImage {
  constructor(game) {
    var type = randomBetween(1, 2)
    var name = 'enemy' + type
    super(game, name)
    this.type = name
    this.game = game

    this.setup()
  }

  setup() {
    this.speend = randomBetween(2, 5)
    this.x = randomBetween(0, 500)
    this.y = -randomBetween(0, 200)
    this.alive = true
    this.lifes = 1
    this.colddown = 30
  }

  fire() {
    if (this.colddown == 0) {
      this.colddown = 50
      var x = this.x + this.w / 2
      var y = this.y + this.h
      var b = Bullet.new(this.game)
      b.x = x
      b.y = y
      b.speend = 15
      b.type = 'enemy'
      this.scene.addElement(b)
      this.scene.enemyBullets.push(b)
    }
  }

  update() {
    this.y += this.speend
    if (this.y > 800) {
      this.setup()
    }
    this.fire()
    if (this.colddown > 0) {
      this.colddown--
    }
  }

  kill() {
    this.lifes--
    if (this.lifes < 1) {
        this.alive = false
        this.boom()
        this.setup()
    }
  }

  boom() {
    let boom = new Boom(this.game, this.type)
    boom.x = this.x
    boom.y = this.y
    // boom.frameSpeend = 5
    this.scene.addElement(boom)
  }

  collide(bullet) {
      return this.alive && rectIntersects1(this, bullet)
  }
}
