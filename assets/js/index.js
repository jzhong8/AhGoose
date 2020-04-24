const canvas = document.querySelector('.game');
const ctx = canvas.getContext('2d');

// const animation = new AnimationFrame(3, () => update());

const goose = new Goose();

let blockWood;
let blockBrick;

function init() {
  // blockWood = new Sprite({
  //   src: './assets/img/block-wood.png',
  //   frameCount: 1,
  // });
  // blockWood.onload = () => {
  //   blockWood.draw();
  // };
}

function tick() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  goose.tick();

  window.requestAnimationFrame(tick);
}



function onKeyDown(event) {
  const key = event.key.toLowerCase();

  if (key === 'a') {
    goose.moveLeft();
  } else if (key === 'd') {
    goose.moveRight();

    
  }
}

document.addEventListener('keydown', onKeyDown);

init();
