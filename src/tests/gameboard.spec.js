import { Gameboard } from '../gameboard';

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
});
