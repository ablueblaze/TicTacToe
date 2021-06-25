const boardTools = (() => {
  // A game board that is mutable.
  // Note: May change this later.
  let gameBoard = {
    row1: [,,],
    row2: [,,],
    row3: [,,]
  };

  const generateBoard = function(){
    const board = document.getElementById("board");
    let key = 1;
    let index = 0;
    for (let i = 0; i < 3; i++){
      for (let n = 0; n < 3; n++){
        const cell = document.createElement("span");
        cell.dataset.key = key;
        cell.dataset.index = index;
        cell.className = "cell";
        board.appendChild(cell);
        index++
      }
      key++;
      value = 0;
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
  const playerSwitch = function(){

  }

  const boardUpdate = function(board, key, index, player){

    
  }

  const playSelector = document.querySelector("body");
  playSelector.addEventListener(
    "click", (e) => {
      let target = e.target;
      // console.log(target);

      if(target.className == "cell"){
        let key = target.dataset.key;
        let index = target.dataset.index;

        console.log(target)
      }
    }
  )
  return {}
})();

boardTools.generateBoard();
