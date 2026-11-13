# Fera.mentas

Página inicial que reúne as ferramentas. Site estático, sem build: abra `index.html` ou publique no GitHub Pages.

## Estrutura

```
index.html  hub.css  hub.js     a página (não precisa mexer)
ferramentas.js                  a lista de ferramentas (é aqui que você edita)
assets/                         fonte Host Grotesk, logo (logo.svg), cards/ (imagens dos mascotes) e nomes/ (logotipos)
mutatu/  mimico/  sabia/        uma pasta por ferramenta
```

## Trocar a versão de uma ferramenta

Substitua o conteúdo da pasta dela. O hub abre `pasta/index.html`, então o arquivo principal precisa se chamar `index.html` (ex.: renomeie `MuTatu.html` para `index.html`). Se preferir outro nome, coloque `entrada: "MuTatu.html"` na ferramenta em `ferramentas.js`.

## Adicionar uma ferramenta

1. Crie a pasta e coloque o `index.html` dela.
2. Copie um bloco em `ferramentas.js` e ajuste nome, bicho, pasta, descrição e cores.
3. Coloque a imagem quadrada do card em `assets/cards/` (720 a 1080 px, WebP ou JPG), o fundo da moldura (opcional, também em `assets/cards/`) e o logotipo em SVG em `assets/nomes/`. A largura do logotipo e a cor do texto são definidas em `ferramentas.js` (`nomeLargura` e `corTexto`).

## Trocar a imagem ou o logotipo de um card

Substitua o arquivo em `assets/cards/` (mantenha o nome ou ajuste `imagem` em `ferramentas.js`). O logotipo é o `nomeImagem` da ferramenta; se não houver, o nome aparece em texto.

## Estados

`estado: "no_ar" | "teste" | "breve"`. Em `"breve"` o botão fica desativado.

## Publicar

No GitHub: Settings > Pages > Deploy from a branch > `main` / `(root)`. Todos os caminhos são relativos, então também funciona em `usuario.github.io/repositorio/`.

## Atenção

- Todas as ferramentas compartilham a mesma origem, então `localStorage` e IndexedDB são comuns. Use nomes de chave e de banco únicos por ferramenta (o MiMico usa `igs3` e `igs3d`).
- A SabI.A. usa um service worker (`coi-serviceworker.js`), que só funciona servido por http(s). Para testar localmente: `python3 -m http.server` dentro desta pasta.
