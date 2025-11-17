import { Ship } from './ship';

export class Gameboard {
  constructor() {
    this.grid = this.createGrid();
    this.missedShots = [];
    this.hitShots = [];
    this.ships = [];
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
    const ship = new Ship(length);
    let shipCoordinates = [];

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
          shipCoordinates.push([x, col]);
        }

        this.ships.push(shipCoordinates);

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
          shipCoordinates.push([x, col]);
        }

        this.ships.push(shipCoordinates);

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
          shipCoordinates.push([row, y]);
        }

        this.ships.push(shipCoordinates);

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
          shipCoordinates.push([row, y]);
        }

        this.ships.push(shipCoordinates);

        break;

      default:
        throw new Error('Invalid direction');
    }
  }

  receiveAttack(x, y) {
    if (this.grid[x][y] instanceof Ship) {
      if (this.hitShots.some((coord) => coord[0] === x && coord[1] === y)) {
        throw new Error('You cant attack a coordinate twice');
      } else {
        this.hitShots.push([x, y]);
        const ship = this.grid[x][y];
        ship.hit();
      }
    } else {
      if (this.missedShots.some((coord) => coord[0] === x && coord[1] === y)) {
        throw new Error('You cant attack a coordinate twice');
      } else {
        this.missedShots.push([x, y]);
      }
    }
  }

  areAllShipsSunk() {
    //Loop through each ship’s coordinates array.
    // Take the first coordinate [x, y] of that ship.
    // Access this.grid[x][y] to get the Ship instance.
    // Check if ship.isSunk() (or whatever method/property you have) returns true or false.
    // If any ship is not sunk, return false immediately.
    // If all ships are sunk, return true.
  }
}
