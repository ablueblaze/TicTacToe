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

let player1 = player("X", 0);
let player2 = player("O", 0);

const gameController = (() => {
  let playCount = 0;
  let gameOver = false;
  
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
  
  const findWinner = function(player){
    currentBoard = activeBoard();
    for (let i = 0; i < currentBoard.length; i++)
      if (
        currentBoard[i][0] == player &&
        currentBoard[i][1] == player &&
        currentBoard[i][2] == player ){
        console.log(`${player} Wins!`);
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
        findWinner(player1.name);
        return player1.name;
      } else if (playCount % 2 == 0){
        play(player2.name);
        findWinner(player2.name);
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
    
  const gameButtons = document.querySelector(".buttons");
  gameButtons.addEventListener("click", (e) => {
    let target = e.target;
    if (target.id == "new-game"){
      gameBoardReset();
      gamePageReset();
      playCount = 0;
      gameOver = false;

    }
    if (target.id == "clear-score"){
      console.log("clear score")
    }
  })

  return {findWinner, gameBoardReset, gamePageReset, playCount}
})();

boardTools.generateBoard();
