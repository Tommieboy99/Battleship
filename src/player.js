import { Gameboard } from './gameboard';

export class Player {
  constructor(type = 'real') {
    this.type = type;
    this.gameboard = new Gameboard();
  }
}
