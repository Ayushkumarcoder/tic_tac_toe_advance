document.addEventListener('DOMContentLoaded', () => {
    const cells = Array.from(document.querySelectorAll('.cell'));
    const restartButton = document.getElementById('restart');
    const background = document.getElementById('background');
    const dangerSign = document.createElement('img');
    const winnerAnimation = document.createElement('div');
    let currentPlayer = 'X';
    let gameEnd = false;
    let gameMode;
  
    // Add click event listener to each cell
    cells.forEach(cell => {
      cell.addEventListener('click', handleClick, { once: true });
    });
  
    // Restart the game
    restartButton.addEventListener('click', restart);
  
    // Prompt user to choose the game mode
    function chooseGameMode() {
      gameMode = prompt("Choose the game mode:\n1. Player vs Player\n2. Player vs Computer");
      if (gameMode !== '1' && gameMode !== '2') {
        alert("Invalid game mode selection. Please try again.");
        chooseGameMode();
      } else {
        if (gameMode === '2') {
          // Player vs Computer mode, computer makes the first move
          makeComputerMove();
        }
      }
    }
  
    chooseGameMode();
  
    // Handle cell click event
    function handleClick(e) {
      const cell = e.target;
      if (cell.textContent !== '' || gameEnd) return;
  
      // Update cell with current player's symbol
      cell.textContent = currentPlayer;
  
      // Check if the current player wins
      if (checkWin(currentPlayer)) {
        endGame(`${currentPlayer} wins!`);
      } else if (checkDraw()) { // Check for a draw
        endGame("It's a draw!");
      } else {
        // Switch to the other player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  
        if (gameMode === '2') {
          // If in Player vs Computer mode, make the computer move
          makeComputerMove();
        }
      }
    }
  
    // Make a move for the computer player
    function makeComputerMove() {
      // Delay the computer's move by 500ms for a more natural gameplay
      setTimeout(() => {
        const availableCells = cells.filter(cell => cell.textContent === '');
        if (availableCells.length > 0) {
          const randomIndex = Math.floor(Math.random() * availableCells.length);
          const cell = availableCells[randomIndex];
          cell.textContent = currentPlayer;
  
          // Check if the current player wins
          if (checkWin(currentPlayer)) {
            endGame(`${currentPlayer} wins!`);
          } else if (checkDraw()) { // Check for a draw
            endGame("It's a draw!");
          } else {
            // Switch to the other player
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
          }
        }
      }, 500);
    }
  
    // Check if the current player wins
    function checkWin(player) {
      const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];
  
      return winningCombinations.some(combination => {
        return combination.every(index => cells[index].textContent === player);
      });
    }
  
    // Check for a draw
    function checkDraw() {
      return cells.every(cell => cell.textContent !== '');
    }
  
    // End the game
    function endGame(message) {
      gameEnd = true;
  
      if (message.includes('wins')) {
        const winner = message.charAt(0);
        showWinnerAnimation(winner);
      } else {
        showDangerSign();
      }
  
      setTimeout(() => {
        alert(message);
        restart();
      }, 3000);
    }
  
    // Show danger sign
    function showDangerSign() {
      dangerSign.src = 'icons8-skull-64.png';
      dangerSign.id = 'danger-sign';
      background.appendChild(dangerSign);
    }
  
    // Show winning animation
    function showWinnerAnimation(winner) {
      winnerAnimation.innerHTML = `
        <img src="animated-winner.gif" alt="Winner" width="200" height="200">
        <h2>${winner} wins!</h2>
      `;
      winnerAnimation.id = 'winner-animation';
      background.appendChild(winnerAnimation);
    }
  
    // Restart the game
    function restart() {
      cells.forEach(cell => {
        cell.textContent = '';
      });
  
      currentPlayer = 'X';
      gameEnd = false;
  
      background.removeChild(dangerSign);
      background.removeChild(winnerAnimation);
  
      chooseGameMode();
    }
  });
  