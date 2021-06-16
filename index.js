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

  }

  return {gameBoardObject, }
})();

const winCondition = function(gameState){
  // All three of a single row are one player
  // All three rows with the same index as the same player
  // Index 0,1,2 in row1, row2, row3
  // Index 2,1,0 in row1, row2, row3
}

