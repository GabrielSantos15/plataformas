class Enemy extends Sprite {
  constructor({
    position,
    width,
    height,
    speed = 1,
    attackForce,
    indexBlock,
    imageSrc,
    offset,
    frameMax,
    scale,
    inverter = false,
    framesHold,
  }) {
    super({
      width,
      height,
      position,
      imageSrc,
      frameMax,
      offset,
      scale,
      inverter,
      framesHold,
    });
    this.position = position;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.attackForce = attackForce;
    this.indexBlock = indexBlock;
    this.direction = Math.random() > 0.5 ? "left" : "right";
  }

  update(index) {
    if (this.indexBlock < 0) {
      enemys.splice(index, 1);
      return;
    }
    this.move();
    this.attack();
    this.updateSprite();
  }

  attack() {
    if (collision({ object1: this, object2: player })) {
      alert("Game Over");
    }
  }

  move() {
    if (this.direction == "left") {
      this.inverter = false;
      this.position.x -= this.speed;
    }
    if (this.direction == "right") {
      this.inverter = true;
      this.position.x += this.speed;
    }

    if (this.position.x < platformsBlocks[this.indexBlock].position.x)
      this.direction = "right";
    if (
      this.position.x + this.width >
      platformsBlocks[this.indexBlock].position.x +
        platformsBlocks[this.indexBlock].width
    )
      this.direction = "left";
  }
}
