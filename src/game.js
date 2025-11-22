import { Player } from './player';
import { renderGameBoard } from './ui';
//Set up a new game by creating Players. For now just populate each player’s Gameboard with predetermined coordinates.
// You are going to implement a system for allowing players to place their ships later.

export class Game {
  constructor() {
    this.player = new Player('real');
    this.computer = new Player('computer');
  }

  renderGameBoards() {
    renderGameBoard(this.player.gameboard, document.querySelector('.playerBoard'));
    renderGameBoard(this.computer.gameboard, document.querySelector('.computerBoard'));
  }

  placeShips() {
    this.player.gameboard.placeShipsRandomly();
    this.computer.gameboard.placeShipsRandomly();
  }
}
