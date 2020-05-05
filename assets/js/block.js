class Block {
  wood;
  brick;

  x = 352;
  y = 436;
  width = 64;
  height = 64;

  image;
  src;

  types = [
    'assets/img/block-wood.png',
    'assets/img/block-brick.png',
    'assets/img/block-concrete.png',
  ];

  // options = {x, y, width, height, level, type}
  constructor(options = {}) {
    this.x = options.x ?? this.x;
    this.y = options.y ?? this.y;

    if (options.level) {
      this.y = this.y - this.height * options.level;
    }

    this.src = this.types[options.type ?? 0];

    this.image = new Image();
    this.image.onload = () => {
      this._draw();
    };
    this.image.src = this.src;
  }

  _draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  tick() {
    this._draw();
  }
}

// function createBlocks(howMany = 1, options = {}) {
//   const blocks = [];
//   for (let index = 0; index < howMany; index++) {
//     blocks.push(new Block(options));
//   }

//   return blocks;
// }
