/**
 * @typedef {import('phaser3-rex-plugins/templates/ui/ui-plugin.js')} RexUIPlugin
 */
export default class PlayingScenes extends Phaser.Scene {
  /** @type {RexUIPlugin} */
  rexUI;

  constructor() {
    super("PlayingScenes");
  }
  preload() {
    this.load.image("topImg", "assets/s2_image 1.jpg");
    this.load.image("botImg", "assets/s2_image 2.jpg");
    this.load.image("timeUp", "assets/s3_popupbox.png");
    this.load.image("timeUpChar", "assets/s3_popup_character.png");
    this.load.image("bgImg", "assets/s1_bgr.jpg");
    this.load.image("footer2", "assets/s2_legalline.png");
    this.load.image("score", "assets/s2_score.png");
    this.load.image("timer", "assets/s2_time.png");
    this.load.image("popupBox", "assets/s2_popup_box.png");
    this.load.image("popupCharactor", "assets/s2_popup_character.png");
    this.load.audio("tick", "assets/sound/clock/Clock.mp3");
    this.load.audio(
      "correct",
      "assets/sound/Spot the differences/spot_correct.wav"
    );
    this.load.audio(
      "click",
      "assets/sound/Spot the differences/spot_sound.wav"
    );
    // animations
    for (let i = 1; i <= 6; i++) {
      this.load.image(`circle${i}`, `assets/score_check/score_check0${i}.png`);
    }

    // Plugin
    this.load.scenePlugin({
      key: "rexuiplugin",
      url: "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js",
      sceneKey: "rexUI",
    });
  }
  create() {
    const diff = [
      { x: -163, y: 16 },
      { x: -200, y: -26 },
      { x: -80, y: 213 },
      { x: -11, y: 166 },
      { x: 40, y: 67 },
      { x: -48, y: 33 },
      { x: -48, y: 33 },
      { x: -20, y: -20 },
      { x: 187, y: 7.5 },
      { x: 168, y: -120 },
      { x: 199, y: -173 },
    ];
    const TOLERANCE_RADIUS = 40;
    this.maxScore = 10;
    this.score = 0;
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    const centerX = width / 2;
    // bg img

    const bg = this.add.image(width / 2, height / 2, "bgImg");
    bg.setDisplaySize(width, height);
    bg.setDepth(-1);
    this.showPopup();
    //timer
    this.timerBgContainer = this.add.container(90, 130);
    const timerBg = this.add.image(0, 0, "timer");
    this.timerBgContainer.add(timerBg);
    //score
    this.socreBgContainer = this.add.container(680, 130);
    const scoreBg = this.add.image(0, 0, "score");
    this.socreBgContainer.add(scoreBg);

    this.scoreText = this.add
      .text(0, 14, `${this.score} / ${this.maxScore}`, {
        fontSize: "28px",
        color: "#FF0000",
        fontFamily: "Arial",
        fontStyle: "bold",
      })
      .setOrigin(0.5);
    this.socreBgContainer.add(this.scoreText);

    //topImg
    this.topContainer = this.add.container(centerX, height / 4);
    const topImg = this.add.image(0, 0, "topImg").setInteractive();
    this.topContainer.add(topImg);
    //botImg
    this.botContainer = this.add.container(centerX, (height / 4) * 3 - 30);
    const botImg = this.add.image(0, 0, "botImg").setInteractive();
    this.botContainer.add(botImg);

    const footer = this.add.image(centerX, 1000, "footer2");

    //animations
    const handleClick = function (pointer) {
      const clickedImg = this;
      const isTop = clickedImg === topImg;
      const container = isTop
        ? this.scene.topContainer
        : this.scene.botContainer;
      const local = container.getLocalPoint(pointer.x, pointer.y);
      const matchedIndex = diff.findIndex(({ x, y }) => {
        return (
          Phaser.Math.Distance.Between(local.x, local.y, x, y) <=
          TOLERANCE_RADIUS
        );
      });

      if (matchedIndex !== -1) {
        const matched = diff[matchedIndex];
        const worldPointTop = this.scene.topContainer
          .getWorldTransformMatrix()
          .transformPoint(matched.x, matched.y);
        const worldPointBot = this.scene.botContainer
          .getWorldTransformMatrix()
          .transformPoint(matched.x, matched.y);

        this.scene.sound.play("correct");
        this.scene.playCircleAnimation(worldPointTop.x, worldPointTop.y);
        this.scene.playCircleAnimation(worldPointBot.x, worldPointBot.y);
        this.scene.score++;
        this.scene.scoreText.setText(
          `${this.scene.score} / ${this.scene.maxScore}`
        );
        diff.splice(matchedIndex, 1);
        this.scene.checkIfGameFinished();
      } else {
        this.scene.sound.play("click");
      }
    };

    topImg.on("pointerdown", handleClick);
    botImg.on("pointerdown", handleClick);
  }
  playCircleAnimation(x, y) {
    const frames = [
      "circle1",
      "circle2",
      "circle3",
      "circle4",
      "circle5",
      "circle6",
    ];
    let index = 0;

    const sprite = this.add.image(x, y, frames[index]).setDepth(20);

    const timer = this.time.addEvent({
      delay: 80, // ms per frame
      repeat: frames.length - 1,
      callback: () => {
        index++;
        if (index < frames.length) {
          sprite.setTexture(frames[index]);
        } else {
          sprite.setTexture(frames[frames.length - 1]);
        }
      },
    });
  }
  showPopup() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    const overlay = this.add
      .rectangle(0, 0, width, height, 0x000000, 0.6)
      .setOrigin(0)
      .setInteractive()
      .setDepth(10);

