const bindKeydown =()=>{
  document.onkeydown=(event)=>{
      if (event.keyCode == 38) {
        //按了上
        // t2048.direction = 38
        //实现位移和合并
        t2048.movetop()
        showScore()
        savaData()
      } else if (event.keyCode == 40) {
        //按了下
        t2048.movedown()
        showScore()
        savaData()
      } else if (event.keyCode == 37) {
        //按了左
        t2048.moveleft()
        showScore()
        savaData()
      } else if (event.keyCode == 39) {
        //按了右
        t2048.moveright()
        showScore()
        savaData()
      }
  }
}
//给悔棋绑定事件
const bindhuiqi =()=>{
   e('.feature-1').onclick=(event)=>{
      t2048.huiqi()
   }
}
//显示分数
const showScore =()=>{
  let score1 = e('.score-1 .score-1-num')
  let score2 = e('.score-2 .score-1-num')
  score1.innerHTML = t2048.Scorenow
  if (t2048.Scorenow >= t2048.Scorebest) {
     score2.innerHTML = t2048.Scorenow
     t2048.Scorebest = t2048.Scorenow
  } else {
    score2.innerHTML = t2048.Scorebest
  }
}
//绑定新游戏
const bindNowgame =()=>{
    let button = e('.feature-2')
    button.onclick=(event)=>{
      Restart()
    }
}
//保存数据
const savaData =()=>{
    let map = t2048.map
    let Scorenow = t2048.Scorenow
    let Scorebest = t2048.Scorebest
    let level = t2048.level
    let data = {
      'map' : map,
      'Scorenow' : Scorenow,
      'Scorebest' : Scorebest,
      'level' : level,
    }
    localStorage.text = JSON.stringify(data)
}
//载入数据

const loadData =()=>{
   if (localStorage.text == undefined) {
     t2048.first = true
     //初始化map
     t2048.initmap()
     var result = {
       'map' : t2048.map,
       'Scorenow' : 0,
       'Scorebest' : 0,
       'level' : 6,
     }
   } else {
     t2048.first = false
     var result = JSON.parse(localStorage.text)
   }
   return result
}
//显示表格大小
const showLevel =(level)=>{
   let info = e('.logo-info')
   let t = `${level} X ${level}`
   info.innerHTML = t
   playAnimation(info, 'merge-one')
}
//绘制地图
const drawMap =(value)=>{
   let tbody = e('.tbody')
   let length = value * value
   let size = Math.floor((100 / value) * 100) / 100
   let fontsize = Math.floor((4 / value) * 100) / 100
   for (let i = 0; i < length; i++) {
       let t = `
         <div class="square" style='width:${size}%; height:${size}%; font-size:${fontsize}em;'>
           <span class=""></span>
         </div>
       `
       appendHtml(tbody, t)
   }
}
//重新游戏
// const Restart = function () {
//      t2048.drawMap(t2048.level)
//      t2048.newGame()
//      showScore()
// }
const Restart =()=>{
     t2048.drawMap(t2048.level)
     t2048.newGame()
     showScore()
}
//绑定控制台
const bindConsole =()=>{
   let button = e('.console-2048')
   bindEvent(button, 'click', function (event) {
     let target = event.target
     if (target.classList.contains('upper-level')) {
         t2048.level += 1
         showLevel(t2048.level)
         log('level:',t2048.level)
         Restart()
     } else if (target.classList.contains('lower-level')) {
         t2048.level -= 1
         showLevel(t2048.level)
         log('level:',t2048.level)
         Restart()
     }
   })
}

const t2048 = new TB2048()

const bindeventall =()=>{
  bindConsole()
  bindNowgame()
  bindKeydown()
  bindhuiqi()
}

const _main =()=>{
  bindeventall()
  let data = loadData()
  log('data', data)
  t2048.init(data)
  showLevel(t2048.level)
  // t2048.append1value()
  showScore()
}

_main()
