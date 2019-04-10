class Bullet extends RockingImage {
  constructor(game) {
    super(game, 'mianbao')
    this.setup()
  }

  setup() {
    this.speend = 15
    this.w = 50
    this.h = 20
  }

  update() {
    this.x += this.speend
    if (this.x < 0 || this.x > 750) {
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
}
