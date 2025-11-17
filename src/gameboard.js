import { Ship } from './ship';

export class Gameboard {
  constructor() {
    this.grid = this.createGrid();
  }

  createGrid() {
    let grid = [];
    const rows = 10;
    const cols = 10;

    for (let i = 0; i < rows; i++) {
      grid[i] = [];
      for (let j = 0; j < cols; j++) {
        grid[i][j] = '';
      }
    }

    return grid;
  }

  placeShip(x, y, length, direction) {
    if (this.grid[x][y] instanceof Ship) {
      throw new Error('Cell is already occupied');
    }

    const ship = new Ship(length);
    this.grid[x][y] = ship;
  }
}
