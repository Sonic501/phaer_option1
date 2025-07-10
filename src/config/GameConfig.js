import Phaser from "phaser";
import GameScene from "../game/scenes/GameScenes";
import PlayingScenes from "../game/scenes/PlayingScenes";
import RePlayScene from "../game/scenes/RePlayScene.";

const GameConfig = {
  type: Phaser.AUTO,
  width: 768,
  height: 1024,
  backgroundColor: "#FFFFFF",
  parent: "phaser-container",
  scene: [GameScene, PlayingScenes,RePlayScene],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
};

export default GameConfig;
