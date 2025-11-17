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

  //Gameboards should be able to place ships at specific coordinates by calling the ship factory or class..

  test('placeShip of length 1 at (x, y) marks the cell as occupied', () => {
    board.placeShip(2, 3, 1);
    expect(board.grid[2][3]).toBeInstanceOf(Ship);
  });

  test('Cant place a ship when the cell is already occupied', () => {
    board.placeShip(2, 3, 1);

    expect(() => {
      board.placeShip(2, 3, 1);
    }).toThrow('Cell is already occupied');
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
});
