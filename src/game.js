import { Player } from './player';
import {
  placeShipsBtn,
  playerAttackListener,
  renderComputerPlayerGameboard,
  renderRealPlayerGameboard,
  startGameBtn,
  renderStateMessage,
  renderTurnMessage,
  renderErrorMessage,
  renderWonMessage,
} from './ui';

export class Game {
  constructor() {
    this.realPlayer = new Player('real');
    this.computerPlayer = new Player('computer');
    this.turn = null; // player, computer
    this.state = null; // init, pre, in, post
    this.error = null;
    this.winner = null;
  }

  init() {
    renderRealPlayerGameboard(this.realPlayer);
    renderComputerPlayerGameboard(this.computerPlayer);
    this.placeShips();
    this.startGame();
    this.realPlayerAttack();

    this.state = 'init';
    this.stateMessage();
  }

  placeShips() {
    placeShipsBtn(() => {
      if (this.state === 'in') {
        return this.showError('IN_BATTLE_SHIPS');
      }

      this.realPlayer.gameboard.placeShipsRandomly();
      this.computerPlayer.gameboard.placeShipsRandomly();
      renderRealPlayerGameboard(this.realPlayer);
      renderComputerPlayerGameboard(this.computerPlayer);
      this.state = 'pre';
      this.stateMessage();
    });
  }

  startGame() {
    startGameBtn(() => {
      if (this.state === 'in') {
        return this.showError('IN_BATTLE_START');
      }

      if (this.state === 'init') {
        return this.showError('NO_SHIPS_START');
      }

      this.state = 'in';
      this.turn = 'player';
      this.stateMessage();

      setTimeout(() => this.turnMessage(), 750);
    });
  }

  realPlayerAttack() {
    playerAttackListener((x, y) => {
      if (this.state !== 'in') {
        return this.showError('NO_BATTLE_ATTACK');
      }

      if (this.turn !== 'player') {
        return this.showError('NO_TURN_ATTACK');
      }

      const result = this.computerPlayer.gameboard.receiveAttack(x, y);

      if (result.error === 'ALREADY_ATTACKED_COORDINATE') {
        return this.showError('NO_TWICE_ATTACK');
      }

      renderComputerPlayerGameboard(this.computerPlayer);
      const isWon = this.gameOver();
      if (isWon) {
        setTimeout(() => this.resetGame(), 2000);
        return;
      }
      this.switchTurn();
    });
  }

  switchTurn() {
    if (this.state !== 'in') return;

    if (this.turn === 'player') {
      this.turn = 'computer';
      this.turnMessage();
      setTimeout(() => this.computerPlayerAttack(), 1000);
    } else {
      this.turn = 'player';
      this.turnMessage();
    }
  }

  computerPlayerAttack() {
    let x, y, result;

    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
      result = this.realPlayer.gameboard.receiveAttack(x, y);
    } while (result.ok !== true);

    renderRealPlayerGameboard(this.realPlayer);
    const isWon = this.gameOver();
    if (isWon) {
      setTimeout(() => this.resetGame(), 2000);
      return;
    }
    this.switchTurn();
  }

  gameOver() {
    let isDefeated;

    if (this.turn === 'player') {
      if ((isDefeated = this.computerPlayer.gameboard.areAllShipsSunk())) {
        this.state = 'post';
        this.stateMessage();
        this.winner = 'player';
        setTimeout(() => this.wonMessage(), 1000);
        return true;
      }
    } else {
      if ((isDefeated = this.realPlayer.gameboard.areAllShipsSunk())) {
        this.state = 'post';
        this.stateMessage();
        this.winner = 'computer';
        setTimeout(() => this.wonMessage(), 1000);
        return true;
      }
    }
  }

  resetGame() {
    this.realPlayer = new Player('real');
    this.computerPlayer = new Player('computer');

    this.turn = null;
    this.state = 'init';
    this.error = null;
    this.winner = null;

    renderRealPlayerGameboard(this.realPlayer);
    renderComputerPlayerGameboard(this.computerPlayer);

    this.stateMessage();

    this.realPlayerAttack();
  }

  stateMessage() {
    renderStateMessage(this.state);
  }

  turnMessage() {
    renderTurnMessage(this.turn);
  }

  showError(errorCode) {
    this.error = errorCode;
    this.errorMessage();
    setTimeout(() => {
      this.error = null;
      this.errorMessage();
    }, 1250);
  }

  errorMessage() {
    renderErrorMessage(this.error);
  }

  wonMessage() {
    renderWonMessage(this.winner);
  }

  realPlayerGameStatics() {
    renderRealPlayerStatics(this.realPlayer.gameboard);
  }

  computerPlayerGameStatics() {
    renderComputerPlayerStatics(this.computerPlayer.gameboard);
  }
}
