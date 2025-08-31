class Enemy extends Sprite {
  constructor({
    position,
    width,
    height,
    speed = 1,
    velocity,
    attackForce = 0.5,
    indexBlock,
    imageSrc,
    offset,
    frameMax,
    scale,
    direction,
    inverter = false,
    framesHold,
    life,
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
    this.velocity = velocity;
    this.speed = speed;
    this.attackForce = attackForce;
    this.indexBlock = indexBlock;
    this.direction = direction;
    this.life = life;
  }

  update(index) {
    if (this.indexBlock < 0 || this.life <= 0) {
      enemys.splice(index, 1);
      return;
    }
    this.move();
    this.verifyActions();
    this.demage(index);
    this.attack();
    this.updateSprite();
  }

  move() {
    if (this.position.x <= platformsBlocks[this.indexBlock].position.x) {
      this.direction.right = true;
      this.direction.left = false;
      this.inverter = true
    }
    if (
      this.position.x + this.width >
      platformsBlocks[this.indexBlock].position.x +
      platformsBlocks[this.indexBlock].width
    ) {
      this.direction.left = true;
      this.direction.right = false;
      this.inverter = false
    }
  }

  verifyActions() {
    this.velocity.x = 0;

    if (this.direction.left) {
      this.velocity.x = -this.speed;
    }
    if (this.direction.right) {
      this.velocity.x = this.speed;
    }

    this.position.x += this.velocity.x;
  }

  demage() {
    if (
      player.status.attack &&
      collision({ object1: this, object2: player.attackBox })
    ) {
      this.life -= 1;
    }
  }

  attack() {
    if (collision({ object1: this, object2: player })) {
      player.demage(this.attackForce);
    }
  }
}
