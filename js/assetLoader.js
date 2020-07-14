export default class AssetLoader {
    constructor() {
        this.itens = {};
        this.info = {
            qtdCarregadas: 0,
            totalAssets: 0,
            terminouCarregamento: false
        };
    }

    adicionar(nome, objeto, caminho) {
        this.itens[nome] = objeto;
        objeto.src = caminho;
        this.info.totalAssets++;
    }

    terminouCarregamento() {
        if (this.info.qtdCarregadas === this.info.totalAssets) {
            this.info.terminouCarregamento = true;
            return true;
        }
    }

    iniciaCarregamento() {
        Object.keys(this.itens).forEach(prop => {
            this.itens[prop].addEventListener('load', () => {
                this.info.qtdCarregadas++;
            });
        }, this);
    }
};