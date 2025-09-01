canvas = document.querySelector("canvas");
ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gravity = 0.1;
let gameOver = false;
let debugMode = false;

const platformsBlocks = [
  new Block({
    position: { x: 0, y: 0 },
    width: 1500,
    height: 100,
  }),
];
const enemys = [];

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
    y: -70,
  },
  life: 5,
  speed: 3,
  jumpForce: 8,
  status: {
    damageState: false,
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
  attackBox: {
    width: 70,
    height: 80,
    position: {
      x: 0,
      y: -70,
    },
    offset: { x: 40, y: 10 },
  },
  doubleJump: true,
  imageSrc: "assets/Player/sprites.png",
  scale: 2.5,
  frameMax: {
    x: 12,
    y: 11,
  },
  offset: { x: 115, y: 170 },
  inverter: false,
});
// =================================== Gerenciador do jogo ============================

createNewPlatform(player);
createNewPlatform(player);
createNewPlatform(player);
createNewPlatform(player);

function game() {
  if (gameOver) {
    document.querySelector("#gameOverContainer").style.display = "flex";
    return;
  }
  ctx.setTransform(1, 0, 0, 1, 0, 0); // reseta transformações
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // aplica deslocamento da câmera
  ctx.translate(-player.camerabox.position.x, -player.camerabox.position.y);

  platformsBlocks.forEach((block, index) => {
    block.update(index);
  });
  enemys.forEach((enemy, index) => {
    enemy.update(index);
  });
  player.update();

  showInfos();

  requestAnimationFrame(game);
}

function play() {
  game();
  document.querySelector("#menu").style.display = "none";
}

window.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  switch (key) {
    case "w":
      if (player.velocity.y == 0) {
        player.velocity.y -= player.jumpForce;
      } else if (player.doubleJump) {
        player.velocity.y = 0;
        player.velocity.y -= player.jumpForce * 0.75;
        player.doubleJump = false;
      }
      break;
    case "a":
      player.direction.left = true;
      player.inverter = false;
      break;
    case "s":
      player.direction.down = true;
      break;
    case "d":
      player.direction.right = true;
      player.inverter = true;
      break;
    case "e":
      debugMode ? (debugMode = false) : (debugMode = true);
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

window.addEventListener("click", (event) => {
  player.attack();
});

play();
