import { LARGURA_JOGO, ALTURA_JOGO } from "./jogoConst.js";

class Sprite {
  constructor(ctx, x, y, largura, altura, imagem, usaSpritesheet, cor) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.largura = largura;
    this.altura = altura;
    this.imagem = imagem;
    this.usaSpritesheet = usaSpritesheet;
    this.cor = cor;

    if (this.usaSpritesheet) {
      this.estadoAnimação = 0;
    }
  }

  definePosicao(posX, posY) {
    this.x = posX;
    this.y = posY;
  }

  desenha() {
    if (this.imagem) {
      if (this.usaSpritesheet) {
        this.ctx.drawImage(
          this.imagem,
          Math.floor(
            this.estadoAnimação / 10 >= 3
              ? this.estadoAnimação / 10 - 3
              : this.estadoAnimação / 10
          ) * 49,
          0,
          49,
          50,
          this.x,
          this.y,
          this.largura,
          this.altura
        );
        this.estadoAnimação++;
        if (this.estadoAnimação >= 60) {
          this.estadoAnimação = 0;
        }
      } else {
        this.ctx.drawImage(
          this.imagem,
          this.x,
          this.y,
          this.largura,
          this.altura
        );
      }
    } else {
      this.ctx.fillStyle = this.cor;
      this.ctx.fillRect(this.x, this.y, this.largura, this.altura);
    }
  }

  apaga() {
    this.ctx.clearRect(this.x, this.y, this.largura, this.altura);
  }
}

class Monstro extends Sprite {
  constructor(ctx, imagem) {
    super(
      ctx,
      Math.random() * (LARGURA_JOGO - 56),
      -72,
      56,
      72,
      imagem,
      false,
      "#000000"
    );

    this.velocidadeY = 1;
  }

  atualizaPosicao() {
    if (this.y > ALTURA_JOGO) {
      this.definePosicao(Math.random() * (LARGURA_JOGO - 56), this.altura * -1);
    } else {
      this.definePosicao(this.x, this.y + this.velocidadeY);
    }
  }

  checaColisao(objeto) {
    let estaNaZonaY = false;
    let colisao = false;

    if (this.y + this.altura >= objeto.y) {
      if (this.y <= objeto.y + objeto.altura) {
        estaNaZonaY = true;
      }
    }

    if (estaNaZonaY) {
      if (this.x + this.largura >= objeto.x) {
        if (this.x < objeto.x + objeto.largura) {
          colisao = true;
        }
      }
    }

    return colisao;
  }
}

class Feitico extends Sprite {
  constructor(ctx, origem) {
    super(ctx, origem.x, origem.y, 5, 15, null, false, "#daa520");

    this.velocidadeY = -2;
    this.destruido = false;
  }

  atualizaPosicao() {
    if (this.y <= this.altura * -1) {
      this.destruido = true;
    } else {
      this.definePosicao(this.x, this.y + this.velocidadeY);
    }
  }

  checaColisao(monstro) {
    let estaNaZonaY = false;
    let colisao = false;

    if (this.y + this.altura >= monstro.y) {
      if (this.y <= monstro.y + monstro.altura) {
        estaNaZonaY = true;
      }
    }

    if (estaNaZonaY) {
      if (this.x + this.largura >= monstro.x) {
        if (this.x < monstro.x + monstro.largura) {
          colisao = true;
        }
      }
    }

    return colisao;
  }
}

export { Feitico, Sprite, Monstro };
