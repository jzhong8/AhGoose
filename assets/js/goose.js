class Goose {
  sprites = [];
  idle;
  walkingRight;
  walkingLeft;
  jumpingRight;
  jumpingLeft;

  moveSpeed = 10;

  x = 100;
  y = 300;

  goose;

  constructor() {
    this.idle = new Sprite({
      src: './assets/img/idle-border.png',
      frameCount: 2,
    });

    this.idle.animation = new AnimationFrame(7, () => this.idle.draw());
    this.idle.animation.start();

    this.walkingRight = new Sprite({
      src: './assets/img/walking-right.png',
      frameCount: 3,
    });

    this.walkingLeft = new Sprite({
      src: './assets/img/walking-left.png',
      frameCount: 3,
    });

    this.jumpingRight = new Sprite({
      src: './assets/img/jumping-right.png',
      frameCount: 3,
    });

    this.jumpingLeft = new Sprite({
      src: './assets/img/jumping-left.png',
      frameCount: 3,
    });

    this.sprites.push(
      this.idle,
      this.walkingRight,
      this.walkingLeft,
      this.jumpingRight,
      this.jumpingLeft
    );

    this.goose = this.idle;

    this.updateLocation(this.x, this.y);
    this.tick();
  }

  moveLeft() {
    this.goose = this.walkingLeft;
    this.goose.x -= this.moveSpeed;

    this.updateLocation(goose.x, goose.y);
  }

  moveRight() {
    this.goose = this.walkingRight;
    console.log(this.goose.src, this.goose.x, this.moveSpeed);

    this.goose.x += this.moveSpeed;

    this.updateLocation(goose.x, goose.y);
  }

  tick() {
    this.goose.draw();
    this.goose.nextFrame();
  }

  updateLocation(x, y) {
    for (let i = 0; i < this.sprites.length; i++) {
      const sprite = this.sprites[i];
      //console.log(sprite);

      sprite.x = x;
      sprite.y = y;
    }
  }
}

// x = 0;
// y = 0;

// _image;
// _imageLocation = './assets/img/walking-right.png';
// _spriteWidth = 80;
// _spriteHeight = 80;
// _spriteFrames = 3;
// _currentFrame = 0;
// _spriteX = this._spriteWidth;
// _walkingAnimation;

// constructor() {
//   this.walkingRight = new Sprite({
//     src: './assets/img/walking-right.png',
//     frameCount: 3,
//   });

//   // Draw current frame (frame 0)
//   this.walkingRight.draw();

//   // Go to next frame
//   this.walkingRight.nextFrame();

//   this._walkingAnimation = new AnimationFrame(10, () => this._update());
//   this._walkingAnimation.start();

//   this._loadImage();
// }

// _update() {
//   console.log('Goose: _update');
//   this._currentFrame++;
//   if (this._currentFrame % this._spriteFrames == 0) {
//     this._currentFrame = 0;
//   }
// }

// tick() {
//   this.draw();
// }
//}
