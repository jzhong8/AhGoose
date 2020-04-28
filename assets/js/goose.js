class Goose {
  sprites = [];
  idleRight;
  idleLeft;
  walkingRight;
  walkingLeft;
  jumpingRight;
  jumpingLeft;
  isFacingRight;
  isJumping;

  moveSpeed = 2;

  isFacingRight = true;


  x = 100;
  y = 0;

  xVelocity = 0;
  yVelocity = 0;

  goose;

  constructor() {
    this.idleRight = new Sprite({
      src: './assets/img/idle-right.png',
      frameCount: 2,
    });

    this.idleRight.animation = new AnimationFrame(2, () => this.idleRight.nextFrame());
    this.idleRight.animation.start();

    this.idleLeft = new Sprite({
      src: './assets/img/idle-left.png',
      frameCount: 2,
    });

    this.idleLeft.animation = new AnimationFrame(2, () =>
      this.idleLeft.nextFrame()
    );
    this.idleLeft.animation.start();

    this.walkingRight = new Sprite({
      src: './assets/img/walk-right.png',
      frameCount: 3,
    });

    this.walkingRight.animation = new AnimationFrame(3, () =>
      this.walkingRight.nextFrame()
    );
    this.walkingRight.animation.start();

    this.walkingLeft = new Sprite({
      src: './assets/img/walk-left.png',
      frameCount: 3,
    });
    this.walkingLeft.animation = new AnimationFrame(3, () =>
      this.walkingLeft.nextFrame()
    );
    this.walkingLeft.animation.start();

    this.jumpingRight = new Sprite({
      src: './assets/img/jump-right.png',
      frameCount: 4,
    });

    this.jumpingRight.animation = new AnimationFrame(4, () =>
      this.jumpingRight.nextFrame()
    );
    this.jumpingRight.animation.start();

    this.jumpingLeft = new Sprite({
      src: './assets/img/jump-left.png',
      frameCount: 4,
    });

    this.jumpingLeft.animation = new AnimationFrame(4, () =>
      this.jumpingLeft.nextFrame()
    );
    this.jumpingLeft.animation.start();

    this.sprites.push(
      this.idleRight,
      this.idleLeft,
      this.walkingRight,
      this.walkingLeft,
      this.jumpingRight,
      this.jumpingLeft
    );

    this.goose = this.idleRight;

    this.updateLocation(this.x, this.y);
    this.tick();
  }

  idle(){
    if (this.xVelocity == 0 && this.yVelocity == 0 && this.isFacingRight == true){
         this.goose = this.idleRight;
         this.isFacingRight = true;
      }
    else if (this.xVelocity == 0 && this.yVelocity == 0 && this.isFacingRight == false){
             this.goose = this.idleLeft;
             this.isFacingRight = false;
           }

  }

  walkLeft() {
    if (this.yVelocity === 0) {
      this.goose = this.walkingLeft;
    }
    // this.goose.x -= this.moveSpeed;
    this.xVelocity = -1 * this.moveSpeed;
    this.isFacingRight = false;
  }

  walkRight() {
    if (this.yVelocity === 0) {
      this.goose = this.walkingRight;
    }
    // this.goose.x += this.moveSpeed;
    this.xVelocity = 1 * this.moveSpeed;
    this.isFacingRight = true;
  }

  jump() {
    if (this.isJumping === false) {
                                   if (this.isFacingRight) {
                                     this.goose = this.jumpingRight;
                                     this.isFacingRight = true;
                                   } else {
                                     this.goose = this.jumpingLeft;
                                     this.isFacingRight = false;
                                   }
                                   this.yVelocity = -20 ;
                                 }
  }

  gravity() {
    this.goose.y += this.yVelocity;
    this.yVelocity += 1.5;

    if (this.goose.y + this.goose.image.height + 100 >= canvas.height) {
      this.goose.y = 416;
      this.yVelocity = 0;
    }
  }

  tick() {
    this.goose.draw();
    this.goose.x += this.xVelocity;
    if (this.yVelocity !== 0){
      this.isJumping = true;
    } else {
      this.isJumping = false;
    }
    this.idle();
    this.xVelocity = 0;
    this.gravity();
    this.updateLocation(this.goose.x, this.goose.y);
    console.log(this.goose.y, this.xVelocity, this.yVelocity, this.isJumping);
  }

  updateLocation(x, y) {
    for (let i = 0; i < this.sprites.length; i++) {
      const sprite = this.sprites[i];
      // console.log(sprite);

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
