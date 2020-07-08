let chao = {
  x: 0,
  y: 250,
  width: 600,
  height: 50,
  desenha() {
    ctx.fillStyle = "#000030";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  },
};

let personagem = {
  img: new Image(),
  x: undefined,
  y: undefined,
  width: 49,
  height: 48,

  desenha(posX, posY) {
    ctx.drawImage(this.img, posX, posY);
    this.x = posX;
    this.y = posY;
  },
  apaga() {
    ctx.clearRect(this.x, this.y, this.width, this.height);
    this.x = undefined;
    this.y = undefined;
  },
};

let monstro = {
  img: new Image(),
  x: undefined,
  y: undefined,
  width: 56,
  height: 72,

  desenha(posX, posY) {
    ctx.drawImage(this.img, posX, posY, this.width, this.height);
    this.x = posX;
    this.y = posY;
  },
  apaga() {
    ctx.clearRect(this.x, this.y, this.width, this.height);
    this.x = undefined;
    this.y = undefined;
  },
};

let feitico = {
  x: 450,
  y: 100,
  width: 10,
  height: 30,
  desenha() {
    ctx.fillStyle = "#daa520";
    ctx.fillRect(
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.width,
      this.height
    );
  },
};

export {chao, personagem, monstro, feitico};