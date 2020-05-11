const canvas = document.querySelector('.game');
const ctx = canvas.getContext('2d');
const image = document.getElementById('wood');

const goose = new Goose();
const map = new Map();
const blocks = [];

blocks.push(
  new Block({
    x: 300,
    level: 0,
  })
);

// blocks.push(
//   new Block({
//     x: 300,
//     level: 1,
//   })
// );

blocks.push(
  new Block({
    x: 836,
    level: 0,
    type: 1,
  })
);

blocks.push(
  new Block({
    x: 836,
    level: 1,
    type: 1,
  })
);

// TODO: Remove this and replace with an actual floor
function drawFloor() {
  ctx.beginPath();
  ctx.moveTo(0, 326);
  ctx.lineTo(900, 326);
  // ctx.stroke();
  ctx.strokeStyle = 'red';
}

function tick() {
  // clear screen
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // call all tick functions
  //background.tick();
  map.tick();
  blocks.forEach((block) => {
    block.tick();
  });
  goose.tick();

  move();
  push();
  drawFloor();

  // call tick again
  window.requestAnimationFrame(tick);
}

function move() {
  if (key.isDown(key.LEFT)) {
    goose.walkLeft();
  }

  if (key.isDown(key.UP)) {
    goose.jump();
    bounceSound.play();
  }

  if (key.isDown(key.RIGHT)) {
    goose.walkRight();
  }
}

function push() {
  for (let i = 0; i < blocks.length; i++) {
    console.log(
      goose.goose.x,
      goose.goose.width,
      goose.xVelocity,
      goose.yVelocity,
      blocks[i].x
    );

    if (
      goose.goose.x + goose.goose.width + goose.xVelocity >= blocks[i].x &&
      goose.goose.x + goose.xVelocity <= blocks[i].x + 20 &&
      goose.goose.y == 461 &&
      key.isDown(key.RIGHT)
    ) {
      blocks[i].moveRight();
    }
    if (
      goose.goose.x + goose.xVelocity <= blocks[i].x + blocks[i].width &&
      goose.goose.x + goose.xVelocity >= blocks[i].x + blocks[i].width - 20 &&
      goose.goose.y == 461 &&
      key.isDown(key.LEFT)
    ) {
      blocks[i].moveLeft();
    }
  }
}

introSound = new Audio('assets/audio/josepharaoh99-bouncy-sound.mp3');
introSound.play();

bgm = new Audio('assets/audio/sky-puzzle.mp3');
bgm.volume = 0.5;
bgm.addEventListener(
  'ended',
  function () {
    this.currentTime = 0;
    this.play();
  },
  false
);
bgm.play();

bounceSound = new Audio('assets/audio/josepharaoh99-bounce.wav');
bounceSound.volume = 0.3;

tick();
