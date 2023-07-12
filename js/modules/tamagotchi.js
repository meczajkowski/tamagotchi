export default class Tamagotchi {
  constructor() {
    this.health = { value: 10, importance: 1 };
    this.hunger = { value: 10, importance: 3 };
    this.energy = { value: 10, importance: 2 };
    this.fun = { value: 10, importance: 4 };
    this.state = 'happy';
    this.timeOfGame = 0;
    this.timer = setInterval(() => {
      this.setState();
      this.decreaseParameters();
      this.timeOfGame++;
      console.log(this.timeOfGame + ' seconds passed');
    }, 1000);

    console.log('Tamagotchi initialized');
  }

  displayHealth = (elementSelector) => {
    const displayElement = document.querySelector(elementSelector);
    displayElement.innerText = this.health.value;
  };

  displayHunger = (elementSelector) => {
    const displayElement = document.querySelector(elementSelector);
    displayElement.innerText = this.hunger.value;
  };

  displayEnergy = (elementSelector) => {
    const displayElement = document.querySelector(elementSelector);
    displayElement.innerText = this.energy.value;
  };

  displayFun = (elementSelector) => {
    const displayElement = document.querySelector(elementSelector);
    displayElement.innerText = this.fun.value;
  };

  mount = ({ healthElement, hungerElement, energyElement, funElement }) => {
    this.displayHealth(healthElement);
    this.displayHunger(hungerElement);
    this.displayEnergy(energyElement);
    this.displayFun(funElement);
  };

  decreaseParameters() {
    // energy should decrease by 1 point per 2 seconds
    if (this.energy.value > 0) {
      this.energy.importance -= 1;
      if (this.energy.importance <= 0) {
        this.energy.value -= 1;
        this.energy.importance = 2;
      }
    }

    // hunger should decrease by 1 points per second
    if (this.hunger.value > 0) {
      this.hunger.value -= 1;
    }
    // fun should decrease by 1 points per second
    if (this.fun.value > 0) {
      this.fun.value -= 1;
    }

    // health should decrease by 1 points per second when hunger or energy is below or equal to 0
    if (this.hunger.value <= 0 || this.energy.value <= 0) {
      if (this.health.value > 0) {
        this.health.value -= 1;
      }
    }

    // energy should decrease by additional 1 point per 2 seconds when fun is below or equal to 0
    if (this.fun.value <= 0) {
      this.energy.importance -= 0.5;
      if (this.energy.importance <= 0) {
        if (this.energy.value > 0) {
          this.energy.value -= 1;
          this.energy.importance = 2;
        }
      }
    }

    this.mount({
      healthElement: '.health',
      hungerElement: '.hunger',
      energyElement: '.energy',
      funElement: '.fun',
    });
  }

  setState() {
    if (this.health.value <= 0) {
      this.state = 'dead';
    } else if (this.hunger.value <= 6) {
      this.state = 'hungry';
    } else if (this.energy.value <= 6) {
      this.state = 'sleepy';
    } else if (this.fun.value <= 6) {
      this.state = 'sad';
    } else {
      this.state = 'happy';
    }

    this.setAvatar();
  }

  setAvatar() {
    const avatar = document.querySelector('.display__tamagotchi');
    const avatarStatus = document.querySelector('.display__tamagotchi-status');

    avatar.classList = `display__tamagotchi display__tamagotchi--${this.state}`;
    avatarStatus.textContent = this.state.toUpperCase();
  }
}
