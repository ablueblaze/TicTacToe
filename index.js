const gameBoard = (() => {
  // Module for the game board
  let gameBoardObject = {
    row1: [0,0,0],
    row2: [0,0,0],
    row3: [0,0,0]
  };

  const generateBoard = function(){
    const cell = document.createElement("span");
    const row = document.createElement("div");
    
    cell.className = "cell";
    row.className = "row";

    const board = document.getElementById("board")

    for (let i in gameBoardObject){
      board.appendChild(row);
    }

  }

  return {gameBoardObject, generateBoard}
})();

// gameBoard.generateBoard();

const test = {
  first: [1,2,3],
  second: [4,5,6],
  third: [7,8,9]
}

for (const key of Object.keys(test)){
  const board = document.getElementById('board');
  const div = document.createElement('div');
  for (let values of test[key]){
    const span = document.createElement('span');
    let text = document.createTextNode(values);
    span.appendChild(text);
    div.appendChild(span);
  }
  board.appendChild(div);
}

const winCondition = function(gameState){
  // All three of a single row are one player
  // All three rows with the same index as the same player
  // Index 0,1,2 in row1, row2, row3
  // Index 2,1,0 in row1, row2, row3
}

