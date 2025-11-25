function renderGameboard(player, container) {
  container.replaceChildren();

  for (let x = 0; x < player.gameboard.board.length; x++) {
    for (let y = 0; y < player.gameboard.board[x].length; y++) {
      const div = document.createElement('div');
      div.classList.add('cell');
      div.dataset.x = x;
      div.dataset.y = y;

      if (player.type === 'real' && player.gameboard.hasShipAt(x, y)) {
        div.classList.add('ship');
      }

      if (player.gameboard.missedShots.some(([cx, cy]) => cx === x && cy === y)) {
        div.classList.add('miss');
      }

      if (player.gameboard.hitShots.some(([cx, cy]) => cx === x && cy === y)) {
        div.classList.add('hit');
      }

      container.appendChild(div);
    }
  }
}

export function renderComputerPlayerGameboard(computerPlayer) {
  const computerPlayerBoardContainer = document.querySelector('.computerBoard');
  renderGameboard(computerPlayer, computerPlayerBoardContainer);
}

export function renderRealPlayerGameboard(realPlayer) {
  const realPlayerBoardContainer = document.querySelector('.playerBoard');
  renderGameboard(realPlayer, realPlayerBoardContainer);
}

export function placeShipsBtn(onClick) {
  const btn = document.querySelector('.placeShipsBtn');
  btn.addEventListener('click', onClick);
}

export function startGameBtn(onClick) {
  const btn = document.querySelector('.startGameBtn');
  btn.addEventListener('click', onClick);
}

export function playerAttackListener(onClick) {
  const computerPlayerBoardContainer = document.querySelector('.computerBoard');

  computerPlayerBoardContainer.addEventListener('click', (e) => {
    const cell = e.target.closest('.cell');

    if (!cell) return;

    const x = Number(cell.dataset.x);
    const y = Number(cell.dataset.y);

    onClick(x, y);
  });
}

export function renderStateMessage(state) {
  const p = document.querySelector('.game');
  switch (state) {
    case 'init':
      p.textContent = 'Prepare for battle: place ships';
      break;
    case 'pre':
      p.textContent = 'Enter the battlefield: start game';
      break;
    case 'in':
      p.textContent = 'Battle started: goodluck!';
      break;
    case 'post':
      p.textContent = 'Battle finished';
      break;
  }
}

export function renderTurnMessage(turn) {
  const p = document.querySelector('.game');
  switch (turn) {
    case 'player':
      p.textContent = 'Your turn: fire at will!';
      break;

    case 'computer':
      p.textContent = "Computer's turn...";
      break;
  }
}

export function renderErrorMessage(error) {
  const p = document.querySelector('.error');
  switch (error) {
    case 'IN_BATTLE_SHIPS':
      p.textContent = 'In battle: replacing ships not allowed.';
      break;
    case 'IN_BATTLE_START':
      p.textContent = "In battle: can't start game.";
      break;
    case 'NO_SHIPS_START':
      p.textContent = "No ships: can't start game without ships ";
      break;
    case 'NO_BATTLE_ATTACK':
      p.textContent = "No attack: game hasn't started";
      break;
    case 'NO_TURN_ATTACK':
      p.textContent = 'No attack: its not your turn';
      break;
    case 'NO_TWICE_ATTACK':
      p.textContent = 'No attack: already attacked coordinate';
      break;
    default:
      p.textContent = '';
  }
}

export function renderWonMessage(winner) {
  const p = document.querySelector('.game');
  if (winner === 'player') {
    p.textContent = 'You won';
  } else {
    p.textContent = 'Computer won';
  }
}

export function renderComputerPlayerStatics() {}

export function renderRealPlayerStatics() {}
