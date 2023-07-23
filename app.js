import Game from './js/game.js';

document.addEventListener('DOMContentLoaded', () => {
  const game = new Game();
  const restartButton = document.querySelector('.action-button--restart');

  // Start game
  game.start({
    healthElement: '.health',
    hungerElement: '.hunger',
    energyElement: '.energy',
    funElement: '.fun',
  });

  // Restart game
  restartButton.addEventListener('click', () => {
    game.start({
      healthElement: '.health',
      hungerElement: '.hunger',
      energyElement: '.energy',
      funElement: '.fun',
    });
  });
});
