'use strict';

var SIZE = 3;
var sizeInput = document.getElementById('size');
var cells = document.getElementById('area');
var playground = getCleanPlayground(SIZE);
for (var i = 0; i < SIZE ** 2; i++) {
    var cell = document.createElement('div');
  cell.classList.add('cell');
  cell.dataset.ceil = i + 1;
  cells.appendChild(cell)
}

var ceil = document.getElementsByClassName("cell");
var reset = document.getElementById("reset-game");
var message = document.getElementById("message");
var player = "X";
var stepCount = 0;

var dataX = [];
var dataO = [];

cells.addEventListener('click', e => {
  const target = e.target;
var element = target.closest('div.cell');
  if (element) {
    currentStep.call(element)
  }
})


sizeInput.addEventListener('change', e => {
  SIZE = parseInt(e.target.value)

  while (cells.children.length > 0) {
    cells.removeChild(cells.children[0])
  }

  for (var i = 0; i < SIZE ** 2; i++) {
      var cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.ceil = i + 1;
    cells.appendChild(cell)
  }

  cells.style.width = SIZE * cells.children[0].offsetWidth + 'px';

  playground = getCleanPlayground(SIZE);
  dataO = [];
  dataX = [];
  stepCount = 0;
  message.innerText = "Ходит игрок " + player;
})

function currentStep() {
  var num = +this.getAttribute("data-ceil");
  if (!this.textContent) {
    this.innerText = player;
    if (player === "X") {
      dataX.push(num) && this.classList.add("x");
      setValueInPlayground(playground, SIZE, true, num)
    } else {
      dataO.push(num) && this.classList.add("o");
      setValueInPlayground(playground, SIZE, false, num)    
    }

    // if (
    //   (dataO.length > 2 || dataX.length > 2) &&
    //   (checkWin(dataO, num) || checkWin(dataX, num))
    // ) {
    if (checkWin(playground)) {
      return alert(message.innerText = "Победил игрок " + player);
    }
    changePlayer();
    stepCount++;
    stepCount === 9
      ? (message.innerText = "Ничья")
      : (message.innerText = "Ходит игрок " + player);
  }
}

const changePlayer = () => {
  player = player === "X" ? "O" : "X";
}

reset.addEventListener("click", function () {
  playground = getCleanPlayground(SIZE);
  for (var i = 0; i < ceil.length; i++) {
    ceil[i].innerText = "";
  }
  dataO = [];
  dataX = [];
  player = "O";
  stepCount = 0;
  message.innerText = "Ходит игрок " + player;
  for (var i = 0; i < ceil.length; i++) {
    ceil[i].classList.remove("x", "o");
  }
});

function checkWin(matrix) {
  // console.table(matrix)
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

function getCleanPlayground(size) {
    var playground = new Array(size);
  for (var i = 0; i < playground.length; i++) {
    playground[i] = new Array(size).fill(null)
  }
  return playground
}

function setValueInPlayground(matrix, matrixSize, value, num) {
    var row = null;
    var column = null;
  for (row = 0; row < matrixSize; row++) {
    if (num <= matrixSize) {
      column = num - 1;
      break;
    } else {
      num -= matrixSize
    }
  }
  matrix[row][column] = value
}

// function checkWin(arr, number) {
//   for (var w = 0, wLen = winCombinations.length; w < wLen; w++) {
//     var someWinArr = winCombinations[w],
//       count = 0;
//     if (someWinArr.indexOf(number) !== -1) {
//       for (var k = 0, kLen = someWinArr.length; k < kLen; k++) {
//         if (arr.indexOf(someWinArr[k]) !== -1) {
//           count++;
//           if (count === 3) {
//             return true;
//           }
//         }
//       }
//       count = 0;
//     }
//   }
// }
