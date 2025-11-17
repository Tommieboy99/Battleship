import { Gameboard } from '../gameboard';
import { Ship } from '../ship';

describe('Gameboard', () => {
  let board;

  beforeEach(() => {
    board = new Gameboard();
  });

  test('Does Gameboard exist', () => {
    expect(board).toBeTruthy();
  });

  test('Gameboard has 10 rows', () => {
    expect(board.grid.length).toBe(10);
  });

  test('Each row has 10 columns', () => {
    for (let i = 0; i < board.grid.length; i++) {
      expect(board.grid[i].length).toBe(10);
    }
  });

  test('All cells are empty strings', () => {
    for (let i = 0; i < board.grid.length; i++) {
      for (let j = 0; j < board.grid[i].length; j++) {
        expect(board.grid[i][j]).toBe('');
      }
    }
  });

  test('placeShip of length 2 at (x, y) with a direction of left', () => {
    board.placeShip(1, 5, 2, 'left');
    expect(board.grid[1][5]).toBeInstanceOf(Ship);
    expect(board.grid[1][4]).toBeInstanceOf(Ship);
  });

  test('placeShip of length 2 at (x, y) with a direction of right', () => {
    board.placeShip(1, 5, 2, 'right');
    expect(board.grid[1][5]).toBeInstanceOf(Ship);
    expect(board.grid[1][6]).toBeInstanceOf(Ship);
  });

  test('placeShip of length 2 at (x, y) with a direction of up', () => {
    board.placeShip(1, 5, 2, 'up');
    expect(board.grid[1][5]).toBeInstanceOf(Ship);
    expect(board.grid[0][5]).toBeInstanceOf(Ship);
  });

  test('placeShip of length 2 at (x, y) with a direction of down', () => {
    board.placeShip(1, 5, 2, 'down');
    expect(board.grid[1][5]).toBeInstanceOf(Ship);
    expect(board.grid[2][5]).toBeInstanceOf(Ship);
  });

  test('Placing a ship on a occupied cell throws an ERROR', () => {
    board.placeShip(1, 4, 2, 'left');
    expect(() => {
      board.placeShip(1, 3, 2, 'left');
    }).toThrow('Cell is already occupied');
  });

  test('placing ship out of bounds throws error on all directions', () => {
    expect(() => board.placeShip(0, 0, 3, 'left')).toThrow(
      'Ship placement out of bounds'
    );

    expect(() => board.placeShip(8, 8, 3, 'right')).toThrow(
      'Ship placement out of bounds'
    );

    expect(() => board.placeShip(1, 5, 3, 'up')).toThrow(
      'Ship placement out of bounds'
    );

    expect(() => board.placeShip(8, 7, 3, 'down')).toThrow(
      'Ship placement out of bounds'
    );
  });

  test('placeShip fits exactly at the left edge', () => {
    board.placeShip(0, 1, 2, 'left');
    expect(board.grid[0][1]).toBeInstanceOf(Ship);
    expect(board.grid[0][0]).toBeInstanceOf(Ship);
  });

  test('placeShip fits exactly at the right edge', () => {
    board.placeShip(0, 8, 2, 'right');
    expect(board.grid[0][8]).toBeInstanceOf(Ship);
    expect(board.grid[0][9]).toBeInstanceOf(Ship);
  });

  test('placeShip fits exactly at the up edge', () => {
    board.placeShip(1, 0, 2, 'up');
    expect(board.grid[1][0]).toBeInstanceOf(Ship);
    expect(board.grid[0][0]).toBeInstanceOf(Ship);
  });

  test('placeShip fits exactly at the down edge', () => {
    board.placeShip(8, 0, 2, 'down');
    expect(board.grid[8][0]).toBeInstanceOf(Ship);
    expect(board.grid[9][0]).toBeInstanceOf(Ship);
  });

  test('placeShip with invalid direction throws error', () => {
    expect(() => board.placeShip(1, 1, 2, 'diagonal')).toThrow(
      'Invalid direction'
    );
  });

  test('placeShip of length 4 at (x, y) with direction down', () => {
    board.placeShip(3, 3, 4, 'down');
    for (let i = 3; i < 7; i++) {
      expect(board.grid[i][3]).toBeInstanceOf(Ship);
    }
  });

  test('correctly identifies a ship at given coordinates and triggers a hit', () => {
    board.placeShip(5, 5, 3, 'right');
    board.receiveAttack(5, 5);

    const ship = board.grid[5][5];

    expect(ship.numberOfHits).toBe(1);
  });

  test('correctly identifies an empty cell at given coordinates and handles a miss', () => {
    board.placeShip(5, 5, 3, 'right');
    board.receiveAttack(3, 3);

    expect(board.missedShots).toContainEqual([3, 3]);
  });

  test('the same ship is hit twice on different coordinates', () => {
    board.placeShip(5, 5, 3, 'right');
    board.receiveAttack(5, 5);
    board.receiveAttack(5, 6);

    const ship = board.grid[5][5];

    expect(ship.numberOfHits).toBe(2);
  });

  test('Twee aanvallen op dezelfde empty cell resulteert in een error', () => {
    board.receiveAttack(5, 5);

    expect(() => {
      board.receiveAttack(5, 5);
    }).toThrow('You cant attack a coordinate twice');
  });

  test('Twee aanvallen op dezelfde coordinaten van het schip resulteert in een error', () => {
    board.placeShip(5, 5, 3, 'right');
    board.receiveAttack(5, 5);

    expect(() => {
      board.receiveAttack(5, 5);
    }).toThrow('You cant attack a coordinate twice');
  });
});
