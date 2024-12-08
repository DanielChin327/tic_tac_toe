const cells = document.querySelectorAll('[data-cell]');
const winnerMessage = document.getElementById('winnerMessage');
const winnerText = document.getElementById('winner');
const restartButton = document.getElementById('restartButton');

let currentPlayer = 'X';
let board = Array(9).fill(null);

// Winning combinations
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

cells.forEach((cell, index) => {
  cell.addEventListener('click', () => handleCellClick(cell, index));
});

restartButton.addEventListener('click', restartGame);

function handleCellClick(cell, index) {
  if (board[index] !== null) return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add('taken');

  if (checkWin(currentPlayer)) {
    endGame(false);
  } else if (board.every(cell => cell !== null)) {
    endGame(true);
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function checkWin(player) {
  return winningCombos.some(combo =>
    combo.every(index => board[index] === player)
  );
}

function endGame(draw) {
  if (draw) {
    winnerText.textContent = 'It\'s a Draw!';
  } else {
    winnerText.textContent = `${currentPlayer} Wins!`;
  }
  winnerMessage.classList.remove('hidden');
}

function restartGame() {
  board.fill(null);
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken');
  });
  currentPlayer = 'X';
  winnerMessage.classList.add('hidden');
}