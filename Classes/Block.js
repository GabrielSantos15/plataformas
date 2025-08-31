class Block {
  constructor({ position, width = 30, height = 30 }) {
    this.position = position;
    this.width = width;
    this.height = height;
  }

  update(index) {
    if (this.position.y > player.camerabox.position.y + canvas.height + 100) {
      createNewPlatform(player);
      platformsBlocks.splice(index, 1); // remove só o bloco atual
      enemys.forEach((enemy) => {
        enemy.indexBlock -= 1;
      });
    }
    this.draw();
  }

  draw() {
    ctx.fillStyle = "#1d0000ff";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    ctx.fillStyle = "#005a26ff";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height * 0.3);
    ctx.fillStyle = "#0e6e58ff";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height * 0.1);
  }
}
