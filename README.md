# 🎬 Mosten Studio

**Mosten Studio** é um projeto simples de catálogo de filmes e séries feito por um estudante. Aqui você pode adicionar títulos, votar se gostou ou não, e ver quantos votos cada um recebeu.

## Sobre o Projeto

Esse foi meu primeiro contato criando uma API com Next.js, então apanhei bastante, mas acho que consegui entregar algo legal no final. Escolhi o Next porque facilita muito juntar o front-end e o back-end no mesmo lugar. Usei TypeScript porque gosto da segurança da tipagem forte. O MongoDB eu já tinha visto na faculdade, então já tinha uma base, e utilizei o Mongoose para facilitar a modelagem dos dados. Para validação dos formulários, usei o Zod junto com o React Hook Form e o hookform/resolvers, o que deixou o processo de validação bem prático e integrado. Os ícones são do Lucide React, e para estilizar tudo usei TailwindCSS. Para buscar e atualizar dados de forma eficiente no front-end, utilizei o SWR.

## Funcionalidades

- Adicionar filmes e séries com nome, gênero, descrição e imagem
- Votar se gostou ou não de cada título
- Ver totais de votos positivos e negativos
- Interface simples e responsiva

## Tecnologias

- **Next.js** (API e front-end juntos)
- **TypeScript** (tipagem forte)
- **MongoDB** (banco de dados NoSQL)
- **Mongoose** (modelagem de dados MongoDB)
- **React Hook Form** (gerenciamento de formulários)
- **Zod** (validação dos dados)
- **hookform/resolvers** (integração entre React Hook Form e Zod)
- **SWR** (fetching e cache de dados no front-end)
- **Lucide React** (ícones)
- **TailwindCSS** (estilização)

## Como rodar

1. Clone o repositório:

   ```bash
   git clone https://github.com/21lucasbarros/mosten-studio.git
   cd mosten-studio
   ```

2. Instale as dependências:

   ```bash
   npm install
   # ou
   yarn install
   ```

3. Configure o banco de dados no arquivo `.env.local`:

   ```
   MONGODB_URI=mongodb://localhost:27017/mosten-studio
   ```

4. Rode o projeto:

   ```bash
   npm run dev
   # ou
   yarn dev
   ```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

## Endpoints principais

- `GET /api/filmes` - Lista todos os filmes
- `POST /api/filmes` - Adiciona um novo filme
- `POST /api/filmes/[id]/voto` - Vota em um filme

## Exemplo de documento de filme no MongoDB

```json
{
  "_id": "6897d6f6acb90d8049a368c6",
  "titulo": "Her",
  "genero": "Ficção científica/Romance",
  "descricao": "O solitário escritor Theodore desenvolve uma relação de amor especial …",
  "imagem": "https://play-lh.googleusercontent.com/proxy/6PGgmClPpnU1z6M-xCQfoH6jUQ…",
  "gostei": 1,
  "naoGostei": 0,
  "createdAt": "2025-08-09T23:17:10.103+00:00",
  "updatedAt": "2025-08-10T11:59:29.386+00:00",
  "__v": 0
}
```

## Estrutura básica

```
mosten-studio/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── filmes/
│   │   │   └── votos/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── ListaFilmes.tsx
│   │   ├── TotaisGerais.tsx
│   │   └── ui/
│   │       └── ModalCadastro.tsx
│   ├── lib/
│   │   └── db.ts
│   └── models/
│       └── Filme.ts
├── public/
│   └── logo-mosten.svg
└── ...
```

## Scripts

```bash
npm run dev      # Desenvolvimento
npm run build    # Build de produção
npm run start    # Rodar produção
npm run lint     # Lint
```
