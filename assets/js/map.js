class Map {
  image;
  src;

  x= 0;
  y= -400;

  width = 1000;
  height = 1000;

  src = 'assets/img/map.png';

  constructor() {
    this.image = new Image();
    this.image.src = this.src;
  }

  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  tick() {
    this.draw();
  }
}

