class Goose {
  sprites = [];

  // Setting
  moveSpeed = 2;

  // Physics
  // Position
  x = 0;
  y = 0;
  // Velocity
  xVelocity = 0;
  yVelocity = 0;

  // Animation state
  goose;
  idleRight;
  idleLeft;
  walkingRight;
  walkingLeft;
  jumpingRight;
  jumpingLeft;

  // Physics state
  isFacingRight = true;
  isJumping = false;

  // Bounding box values
  gooseRight;
  gooseTop;
  gooseLeft;
  gooseBottom;

  // Collision with ground
  isOnBlock = false;
  groundYPosition;

  constructor() {
    this.idleRight = new Sprite({
      src: './assets/img/idle-right.png',
      frameCount: 2,
    });

    this.idleRight.animation = new AnimationFrame(2, () =>
      this.idleRight.nextFrame()
    );
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

    this.walkingRight.animation = new AnimationFrame(6, () =>
      this.walkingRight.nextFrame()
    );
    this.walkingRight.animation.start();

    this.walkingLeft = new Sprite({
      src: './assets/img/walk-left.png',
      frameCount: 3,
    });
    this.walkingLeft.animation = new AnimationFrame(6, () =>
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
  }

  walkLeft() {
    this.xVelocity = -1 * this.moveSpeed;
  }

  walkRight() {
    this.xVelocity = 1 * this.moveSpeed;
  }

  jump() {
    if (this.isJumping === false) {
      this.yVelocity = -18.5;
    }
  }

  // Update goose's physics state based on goose's velocity
  checkPhysicsState() {
    if (this.yVelocity !== 0) {
      this.isJumping = true;
    } else {
      this.isJumping = false;
    }

    if (this.xVelocity > 0) {
      this.isFacingRight = true;
    } else if (this.xVelocity < 0) {
      this.isFacingRight = false;
    }
  }

  // Update goose's animation state based on goose's velocity and physics state
  updateAnimationState() {
    if (
      this.xVelocity == 0 &&
      this.yVelocity == 0 &&
      this.isFacingRight == true
    ) {
      this.goose = this.idleRight;
    } else if (
      this.xVelocity == 0 &&
      this.yVelocity == 0 &&
      this.isFacingRight == false
    ) {
      this.goose = this.idleLeft;
    } else if (
      this.xVelocity != 0 &&
      this.isJumping == false &&
      this.isFacingRight == true
    ) {
      this.goose = this.walkingRight;
    } else if (
      this.xVelocity != 0 &&
      this.isJumping == false &&
      this.isFacingRight == false
    ) {
      this.goose = this.walkingLeft;
    } else if (
      this.xVelocity != 0 &&
      this.isJumping == true &&
      this.isFacingRight == true
    ) {
      this.goose = this.jumpingRight;
    } else if (
      this.xVelocity != 0 &&
      this.isJumping == true &&
      this.isFacingRight == false
    ) {
      this.goose = this.jumpingLeft;
    }
  }

  solveX(xVelocity, yVelocity) {
    let finalXVelocity = xVelocity;

    this.gooseRight = this.goose.x + this.goose.width;
    this.gooseLeft = this.goose.x;
    this.gooseBottom = this.goose.y + this.goose.height;
    this.gooseTop = this.goose.y;

    blocks.forEach((block) => {
      if (
        this.gooseRight + xVelocity >= block.x &&
        this.gooseLeft + xVelocity <= block.x + block.width
      ) {
        if (this.gooseBottom > block.y) {
          finalXVelocity = 0;
        }
      }
      return;
    });

    this.xVelocity = finalXVelocity;
    this.goose.x += this.xVelocity;
    this.xVelocity = 0;

    // Set the border
    if (this.goose.x + this.xVelocity <= this.x) {
      this.goose.x = 0;
      this.xVelocity = 0;
    }
    if (this.goose.x + this.goose.width + this.xVelocity >= canvas.width) {
      this.goose.x = canvas.width - this.goose.width;
      this.xVelocity = 0;
    }
  }

  solveY(xVelocity, yVelocity) {
    let finalYVelocity = yVelocity;

    this.gooseRight = this.goose.x + this.goose.width;
    this.gooseLeft = this.goose.x;
    this.gooseBottom = this.goose.y + this.goose.height;
    this.gooseTop = this.goose.y;

    // Check if the goose is above any block
    let checkIsOnBlock = false;

    for (let i = 0; i < blocks.length; i++) {
      // If the goose is above a block, set the block as ground position
      if (
        this.gooseRight + xVelocity >= blocks[i].x &&
        this.gooseLeft + xVelocity <= blocks[i].x + blocks[i].width
      ) {
        if (this.gooseBottom <= blocks[i].y) {
          checkIsOnBlock = true;
          this.groundYPosition = blocks[i].y - this.goose.height;
        }
      }
    }

    // If checkIsOnBlock is true, goose is on top of one of the blocks
    if (checkIsOnBlock)
      // flag the isOnBlock to true
      this.isOnBlock = true;
    else this.isOnBlock = false;

    // update y velocity
    this.yVelocity = finalYVelocity;
    // update y position
    this.goose.y += this.yVelocity;
    // apply gravity
    this.yVelocity += 1.5;

    // Set the goose's y position to ground position if isOnBlock flag is true and the goose's y position is below the ground position
    if (this.isOnBlock && this.goose.y >= this.groundYPosition) {
      this.goose.y = this.groundYPosition;
      this.yVelocity = 0;
    }
        // if (this.isOnBlock && this.goose.y <= 250) {
        //   this.goose.y = 326 - this.goose.height;
        //   this.yVelocity = 0;
        // }

    // If the goose is below the red line then put it back to the line
    if (this.goose.y + this.goose.image.height + 55 >= canvas.height) {
      this.goose.y = 461;
      this.yVelocity = 0;
    }
  }

  updatePosition(x, y) {
    for (let i = 0; i < this.sprites.length; i++) {
      const sprite = this.sprites[i];
      sprite.x = x;
      sprite.y = y;
    }
  }

  tick() {
    // Update goose's physics state based on gooses' velocity
    this.checkPhysicsState();

    // Update goose's animation state based on goose's velocity and physics state
    this.updateAnimationState();

    // Apply the velocity values to position
    this.solveX(this.xVelocity, this.yVelocity);
    this.solveY(this.xVelocity, this.yVelocity);

    // Update goose's position
    this.updatePosition(this.goose.x, this.goose.y);

    // Draw the goose sprite
    this.goose.draw();
  }
}
