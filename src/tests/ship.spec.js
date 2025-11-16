import { Ship } from '../ship';

describe('My Ship', () => {
  let ship;

  beforeEach(() => {
    ship = new Ship(3);
  });

  test('initial number of hits is 0', () => {
    expect(ship.numberOfHits).toBe(0);
  });

  test('initial isSunk is false', () => {
    expect(ship.isSunk).toBe(false);
  });

  test('increase numberOfHits by 1', () => {
    ship.hit();
    expect(ship.numberOfHits).toBe(1);
    ship.hit();
    expect(ship.numberOfHits).toBe(2);
  });

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
