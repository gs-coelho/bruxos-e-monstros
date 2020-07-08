import {chao, personagem, monstro, feitico} from './elementos.js';

let canvasEl = document.querySelector("#jogo");
let ctx = canvasEl.getContext("2d");
ctx.imageSmoothingEnabled = false;

chao.desenha(ctx);
feitico.desenha(ctx);

personagem.img.src = "assets/img/bruxo.png";
personagem.img.addEventListener("load", () => {
  personagem.desenha(ctx, 276, 202);
});

monstro.img.src = "assets/img/dementador.png";
monstro.img.addEventListener("load", () => {
  monstro.desenha(ctx, 122, 64);
});

canvasEl.addEventListener("mousemove", (e) => {
  personagem.apaga(ctx);
  personagem.desenha(ctx, e.offsetX, 202);
});
