class Animation {
  constructor(game, framesLength, typeName) {
    this.game = game

    this.frames = []
    for (var i = 1; i <= framesLength; i++) {
      var name = `${typeName}${i}`
      var t = this.game.textureByName(name)
      this.frames.push(t)
    }

    this.texture = this.frames[0]
    this.w = this.texture.width
    this.h = this.texture.height
    this.frameIndex = 0
    this.frameCount = 3
    //
    this.flipX = false
    this.rotation = 0
  }

  static new(game) {
    var i = new this(game)
    return i
  }

  update() {
    this.frameCount --
    if (this.frameCount == 0) {
      this.frameIndex = (this.frameIndex + 1) % this.frames.length
      this.frameCount = 3
      this.texture = this.frames[this.frameIndex]
    }
  }

  draw() {
    this.game.drawImage(this)
  }
}
