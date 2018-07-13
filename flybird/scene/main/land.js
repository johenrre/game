class Land extends GuaImage {
  constructor(game) {
    super(game, 'land')

    this.setup()
    this.speed = 5
  }

  setup() {
    this.y = 480
    this.x = 0
    this.z = 5
    this.pause = false
  }

  stop() {
    this.pause = true
  }

  update() {
    if (this.pause) {
      return
    }
    this.x -= this.speed
    this.z --
    if (this.z == 0) {
      this.x = 0
      this.z = 5
    }
  }
}
