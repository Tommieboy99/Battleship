import { Ship } from './ship';

export class Gameboard {
  constructor() {
    this.board = this.createBoard();
    this.missedShots = [];
    this.hitShots = [];
    this.ships = [];
  }

  createBoard() {
    return Array.from({ length: 10 }, () =>
      Array.from({ length: 10 }, () => '')
    );
  }

  placeShip(x, y, length, direction) {
    const ship = new Ship(length);

    switch (direction) {
      case 'left':
        for (let col = y; col > y - length; col--) {
          if (col < 0) throw new Error('Ship placement out of bounds');

          if (this.grid[x][col] instanceof Ship) {
            throw new Error('Cell is already occupied');
          }
        }

        for (let col = y; col > y - length; col--) {
          this.grid[x][col] = ship;
        }

        this.ships.push(ship);

        break;

      case 'right':
        for (let col = y; col < y + length; col++) {
          if (col > 9) throw new Error('Ship placement out of bounds');

          if (this.grid[x][col] instanceof Ship) {
            throw new Error('Cell is already occupied');
          }
        }

        for (let col = y; col < y + length; col++) {
          this.grid[x][col] = ship;
        }

        this.ships.push(ship);

        break;

      case 'up':
        for (let row = x; row > x - length; row--) {
          if (row < 0) throw new Error('Ship placement out of bounds');

          if (this.grid[row][y] instanceof Ship) {
            throw new Error('Cell is already occupied');
          }
        }

        for (let row = x; row > x - length; row--) {
          this.grid[row][y] = ship;
        }

        this.ships.push(ship);

        break;

      case 'down':
        for (let row = x; row < x + length; row++) {
          if (row > 9) throw new Error('Ship placement out of bounds');

          if (this.grid[row][y] instanceof Ship) {
            throw new Error('Cell is already occupied');
          }
        }

        for (let row = x; row < x + length; row++) {
          this.grid[row][y] = ship;
        }

        this.ships.push(ship);

        break;

      default:
        throw new Error('Invalid direction');
    }
  }

  receiveAttack(x, y) {
    if (this.grid[x][y] instanceof Ship) {
      if (this.hitShots.some((coord) => coord[0] === x && coord[1] === y)) {
        return 'Already hit';
      } else {
        this.hitShots.push([x, y]);
        const ship = this.grid[x][y];
        ship.hit();
        return 'hit';
      }
    } else {
      if (this.missedShots.some((coord) => coord[0] === x && coord[1] === y)) {
        return 'Already missed';
      } else {
        this.missedShots.push([x, y]);
        return 'miss';
      }
    }
  }

  areAllShipsSunk() {
    return this.ships.every((ship) => ship.isSunk);
  }
}
