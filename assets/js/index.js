const canvas = document.querySelector('.game');
const ctx = canvas.getContext('2d');

// const animation = new AnimationFrame(3, () => update());

const goose = new Goose();

function init() {}

function tick() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  goose.tick();
  goose.move();
  window.requestAnimationFrame(tick);
}

// move() {
//   if (key.isDown(key.LEFT)) {
//     this.walkingRight();
//   }

//   if (key.isDown(key.RIGHT)) {
//     this.walkingLeft();
//   }
// }

// document.addEventListener('keydown', onKeyDown);

init();
tick();
