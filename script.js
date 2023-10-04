const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [6, 4, 2],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];

// initialize game
function initGame() {
  currentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  //Empty the boxes on UI
  boxes.forEach((box, index) => {
    box.innerText = "";
    boxes[index].style.pointerEvents = "all";
    box.classList.remove("win"); //remove winning color
  });
  newGameBtn.classList.remove("active");
  gameInfo.innerHTML = `Current Player - ${currentPlayer}`;
}

initGame();

function swapTurn() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
  gameInfo.innerHTML = `Current Player - ${currentPlayer}`;
}

function checkWinner() {
  let winner = "";

  winningPositions.forEach((position) => {
    let pos1 = gameGrid[position[0]];
    let pos2 = gameGrid[position[1]];
    let pos3 = gameGrid[position[2]];

    // all 3 boxes should be non-empty and equal
    if (
      (pos1 !== "" || pos2 !== "" || pos3 !== "") &&
      pos1 === pos2 &&
      pos2 === pos3
    ) {
      // check who is winner
      if (pos1 === "X") {
        winner = "X";
      } else {
        winner = "O";
      }
      //disable pointer event
      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });

      //coloring the winning boxes
      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");
    }
  });
  //if there is a winner
  if (winner !== "") {
    gameInfo.innerHTML = `Winner - ${winner}`;
    newGameBtn.classList.add("active");
    return;
  }

    //if there is no winner
    let fillCount = 0;
    gameGrid.forEach((box) => {
      if (box !== "") {
        fillCount++;
      }
    });
    // if all boxes are filled
    if(fillCount === 9) {
      gameInfo.innerText = `Match Draw`;
      newGameBtn.classList.add("active");
    }
}

function handleClick(index) {
  if (gameGrid[index] === "") {
    gameGrid[index] = currentPlayer; //update in backend
    boxes[index].innerText = currentPlayer; //update on UI
    boxes[index].style.pointerEvents = "none";
    swapTurn(); //turning player
    checkWinner();
  }
}

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

newGameBtn.addEventListener("click", () => {
  initGame();
});
