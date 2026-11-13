/* Lista de ferramentas do hub. Para adicionar, trocar ou reordenar, edite só este arquivo.
   nome         : nome da ferramenta (acessibilidade e texto, se não houver logotipo)
   pasta        : pasta da ferramenta (o hub abre pasta/index.html)
   entrada      : (opcional) outro arquivo de entrada dentro da pasta, se não for index.html
   estado       : "no_ar" | "teste" | "breve"  ("breve" deixa o botão desativado)
   cores        : [cor A, cor B] do gradiente do botão, do brilho do card e do fundo da página
   corTexto     : (opcional) cor da descrição
   imagem       : imagem quadrada do card (mascote), ideal 720 a 1080 px, em WebP ou JPG
   fundo        : (opcional) imagem de fundo da moldura do card; sem ela usa um brilho com as cores
   nomeImagem   : (opcional) logotipo em SVG; sem ele o nome aparece em texto
   nomeLargura  : largura do logotipo como fração da largura do card (0.5 = metade) */
window.FERRAMENTAS = [
  {
    nome: "Mu.Tatu",
    bicho: "tatu",
    pasta: "mutatu/",
    estado: "teste",
    descricao: "Converta e comprima arquivos sem enviar para a internet.",
    cores: ["#8bbc34", "#aad000"],
    corTexto: "#8c99b9",
    imagem: "assets/cards/mutatu.webp",
    fundo: "assets/cards/fundo-mutatu.webp",
    nomeImagem: "assets/nomes/mutatu.svg",
    nomeLargura: 0.6436
  },
  {
    nome: "Mi.Mico",
    bicho: "mico",
    pasta: "mimico/",
    estado: "teste",
    descricao: "Simule elementos e interfaces para usar nos seus designs.",
    cores: ["#ff9400", "#ffb400"],
    corTexto: "#95a2c2",
    imagem: "assets/cards/mimico.webp",
    fundo: "assets/cards/fundo-mimico.webp",
    nomeImagem: "assets/nomes/mimico.svg",
    nomeLargura: 0.6071
  },
  {
    nome: "Sab.IA",
    bicho: "sabiá",
    pasta: "sabia/",
    estado: "teste",
    descricao: "Ferramentas de I.A. que rodam no seu navegador",
    cores: ["#6249e2", "#8a6aff"],
    corTexto: "#8c99b9",
    imagem: "assets/cards/sabia.webp",
    fundo: "assets/cards/fundo-sabia.webp",
    nomeImagem: "assets/nomes/sabia.svg",
    nomeLargura: 0.5128
  }
];
