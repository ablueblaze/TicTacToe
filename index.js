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
      for (let n = 0; n < 3; n++){
        const cell = document.createElement("span");
        cell.dataset.key = `row${key}`;
        cell.dataset.index = index;
        cell.className = "cell";
        board.appendChild(cell);
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
  
  const winner = function(player){
    // All three rows with the same index as the same player
    // Index 0,1,2 in row1, row2, row3
    // Index 2,1,0 in row1, row2, row3
    const activeBoardCheck = () => {
      let currentBoardList = [];
      let colum1 = [];
      let colum2 = [];
      let colum3 = [];
      let cross1 = [];
      let cross2 = [];
      let count = 0;
  
      for (let key of Object.keys(boardTools.gameBoard)){
        currentBoardList.push(boardTools.gameBoard[key])
        colum1.push(boardTools.gameBoard[key][0])
        colum2.push(boardTools.gameBoard[key][1])
        colum3.push(boardTools.gameBoard[key][2])
        cross1.push(boardTools.gameBoard[key][0 + count])
        cross2.push(boardTools.gameBoard[key][2 - count])
        count++
        if (count == 3){
          currentBoardList.push(colum1, colum2, colum3, cross1, cross2)
          for (let i = 0; i < currentBoardList.length; i++)
            if (
              currentBoardList[i][0] == player &&
              currentBoardList[i][1] == player &&
              currentBoardList[i][2] == player ){
              console.log(`${player} Wins!`)
            } 
          }
        }
  
      }
      activeBoardCheck();
    }
  

  const boardUpdate = function(key, index){
    currentPlay = boardTools.gameBoard[key][index]
    const play = (player) => {
      boardTools.gameBoard[key][index] = player;
      cell = player;
    }
    if (currentPlay == 0){
      playCount++
      if (playCount % 2 != 0){
        play(player1.name);
        winner(player1.name);
        return player1.name;
      } else {
        play(player2.name);
        winner(player2.name);
        return player2.name;
      }
    } else {return currentPlay}
  }

  const playSelector = document.querySelector("body");
  playSelector.addEventListener("click", (e) => {
      let target = e.target;
      if(target.className == "cell"){
        let key = target.dataset.key;
        let index = parseFloat(target.dataset.index);
        target.textContent = boardUpdate(key, index);
        winner();
      }
    }
  )
  return {winner}
})();

boardTools.generateBoard();
