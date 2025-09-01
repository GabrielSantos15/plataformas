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
    faceRight,
    inverter = false,
    framesHold,
    life,
    fly = false,
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
    this.faceRight = faceRight;
    this.fly = fly;
  }

  update(index) {
    if (this.indexBlock < 0 || this.life <= 0) {
      console.log(enemys[index].position.y)
      particles.push(
        new Particle({
          position: {
            x: enemys[index].position.x,
            y: enemys[index].position.y,
          },
          width: 30,
          height: 30,
          imageSrc : "assets/Enemy/deathParticle.png",
          frameMax: {x:7,y:1},
          offset: { x: 0, y: 0 },
          scale: 2,
          framesHold: 15,
        })
      );
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
    if (!this.fly) {
      if (this.position.x <= platformsBlocks[this.indexBlock].position.x) {
        this.direction.right = true;
        this.direction.left = false;
        this.inverter = !this.faceRight;
      }
      if (
        this.position.x + this.width >
        platformsBlocks[this.indexBlock].position.x +
          platformsBlocks[this.indexBlock].width
      ) {
        this.direction.left = true;
        this.direction.right = false;
        this.inverter = this.faceRight;
      }
    } else {
      if (this.position.x + this.width < player.position.x) {
        this.direction.right = true;
        this.direction.left = false;
        this.inverter = !this.faceRight;
      }
      if (this.position.x > player.position.x) {
        this.direction.left = true;
        this.direction.right = false;
        this.inverter = this.faceRight;
      }
      if (this.position.y + this.height < player.position.y) {
        this.direction.down = true;
        this.direction.up = false;
      }
      if (this.position.y > player.position.y) {
        this.direction.up = true;
        this.direction.down = false;
      }
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
    this.velocity.y = 0;

    if (this.direction.down) {
      this.velocity.y = +this.speed;
    }
    if (this.direction.up) {
      this.velocity.y = -this.speed;
    }

    this.position.y += this.velocity.y;
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
