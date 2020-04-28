class Goose {
  sprites = [];
  idle;
  walkingRight;
  walkingLeft;
  jumpingRight;
  jumpingLeft;

  moveSpeed = 10;

  //x = 100;
  //y = 300;
  x = 100;
  y = 10;

  yVelocity = 0;

  goose;

  constructor() {
    this.idle = new Sprite({
      src: './assets/img/idle.png',
      frameCount: 2,
    });

    this.idle.animation = new AnimationFrame(2, () => this.idle.nextFrame());
    this.idle.animation.start();

    this.walkingRight = new Sprite({
      src: './assets/img/walk-right.png',
      frameCount: 3,
    });

    this.walkingLeft = new Sprite({
      src: './assets/img/walk-left.png',
      frameCount: 3,
    });

    this.jumpingRight = new Sprite({
      src: './assets/img/jump-right.png',
      frameCount: 4,
    });

    this.jumpingLeft = new Sprite({
      src: './assets/img/jump-left.png',
      frameCount: 4,
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

  walkLeft() {
    this.goose = this.walkingLeft;
    this.goose.x -= this.moveSpeed;
  }

  walkRight() {
    this.goose = this.walkingRight;
    this.goose.x += this.moveSpeed;
  }

  jumpRight() {
    this.goose = this.jumpingRight;
    this.goose.y -= 100;
    this.goose.x += 50;
  }

  jumpLeft() {
    this.goose = this.jumpingLeft;
    this.goose.y += 100;
    this.goose.x -= 50;
  }

  move() {
    if (key.isDown(key.LEFT)) {
      this.walkLeft();
    }

    // if (key.isDown(key.DOWN)) {
    //   this.moveUp();
    // }

    if (key.isDown(key.RIGHT)) {
      this.walkRight();
    }
  }

  gravity() {
    this.yVelocity += 1.5;

    if (this.goose.y + this.goose.image.height + 20 >= canvas.height) {
      this.yVelocity = 0;
    }

    this.goose.y += this.yVelocity;
  }

  tick() {
    this.goose.draw();

    this.gravity();
    this.updateLocation(this.goose.x, this.goose.y);
    console.log(this.goose.y, this.yVelocity);
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
