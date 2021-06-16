const gameBoard = (() => {
  // Module for the game board
  let gameBoardObject = {
    row1: [0,0,0],
    row2: [0,0,0],
    row3: [0,0,0]
  };

  const gamePlay = function(){
    // This will change the gameBoardObject in line with the plays made on the page
  }

  const playSwitch = function(){
    // This will be attached to each of the cells.
    // This will be the eventListener that will change the visual on the board, and interact with the gamePlay function
  }

  const generateBoard = function(){
    const board = document.getElementById("board")

    for (const key of Object.keys(gameBoardObject)){
      const row = document.createElement("div");
      row.className = "row";
      
      for (let values of gameBoardObject[key]){
        const cell = document.createElement("span");
        let text = document.createTextNode(values);
        cell.className = "cell";
        cell.appendChild(text);
        row.appendChild(cell);
      }
      board.appendChild(row);
    }
  }

  return {gameBoardObject, generateBoard}
})();

gameBoard.generateBoard();

const winCondition = function(gameState){
  // All three of a single row are one player
  // All three rows with the same index as the same player
  // Index 0,1,2 in row1, row2, row3
  // Index 2,1,0 in row1, row2, row3
}

