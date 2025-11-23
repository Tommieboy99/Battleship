import { Player } from './player';
import { placeShipsBtn, renderGameBoards, renderGameMessage } from './ui';

export class Game {
  constructor() {
    this.player = new Player('real');
    this.computer = new Player('computer');
    this.turn = null;
    this.state = null; // 'placing, placed, battling, finshed'
  }

  init() {
    this.state = 'placing';
    this.gameMessage();

    this.updateGameBoards();
    this.enablePlaceShips();
  }

  updateGameBoards() {
    renderGameBoards(this.player, this.computer);
  }

  enablePlaceShips() {
    placeShipsBtn(() => {
      this.placeShipsRandomly();
    });
  }

  gameMessage() {
    renderGameMessage(this.state);
  }

  placeShipsRandomly() {
    this.player.gameboard.placeShipsRandomly();
    this.computer.gameboard.placeShipsRandomly();

    this.state = 'placed';
    this.updateGameBoards();
    this.gameMessage();
  }
}

//Your event listeners should step through the game turn by turn using only methods from other objects.
//If at any point you are tempted to write a new function, step back and figure out which class or module that function should belong to.
//For attacks, let the user click on a coordinate in the enemy Gameboard. Send the user input to methods on your objects,
//and re-render the boards to display the new information. Players should take turns playing the game by attacking the enemy Gameboard.
//If you feel the need to keep track of the current player’s turn, it’s appropriate to manage that in this module, instead of another mentioned object.
//The game is played against the computer, so make the ‘computer’ players capable of making random plays. The computer does not have to be smart,
//but it should know whether or not a given move is legal (i.e. it shouldn’t shoot the same coordinate twice).
// Create conditions so that the game ends once one player’s ships have all been sunk. This function is also appropriate for this module.
