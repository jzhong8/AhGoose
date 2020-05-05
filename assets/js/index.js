const canvas = document.querySelector('.game');
const ctx = canvas.getContext('2d');
const image = document.getElementById('wood');

const goose = new Goose();

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
    x: 500,
    level: 0,
    type: 1,
  })
);

blocks.push(
  new Block({
    x: 500,
    level: 1,
    type: 1,
  })
);

// TODO: Remove this and replace with an actual floor
function drawFloor() {
  ctx.beginPath();
  ctx.moveTo(0, 500);
  ctx.lineTo(900, 500);
  ctx.stroke();
  ctx.strokeStyle = 'red';
}

function tick() {
  // clear screen
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // call all tick functions
  //background.tick();
  blocks.forEach((block) => {
    block.tick();
  });
  goose.tick();

  move();
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
  }

  if (key.isDown(key.RIGHT)) {
    goose.walkRight();
  }
}

tick();
