import Tamagotchi from './modules/tamagotchi.js';

export default class Game {
  constructor() {
    this.tamagotchi = new Tamagotchi();
  }

  start = ({ healthElement, hungerElement, energyElement, funElement }) => {
    this.tamagotchi.mount({
      healthElement,
      hungerElement,
      energyElement,
      funElement,
    });
    console.log('Game started');

    const restartButton = document.querySelector('.action-button--restart');
    restartButton.addEventListener('click', this.restart.bind(this));
  };

  restart = () => {
    this.tamagotchi = new Tamagotchi();
    this.tamagotchi.mount({
      healthElement: '.health',
      hungerElement: '.hunger',
      energyElement: '.energy',
      funElement: '.fun',
    });
    console.log('game restarted');
  };
}
