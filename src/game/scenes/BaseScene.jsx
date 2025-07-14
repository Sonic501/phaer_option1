export default class BaseScene extends Phaser.Scene {
  constructor(key) {
    super(key);
    this.sceneKey = key;
  }

  createVolumeButton(x = 720, y = 50) {
    this.volumeBtn = this.add
      .image(x, y, this.sound.mute ? "mute" : "volume")
      .setDisplaySize(40, 40)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        this.sound.mute = !this.sound.mute;
        this.volumeBtn.setTexture(this.sound.mute ? "mute" : "volume");
      });

    return this.volumeBtn;
  }

  fadeToScene(targetScene, duration = 500, data = {}) {
    this.cameras.main.fadeOut(duration, 0, 0, 0);

    this.cameras.main.once("camerafadeoutcomplete", () => {
      this.scene.start(targetScene, data);
    });
  }
}
