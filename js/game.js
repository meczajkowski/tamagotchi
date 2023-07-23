import Tamagotchi from './modules/tamagotchi.js';

export default class Game {
  constructor() {
    this.gameInRow = 0;
  }

  // Start/restart the game with its initial values
  start = ({ healthElement, hungerElement, energyElement, funElement }) => {
    this.tamagotchi = new Tamagotchi();
    this.tamagotchi.mount({
      healthElement,
      hungerElement,
      energyElement,
      funElement,
    });
    this.gameInRow++;
    console.log(`Game number ${this.gameInRow} started`);
  };
}
