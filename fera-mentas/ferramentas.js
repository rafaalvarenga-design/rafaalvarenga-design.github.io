/* Lista de ferramentas do hub. Para adicionar, trocar ou reordenar, edite só este arquivo.
   pasta   : pasta da ferramenta (o hub abre pasta/index.html)
   entrada : (opcional) outro arquivo de entrada dentro da pasta, se não for index.html
   estado  : "no_ar" | "teste" | "breve"  ("breve" deixa o botão desativado)
   cores   : [cor A, cor B] do gradiente da ferramenta
   imagem  : ilustração do bicho (troque o arquivo em assets/bichos/ pelo definitivo)
   bichoProvisorio : true mostra o selo "bicho provisório"; apague quando o mascote final chegar */
window.FERRAMENTAS = [
  {
    nome: "Mutatu",
    bicho: "tatu",
    pasta: "mutatu/",
    estado: "teste",
    descricao: "Converta e comprima vídeo, áudio e imagem sem enviar nada para a internet.",
    cores: ["#A3D841", "#1FBCCF"],
    imagem: "assets/bichos/tatu.svg",
    bichoProvisorio: true
  },
  {
    nome: "MiMico",
    bicho: "mico",
    pasta: "mimico/",
    estado: "teste",
    descricao: "Crie elementos de interface prontos para usar nos seus designs.",
    cores: ["#FFCD38", "#FF7F1F"],
    imagem: "assets/bichos/mico.svg",
    bichoProvisorio: true
  },
  {
    nome: "SabI.A.",
    bicho: "sabiá",
    pasta: "sabia/",
    estado: "teste",
    descricao: "IAs que rodam no navegador, sem instalar nada.",
    cores: ["#FF8FB8", "#B79CFF"],
    imagem: "assets/bichos/sabia.svg",
    bichoProvisorio: true
  }
];
