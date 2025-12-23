let etapaAtual = 0;
const totalEtapas = 7;
let intervaloDigitar;
let musicaFadeOutAtivo = false;

const container = document.querySelector(".container");
const musica = document.getElementById("musica");
const textosHTML = document.querySelectorAll(".etapa p")
const btnAvancar = document.getElementById("avancar");
const btnVoltar = document.getElementById("voltar");


const textos = [
    "Isadora,\n\nJá escrevi muitas palavras a você pelas cartinhas.\nMas dessa vez não vai bastar só palavras, algumas coisas merecem mais tempo, mais cuidado e mais sentimento.\n\nEsse presente veio do meu  coração, feito do jeito mais sincero que eu consegui.\n\nTalvez você se emocione.\nTalvez você se surpreenda.\nTalvez sorria.\nMas me prometa uma coisa:\nLeia com calma.\nPorque fiz sobre nós.",
    "Essa foto guarda um dos momentos mais intensos para mim.\n\nEnquanto eu segurava e olhava para as alianças, meu coração estava acelerado.\nEu estava feliz, nervoso... e cheio de dúvidas.\n\nEu pensava se era muito cedo.\nSe eu estava pronto.\nSe fazia sentido.\n\nMas eu sabia que teria que tentar.\nEu ja estava feliz em escolher você.\nPorque uma certeza maior do que tudo que eu tinha:\nEra que meu coração já era seu, que era você...\n\nComprar essas alianças não foi só uma decisão.\nFoi um sentimento.",
    "Eu nunca vou esquecer desse dia.\n\nCada segunda antes do pedido foi ansiedade.\nCada segundo depois do seu SIM foi felicidades.\n\nQuando você disse sim, eu senti paz.\n\nFoi ali que eu tive certeza de que eu estava com a pessoa certa...",
    "Esse dia foi especial por um motivo simples, mas profundo para mim.\n\nEu me senti parte.\nMe senti incluído.\nMe senti escolhido.\n\nQuando você disse:\n'Se me chamou para um lugar, chamou você também',\nEu senti algo muito bonito.\n\nNaquele momento eu entendi.\nEstar com você é pertencer.\nE essa foto guarda exatamente isso.",
    "Esse momento parece simples.\nMas pra mim, ele significou muito.\n\nVocê estava ali, cuidando de mim.\nCom calma, com atenção, com carinho.\n\nNesse dia eu senti algo diferente.\nUma certeza.\n\nCom você eu me sinto bem cuidado.\nMe sinto seguro.\nE feliz de um jeito leve.\n\nAlgo que eu nunca tinha sentido antes.",
    "Existe algo em você que sempre me marcou.\n\nAntes mesmo de voce dizer que me amava, eu já via isso.\nNa forma como você pensa no futuro.\nNa dedicação que você tem com tudo que faz.\nNa sua força.\n\nVocê é esforçada, inteligente, bondosa.\nVocê sabe o que quer.\nVocê luta.\nE não espera que ninguém faça por você.\n\nVocê cuida da sua casa nos mínimos detalhes.\nCuida do que é seu.\nCuida de quem está ao seu lado.\n\nVocê é de poucas amizades, mas de sentimentos verdadeiros.\nVocê odeia mentiras.\nE isso me faz admirar ainda mais quem você é.\n\nQuando você disse 'eu te amo' primeiro,\nAquilo significou muito pra mim.\nSignificou confiança.\nEntrega.\nVerdade.\n\nHoje, tudo que eu quero é caminhar ao seu lado.\nMe tornar um homem que te traga segurança.\nQue te faça sentir protegida.\nQue te faça se sentir feminina.\n\nNão porque você precise.\nMas porque você merece.\n\nEu quero crescer com você.\nAprender com você.\nConstruir com você.\n\nVocê é a minha primeira namorada.\nA primeira mulher para quem eu entreguei um buquê de flores.\nA primeira para quem eu dei um presente pensando em cada detalhe.\n\nTudo isso foi novo para mim.\nMas tudo fez sentido com você.\nPorque desde o começo, foi verdadeiro.",
    "EU TE AMOO"
];

const trilha = [
    { src: "musicas/fundo.mp3"},
    { src: "musicas/fundo.mp3"},
    {src: "musicas/fundo.mp3"},
    {src: "musicas/fundo.mp3"},
    {src: "musicas/fundo.mp3"},
    {src: "musicas/final.mp3"},
    {src: "musicas/final.mp3"}
];

function digitarTexto(indice) {
    clearInterval(intervaloDigitar);
    textosHTML[indice].innerHTML = "";
    let i = 0;

    btnAvancar.disable = true;
    btnVoltar.disable = true;

    const velocidade = indice === 5 ? 80 : 40;

    intervaloDigitar = setInterval(() => {
        textosHTML[indice].innerHTML += textos[indice][i];
        i++;

        if (i >= textos[indice].length) {
            clearInterval(intervalo);
            btnAvancar.disable = etapaAtual === totalEtapas - 1;
            btnVoltar.disable = etapaAtual === 0;
        }
    }, velocidade)
}

function tocarMusica(indice) {
        if(!musica.src.includes(trilha[indice].src)) {
            musica.src = trilha[indice].src;
            musica.volume = indice >= 5 ? 0.2 : 0.3;
            musica.loop = true;
            musica.play();
        }
    } 
                
function atualizar() {
    container.style.transform = `translateX(-${etapaAtual * 100}vw)`;

    digitarTexto(etapaAtual);
    tocarMusica(etapaAtual);

    btnVoltar.classList.toggle("esconder", etapaAtual === 0);
    btnAvancar.classList.toggle("esconder", etapaAtual === totalEtapas - 1);

    if (etapaAtual === totalEtapas - 1 && !musicaFadeOutAtivo) {
        musicaFadeOutAtivo = true;
        fadeOutMusica();
    }
}

btnAvancar.onclick = () => {
    if (etapaAtual < totalEtapas - 1) {
        etapaAtual++;
        atualizar();
    }
};

btnVoltar.onclick = () => {
    if (etapaAtual > 0) {
        etapaAtual--;
        atualizar();
    }
};

atualizar();

function fadeOutMusica() {
    let fade = setInterval(() => {
        if (musica.volume > 0.01) {
            musica.volume -= 0.01;
        } else {
            musica.volume = 0;
            clearInterval(fade);
        }
    }, 200);
}

