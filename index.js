const gameBoard = (() => {
  // Module for the game board
  // let gameBoardObject = {
    //   row1: [0,0,0],
    //   row2: [0,0,0],
    //   row3: [0,0,0]
    // };
    
    const gameBoardObject = {
      gameBoard: [
        1,2,3,
        4,5,6,
        7,8,9
      ]
    }

    
    const boardReset = function() {
      // Will run when the game is done and New Game is press.
      // Resetting everything without refreshing the page.
    };
    
    const player = function(name){
      return {
        name,
        score,
        plays
      }
    }
    
    const player1 = player("X");
    const player2 = player("O");

    const gamePlay = function(player){
      let playCount = 0;
      // This will determine who is playing and assign there 
      // token accordingly.
  }


  
  const board = document.querySelector('#board').addEventListener(
    'click', (e) => {
      // Capture event that will change the status of the object, 
      // and change the board visual.
      let target = e.target;
      
      if (target.className == 'cell'){
        // Update the board on screen and in the object.
        // Counter in place to keep from multi plays.
        target.dataset.count = 1
        target.textContent = "X";
      }
    })

    const generateBoard = function(){
      // Generate the game board, and assign key and index to each cell.
    const board = document.getElementById("board")
    for (const key of Object.keys(gameBoardObject)){
      for (let i = 0; i < gameBoardObject[key].length; i++){
        const cell = document.createElement('span');
        let value = gameBoardObject[key][i];
        let text = document.createTextNode("");
        
        cell.dataset.value = value;
        cell.dataset.count = 0;
        cell.className = "cell";
        cell.appendChild(text);
        board.appendChild(cell);
      }
    }
  }
  
  return {gameBoardObject, generateBoard, board}
})();

gameBoard.generateBoard();

const winCondition = function(gameState){
  // All three of a single row are one player
  // All three rows with the same index as the same player
  // Index 0,1,2 in row1, row2, row3
  // Index 2,1,0 in row1, row2, row3

  // todo!!!
  // Try both ways to build a win condition.
  // The ones listed above, and an array of win conditions.
  const winList = [
    "123",
    "456",
    "789",
    "147",
    "258",
    "369",
    "159",
    "753"
  ]
}



// const playSwitch = function(key, index, playCount){
//   // Checks board state, 
//   // and changes the value inside the gameBoardObject.
//   if (playCount == 0){
//     if (gameBoardObject[key][index] == 0){
//       gameBoardObject[key][index] = "x";
//     } else if (gameBoardObject[key][index] == 1) {
//       gameBoardObject[key][index] = "x";
//     }
//   }
// }