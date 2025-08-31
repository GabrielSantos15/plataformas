class Sprite {
  constructor({
    width,
    height,
    position,
    imageSrc,
    scale = 1,
    frameMax = { x: 1, y: 1 },
    offset = { x: 0, y: 0 },
    inverter = false,
    framesHold = 5,
  }) {
    this.width = width;
    this.height = height;
    this.position = position;
    this.loaded = false;
    this.image = new Image();
    this.image.onload = () => {
      this.loaded = true;
    };
    this.image.src = imageSrc;
    this.scale = scale;
    this.frameMax = frameMax;
    this.frameCurrent = { x: 0, y: 0 };
    this.framesElapsed = 0;
    this.framesHold = framesHold;
    this.offset = offset;
    this.inverter = inverter;
  }

  draw() {
    ctx.save();
    if (!this.loaded) return;
    
    if(debugMode){
      ctx.fillStyle = "hsla(189, 100%, 50%, 0.40)"
      ctx.fillRect(this.position.x,this.position.y,this.width,this.height)
    }

    if (this.inverter) {
      ctx.scale(-1, 1);
      ctx.translate(-canvas.width, 0);
    }


    ctx.drawImage(
      this.image,
      this.frameCurrent.x * (this.image.width / this.frameMax.x),
      this.frameCurrent.y * (this.image.height / this.frameMax.y),
      this.image.width / this.frameMax.x,
      this.image.height / this.frameMax.y,
      this.inverter ? canvas.width - (this.position.x + this.offset.x + this.width) : this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      (this.image.width / this.frameMax.x) * this.scale,
      (this.image.height / this.frameMax.y) * this.scale
    );
    ctx.restore(); 
  }

  animeteFrames() {
    this.framesElapsed++;
    if (this.framesElapsed % this.framesHold === 0) {
      if (this.frameCurrent.x < this.frameMax.x - 1) {
        this.frameCurrent.x++;
      } else {
        this.frameCurrent.x = 0;
      }
    }
  }

  updateSprite() {
    this.draw();
    this.animeteFrames();
  }
}
