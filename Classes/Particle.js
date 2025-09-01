class Particle extends Sprite {
  constructor({ position, width = 30, height = 30, imageSrc, frameMax, offset ={x:0,y:0},scale = 1, framesHold }) {
    super({
      width,
      height,
      position,
      imageSrc,
      frameMax,
      offset,
      scale,
      framesHold,
    });
    this.position = position;
    this.width = width;
    this.height = height;
  }

  update(index) {
      if(this.frameCurrent.x >= this.frameMax.x -1) particles.splice(index, 1);
     this.updateSprite();
    //  ctx.fillRect(this.position.x,this.position.y,this.width,this.height)
  }
}
