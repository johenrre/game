class GuaScene {
    constructor(game) {
        this.game = game
        this.elements = []
        this.score = 0
    }

    addElement(image) {
      image.scene = this // 把scene传给他了
      if (image.alive === false || image.over === true) {
        return
      }
      this.elements.push(image)
    }

    removeElement(ele) {
      this.elements = removeElementByArr(this.elements, ele)
    }

    removeBullet(code) {
      for (var i = 0; i < this.elements.length; i++) {
        if (this.elements[i].code === code) {
          this.elements.splice(i, 1)
        }
      }
    }

    static new(game) {
        var i = new this(game)
        return i
    }
    draw() {
      for (var i = 0; i < this.elements.length; i++) {
        var e = this.elements[i]
        if (e.alive === false) {
          return
        }
        this.game.drawImage(e)
      }
    }

    update() {
      for (var i = 0; i < this.elements.length; i++) {
        var e = this.elements[i]
        e.update()
      }
    }
}
