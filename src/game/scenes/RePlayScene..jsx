export default class RePlayScene extends Phaser.Scene {
  constructor() {
    super("RePlayScene");
  }
  preload() {
    this.load.image("s3_logo", "assets/s4_logo.png");
    this.load.image("replay", "assets/s4_play again.png");
    this.load.image("dumpBtn", "assets/s4_discover more.png");
    this.load.image("s4_char", "assets/s4_character.png");
    this.load.image("frame", "assets/s4_videoframe.png");
    this.load.image("text", "assets/s4_text.png");
    this.load.image("yourScore", "assets/s4_Your score.png");
    this.load.video("video", "assets/video.mp4");
  }
  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    const centerX = width / 2;
    const bg = this.add.image(width / 2, height / 2, "bgImg");
    bg.setDisplaySize(width, height);
    bg.setDepth(-1);
    //logo
    const logo = this.add.image(120, 160, "s3_logo");
    const char = this.add.image(centerX, 264, "s4_char");
    const frame = this.add.image(centerX, 550, "frame").setScale(0.7);
    const video = this.add.video(centerX, 550, "video").setScale(0.68);
    video.play();
    const replay = this.add.image(centerX / 2, 750, "replay");
    const dumpBtn = this.add.image((width / 4) * 3, 750, "dumpBtn");
    replay.setInteractive().on("pointerdown", () => {
      this.cameras.main.fadeOut(300, 0, 0, 0);
      this.cameras.main.once("camerafadeoutcomplete", () => {
        console.log("test", this.scene);
        this.scene.transition({
          target: "PlayingScenes",
          duration: 600,
          moveBelow: true,
          onUpdate: null,
          data: {},
        });
      });
    });
  }
}
