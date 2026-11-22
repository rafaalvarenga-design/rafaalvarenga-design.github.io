/* Lista de ferramentas do hub. Para adicionar, trocar ou reordenar, edite só este arquivo.
   nome         : nome da ferramenta (acessibilidade)
   pasta        : pasta da ferramenta (o hub abre pasta/index.html)
   entrada      : (opcional) outro arquivo de entrada dentro da pasta, se não for index.html
   estado       : "no_ar" | "teste" | "breve"  ("breve" deixa a seta desativada)
   descricao    : texto curto do card; use \n para quebrar a linha onde quiser
   cores        : [cor A, cor B] usadas nas manchas de cor do fundo da página
   gradiente    : fundo do card (CSS linear-gradient)
   fundo        : imagem da moldura do card (WebP)
   imagem       : bicho recortado, PNG/WebP com fundo transparente (proporção 3:4)
   nomeImagem   : logotipo em SVG (versão para fundo colorido)
   nomeLargura  : largura do logotipo em % da largura do card
   mascote      : (opcional) ajuste fino do bicho em %: esquerda, topo, largura, altura, corte */
window.FERRAMENTAS = [
  {
    nome: "Mu.Tatu",
    bicho: "tatu",
    pasta: "mutatu/",
    estado: "teste",
    descricao: "Converta e comprima arquivos\nsem enviar para a internet.",
    cores: ["#81b33d", "#c4ed55"],
    gradiente: "linear-gradient(18.35deg,#c4ed55 9.2%,#81b33d 84.4%)",
    fundo: "assets/cards/fundo-mutatu.webp",
    imagem: "assets/cards/mutatu.webp",
    nomeImagem: "assets/nomes/mutatu-alt.svg",
    nomeLargura: 63.933,
    mascote: { esquerda: -2.134, topo: -5.053, largura: 104.27, altura: 105.96, corte: 38.74 }
  },
  {
    nome: "Mi.Mico",
    bicho: "mico",
    pasta: "mimico/",
    estado: "teste",
    descricao: "Simule elementos e interfaces\npara usar nos seus designs.",
    cores: ["#ff9400", "#fdc300"],
    gradiente: "linear-gradient(39.93deg,#fdc300 8.3%,#ff9400 82.6%)",
    fundo: "assets/cards/fundo-mimico.webp",
    imagem: "assets/cards/mimico.webp",
    nomeImagem: "assets/nomes/mimico-alt.svg",
    nomeLargura: 60.313
  },
  {
    nome: "Sab.IA",
    bicho: "sabiá",
    pasta: "sabia/",
    estado: "teste",
    descricao: "Ferramentas de I.A. que rodam\nno seu navegador",
    cores: ["#6249e2", "#90b9ff"],
    gradiente: "linear-gradient(1.36deg,#90b9ff 11.7%,#6249e2 95.1%)",
    fundo: "assets/cards/fundo-sabia.webp",
    imagem: "assets/cards/sabia.webp",
    nomeImagem: "assets/nomes/sabia-alt.svg",
    nomeLargura: 50.940
  }
];
