class Trophy extends RockingImage {
  constructor(game) {
    super(game, 'tropht')
    this.setup()
  }

  setup() {
    this.speend = randomBetween(5, 20)
    this.x = randomBetween(500, 600)
    this.y = -randomBetween(80, 200)
    this.w = 50
    this.h = 80
    this.alive = true
  }

  destory() {
    this.alive = false
    this.setup()
  }

  update() {
    this.y += this.speend
    if (this.y > 550) {
      this.setup()
    }
  }

  collide(bullet) {
    return this.alive && rectIntersects1(this, bullet)
  }
}
