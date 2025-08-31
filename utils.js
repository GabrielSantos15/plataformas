function collision({ object1, object2 }) {
  return (
    object1.position.y + object1.height >= object2.position.y &&
    object1.position.y <= object2.position.y + object2.height &&
    object1.position.x <= object2.position.x + object2.width &&
    object1.position.x + object1.width >= object2.position.x
  );
}

function createNewPlatform(player) {
  const lastPlatform = platformsBlocks[platformsBlocks.length - 1];
  const jumpForce = player.jumpForce || 8;
  // limite de altura baseado no pulo do player
  const maxJumpHeight = (jumpForce * jumpForce) / (2 * gravity);

  // player
  const positionY =
    lastPlatform.position.y - randomNumber(200, maxJumpHeight) + 10;

  // largura variável
  const width = randomNumber(30, 350);

  // deslocamento horizontal
  let offsetX = randomNumber(100, 250);
  let positionX =
    Math.random() > 0.5
      ? lastPlatform.position.x + offsetX
      : lastPlatform.position.x - offsetX;

  // garantir que não fique exatamente em cima
  // se estiver quase alinhado, força um pequeno deslocamento
  if (Math.abs(positionX - lastPlatform.position.x) < width / 2) {
    positionX += randomNumber(100, 150) * (Math.random() > 0.5 ? 1 : -1);
    positionX = Math.max(0, Math.min(positionX, canvas.width - width));
  }

  platformsBlocks.push(
    new Block({
      position: { x: positionX, y: positionY },
      width,
      height: 50,
    })
  );

  if (width > 200) {
    createNewEnemy(platformsBlocks.length - 1);
  }
}

function createNewEnemy(indexBlock) {
  const directionRandom =  Math.random() > 0.5 ? "left" : "right"
  enemys.push(
    new Enemy({
      position: {
        x:
          platformsBlocks[indexBlock].position.x +
          platformsBlocks[indexBlock].width / 2,
        y: platformsBlocks[indexBlock].position.y - 40,
      },
      width: 50,
      height: 40,
      speed: 1,
      velocity: {
        x: 0,
        y: 0,
      },
      attackForce: 1,
      indexBlock: indexBlock,
      imageSrc: "assents/Enemy/Frog.png",
      scale: 1.5,
      frameMax: {
        x: 2,
        y: 1,
      },
      offset: { x: 15, y: 20 },
      inverter:  directionRandom == "right",
      framesHold: 15,
      life: 2,
      direction: {
        up: false,
        down: false,
        right: directionRandom == "right",
        left: directionRandom == "left",
      },
    })
  );
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function showInfos() {
  document.querySelector("#altura").innerHTML = Math.floor(
    ((player.position.y + player.height) * -1) / 100
  );
  document.querySelector("#life").innerHTML = player.life;
}

function writeInfos() {
  ctx.font = "50px Times New Roman"; // Muda a fonte para demonstrar
  ctx.fillStyle = "red"; // Muda a cor
  ctx.strokeStyle = "black"; // Cor da linha de contorno
  ctx.strokeText("Utilize a teclas E para ATACAR", 50, 100); // Usa strokeText()
}
