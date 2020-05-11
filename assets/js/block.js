class Block {
  // Setting
  moveSpeed = 2;

  // Position
  x = 352;
  y = 481;
  width = 64;
  height = 64;

  // Velocity
  xVelocity = 0;
  yVelocity = 0;

  // Images and source
  image;
  src;
  types = [
    'assets/img/block-wood.png',
    'assets/img/block-brick.png',
    'assets/img/block-concrete.png',
  ];

  // options = {x, y, width, height, level, type}
  constructor(options = {}) {
    // ?? Means use the value behind it if not provided
    this.x = options.x ?? this.x;
    this.y = options.y ?? this.y;

    if (options.level) {
      this.y = this.y - this.height * options.level;
    }

    this.src = this.types[options.type ?? 0];

    this.image = new Image();
    this.image.onload = () => {
      this.draw();
    };
    this.image.src = this.src;
  }

  // Load images
  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  moveLeft() {
    this.xVelocity = -1 * this.moveSpeed;

  }

  moveRight () {
    this.xVelocity = 1 * this.moveSpeed;
  }


  updatePosition() {
    this.x += this.xVelocity;
    this.xVelocity = 0;
  }

  tick() {
    this.draw();
    this.updatePosition();
  }
}
