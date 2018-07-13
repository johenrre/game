// 1实现悔棋 2结合的元素增加动画  3 分数 4 新游戏 5判断是不是赢了
class TB2048{
    constructor(){
       this.level = 6
       this.map = []
       this.animation = 0
       this.data = []
       this.Scorenow = 0
       this.Scorebest = 0
       this.first = ''
       this.win = 0
     }

    initmap() {
      //初始化map
      let s = this.level * this.level
      this.map = []
      for (var i = 0; i < s; i++) {
        this.map.push(0)
      }
    }
    drawMap(value) {
      let tbody = e('.tbody')
      tbody.innerHTML = ''
      let length = value * value
      let size = Math.floor((100 / value) * 100) / 100
      let fontsize = Math.floor((4 / value) * 100) / 100
      for (var i = 0; i < length; i++) {
          let t = `
            <div class="square" style='width:${size}%; height:${size}%; font-size:${fontsize}em;'>
              <span class=""></span>
            </div>
          `
          appendHtml(tbody, t)
      }
    }
    init(data) {
      this.map = data.map
      this.Scorenow = data.Scorenow
      this.Scorebest= data.Scorebest
      this.data = []
      this.level = data.level
      //
      this.drawMap(this.level)
      // log(this.first)
      if (this.first) {
        this.append1value()
        this.append1value()
      }
      this.showMap()
      this.data.push(this.map)
        // log(this.map)
    }
    newGame() {
      this.initmap()
      this.Scorenow = 0
      this.data = []
      this.append1value()
      this.append1value()
      this.showMap()
    }
    showMap() {
        // 吧value显示出来
        let value = this.map
        let square = es('.square span')
        for (let i = 0; i < square.length; i++) {
          this.deleteclass(square[i])
          if (value[i] != 0) {
              square[i].innerHTML = value[i]
              let classname = 'value' + value[i]
              square[i].classList.add(classname)
          } else {
             square[i].innerHTML = ''
          }
        }
        //给新元素增加动画
        if (this.animation != undefined) {
          playAnimation(square[this.animation], 'new-one')
        }
    }
    deleteclass(span){
      let flag = ['value2', 'value4', 'value8', 'value16', 'value32', 'value64','value128','value256','value512','value1024','value2048','value4096']
      for (let i = 0; i < flag.length; i++) {
        if (span.classList.contains(flag[i])) {
             span.classList.remove(flag[i])
             return
        }
      }
    }
    //在页面显示一个数字
    append1value() {
        // 随机生成2或者4
        let value = this.map
        let index = []
        for (let i = 0; i < value.length; i++) {
          if (value[i] == 0) {
              index.push(i)
          }
        }
        // 随机返回数组的一个数
        let newvalue = this.getcurren(index)
        //得到一个2或者4的数字
        let nub = this.getnub()
        this.map[newvalue] = nub
        this.animation = newvalue
        //把新的地图显示出来
        // this.showMap()
    }
    getcurren(arr) {
       let len = arr.length
       let a = arr[Math.floor(Math.random()*len)]
       return a
    }
    getnub() {
      let Rand = Math.random()
      if (Rand > 0.7) {
         return 4
      } else {
         return 2
      }
    }
    //把数组切成4个数组
    transverseArray() {
       let result = this.currenarrArray(this.map, this.level)
       return result
    }
    portraitArray() {
       let result = this.currenarrArray2(this.map, this.level)
       return result
    }
    // 把数组分成nub个数组
    currenarrArray(arr, nub) {
       let result = []
       let index = 0
       let nub2 = arr.length / nub
       for (let i = 0; i < nub; i++) {
         let line = []
         for (let j = 0; j < nub2; j++) {
            line.push(arr[index])
            index += 1
         }
        //  log(nub, i)
         result.push(line)
       }
       return result
    }
    // 把数组分成nub个数组 arr.lenth必须是nub * nub
    currenarrArray2(arr, nub) {
       let result = []
      //  var lie = 0
       for (let i = 0; i < nub; i++) {
         let line = []
         let index = i
         for (let j = 0; j < nub; j++) {
            line.push(arr[index])
            index += nub
         }
        //  log(nub, i)
         result.push(line)
       }
       return result
    }
    // 把数组都的数组都解压
    getValue(arr) {
      let result = []
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
           result.push(arr[i][j])
        }
      }
      return result
    }
    getValue2(arr) {
       let result = []
       for (let i = 0; i < arr.length; i++) {
         for (let j = 0; j < arr.length; j++) {
            result.push(arr[j][i])
         }
       }
       return result
    }
    //按了左
    moveleft() {
      //横向2维数组
       let arr = this.transverseArray()
       let resultarr = []
       for (let i = 0; i < arr.length; i++) {
         let line = this.contentval(arr[i])
         resultarr.push(line)
       }
       //把数组拍扁 更新map
       this.map = this.getValue(resultarr)
      //  log('text',this.map)
      //这里要测试一下有没有添加合并元素
       this.textChange()
    }
    moveright() {
       let arr = this.transverseArray()
      //  var arr = arr2.reverse()
       let resultarr = []
       for (let i = 0; i < arr.length; i++) {
         let bb = arr[i].reverse()
         let line = this.contentval(bb)
         resultarr.push(line.reverse())
       }
      this.map = this.getValue(resultarr)
      //这里要测试一下有没有添加合并元素
       this.textChange()
    }
    movetop() {
      //竖着得到一个2维数组
       let arr = this.portraitArray()
       let resultarr = []
       for (let i = 0; i < arr.length; i++) {
         let line = this.contentval(arr[i])
         resultarr.push(line)
       }
       this.map = this.getValue2(resultarr)
      //  log('resultarr = ',this.green)
      //这里要测试一下有没有添加合并元素
       this.textChange()
    }
    movedown() {
      let arr = this.portraitArray()
      // var arr = arr2.reverse()
       let resultarr = []
       for (let i = 0; i < arr.length; i++) {
         let bb = arr[i].reverse()
         let line = this.contentval(bb)
         resultarr.push(line.reverse())
       }
      //初始化green
      this.map = this.getValue2(resultarr)
      //  log('text',this.map)
      //这里要测试一下有没有添加合并元素
       this.textChange()
    }
    textChange() {
      // 判断2个数组是否相等
        let flag = this.judge()
        // log(flag)
        if (flag) {
           this.showMap()
        } else {
           this.append1value()
           this.data.push(this.map)
           this.showMap()
          //  log('data = ', this.data[this.data.length - 2], this.map)
        }
    }
    // 判断map 和 data[this.data.length - 1] 是否相等
    judge() {
      // 判断2个数组是否相等
        let a = JSON.stringify(this.data[this.data.length - 1])
        let b = JSON.stringify(this.map)
        // log('text', a, b)
        if (a == b) {
          return true
        } else {
          return false
        }
    }
    //吧一个数组相同的结合
    contentval(arr) {
        let result = []
        //开关
        let zhuant = 0
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] != 0) {
                if (zhuant == 0) {
                    result.push(arr[i])
                    zhuant = 1
                } else if (zhuant == 1) {
                    if (result[result.length-1] == arr[i]) {
                        this.Scorenow += arr[i] * 2
                        this.textwin(arr[i] * 2)
                        result[result.length-1] = arr[i] * 2
                        zhuant = 0
                    } else {
                       result.push(arr[i])
                       zhuant = 1
                    }
                }
            }
        }
        //补全result
        return this.buquan(result, this.level)
    }
    textwin(n) {
        if (n > this.win) {
          this.win = n
        }
    }
    // 对数组进行补全
    buquan(arr, nub) {
       let result = []
      //  var t = nub - arr.length
       for (let i = 0; i < nub; i++) {
         if (arr[i] == undefined ) {
           result.push(0)
         } else {
           result.push(arr[i])
         }
       }
       return result
    }
    //悔棋
    huiqi() {
      // log('断电', this.data)
      let length = this.data.length
      if (length > 1) {
        this.data.pop()
        let data = this.data[this.data.length - 1]
        this.map = data
        // log('断电', data)
        this.showMap()
      } else {
        return
      }
    }
}
// var a = function () {
//    return b = function () {
//
//    }
// }
