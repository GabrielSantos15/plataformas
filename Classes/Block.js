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
    }
    this.draw();
  }

  draw() {
    ctx.fillStyle = "#ff000088";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
