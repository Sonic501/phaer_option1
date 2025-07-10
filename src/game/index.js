import GameConfig from "../config/GameConfig";

let game = null;
export const initializeGame = () => {
  if (!game) game = new Phaser.Game(GameConfig);
};
export const destroyGame = () => {
  if (game) {
    game.destroy(true);
    game = null;
  }
};
