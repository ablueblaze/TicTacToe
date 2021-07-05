const boardTools = (() => {
  // A game board that is mutable.
  // Note: May change this later.
  let gameBoard = {
    row1: [0,0,0],
    row2: [0,0,0],
    row3: [0,0,0]
  };

  const generateBoard = function(){
    const board = document.getElementById("board");
    let key = 1;
    let index = 0;
    for (let i = 0; i < 3; i++){
      let row = document.createElement("div")
      row.className = "row";
      board.appendChild(row)
      for (let n = 0; n < 3; n++){
        let cell = document.createElement("div");
        cell.dataset.key = `row${key}`;
        cell.dataset.index = index;
        cell.className = "cell";
        row.appendChild(cell);
        index++
      }
      key++;
      index = 0;
    }
  }
  return {generateBoard, gameBoard}
})();

const player = function(name, score){
  return{
    name,
    score
  }
}

let player1 = player("X", "0");
let player2 = player("O", "0");

const gameController = (() => {
  let playCount = 0;
  let gameOver = false;

  const scoreKeeper = function(player){
    let currentScore = document.querySelector(`#${player.name}`)
    console.log(currentScore)
    currentScore.value = player.score;
  }
  
  scoreKeeper(player2)
  scoreKeeper(player1)

  const activeBoard = () => {
    let currentBoard = [];
    let colum1 = [];
    let colum2 = [];
    let colum3 = [];
    let cross1 = [];
    let cross2 = [];
    let count = 0;

    for (let key of Object.keys(boardTools.gameBoard)){
      currentBoard.push(boardTools.gameBoard[key])
      colum1.push(boardTools.gameBoard[key][0])
      colum2.push(boardTools.gameBoard[key][1])
      colum3.push(boardTools.gameBoard[key][2])
      cross1.push(boardTools.gameBoard[key][0 + count])
      cross2.push(boardTools.gameBoard[key][2 - count])
      count++
      if (count == 3){
        currentBoard.push(colum1, colum2, colum3, cross1, cross2)
        return currentBoard;
      }
    }
  }
  
  const modal = document.querySelector('.modal-bg');
  const winner = document.querySelector('#winner');
  const winScreenOn = function(player) {
    winner.textContent = player.name;
    modal.classList.add('modal-active');
  }
  
  const findWinner = function(player){
    currentBoard = activeBoard();
    for (let i = 0; i < currentBoard.length; i++)
    if (
      currentBoard[i][0] == player.name &&
      currentBoard[i][1] == player.name &&
      currentBoard[i][2] == player.name ){
        winScreenOn(player)
        console.log(`${player.name} Wins!`);
        player.score++
        scoreKeeper(player)
        gameOver = true;
      } 
    }
    
    const gameUpdate = function(key, index){
      currentPlayCell = boardTools.gameBoard[key][index]
      const play = (player) => {
        boardTools.gameBoard[key][index] = player;
        cell = player;
    }
    if (currentPlayCell == 0){
      playCount++
      if (playCount % 2 != 0){
        play(player1.name);
        findWinner(player1);
        return player1.name;
      } else if (playCount % 2 == 0){
        play(player2.name);
        findWinner(player2);
        return player2.name;
      }
    } else {return currentPlayCell}
  }
  
  const playSelector = document.querySelector("#board");
  playSelector.addEventListener("click", (e) => {
    let target = e.target;
    if (gameOver == false){
      if(target.className == "cell"){
        let key = target.dataset.key;
        let index = parseFloat(target.dataset.index);
        target.textContent = gameUpdate(key, index);
      }
    }
  })
  
  const gameBoardReset = function() {
    const boardReset = 0;
    for (key of Object.keys(boardTools.gameBoard)){
      for (let i = 0; i < 3; i++){
        boardTools.gameBoard[key][i] = boardReset
    }
  }
}

const gamePageReset = function() {
  const cells = document.querySelectorAll('.cell');
  for (let i = 0; i < cells.length; i++){
    cells[i].textContent = ""
  }
}

const scoreReset = function() {
  player1.score = '0';
  player2.score = '0';
  scoreKeeper(player1)
    scoreKeeper(player2)
  }
  
  const gameReset = function() {
    gameBoardReset();
    gamePageReset();
    playCount = 0;
    gameOver = false;
  }
  
  const winScreenOff = function() {
    modal.classList.remove('modal-active');
    gameReset();
  }

  modal.addEventListener('click', winScreenOff)
  
  const gameButtons = document.querySelector(".buttons");
  gameButtons.addEventListener("click", (e) => {
    let target = e.target;
    if (target.id == "new-game"){
      gameReset();
    }
    if (target.id == "clear-score"){
      scoreReset();
    }
  })

  return {playCount, gameOver, findWinner, gameBoardReset, gamePageReset, winScreenOn, winScreenOff}
})();

const winScreenOff = function() {
  modal.classList.remove('modal-active');
}
boardTools.generateBoard();
