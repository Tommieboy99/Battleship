import { Ship } from './ship';

export function renderGameBoard(gameboard, container) {
  container.replaceChildren();

  for (let row = 0; row < gameboard.board.length; row++) {
    for (let col = 0; col < gameboard.board[0].length; col++) {
      const boardCell = document.createElement('div');
      boardCell.classList.add('boardCell');
      const x = row;
      const y = col;

      if (gameboard.board[row][col] instanceof Ship) {
        boardCell.classList.add('ship');
      }

      if (gameboard.missedShots.some(([row, col]) => row === x && col === y)) {
        boardCell.classList.add('missed');
      }

      if (gameboard.hitShots.some(([row, col]) => row === x && col === y)) {
        boardCell.classList.add('hit');
      }

      container.appendChild(boardCell);
    }
  }
}
