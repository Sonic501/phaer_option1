import Phaser from "phaser";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }
  preload() {
    this.load.image("charactor", "assets/s1_character.png");
    this.load.image("logo", "assets/s1_logo.png");
    this.load.image("text1", "assets/s1_text1.png");
    this.load.image("text2", "assets/s1_text2.png");
    this.load.image("btn", "assets/s1_Play game bt.png");
    this.load.image("footer", "assets/s1_legal line.png");
  }
  create() {
    const width = this.cameras.main.width;
    const centerX = width / 2;
    const panda = this.add.image(centerX - 100, 430, "charactor").setAlpha(0);
    const desiredHeight = 600;
    const scalePanda = desiredHeight / panda.height;
    panda.setScale(scalePanda);
    // logo
    const logo = this.add.image(centerX, 160, "logo");
    // ui group
    const text1 = this.add.image(0, 0, "text1").setAlpha(0);
    const text2 = this.add.image(0, 0, "text2").setAlpha(0).setScale(1.6);
    const btn = this.add.image(0, 0, "btn").setAlpha(0).setScale(0.2);
    const footer = this.add.image(0, 0, "footer");
    // handle btn
    btn.setInteractive({ useHandCursor: true }).on("pointerdown", () => {
      this.cameras.main.fadeOut(300, 0, 0, 0);
      this.cameras.main.once("camerafadeoutcomplete", () => {
        this.scene.transition({
          target: "PlayingScenes",
          duration: 600,
          moveBelow: true,
          onUpdate: null,
          data: {}
        });
      });
      
    });
    
    text1.y = -100;
    text2.y = 70;
    btn.y = 150;
    footer.y = 220;
    console.log(width)
    const UIGroup = this.add.container(centerX, width, [
      text1,
      text2,
      btn,
      footer,
    ]);
    // tweens
    //   targets: logo,
    //   x: 120,
    //   duration: 1000,
    //   ease: "Power2",
    //   delay: 300,
    //   onComplete: () => {
    //     this.showUIElements([panda, text1, text2, btn, footer]);
    //   },
    // });
    const timeline = this.add.timeline([
      {
        at: 0,
        tween: {
          targets: logo,
          x: 120,
          duration: 1000,
          ease: "Power2",
        },
      },
      {
        from: 300,
        tween: {
          targets: panda,
          x: centerX,
          alpha: 1,
          duration: 1000,
          ease: "Power2",
        },
      },
      {
        from: 300,
        tween: {
          targets: text1,
          y: 0,
          alpha: 1,
          duration: 800,
          ease: "Back.Out",
        },
      },
      {
        from: 300,
        tween: {
          targets: btn,
          scale: 1, 
          alpha: 1,
          ease: "Back.Out", 
          duration: 600,
        },
      },
      {
        from: 300,
        tween: {
          targets: text2,
          scale: 1,
          alpha: 1,
          ease: "Back.Out",
          duration: 1000,
        },
      },
    ]);

    timeline.play();
  }

  update() {}
}
