const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const WINNING_COMBINATIONS = [
  [0, 1, 2, 3],
  [4, 5, 6, 7],
  [8, 9, 10, 11],
  [12, 13, 14, 15],

  [0, 4, 8, 12],
  [1, 5, , 9, 13],
  [2, 6, 10, 14],
  [3, 7, 11, 15],

  [0, 5, 10, 15],
  [3, 6, 9, 12],
];
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winningMessageElement = document.getElementById("winningMessage");
const restartButton = document.getElementById("restartButton");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);
let circleTurn;

startGame();

restartButton.addEventListener("click", startGame);

function startGame() {
  circleTurn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
  winningMessageElement.classList.remove("show");
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = "Draw!";
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
  }
  winningMessageElement.classList.add("show");
  
  document.getElementById("1").innerHTML = "1";
  document.getElementById("2").innerHTML = "2";
  document.getElementById("3").innerHTML = "3";
  document.getElementById("4").innerHTML = "4";
  document.getElementById("5").innerHTML = "5";
  document.getElementById("6").innerHTML = "6";
  document.getElementById("7").innerHTML = "7";
  document.getElementById("8").innerHTML = "8";
  document.getElementById("9").innerHTML = "9";
  document.getElementById("10").innerHTML = "10";
  document.getElementById("11").innerHTML = "11";
  document.getElementById("12").innerHTML = "12";
  document.getElementById("13").innerHTML = "13";
  document.getElementById("14").innerHTML = "14";
  document.getElementById("15").innerHTML = "15";
  document.getElementById("16").innerHTML = "16";
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}

function placeMark(cellq, currentClass) {
  cellq.classList.add(currentClass);

  document.getElementById("1").innerHTML = " ";
  document.getElementById("2").innerHTML = " ";
  document.getElementById("3").innerHTML = " ";
  document.getElementById("4").innerHTML = " ";
  document.getElementById("5").innerHTML = " ";
  document.getElementById("6").innerHTML = " ";
  document.getElementById("7").innerHTML = " ";
  document.getElementById("8").innerHTML = " ";
  document.getElementById("9").innerHTML = " ";
  document.getElementById("10").innerHTML = " ";
  document.getElementById("11").innerHTML = " ";
  document.getElementById("12").innerHTML = " ";
  document.getElementById("13").innerHTML = " ";
  document.getElementById("14").innerHTML = " ";
  document.getElementById("15").innerHTML = " ";
  document.getElementById("16").innerHTML = " ";
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
