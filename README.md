# Fera.mentas

Página inicial que reúne as ferramentas. Site estático, sem build: abra `index.html` ou publique no GitHub Pages.

## Estrutura

```
index.html  hub.css  hub.js     a página (não precisa mexer)
ferramentas.js                  a lista de ferramentas (é aqui que você edita)
assets/                         fonte Host Grotesk, logo (logo.svg), cards/ (bichos e molduras) e nomes/ (logotipos)
mutatu/  mimico/  sabia/        uma pasta por ferramenta
```

## Trocar a versão de uma ferramenta

Substitua o conteúdo da pasta dela. O hub abre `pasta/index.html`, então o arquivo principal precisa se chamar `index.html` (ex.: renomeie `MuTatu.html` para `index.html`). Se preferir outro nome, coloque `entrada: "MuTatu.html"` na ferramenta em `ferramentas.js`.

## Adicionar uma ferramenta

1. Crie a pasta e coloque o `index.html` dela.
2. Copie um bloco em `ferramentas.js` e ajuste nome, pasta, texto, cores e gradiente.
3. Coloque em `assets/cards/` o bicho recortado (PNG ou WebP com fundo transparente, proporção 3:4, uns 800 px de largura) e a moldura (`fundo`, opcional).
4. Coloque em `assets/nomes/` o logotipo em SVG (versão para fundo colorido) e informe a largura dele em `nomeLargura` (em % da largura do card). Ele fica centralizado no topo do card.

## Trocar o bicho ou o logotipo de um card

Substitua o arquivo em `assets/cards/` ou `assets/nomes/` (mantenha o nome do arquivo ou ajuste o caminho em `ferramentas.js`). Se o novo bicho tiver outro enquadramento, ajuste `mascote` (esquerda, topo, largura, altura e corte, em %).

## Estados

`estado: "no_ar" | "teste" | "breve"`. Em `"breve"` a seta do card fica desativada.

## Publicar

No GitHub: Settings > Pages > Deploy from a branch > `main` / `(root)`. Todos os caminhos são relativos, então também funciona em `usuario.github.io/repositorio/`.

## Atenção

- Todas as ferramentas compartilham a mesma origem, então `localStorage` e IndexedDB são comuns. Use nomes de chave e de banco únicos por ferramenta (o MiMico usa `igs3` e `igs3d`).
- A SabI.A. usa um service worker (`coi-serviceworker.js`), que só funciona servido por http(s). Para testar localmente: `python3 -m http.server` dentro desta pasta.
