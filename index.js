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
  
  const playerSwitch = function(){

  }

  const boardUpdate = function(key, index){
    playCount++

    const play = (player) => {
      boardTools.gameBoard[key][index] = player;
      cell = player;
    }
  
    if (playCount % 2 != 0){
      play(player1.name)
      return player1.name;
    } else {
      play(player2.name)
      return player2.name
    }
    
  }

  const playSelector = document.querySelector("body");
  playSelector.addEventListener(
    "click", (e) => {
      let target = e.target;
      // console.log(target);

      if(target.className == "cell"){
        let key = target.dataset.key;
        let index = parseFloat(target.dataset.index);
        console.log(target.textContent);

        target.textContent = boardUpdate(key, index);
        // console.log(target)
      }
    }
  )
  return {}
})();

boardTools.generateBoard();