    const charactor = this.add.image(0, -80, "popupCharactor");

    const popupBox = this.add.image(0, 80, "popupBox");
    const dialogContainer = this.add
      .container(width / 2, height / 2, [charactor, popupBox])
      .setDepth(11);

    dialogContainer.setScale(0);
    this.tweens.add({
      targets: dialogContainer,
      scale: 1,
      ease: "Back.Out",
      duration: 400,
    });
    let isDialogClosed = false;

    const closeDialog = () => {
      if (isDialogClosed) return;
      isDialogClosed = true;

      this.tweens.add({
        targets: dialogContainer,
        scale: 0,
        duration: 300,
        onComplete: () => {
          overlay.destroy();
          dialogContainer.destroy();
          this.timerBox = this.startCountdown();
        },
      });
    };
    this.time.delayedCall(3000, closeDialog);

    overlay.once("pointerdown", closeDialog);
  }
  timeUpPopup() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    const overlay = this.add
      .rectangle(0, 0, width, height, 0x000000, 0.6)
      .setOrigin(0)
      .setInteractive()
      .setDepth(10);

    const timeUpChar = this.add.image(0, -80, "timeUpChar");

    const timeUp = this.add.image(0, 80, "timeUp");
    const dialogContainer = this.add
      .container(width / 2, height / 2, [timeUpChar, timeUp])
      .setDepth(11);

    dialogContainer.setScale(0);
    this.tweens.add({
      targets: dialogContainer,
      scale: 1,
      ease: "Back.Out",
      duration: 400,
    });
    let isDialogClosed = false;

    const closeDialog = () => {
      if (isDialogClosed) return;
      isDialogClosed = true;

      this.tweens.add({
        targets: dialogContainer,
        scale: 0,
        duration: 300,
        onComplete: () => {
          overlay.destroy();
          dialogContainer.destroy();
          this.scene.start("RePlayScene");
        },
      });
    };
    this.time.delayedCall(3000, closeDialog);

    overlay.once("pointerdown", closeDialog);
  }
  startCountdown(initialTime = 30) {
    const timerText = this.add
      .text(0, 14, String(initialTime), {
        fontSize: "28px",
        color: "#FF0000",
        fontFamily: "Arial",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    this.timerBgContainer.add(timerText);

    let remainingTime = initialTime;
    let tickSound = null;

    const countdownEvent = this.time.addEvent({
      delay: 1000,
      repeat: initialTime - 1,
      callback: () => {
        remainingTime--;
        timerText.setText(String(remainingTime));
        if (remainingTime <= 0) {
          this.timeUpPopup();
        }
        if (remainingTime < initialTime) {
          if (!tickSound || !tickSound.isPlaying) {
            tickSound = this.sound.add("tick");
            tickSound.play();
          }
        }
      },
    });

    return {
      text: timerText,
      stop: () => countdownEvent.remove(false),
      getTime: () => remainingTime,
    };
  }
  checkIfGameFinished() {
    if (this.score >= this.maxScore && !this.hasFinished) {
      this.hasFinished = true;
      this.cameras.main.fadeOut(300, 0, 0, 0);
      this.cameras.main.once("camerafadeoutcomplete", () => {
        this.scene.transition({
          target: "RePlayScene",
          duration: 600,
          moveBelow: true,
          onUpdate: null,
          data: {},
        });
      });
    }
  }
}
