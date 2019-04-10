class Boom extends Animation {
  constructor(game, name) {
    let xinxi = {
      'enemy1' : [3, 'enemy1_down'],
      'enemy2' : [4, 'enemy2_down'],
      'player' : [3, 'player_down']
    }
    super(game, xinxi[name][0], xinxi[name][1])
    this.AnimationLength = xinxi[name][0]
  }

  update() {
    this.frameCount --
    if (this.frameCount == 0) {
      this.frameIndex = this.frameIndex + 1
      this.frameCount = 5
      this.texture = this.frames[this.frameIndex]
      if (this.frameIndex >= this.AnimationLength) {
        this.scene.removeElement(this)
      }
    }
  }
}
