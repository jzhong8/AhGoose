const canvas = document.querySelector('.game');
const ctx = canvas.getContext('2d');

// const animation = new AnimationFrame(3, () => update());

const goose = new Goose();

function init() {}

function tick() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  goose.tick();
  window.requestAnimationFrame(tick);
  move();
  ctx.beginPath();
  ctx.moveTo(0, 500);
  ctx.lineTo(900, 500);
  ctx.stroke();
  ctx.strokeStyle = 'red';
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
  };

init();
tick();
