class Player {
  constructor({
    width,
    height,
    position,
    direction,
    velocity,
    speed,
    jumpForce,
  }) {
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.jumpForce = jumpForce;
    this.direction = direction;
    this.position = position;
    this.velocity = velocity;
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
    this.updateCamerabox();
    this.verifyActions();
    this.applyGravity();
    this.checkCollisions();
    this.checkForHorizontalCollisions();
    this.checkForVerticalCollisions();

    this.draw();
  }

  draw() {
    // ctx.fillStyle = "#00664d3a";
    // ctx.fillRect(
    //   this.camerabox.position.x,
    //   this.camerabox.position.y,
    //   this.camerabox.width,
    //   this.camerabox.height
    // );

    ctx.fillStyle = "#060";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
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
    if (this.position.y >= canvas.height) {
      // alert("Game Over");
      // window.location.reload();
    }
    // if (this.position.x <= 0) this.position.x = 0;
    // if (this.position.x + this.width >= canvas.width)
    //   this.position.x = canvas.width - this.width;
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
        this.position.y = block.position.y - this.height - .1;
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
        this.position.y = block.position.y + block.height + .1;
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
}
