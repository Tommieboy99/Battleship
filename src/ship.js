// Ship Logic

export class Ship {
  constructor(length) {
    this.length = length;
    this.numberOfHits = 0;
    this.isSunk = false;
  }

  hit() {
    this.numberOfHits++;
    this.updateSunkStatus();
  }

  updateSunkStatus() {
    if (this.length === this.numberOfHits) {
      this.isSunk = true;
    } else {
      this.isSunk = false;
    }
  }
}
