class Player extends Sprite {
  constructor({
    width,
    height,
    position,
    direction,
    velocity,
    speed,
    life,
    jumpForce,
    doubleJump,
    imageSrc,
    scale,
    frameMax,
    offset,
    inverter,
    status,
    attackBox,
    damageProtection = false,
  }) {
    super({
      width,
      height,
      position,
      imageSrc,
      scale,
      frameMax,
      offset,
      inverter,
    });

    this.width = width;
    this.height = height;
    this.life = life;
    this.speed = speed;
    this.jumpForce = jumpForce;
    this.doubleJump = doubleJump;
    this.direction = direction;
    this.position = position;
    this.attackBox = attackBox;
    this.velocity = velocity;
    this.damageProtection = damageProtection;
    this.status = status;
    this.camerabox = {
      position: {
        x: this.position.x - 90,
        y: this.position.y - 30,
      },
      width: canvas.width,
      height: canvas.height,
    };
  }
  update() {
    if (this.life == 0) {
      gameOver = true;
    }
    this.updateCamerabox();
    this.verifyActions();
    this.applyGravity();
    this.checkCollisions();
    this.checkForHorizontalCollisions();
    this.checkForVerticalCollisions();

    this.controlSprite();
    if (debugMode && this.status.attack) {
      ctx.fillStyle = "#f00e";
      ctx.fillRect(
        this.attackBox.position.x,
        this.attackBox.position.y,
        this.attackBox.width,
        this.attackBox.height
      );
    }
    this.updateSprite();
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

  applyGravity() {
    this.direction.up = this.velocity.y > 0;
    this.velocity.y += gravity;
    this.position.y += this.velocity.y;
  }

  checkCollisions() {
    if (this.position.y >= platformsBlocks[0].position.y + 500) {
      gameOver = true;
    }
  }

  applyGravity() {
    this.velocity.y += gravity;
    this.position.y += this.velocity.y;
  }

  checkForVerticalCollisions() {
    for (let i = 0; i < platformsBlocks.length; i++) {
      const block = platformsBlocks[i];

      // Colisão de baixo (chão)
      if (
        this.velocity.y > 0 &&
        this.position.y + this.height <= block.position.y + this.velocity.y &&
        this.position.x + this.width > block.position.x &&
        this.position.x < block.position.x + block.width &&
        this.position.y + this.height + this.velocity.y >= block.position.y
      ) {
        this.velocity.y = 0;
        this.position.y = block.position.y - this.height - 0.1;
        this.doubleJump = true;
        if (this.frameCurrent.y == 3) this.frameCurrent.y = 0;
        break;
      }

      // Colisão de cima (batendo a cabeça)
      if (
        this.velocity.y < 0 && // só se estiver subindo
        this.position.y >= block.position.y + block.height &&
        this.position.x + this.width > block.position.x &&
        this.position.x < block.position.x + block.width &&
        this.position.y + this.velocity.y <= block.position.y + block.height
      ) {
        this.velocity.y = 0;
        this.position.y = block.position.y + block.height + 0.1;
        break;
      }
    }
  }
  checkForHorizontalCollisions() {
    for (let i = 0; i < platformsBlocks.length; i++) {
      const block = platformsBlocks[i];

      // Verifica sobreposição vertical (se não há sobreposição, não tem colisão lateral)
      const overlapY =
        this.position.y < block.position.y + block.height &&
        this.position.y + this.height > block.position.y;

      if (overlapY) {
        // Colisão pela direita (indo para frente)
        if (
          this.velocity.x > 0 &&
          this.position.x + this.width + this.velocity.x > block.position.x &&
          this.position.x < block.position.x
        ) {
          this.velocity.x = 0;
          this.position.x = block.position.x - this.width;
        }

        // Colisão pela esquerda (indo para trás)
        if (
          this.velocity.x < 0 &&
          this.position.x + this.velocity.x < block.position.x + block.width &&
          this.position.x + this.width > block.position.x + block.width
        ) {
          this.velocity.x = 0;
          this.position.x = block.position.x + block.width;
        }
      }
    }
  }

  updateCamerabox() {
    this.camerabox = {
      position: {
        x: this.position.x - canvas.width / 2,
        y: this.position.y - 700 + this.height,
      },
      width: canvas.width,
      height: 700,
    };
  }

  controlSprite() {
    // levando dano
    if (this.status.damageState) {
      if (this.frameCurrent.y != 10) {
        this.frameCurrent.x = 0;
        this.frameCurrent.y = 10;
      } else if (this.frameCurrent.x == 6) {
        this.status.damageState = false;
      }
      // atacando
    } else if (this.status.attack) {
      if (!(this.frameCurrent.y >= 6 && this.frameCurrent.y <= 9)) {
        this.frameCurrent.x = 0;
        this.frameCurrent.y = randomNumber(6, 9);
      } else if (this.frameCurrent.x >= this.frameMax.x - 1) {
        this.status.attack = false;
      }
    } else if (this.velocity.y != 0) {
      this.frameCurrent.y = 3;
    } else if (this.direction.left || this.direction.right) {
      this.frameCurrent.y = 1;
    } else {
      this.frameCurrent.y = 0;
      if (this.frameCurrent.x >= 0) this.frameCurrent.x = 0;
    }
  }

  demage(hitForce) {
    if (this.damageProtection) return;
    this.life -= hitForce;
    this.status.damageState = true;
    this.damageProtection = true;
    setTimeout(() => (this.damageProtection = false), 1500);
  }

  attack() {
    this.status.attack = true;
    this.attackBox.position.x = this.inverter
      ? this.position.x +this.width - this.attackBox.offset.x
      : this.position.x - this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y - this.attackBox.offset.y;
  }
}
