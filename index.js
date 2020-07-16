import { Sprite, Feitico, Monstro } from "./js/classes.js";
import { LARGURA_JOGO, ALTURA_JOGO } from "./js/jogoConst.js";

//CONFIGURAÇÃO DO CANVAS
let canvasEl = document.querySelector("#jogo");
let ctx = canvasEl.getContext("2d");
ctx.imageSmoothingEnabled = false;

//CARREGANDO IMAGENS
let imgMonstro = new Image();
imgMonstro.src = "./assets/img/dementador.png";

//DEFINIÇÃO DE VARIÁVEIS DE PONTUAÇÃO
let pontos = 0;
let vida = {
  pontos: 200,
  barraTotal: new Sprite(ctx, 10, 10, 200, 10, null, false, "#FF0000"),
  barraAtual: new Sprite(ctx, 10, 10, 200, 10, null, false, "#00ff00"),
};
let qtdMonstros = 1;

//CONFIGURAÇÃO DOS SPRITES
let chao = new Sprite(
  ctx,
  0,
  250,
  LARGURA_JOGO,
  ALTURA_JOGO,
  null,
  false,
  "#000030"
);
let monstros = [new Monstro(ctx, imgMonstro)];
let feiticos = [];
let personagem = new Sprite(
  ctx,
  276,
  200,
  49,
  50,
  new Image(),
  true,
  "#000000"
);
personagem.imagem.src = "assets/img/bruxo-spritesheet.png";

//ESCUTANDO EVENTOS DE JOGO
canvasEl.addEventListener("mousemove", (e) => {
  personagem.definePosicao(e.offsetX, 200);
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
      monstros.push(new Monstro(ctx, imgMonstro));
      vida.pontos -= 50;
      vida.barraAtual.largura = vida.pontos;
    }

    feiticos.forEach((feitico, indiceFeitico) => {
      feitico.atualizaPosicao();
      feitico.desenha();

      if (feitico.checaColisao(monstro)) {
        feiticos.splice(indiceFeitico, 1);
        monstros.splice(indiceMonstro, 1);
        pontos += 25;

        if (monstros.length === 0) {
          qtdMonstros++;
          for (let i = 0; i < qtdMonstros; i++) {
            monstros.push(new Monstro(ctx, imgMonstro));
          }
        }
      }

      if (feitico.destruido) {
        feiticos.splice(indiceFeitico, 1);
      }
    });
  });

  chao.desenha(ctx);
  ctx.font = "30px monospace";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(pontos, 10, 285);
  ctx.font = "20px monospace";
  ctx.fillText("HP", 12, 40);
  vida.barraTotal.desenha();
  vida.barraAtual.desenha();
  if (vida.pontos <= 0) {
    ctx.fillStyle = "rgba(218, 165, 32, 0.7)";
    ctx.fillRect(0, 0, LARGURA_JOGO, ALTURA_JOGO);

    ctx.fillStyle = "#000000";
    ctx.font = "50px monospace";
    ctx.fillText("GAME OVER", 175, 130);

    ctx.font = "20px monospace";
    ctx.fillText("Recarregue a pagina", 195, 170);
    ctx.fillText("para jogar novamente", 190, 190);

    ctx.font = "20px monospace";
    ctx.fillText("Sua pontuação:", 10, 245);

    ctx.font = "30px monospace";
    ctx.fillText(pontos, 10, 285);

    clearInterval(gameLoopID);
  }
}

let gameLoopID = setInterval(desenhaTela, 17);
