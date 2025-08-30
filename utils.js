function createNewPlatform(player) {
  const lastPlatform = platformsBlocks[platformsBlocks.length - 1];
  const jumpForce = player.jumpForce || 8
  // limite de altura baseado no pulo do player
  const maxJumpHeight = (jumpForce * jumpForce) / (2 * gravity);

  // player
  const positionY = lastPlatform.position.y - randomNumber(200, maxJumpHeight) + 10;

  // largura variável
  const width = randomNumber(80, 250);

  // deslocamento horizontal
  let offsetX = randomNumber(80, 300);
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
      height: 100,
    })
  );
}


function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
