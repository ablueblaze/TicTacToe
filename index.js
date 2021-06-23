const gameBoard = (() => {
  // Module for the game board
  let gameBoardObject = {
    row1: [0,1,2],
    row2: [0,1,1],
    row3: [0,1,1]
  };

  const boardReset = function() {};
  
  const gamePlay = function(){
    // This will change the gameBoardObject in line with the 
    // plays made on the page
  }

  const playSwitch = function(key, index){
    // This will be attached to each of the cells.
    // This will be the eventListener that will change the 
    //  visual on the board, and interact with the gamePlay function
    
    if (gameBoardObject[key][index] == 0){
      gameBoardObject[key][index] = 1;
    } else if (gameBoardObject[key][index] == 1) {
      gameBoardObject[key][index] = 0;
    }
  }

  const board = document.querySelector('#board').addEventListener('click', (e) => {
    // console.log(e)
    let target = e.target;

    if (target.className == 'cell'){
      console.log(target.textContent)

    }
    // playSwitch(key, gameBoardObject[key].indexOf(value));
    // cell.textContent = gameBoardObject[key][value];
    // console.table(gameBoardObject);
  })


  const generateBoard = function(){
    const board = document.getElementById("board")
    for (const key of Object.keys(gameBoardObject)){
      for (let i = 0; i < gameBoardObject[key].length; i++){
        console.log(`index: ${i}, value: ${gameBoardObject[key][i]}`)
        const cell = document.createElement('span');
        let text = document.createTextNode(gameBoardObject[key][i]);

        
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
}


// for (const key of Object.keys(gameBoardObject)){
//   const row = document.createElement("div");
//   row.className = "row";
  
//   for (let value of gameBoardObject[key]){
//     const cell = document.createElement("span");
//     let text = document.createTextNode(value);
//     cell.className = "cell";
//     cell.appendChild(text);
//     row.appendChild(cell);
//   }



document.querySelector('#btn')