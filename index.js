// A player class that will hold the players marker, and all the plays that they have made
class Player {
  constructor(marker, plays, score = 0) {
    this.marker = marker;
    this.plays = plays;
    this.score = score;
  }
  addPlay(play) {
    this.plays.push(play);
  }
  clearPlays() {
    this.plays = [];
  }
  clearScore() {
    this.score = 0;
  }
  scoreUp() {
    this.score++;
  }
}

let player1 = new Player("X", []);
let player2 = new Player("O", []);

// All things that manipulate the game go here
const gameController = (() => {
  // Mark a cell with the players indicator
  function isOpen(cell) {
    if (cell.textContent === "") {
      return true;
    }
    return false;
  }

  // Marks the indicated cell with given marker
  function markPlay(cellDataValue, playerMarker) {
    document.querySelector(`[data-cell-value="${cellDataValue}"]`).textContent =
      playerMarker;
  }

  // returns true if player has a winning hand
  function didIWin(currentPlayer) {
    const winingHands = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7],
    ];
    let count = 0;
    for (let i of winingHands) {
      for (let n of i) {
        if (currentPlayer.plays.includes(n)) {
          count++;
        }
      }
      if (count === 3) {
        return true;
      }
      count = 0;
    }
    return false;
  }

  // Display the Winner modal
  function setWinner(winningPlayerMarker) {
    const winner = document.querySelector(".winner");
    winner.textContent = `Winner: ${winningPlayerMarker}`;
  }

  // Update score board
  function updateScoreBoard(player1Score, player2Score) {
    const p1Score = document.querySelector("#player-one-score");
    const p2Score = document.querySelector("#player-two-score");
    p1Score.textContent = player1Score;
    p2Score.textContent = player2Score;
  }

  // Start new game, setting players as different marker values based on previous
  function clearBoard() {
    const allCells = document.querySelectorAll(".cell");
    for (i of allCells) {
      i.textContent = "";
    }
  }

  function checkEndGame(currentPlayer, player1, player2) {
    if (didIWin(currentPlayer)) {
      setWinner(currentPlayer.marker);
      currentPlayer.scoreUp();
      updateScoreBoard(player1.score, player2.score);
      utilities.toggleModal();
    }
    return;
  }

  function resetGame(player1, player2) {
    clearBoard();
    player1.clearPlays();
    player2.clearPlays();
  }

  function makePlay(player, cell, player1, player2) {
    const cellNumber = cell.dataset.cellValue;
    utilities.showCurrentPLayer(player1.marker, player2.marker);
    if (isOpen(cell)) {
      markPlay(cellNumber, player.marker);
      player.addPlay(parseFloat(cellNumber));
      checkEndGame(player, player1, player2);
    }
  }

  return {
    makePlay,
    checkEndGame,
    resetGame,
    clearBoard,
    updateScoreBoard
  };
})();

const utilities = (() => {
  // Toggle between the given players
  let playCounter = 1;
  function togglePlayer(player1, player2) {
    playCounter++;
    if (playCounter % 2 == 0) {
      return player1;
    } else {
      return player2;
    }
  }

  function toggleModal() {
    const modal = document.querySelector(".modal");
    if (modal.className === "modal active") {
      modal.classList.remove("active");
    } else if (modal.className === "modal") {
      modal.classList.add("active");
    }
  }

  function showCurrentPLayer(player1Marker, player2Marker) {
    const playerSpan = document.querySelector("#current-player");
    if (playCounter % 2 == 0) {
      playerSpan.textContent = player2Marker;
    } else {
      playerSpan.textContent = player1Marker;
    }
  }

  function resetCounter(){
    playCounter = 1;
  }

  return { toggleModal, togglePlayer, resetCounter, showCurrentPLayer };
})();

const buttons = (() => {
  //Resets All values back to default
  function newGame(player1, player2) {
    clearScore(player1, player2);
    gameController.clearBoard();
    utilities.resetCounter();
    utilities.showCurrentPLayer(player1.marker, player2.marker)
  }

  function clearScore(player1, player2) {
    player1.clearScore()
    player1.clearPlays()
    player2.clearScore()
    player2.clearPlays()
    gameController.updateScoreBoard(player1.score, player2.score)
  }

  function playerVsPlayer() {}

  function playerVsAi() {}

  return { newGame, clearScore, playerVsPlayer, playerVsAi }
})();

document.addEventListener("click", (e) => {
  let target = e.target;
  if (target.className === "modal active") {
    utilities.toggleModal();
    gameController.resetGame(player1, player2);
  }
  if (target.dataset.cellValue) {
    gameController.makePlay(
      utilities.togglePlayer(player1, player2),
      target,
      player1,
      player2
    );
  }
  if (target.id === "new-game") {
    buttons.newGame(player1, player2)
  }
  if (target.id === "clear-score") {
    buttons.clearScore(player1, player2)
  }
});
