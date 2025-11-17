import { Gameboard } from './gameboard';

class Player {
  constructor(type = 'real') {
    this.type = type;
    this.board = new Gameboard();
  }
}
