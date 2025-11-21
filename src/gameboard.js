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

  placeShip(x, y, length, orientation = 'horizontal') {
    if (x > 9 || x < 0 || y > 9 || y < 0) {
      return { ok: false, error: 'OUT_OF_BOUNDS' };
    }

    if (!length) {
      return { ok: false, error: 'MISSING_LENGTH_ARG' };
    }

    if (orientation !== 'horizontal' && orientation !== 'vertical') {
      return { ok: false, error: 'INVALID_ORIENTATION' };
    }

    const shipCoordinates = [];

    if (orientation === 'horizontal') {
      const placeLeft = y + length - 1 > 9;
      const direction = placeLeft ? -1 : 1;
      for (let i = 0; i < length; i++) {
        shipCoordinates.push([x, y + i * direction]);
      }
    } else {
      const placeUp = x + length - 1 > 9;
      const direction = placeUp ? -1 : 1;
      for (let i = 0; i < length; i++) {
        shipCoordinates.push([x + i * direction, y]);
      }
    }

    for (const [row, col] of shipCoordinates) {
      if (this.board[row][col] instanceof Ship) {
        return { ok: false, error: 'SHIP_OVERLAP' };
      }
    }

    const ship = new Ship(length);
    this.ships.push(ship);

    for (const [row, col] of shipCoordinates) {
      this.board[row][col] = ship;
    }

    return {
      ok: true,
      ship,
      shipCoordinates,
    };
  }

  hasShipAt(x, y) {
    return this.board[x][y] instanceof Ship;
  }

  receiveAttack(x, y) {
    if (x < 0 || x > 9 || y < 0 || y > 9) {
      return { hit: false, error: 'ATTACK_OUT_OF_BOUNDS' };
    }

    const allShots = this.hitShots.concat(this.missedShots);

    for (const [cx, cy] of allShots) {
      if (cx === x && cy === y) {
        return { hit: false, error: 'ALREADY_ATTACKED_COORDINATE' };
      }
    }

    const hasHit = this.hasShipAt(x, y);

    if (hasHit) {
      const ship = this.board[x][y];
      ship.hit();
      this.hitShots.push([x, y]);
      return { hit: true };
    } else {
      this.missedShots.push([x, y]);
      return { hit: false };
    }
  }

  areAllShipsSunk() {
    return this.ships.every((ship) => ship.isSunk);
  }
}
