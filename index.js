import { Sprite, Feitico, Monstro } from './js/classes.js';
import { LARGURA_JOGO, ALTURA_JOGO } from './js/jogoConst.js';

//CONFIGURAÇÃO DO CANVAS
let canvasEl = document.querySelector("#jogo");
let ctx = canvasEl.getContext("2d");
ctx.imageSmoothingEnabled = false;


//DEFINIÇÃO DE VARIÁVEIS
let pontos = 0;
let vida = {
  pontos: 200,
  barraTotal: new Sprite(ctx, 10, 10, 200, 10, null, '#FF0000'),
  barraAtual: new Sprite(ctx, 10, 10, 200, 10, null, '#00ff00')
};

let chao = new Sprite(ctx, 0, 250, LARGURA_JOGO, ALTURA_JOGO, null, '#000030');
let feiticos = [];
let monstros = [new Monstro(ctx)];
monstros[0].imagem.addEventListener("load", () => {
  monstros[0].desenha();
});
let personagem = new Sprite(ctx, 276, 202, 49, 48, new Image(), '#000000');
personagem.imagem.src = 'assets/img/bruxo.png';
personagem.imagem.addEventListener("load", () => {
  personagem.desenha();
});



//ESCUTANDO EVENTOS DE JOGO
canvasEl.addEventListener("mousemove", (e) => {
  personagem.definePosicao(e.offsetX, 202);
});
canvasEl.addEventListener("click", () => {
  feiticos.push(new Feitico(ctx, personagem));
});


//DECLARANDO A FUNÇÃO PRINCIPAL
function desenhaTela() {
  ctx.clearRect(0, 0, LARGURA_JOGO, ALTURA_JOGO);

  personagem.desenha();

  monstros.forEach((monstro, indiceMonstro) => {
    monstro.atualizaPosicao();
    monstro.desenha();

    if (monstro.checaColisao(personagem)) {
      monstros.splice(indiceMonstro, 1);
      monstros.push(new Monstro(ctx));
      vida.pontos -= 50;
      vida.barraAtual.largura = vida.pontos;
    }

    feiticos.forEach((feitico, indiceFeitico) => {
      feitico.atualizaPosicao();
      feitico.desenha();

      if (feitico.checaColisao(monstro)) {
        feiticos.splice(indiceFeitico, 1);
        monstros.splice(indiceMonstro, 1);
        monstros.push(new Monstro(ctx));
        pontos += 25;
      }

      if (feitico.destruido) {
        feiticos.splice(indiceFeitico, 1);
      }
    });
  });

  chao.desenha(ctx);
  ctx.font = '30px monospace';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(pontos, 10, 285);
  ctx.font = '20px monospace';
  ctx.fillText('HP', 12, 40);
  vida.barraTotal.desenha();
  vida.barraAtual.desenha();
  if (vida.pontos <= 0) {
    clearInterval(loopJogoID);
  }
}


//INICIANDO O LOOP DE JOGO
let loopJogoID = setInterval(desenhaTela, 17);