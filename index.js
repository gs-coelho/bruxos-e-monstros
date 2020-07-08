import {chao, personagem, monstro, feitico} from './elementos.js';

let canvasEl = document.querySelector("#jogo");
let ctx = canvasEl.getContext("2d");
ctx.imageSmoothingEnabled = false;

chao.desenha();
feitico.desenha();

personagem.img.src = "assets/img/bruxo.png";
personagem.img.addEventListener("load", () => {
  personagem.desenha(276, 202);
});

monstro.img.src = "assets/img/dementador.png";
monstro.img.addEventListener("load", () => {
  monstro.desenha(122, 64);
});

canvasEl.addEventListener("mousemove", (e) => {
  personagem.apaga();
  personagem.desenha(e.offsetX, 202);
});
