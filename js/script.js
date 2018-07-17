'use strict';

let size = 3;

class TicTacToe {
  constructor(size, playgroundUI) {
    if (localStorage.getItem('theSave')) {
      var theSave = JSON.parse(localStorage.getItem('theSave'));
      this.size = theSave.size;
      this.playground = new Playground(playgroundUI, theSave.size);
      this.playground.field = theSave.playground;
      this.player = theSave.player;
      this.stepCount = theSave.player
    } else {
      this.size = size;
      this.playground = new Playground(playgroundUI, size);
      this.player = 'x';
      this.stepCount = 0
    }
    
    this.playground.renderPlayground();
    this.frameController = new FrameController();

    this.messageUI = document.getElementById("message");
    
    this.renderPlayerTitle()
  }

  step(sequenceNumber) {
    if (sequenceNumber >= 0) {
      this.frameController.recordFrame(this.playground.getMatrix(), this.player, this.stepCount, this.size);
      if (this.playground.setValueInPlayground(this.player === 'x' ? true : false, sequenceNumber + 1)) {

        var { playground, player, stepCount } = this;
        this.playground.renderPlayground();
  
        if (this.checkWin(playground.getMatrix())) {
          return alert(message.innerText = "Победил игрок " + player)
        }
        this.stepCount++;
        this.changePlayer();
        stepCount === 9
          ? alert("Ничья")
          : this.renderPlayerTitle()
      }
    }
  }

  stepBack() {
    if (this.frameController.getcurrentFrame()) {
      var frame = this.frameController.popPreviousFrame();
      this.playground.field = frame.playground;
      this.player = frame.player;
      this.stepCount = frame.stepCount;
      this.setSize(frame.size);
      this.playground.renderPlayground();
      this.renderPlayerTitle()
    }
  }

  reset() {
    this.changePlayer();
    this.stepCount = 0;
    this.playground.setSize(this.size);
    this.frameController.dropFrameHistory();
    this.renderPlayerTitle()
  }

  saveGame() {

    localStorage.setItem('theSave', JSON.stringify({
      playground: this.playground.field,
      player: this.player,
      stepCount: this.stepCount,
      size: this.size
    }))
  }

  changePlayer() {
    this.player = this.player === "x" ? "o" : "x"
  }

  getCurrentPlayer() {
    return this.player
  }

  renderPlayerTitle() {
    this.messageUI.innerText = "Ходит игрок " + this.player.toUpperCase()
  }

  setSize(size) {
    this.size = size
  }

  getSize() {
    return this.size
  }

  checkWin(matrix) {
    const SIZE = this.size
    var flag = 1;
  
    /* right - left x */
    for (var i = 0; i < SIZE; i++) {
        var flag = 1;
      for (var j = 0; j < SIZE; j++) {
        if (matrix[i][j] !== true) {
          flag = 0;
          break;
        }
      }
      if (flag) return true
    }
    /* right - left o */
    for (var i = 0; i < SIZE; i++) {
        var flag = 1;
      for (var j = 0; j < SIZE; j++) {
        if (matrix[i][j] !== false) {
          flag = 0;
          break;
        }
      }
      if (flag) return true
    }
    /* up - down x */
    for (var i = 0; i < SIZE; i++) {
        var flag = 1;
      for (var j = 0; j < SIZE; j++) {
        if (matrix[j][i] !== true) {
          flag = 0;
          break;
        }
      }
      if (flag) return true
    }
    /* up - down o */
    for (var i = 0; i < SIZE; i++) {
        var flag = 1;
      for (var j = 0; j < SIZE; j++) {
        if (matrix[j][i] !== false) {
          flag = 0;
          break;
        }
      }
      if (flag) return true
    }
    /* main diagonal x */
    for (var i = 0; i < SIZE; i++) {
      flag = 1;
  
      if (matrix[i][i] !== true) {
          flag = 0;
          break;
      }
    }
    if (flag) return true;
    /* main diagonal o */
    for (var i = 0; i < SIZE; i++) {
      flag = 1;
  
      if (matrix[i][i] !== false) {
          flag = 0;
          break;
      }
    }
    if (flag) return true;
    /* side diagonal x */
    for (var i = SIZE - 1, j = 0; i >= 0; i--, j++) {
      flag = 1;
  
      if (matrix[j][i] !== true) {
          flag = 0;
          break;
      }
    }
    if (flag) return true;
    /* side diagonal o */
    for (var i = SIZE - 1, j = 0; i >= 0; i--, j++) {
      flag = 1;
  
      if (matrix[j][i] !== false) {
          flag = 0;
          break;
      }
    }
    if (flag) return true;
  
    return false
  }
}

