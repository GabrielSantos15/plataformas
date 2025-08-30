canvas = document.querySelector("canvas");
ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gravity = 0.1;

const platformsBlocks = [
  new Block({
    position: { x: 0, y: canvas.height - 30 },
    width: canvas.width,
    height: 30,
  }),
];

const camera = {
  position: {
    x: 0,
    y: 0,
  },
};
// =================================== Informações do jogador ============================
const player = new Player({
  width: 50,
  height: 70,
  position: {
    x: 0,
    y: 700,
  },
  speed: 3,
  jumpForce: 8,
  status: {
    atack: false,
    defend: false,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  direction: {
    up: false,
    down: false,
    right: false,
    left: false,
  },
});
// =================================== Gerenciador do jogo ============================


createNewPlatform(player)
createNewPlatform(player)
createNewPlatform(player)

function game() {
  ctx.setTransform(1, 0, 0, 1, 0, 0); // reseta transformações
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // aplica deslocamento da câmera
  ctx.translate(-player.camerabox.position.x, -player.camerabox.position.y);
  player.update();

  platformsBlocks.forEach((block,index) => {
    block.update(index);
  });

  requestAnimationFrame(game);
}
game();

ctx.fillRect(0, 0, 50, 50);

window.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  switch (key) {
    case "w":
      if (player.velocity.y == 0) player.velocity.y -= player.jumpForce;
      break;
    case "a":
      player.direction.left = true;
      break;
    case "s":
      player.direction.down = true;
      break;
    case "d":
      player.direction.right = true;
      break;
  }
});
window.addEventListener("keyup", (event) => {
  const key = event.key.toLowerCase();
  switch (key) {
    case "a":
      player.direction.left = false;
      break;
    case "s":
      player.direction.down = false;
      break;
    case "d":
      player.direction.right = false;
      break;
  }
});
