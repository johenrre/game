class Score {
  constructor(game) {
    this.game = game
    this.score = 0
    this.nubs = []
    this.setScore()
  }
  setScore() {
    this.nubs = []
    if (this.score < 10) {
      let t = this.getImage(this.score)
      t.x = 130
      t.y = 80
      this.nubs.push(t)
    } else {
      let s = Math.floor(this.score / 10)
      let g = this.score % 10
      let t1 = this.getImage(s)
      t1.y = 80
      t1.x = 120
      this.nubs.push(t1)
      let t2 = this.getImage(g)
      t2.y = t1.y
      t2.x = 145
      this.nubs.push(t2)
    }
  }

  getImage(score) {
    var name = `font${score}`
    let t = GuaImage.new(this.game, name)
    return t
  }

  static new(game) {
    var i = new this(game)
    return i
  }

  update() {
    if (this.game.score > 0 && this.game.score !== this.score) {
      this.score = this.game.score
      this.setScore()
    }
  }

  draw() {
    for (let s of this.nubs) {
      s.draw()
    }
  }
}
