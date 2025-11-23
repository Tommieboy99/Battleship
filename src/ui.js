export function renderGameBoard(gameboard, container, playerType) {
  container.replaceChildren();

  for (let row = 0; row < gameboard.board.length; row++) {
    for (let col = 0; col < gameboard.board[0].length; col++) {
      const boardCell = document.createElement('div');
      boardCell.classList.add('boardCell');
      const x = row;
      const y = col;

      if (playerType !== 'computer' && gameboard.hasShipAt(row, col)) {
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

export function renderGameBoards(player, computer) {
  const playerBoard = document.querySelector('.playerBoard');
  const computerBoard = document.querySelector('.computerBoard');

  renderGameBoard(player.gameboard, playerBoard, player.type);
  renderGameBoard(computer.gameboard, computerBoard, computer.type);
}

export function placeShipsBtn(onClick) {
  const btn = document.querySelector('.placeShipsBtn');
  btn.addEventListener('click', onClick);
}

export function renderGameMessage(gameState) {
  const p = document.querySelector('.gameMessage');

  switch (gameState) {
    case 'placing':
      p.textContent = 'Place your ships';
      break;

    case 'placed':
      p.textContent = 'Start the battle';
      break;
  }
}
