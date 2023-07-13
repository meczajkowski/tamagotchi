export default class Tamagotchi {
  constructor() {
    this.health = { value: 10, importance: 1 };
    this.hunger = { value: 10, importance: 3 };
    this.energy = { value: 10, importance: 2 };
    this.fun = { value: 10, importance: 4 };
    this.state = 'happy';
    this.isPlaying = false;
    this.isSleeping = false;
    this.isEating = false;
    this.timeOfGame = 0;

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
    const actionButtons = document.querySelector('.action-buttons__gameon');

    // actionButtons.addEventListener('mousedown', this.startAction.bind(this));
    // actionButtons.addEventListener('mouseup', this.stopAction.bind(this));

    // actionButtons.addEventListener('touchstart', this.startAction.bind(this));
    // actionButtons.addEventListener('touchend', this.stopAction.bind(this));

    actionButtons.addEventListener('click', this.handleActions.bind(this));

    this.displayHealth(healthElement);
    this.displayHunger(hungerElement);
    this.displayEnergy(energyElement);
    this.displayFun(funElement);

    this.timer = setInterval(() => {
      this.setState();
      this.handleParameters();
      this.timeOfGame++;
      // console.log(this.timeOfGame + ' seconds passed');
    }, 1000);
  };

  updateDisplay() {
    this.displayHealth('.health');
    this.displayHunger('.hunger');
    this.displayEnergy('.energy');
    this.displayFun('.fun');
  }

  handleParameters() {
    // energy should decrease by 1 point per 2 seconds
    if (this.energy.value > 0 && !this.isSleeping) {
      this.energy.importance -= 1;
      if (this.energy.importance <= 0) {
        this.energy.value -= 1;
        this.energy.importance = 2;
      }
    } // Sleeping should recover 2 energy point per second
    else if (this.isSleeping && this.energy.value < 9) {
      this.energy.value += 2;
    }

    // hunger should decrease by 1 points per second
    if (this.hunger.value > 0 && !this.isEating) {
      this.hunger.value -= 1;
    } // Eating should recover 2 hunger point per second
    else if (this.isEating && this.hunger.value < 9) {
      this.hunger.value += 2;
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

    this.updateDisplay();
  }

  setState() {
    if (this.health.value <= 0) {
      this.state = 'dead';
    } else if (this.isEating) {
      this.state = 'eating';
    } else if (this.isSleeping) {
      this.state = 'sleeping';
    } else if (this.isPlaying) {
      this.state = 'playing';
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

  handleActions(event) {
    const actionButtons = document.querySelector('.action-buttons__gameon');

    if (event.target === actionButtons) return;

    if (event.target.closest('.action-button--hunger')) {
      if (this.isEating) {
        this.stopFeeding();
      } else {
        this.isPlaying = false;
        this.isSleeping = false;
        this.startFeeding();
      }
    }
    if (event.target.closest('.action-button--sleep')) {
      if (this.isSleeping) {
        this.stopSleeping();
      } else {
        this.isEating = false;
        this.isPlaying = false;
        this.startSleeping();
      }
    }
    if (event.target.closest('.action-button--fun')) {
      if (this.isPlaying) {
        this.stopPlaying();
      } else {
        this.isEating = false;
        this.isSleeping = false;
        this.startPlaying();
      }
    }
  }

  startFeeding = () => {
    if (this.state !== 'dead') {
      this.isEating = true;
      this.setState();
    }
  };

  stopFeeding = () => {
    this.isEating = false;
    this.setState();
  };

  startSleeping = () => {
    if (this.state !== 'dead') {
      this.isSleeping = true;
      this.setState();
    }
  };

  stopSleeping = () => {
    this.isSleeping = false;
    this.setState();
  };

  startPlaying = () => {
    if (this.state !== 'dead') {
      this.isPlaying = true;
      this.setState();
    }
  };

  stopPlaying = () => {
    this.isPlaying = false;
    this.setState();
  };
}
