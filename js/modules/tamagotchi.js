export default class Tamagotchi {
    constructor() {
        this.displayHealth = (elementSelector) => {
            const displayElement = document.querySelector(elementSelector);
            displayElement.innerText = this.health.value.toString();
        };
        this.displayHunger = (elementSelector) => {
            const displayElement = document.querySelector(elementSelector);
            displayElement.innerText = this.hunger.value.toString();
        };
        this.displayEnergy = (elementSelector) => {
            const displayElement = document.querySelector(elementSelector);
            displayElement.innerText = this.energy.value.toString();
        };
        this.displayFun = (elementSelector) => {
            const displayElement = document.querySelector(elementSelector);
            displayElement.innerText = this.fun.value.toString();
        };
        this.mount = ({ healthElement, hungerElement, energyElement, funElement, }) => {
            const actionButtons = document.querySelector('.action-buttons__gameon');
            actionButtons.addEventListener('click', this.handleActions.bind(this));
            this.displayHealth(healthElement);
            this.displayHunger(hungerElement);
            this.displayEnergy(energyElement);
            this.displayFun(funElement);
            this.setState();
            this.timer = setInterval(() => {
                this.setState();
                this.handleParameters();
                this.timeOfGame++;
                console.log(this.timeOfGame + ' seconds passed');
            }, 1000);
        };
        this.startFeeding = () => {
            if (this.state !== 'dead') {
                this.isEating = true;
                this.setState();
            }
        };
        this.stopFeeding = () => {
            this.isEating = false;
            this.setState();
        };
        this.startSleeping = () => {
            if (this.state !== 'dead') {
                this.isSleeping = true;
                this.setState();
            }
        };
        this.stopSleeping = () => {
            this.isSleeping = false;
            this.setState();
        };
        this.startPlaying = () => {
            if (this.state !== 'dead') {
                this.isPlaying = true;
                this.setState();
            }
        };
        this.stopPlaying = () => {
            this.isPlaying = false;
            this.setState();
        };
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
    updateDisplay() {
        const buttonsGameon = document.querySelector('.action-buttons__gameon');
        const buttonsGameover = document.querySelector('.action-buttons__gameover');
        this.displayHealth('.health');
        this.displayHunger('.hunger');
        this.displayEnergy('.energy');
        this.displayFun('.fun');
        if (this.state === 'dead') {
            buttonsGameon.classList.remove('active');
            buttonsGameon.setAttribute('disabled', 'true');
            buttonsGameover.classList.add('active');
            buttonsGameover.setAttribute('disabled', 'false');
            clearInterval(this.timer);
            console.log(`time of game ${this.timeOfGame}`);
        }
        else {
            buttonsGameon.className = 'action-buttons__gameon active';
            buttonsGameon.setAttribute('disabled', 'false');
            buttonsGameover.className = 'action-buttons__gameover';
            buttonsGameover.setAttribute('disabled', 'false');
        }
    }
    handleParameters() {
        // Energy
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
        // Hunger
        // hunger should decrease by 1 points per second
        if (this.hunger.value > 0 && !this.isEating) {
            this.hunger.value -= 1;
        } // Eating should recover 2 hunger point per second
        else if (this.isEating && this.hunger.value < 9) {
            this.hunger.value += 2;
        }
        // Fun
        // fun should decrease by 1 points per second
        if (this.fun.value > 0 && !this.isPlaying) {
            this.fun.value -= 1;
        } // Playing should recover 2 fun points per second
        else if (this.isPlaying && this.fun.value < 9) {
            this.fun.value += 2;
            // Playing should decrease energy by 1 energy point per second
            this.energy.value -= 1;
        }
        // Health
        // health should decrease by 1 points per second when hunger or energy is below or equal to 0
        if (this.hunger.value <= 0 || this.energy.value <= 0) {
            if (this.health.value > 0) {
                this.health.value -= 1;
            }
        }
        // energy should decrease by additional 1 point per 2 seconds when fun is below or equal to 0
        if (this.fun.value <= 0 && !this.isSleeping) {
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
            // set the Tamagotchi's state to 'dead' when its health falls below 0
            this.state = 'dead';
        }
        else if (this.isEating) {
            this.state = 'eating';
        }
        else if (this.isSleeping) {
            this.state = 'sleeping';
        }
        else if (this.isPlaying) {
            this.state = 'playing';
        }
        else if (this.hunger.value <= 6) {
            this.state = 'hungry';
        }
        else if (this.energy.value <= 6) {
            this.state = 'sleepy';
        }
        else if (this.fun.value <= 6) {
            this.state = 'sad';
        }
        else {
            this.state = 'happy';
        }
        this.setAvatar();
    }
    setAvatar() {
        const avatar = document.querySelector('.display__tamagotchi');
        const avatarStatus = document.querySelector('.display__tamagotchi-status');
        avatar.className = `display__tamagotchi display__tamagotchi--${this.state}`;
        avatarStatus.textContent = this.state.toUpperCase();
    }
    handleActions(event) {
        const actionButtons = document.querySelector('.action-buttons__gameon');
        const targetElement = event.target;
        if (targetElement === actionButtons)
            return;
        if (targetElement.closest('.action-button--hunger')) {
            if (this.isEating) {
                this.stopFeeding();
            }
            else {
                this.isPlaying = false;
                this.isSleeping = false;
                this.startFeeding();
            }
        }
        // this is the code that stops the Tamagotchi from sleeping when another action is pressed or when the sleep action is finished by clicking on the action button again
        if (targetElement.closest('.action-button--sleep')) {
            if (this.isSleeping) {
                this.stopSleeping();
            }
            else {
                this.isEating = false;
                this.isPlaying = false;
                this.startSleeping();
            }
        }
        // this is the code that stops the Tamagotchi from playing when another action is pressed or when the play action is finished by clicking on the action button again
        if (targetElement.closest('.action-button--fun')) {
            if (this.isPlaying) {
                this.stopPlaying();
            }
            else {
                this.isEating = false;
                this.isSleeping = false;
                this.startPlaying();
            }
        }
    }
}
