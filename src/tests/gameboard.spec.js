import { Gameboard } from '../gameboard';
import { Ship } from '../ship';

let gameboard;

beforeEach(() => {
  gameboard = new Gameboard();
});

describe('createBoard()', () => {
  test('Board bevat 10 rijen', () => {
    expect(gameboard.board.length).toBe(10);
  });

  test('Board bevat 10 kolommen', () => {
    for (let i = 0; i < gameboard.board.length; i++) {
      expect(gameboard.board[i].length).toBe(10);
    }
  });
});

function expectShipPlaced(result, expectedCoords, gameboard) {
  expect(result.ok).toBe(true);
  expect(result.shipCoordinates).toEqual(expectedCoords);

  for (const [x, y] of expectedCoords) {
    expect(gameboard.hasShipAt(x, y)).toBe(true);
  }
}

describe('placeShip()', () => {
  let result;

  beforeEach(() => {
    result = null;
  });

  //Input Validation
  test('Er kan geen schip worden geplaatst bij x < 0 || x > 9', () => {
    result = gameboard.placeShip(10, 5, 1);
    expect(result.ok).toBe(false);
    expect(result.error).toBe('OUT_OF_BOUNDS');

    result = gameboard.placeShip(-2, 7, 1);
    expect(result.ok).toBe(false);
    expect(result.error).toBe('OUT_OF_BOUNDS');
  });

  test('Er kan geen schip worden geplaatst bij  y < 0 || y > 9', () => {
    result = gameboard.placeShip(5, 10, 1);
    expect(result.ok).toBe(false);
    expect(result.error).toBe('OUT_OF_BOUNDS');

    result = gameboard.placeShip(7, -2, 1);
    expect(result.ok).toBe(false);
    expect(result.error).toBe('OUT_OF_BOUNDS');
  });

  test('Er kan geen schip worden geplaatst zonder length', () => {
    result = gameboard.placeShip(5, 6);
    expect(result.ok).toBe(false);
    expect(result.error).toBe('MISSING_LENGTH_ARG');
  });

  test('Er kan geen schip worden geplaats op een ander schip', () => {
    gameboard.placeShip(5, 6, 1);
    result = gameboard.placeShip(5, 6, 1);

    expect(result.ok).toBe(false);
    expect(result.error).toBe('SHIP_OVERLAP');

    gameboard.placeShip(4, 4, 5, 'horizontal');
    result = gameboard.placeShip(2, 6, 4, 'vertical');
    expect(result.ok).toBe(false);
    expect(result.error).toBe('SHIP_OVERLAP');
  });

  test('Invalid orientation geeft foutmelding', () => {
    result = gameboard.placeShip(3, 3, 2, 'diagonal');
    expect(result.ok).toBe(false);
    expect(result.error).toBe('INVALID_ORIENTATION');
  });

  //Schepen plaatsen op het bord
  test('Plaats een schip op het board', () => {
    result = gameboard.placeShip(4, 5, 1);
    expectShipPlaced(result, [[4, 5]], gameboard);
  });

  test('Een schip plaatsen met length 2 (horizontaal / verticaal)', () => {
    result = gameboard.placeShip(3, 4, 2, 'horizontal');
    expectShipPlaced(
      result,
      [
        [3, 4],
        [3, 5],
      ],
      gameboard
    );

    result = gameboard.placeShip(6, 3, 2, 'vertical');
    expectShipPlaced(
      result,
      [
        [6, 3],
        [7, 3],
      ],
      gameboard
    );
  });

  test('Ship past automatisch binnen het bord als het anders out of bounds zou gaan (horizontaal)', () => {
    result = gameboard.placeShip(3, 9, 2, 'horizontal');
    expectShipPlaced(
      result,
      [
        [3, 9],
        [3, 8],
      ],
      gameboard
    );
  });

  test('Ship past automatisch binnen het bord als het anders out of bounds zou gaan (verticaal)', () => {
    result = gameboard.placeShip(9, 0, 2, 'vertical');
    expectShipPlaced(
      result,
      [
        [9, 0],
        [8, 0],
      ],
      gameboard
    );
  });
});

describe('receiveAttack()', () => {
  let result;

  beforeEach(() => {
    result = null;
  });

  //Input validation
  test('Er kan geen aanval worden gedaan op coordinaten buiten het board', () => {
    result = gameboard.receiveAttack(10, 5);
    expect(result.hit).toBe(false);
    expect(result.error).toBe('ATTACK_OUT_OF_BOUNDS');

    result = gameboard.receiveAttack(5, 10);
    expect(result.hit).toBe(false);
    expect(result.error).toBe('ATTACK_OUT_OF_BOUNDS');
  });

  test('Er kan geen aanval worden gedaan op een coordinaat die al is aangevallen', () => {
    gameboard.receiveAttack(5, 5);
    result = gameboard.receiveAttack(5, 5);

    expect(result.hit).toBe(false);
    expect(result.error).toBe('ALREADY_ATTACKED_COORDINATE');
  });

  test('Wordt het juiste schip geraakt', () => {
    const shipA = gameboard.placeShip(2, 2, 2, 'horizontal').ship;
    const shipB = gameboard.placeShip(5, 5, 3, 'vertical').ship;

    result = gameboard.receiveAttack(2, 2);

    expect(result.hit).toBe(true);
    expect(shipA.numberOfHits).toBe(1);
    expect(shipB.numberOfHits).toBe(0);
  });

  test('Gemiste schoten worden geregistreerd', () => {
    result = gameboard.receiveAttack(2, 2);

    expect(gameboard.missedShots).toContainEqual([2, 2]);
    expect(result.hit).toBe(false);
  });
});

describe('areAllShipsSunk()', () => {
  //Gameboards should be able to report whether or not all of their ships have been sunk.
  let result;

  beforeEach(() => {
    result = null;
  });

  test('Registreren dat alle schepen gezonken zijn op het board', () => {
    gameboard.placeShip(0, 0, 4, 'horizontal');
    gameboard.receiveAttack(0, 0);
    gameboard.receiveAttack(0, 1);
    gameboard.receiveAttack(0, 2);
    gameboard.receiveAttack(0, 3);

    result = gameboard.areAllShipsSunk();
    expect(result).toBe(true);
  });

  test('Registreren dat alle schepen niet gezonken zijn op het board', () => {
    gameboard.placeShip(0, 0, 4, 'horizontal');
    gameboard.receiveAttack(0, 0);
    gameboard.receiveAttack(0, 1);
    gameboard.receiveAttack(0, 2);

    result = gameboard.areAllShipsSunk();
    expect(result).toBe(false);
  });
});
