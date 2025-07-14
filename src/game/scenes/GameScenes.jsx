import Phaser from "phaser";
import BaseScene from "./BaseScene";

export default class GameScene extends BaseScene {
  constructor() {
    super("GameScene");
  }

  preload() {
    this.load.image("volume", "assets/volume/volume.png");
    this.load.image("mute", "assets/volume/enable-sound.png");
    this.load.image("charactor", "assets/s1_character.png");
    this.load.image("logo", "assets/s1_logo.png");
    this.load.image("text1", "assets/s1_text1.png");
    this.load.image("text2", "assets/s1_text2.png");
    this.load.image("btn", "assets/s1_Play game bt.png");
    this.load.image("footer", "assets/s1_legal line.png");
  }

  create() {
    this.createVolumeButton(); // từ BaseScene

    const { width } = this.cameras.main;
    const centerX = width / 2;

    // 🎴 Panda
    this.panda = this.add.image(centerX - 100, 430, "charactor").setAlpha(0);
    const desiredHeight = 600;
    const scalePanda = desiredHeight / this.panda.height;
    this.panda.setScale(scalePanda);

    // 🐼 Logo
    this.logo = this.add.image(centerX, 160, "logo");

    // 📦 UI Elements
    this.text1 = this.add.image(0, 0, "text1").setAlpha(0).setY(-100);
    this.text2 = this.add.image(0, 0, "text2").setAlpha(0).setScale(1.6).setY(70);
    this.btn = this.add.image(0, 0, "btn").setAlpha(0).setScale(0.2).setY(150);
    this.footer = this.add.image(0, 0, "footer").setY(220);

    // 📦 UI container
    this.UIGroup = this.add.container(centerX, width, [
      this.text1,
      this.text2,
      this.btn,
      this.footer,
    ]);

    // 🎮 Button interaction
    this.btn.setInteractive({ useHandCursor: true }).on("pointerdown", () => {
      this.fadeToScene("PlayingScenes", 300); // BaseScene hỗ trợ fade
    });

    // 🎬 Animation
    this.playIntroTimeline(centerX);
  }

  playIntroTimeline(centerX) {
    const timeline = this.add.timeline([
      {
        at: 0,
        tween: {
          targets: this.logo,
          x: 120,
          duration: 1000,
          ease: "Power2",
        },
      },
      {
        from: 300,
        tween: {
          targets: this.panda,
          x: centerX,
          alpha: 1,
          duration: 1000,
          ease: "Power2",
        },
      },
      {
        from: 300,
        tween: {
          targets: this.text1,
          y: 0,
          alpha: 1,
          duration: 800,
          ease: "Back.Out",
        },
      },
      {
        from: 300,
        tween: {
          targets: this.btn,
          scale: 1,
          alpha: 1,
          ease: "Back.Out",
          duration: 600,
        },
      },
      {
        from: 300,
        tween: {
          targets: this.text2,
          scale: 1,
          alpha: 1,
          ease: "Back.Out",
          duration: 1000,
        },
      },
    ]);

    timeline.play();
  }
}
