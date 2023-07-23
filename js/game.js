import Tamagotchi from './modules/tamagotchi.js';
export default class Game {
    constructor() {
        // Start/restart the game with its initial values
        this.start = ({ healthElement, hungerElement, energyElement, funElement, }) => {
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
        this.gameInRow = 0;
    }
}