class Playground {
  constructor(nodeUI, size) {
    this.size = size;
    this.nodeUI = nodeUI;
    this.field = new Array(size);
    this.renderPlayground = this.renderPlayground.bind(this);

    for (var i = 0; i < this.field.length; i++) {
      this.field[i] = new Array(size).fill(null)
    }
    this.fillUInode()
  }

  getMatrix() {
    return this.field
  }

  fillUInode() {
    let { nodeUI } = this;
    for (let i = 0; i < this.size ** 2; i++) {
      let cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.ceil = i + 1;
      nodeUI.appendChild(cell)
    }
  }

  cleanUInode() {
    while (this.nodeUI.children.length > 0) {
      this.nodeUI.removeChild(this.nodeUI.children[0])
    }
  }

  cleanPlayground() {
    var { renderPlayground, size } = this;

    this.field = new Array(size);
    for (var i = 0; i < this.field.length; i++) {
      this.field[i] = new Array(size).fill(null)
    }

    this.cleanUInode();
    this.fillUInode();

    renderPlayground(this.field)
  }

  renderPlayground() {
    const { nodeUI, size, field } = this;
    for (var i = 0; i < field.length; i++) {
      for (var j = 0; j < field[i].length; j++) {
        var straightIndex = size * i + j;
        if (field[i][j] === true) {
          nodeUI.children[straightIndex].innerHTML = "X";;
          nodeUI.children[straightIndex].classList.add("x");
        } else if (field[i][j] === false) {
          nodeUI.classList.add("o");
          nodeUI.children[straightIndex].innerHTML = "O"
        } else {
          nodeUI.classList.remove("o", "x");
          nodeUI.children[straightIndex].innerHTML = ""
        }
      }
    }
  }

  setValueInPlayground(value, num) {
    var row = null, column = null
    for (row = 0; row < this.size; row++) {
      if (num <= this.size) {
        column = num - 1
        break;
      } else {
        num -= this.size
      }
    }

    if (this.field[row][column] !== true && this.field[row][column] !== false) {
      this.field[row][column] = value;
    return true
    }
  }

  setSize(size) {
    this.size = size;
    this.cleanPlayground()
  }

  getSize() {
    return this.size
  }
}

class FrameController {
  constructor() {
    this.currentFrame = null
  }

  recordFrame(playground, player, stepCount, size) {
    var frame = {
      playground: _.cloneDeep(playground),
      player,
      stepCount: stepCount,
      previousFrame: this.currentFrame,
      size: size
    };
    this.currentFrame = frame
  }

  popPreviousFrame() {
    var { currentFrame }  = this;
    var result = currentFrame;
    this.currentFrame = currentFrame ? currentFrame.previousFrame : currentFrame;
  
    return result
  }
    
  getcurrentFrame() {
    return this.currentFrame
  }

  dropFrameHistory() {
    this.currentFrame = null
  }
}

const gameInstance = new TicTacToe(size, document.getElementById('area'))

document.getElementById("reset-game").addEventListener("click", function () {
  gameInstance.reset()
})

document.getElementById('area').addEventListener('click', e => {
  const { target, currentTarget } = e 
  var element = target.closest('div.cell')
  if (element) {
    let sequenceNumber = Array.prototype.indexOf.call(currentTarget.children, element)
    gameInstance.step(sequenceNumber)
  }
})

document.getElementById('back').addEventListener('click', () => {
  gameInstance.stepBack()
})

document.getElementById('size').addEventListener('change', e => {
  gameInstance.setSize(parseInt(e.target.value))

  gameInstance.reset()

  var area = document.getElementById('area')
  area.style.width = gameInstance.getSize() * area.children[0].offsetWidth + 'px'
})

window.addEventListener('unload', () => {
  gameInstance.saveGame()
})

var area = document.getElementById('area')
area.style.width = gameInstance.getSize() * area.children[0].offsetWidth + 'px'