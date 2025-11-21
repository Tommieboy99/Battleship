import { Ship } from '../ship';

let ship;

beforeEach(() => {
  ship = new Ship(3);
});

describe('hit()', () => {
  test('increase numberOfHits by 1', () => {
    ship.hit();
    expect(ship.numberOfHits).toBe(1);
    ship.hit();
    expect(ship.numberOfHits).toBe(2);
  });
});

describe('updateSunkStatus()', () => {
  test('sunkStatus is true when numberOfHits == length of ship', () => {
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk).toBe(true);
  });

  test('sunkStatus is false when numberOfHits < length of the ship', () => {
    ship.hit();
    expect(ship.isSunk).toBe(false);
  });
});
