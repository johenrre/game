class Bullet extends GuaImage {
  constructor(game) {
    super(game, 'bullet')  //新知识
    this.setup()
  }

  setup() {
    this.speend = -15
  }

  update() {
    this.y += this.speend
    if (this.y < 0 || this.y > 750) {
      this.destory()
    }
  }

  destory() {
    if (this.type) {
      this.scene.enemyBullets = removeElementByArr(this.scene.enemyBullets, this)
    } else {
      this.scene.bullets = removeElementByArr(this.scene.bullets, this)
    }
    this.scene.removeElement(this)
  }

  // destory() {
  //   this.scene.
  // }
}
