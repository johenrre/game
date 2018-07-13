class Cloud extends GuaImage {
  constructor(game) {
    super(game, 'cloud')  //新知识
    this.setup()
  }

  setup() {
    this.speend = 1
    this.x = randomBetween(0, 500)
    this.y = -randomBetween(0, 200)
  }

  update() {
    this.y += this.speend
    if (this.y > 800) {
      this.setup()
    }
  }
}
