class Pipes {
  constructor(game) {
    this.game = game
    this.pipeSpace = 150
    this.pipes = []
    this.管口间距 = 200
    this.speed = 5
    this.pause = false
    for (var i = 0; i < 3; i++) {
      var pipe = GuaImage.new(game, 'pipe_up')
      pipe.x = 370 + i * this.pipeSpace
      // pipe.y = 250
      var pipe2 = GuaImage.new(game, 'pipe_down')
      pipe2.x = pipe.x
      // pipe2.y = -250
      this.resetPipesPosition(pipe, pipe2)
      this.pipes.push(pipe)
      this.pipes.push(pipe2)
    }
  }
  resetPipesPosition(p1, p2) {
    p2.y = randomBetween(-250, -100)
    p1.y = p2.y + p2.h + this.管口间距
    log('text', p1.y, p2.y)
  }

  static new(game) {
    var i = new this(game)
    return i
  }

  stop() {
    this.pause = true
  }

  draw() {
    for (let p of this.pipes) {
      p.draw()
    }
  }

  update() {
    if (this.pause) {
      return
    }
    for (let p of this.pipes) {
      // log('text', p)
      p.x -= this.speed
      if (p.x < -100) {
        p.x += this.pipeSpace * 3
      }
    }
  }
}
