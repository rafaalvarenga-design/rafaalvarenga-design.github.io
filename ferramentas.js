/* Lista de ferramentas do hub. Para adicionar, trocar ou reordenar, edite só este arquivo.
   nome       : nome da ferramenta (usado em acessibilidade e quando não há logotipo)
   pasta      : pasta da ferramenta (o hub abre pasta/index.html)
   entrada    : (opcional) outro arquivo de entrada dentro da pasta, se não for index.html
   estado     : "no_ar" | "teste" | "breve"  ("breve" deixa o botão desativado)
   cores      : [cor A, cor B] do gradiente do botão, do brilho do card e do fundo da página
   imagem     : imagem quadrada do card (mascote), ideal 720 a 1080 px, em WebP ou JPG
   nomeImagem : (opcional) logotipo em SVG; sem ele o nome aparece em texto */
window.FERRAMENTAS = [
  {
    nome: "Mu.Tatu",
    bicho: "tatu",
    pasta: "mutatu/",
    estado: "teste",
    descricao: "Converta e comprima arquivos sem enviar para a internet.",
    cores: ["#8bbc34", "#aad000"],
    imagem: "assets/cards/mutatu.webp",
    nomeImagem: "assets/nomes/mutatu.svg"
  },
  {
    nome: "MiMico",
    bicho: "mico",
    pasta: "mimico/",
    estado: "teste",
    descricao: "Crie elementos de interface prontos para usar nos seus designs.",
    cores: ["#f58a1f", "#ffb20f"],
    imagem: "assets/cards/mimico.webp"
  },
  {
    nome: "SabI.A.",
    bicho: "sabiá",
    pasta: "sabia/",
    estado: "teste",
    descricao: "IAs que rodam no navegador, sem instalar nada.",
    cores: ["#6c51e8", "#a98bff"],
    imagem: "assets/cards/sabia.webp"
  }
];
