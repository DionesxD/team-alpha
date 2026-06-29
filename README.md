# Team Alpha — Site Institucional

Site institucional da academia de artes marciais **Team Alpha**. Construído com **React 18 + Vite + Tailwind CSS v3**, single-page com navegação por âncoras, totalmente responsivo e pronto para deploy no Vercel.

> _"Um novo time. A mesma garra campeã."_

---

## Stack

| Tecnologia | Versão | Função |
|------------|--------|--------|
| React | 18.x | Biblioteca UI |
| Vite | 5.x | Bundler e dev server |
| Tailwind CSS | 3.x | Estilização utility-first |

> **Contato:** o site não usa backend nem e-mail. O formulário da seção Contato monta a mensagem e abre direto no WhatsApp do time. Todos os CTAs de WhatsApp usam `wa.me` com mensagem pré-preenchida.

---

## Estrutura

```
team-alpha/
├── public/
├── src/
│   ├── assets/
│   │   ├── logo.png                  ← logo oficial (gerado a partir das imagens enviadas)
│   │   └── galeria/
│   │       ├── foto-real-equipe.jpg  ← foto real das camisas (enviada pela equipe)
│   │       └── foto-01..08.jpg       ← placeholders (substitua pelas fotos reais)
│   ├── components/
│   │   ├── Navbar.jsx                ← fixa, blur, menu hambúrguer mobile
│   │   ├── Hero.jsx                  ← título de impacto + 2 CTAs
│   │   ├── NovoTime.jsx              ← banner narrativo da transição
│   │   ├── Numeros.jsx               ← 3 stat cards
│   │   ├── Professores.jsx           ← Wallace (Luta Livre/MMA) + Thiago (Kickboxing)
│   │   ├── Conquistas.jsx            ← grid + filtro por modalidade
│   │   ├── Galeria.jsx               ← grid + lightbox com navegação por teclado
│   │   ├── Planos.jsx                ← 2 botões de WhatsApp por modalidade
│   │   ├── Contato.jsx               ← formulário (EmailJS) + mapa + horários
│   │   ├── Footer.jsx                ← logo + Instagram + YouTube
│   │   └── WhatsAppFloat.jsx         ← botão flutuante fixo
│   ├── data/
│   │   └── conquistas.js             ← array local de conquistas
│   ├── App.jsx                       ← monta todas as seções
│   ├── main.jsx                      ← entry point
│   └── index.css                     ← Tailwind + estilos globais (scroll-behavior, fonts)
├── index.html                        ← carrega Google Fonts (Bebas Neue + Inter)
├── tailwind.config.js                ← paleta vermelho/preto + fontes
├── vite.config.js
├── postcss.config.js
├── .env.example                      ← template de variáveis de ambiente
├── .gitignore
├── vercel.json                       ← configuração de deploy
└── package.json
```

---

## Como rodar localmente

Pré-requisitos: **Node.js 18+** e npm.

```bash
# 1. Instale as dependências
npm install

# 2. Configure as variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas credenciais (EmailJS, Google Maps)

# 3. Rode o dev server
npm run dev
# Abra http://localhost:5173

# 4. Build de produção
npm run build

# 5. Pré-visualizar o build
npm run preview
```

---

## Configuração do formulário de contato

**Não há e-mail.** O formulário da seção Contato é puramente client-side: ao clicar em **"Enviar pelo WhatsApp"**, o site monta a mensagem com nome, telefone e texto que o usuário digitou, e abre o WhatsApp (whatsapp.com/app) com tudo já preenchido — bastando o usuário confirmar o envio.

A mensagem montada segue este formato:

```
Olá Team Alpha! Gostaria de mais informações.

*Nome:* [nome digitado]
*Telefone:* [telefone digitado]
*Mensagem:* [mensagem digitada]
```

O número de destino é o `WHATSAPP.geral` definido em `src/data/contato.js`.

Para mudar o número, edite `src/data/contato.js`:

```js
export const WHATSAPP = {
  thiago: '5521XXXXXXXXX',
  geral:  '5521XXXXXXXXX',
}
```

---

## Configuração do WhatsApp

Os números de WhatsApp estão **hardcoded** no código (não em `.env`, porque variáveis VITE_ em `.env` ficam visíveis no bundle final — o que é aceitável, mas manter no código é mais simples para números públicos de contato comercial).

Procure por `TODO: WHATSAPP_` nos seguintes arquivos e substitua pelos números reais (formato: **DDI + DDD + número, apenas dígitos**, ex: `5521999999999`):

| Arquivo | Variável | Função |
|---------|----------|--------|
| `src/components/Professores.jsx` | `WHATSAPP_THIAGO` | Botão "Falar com Thiago" no card de Kickboxing |
| `src/components/Professores.jsx` | `WHATSAPP_WALLACE` | Botão "Falar com Wallace" no card de Luta Livre/MMA |
| `src/components/Planos.jsx` | `WHATSAPP_THIAGO` | CTA de Kickboxing na seção Planos |
| `src/components/Planos.jsx` | `WHATSAPP_WALLACE` | CTA de Luta Livre/MMA na seção Planos |
| `src/components/Contato.jsx` | `WHATSAPP_GERAL` | Bloco "WhatsApp geral" na seção Contato |
| `src/components/WhatsAppFloat.jsx` | `WHATSAPP_GERAL` | Botão flutuante fixo (canto inferior direito) |

Cada link abre o WhatsApp com uma mensagem pré-preenchida adequada à modalidade.

---

## Configuração do Google Maps

1. Acesse [Google Maps](https://www.google.com/maps), busque o endereço da academia.
2. Clique em **Compartilhar → Incorporar mapa**.
3. Copie a URL do atributo `src` do iframe (algo como `https://www.google.com/maps/embed?pb=...`).
4. Cole no `.env`:
   ```
   VITE_GOOGLE_MAPS_EMBED_URL=https://www.google.com/maps/embed?pb=...
   ```

Enquanto não configurado, o mapa mostra um embed genérico (apenas para não quebrar o layout).

---

## Personalização

### Cores e tipografia

Edite `tailwind.config.js`:

```js
colors: {
  alpha: {
    red: '#e53e3e',          // vermelho principal
    'red-dark': '#c53030',
    black: '#1a1a1a',        // preto principal
    // ...
  }
},
fontFamily: {
  display: ['"Bebas Neue"', 'sans-serif'],  // títulos
  body: ['Inter', 'sans-serif'],            // corpo
}
```

As fontes são carregadas via Google Fonts no `index.html`.

### Conquistas

Edite `src/data/conquistas.js` para adicionar/remover conquistas. Campos:

```js
{
  id: 1,
  campeonato: 'Nome do campeonato',
  ano: 2024,
  aluno: 'Nome do aluno',
  categoria: 'Até 75 kg',
  modalidade: 'Kickboxing',  // 'Kickboxing' | 'Luta Livre' | 'MMA'
  medalha: '🥇',             // '🥇' | '🥈' | '🥉' | '🏆'
}
```

### Galeria

Adicione suas fotos em `src/assets/galeria/` e importe-as no topo de `src/components/Galeria.jsx`. A primeira foto do array é exibida como banner largo em destaque.

### Professores

Edite o array `professores` em `src/components/Professores.jsx` para ajustar nomes, bios, modalidades e números de WhatsApp.

---

## Deploy no Vercel

Você tem **3 formas** de fazer o deploy. Escolha a que preferir.

### Opção A — Deploy via GitHub (recomendado, com CI/CD automático)

1. Faça login no [GitHub](https://github.com) e crie um novo repositório, por exemplo `team-alpha` (público ou privado).
2. No seu computador, extraia o ZIP do projeto e entre na pasta:
   ```bash
   unzip team-alpha.zip
   cd team-alpha
   ```
3. Inicialize o Git e faça o primeiro commit:
   ```bash
   git init
   git add .
   git commit -m "Site institucional Team Alpha"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/team-alpha.git
   git push -u origin main
   ```
4. Acesse [vercel.com](https://vercel.com) e faça login com sua conta GitHub.
5. Clique em **Add New… → Project**.
6. Importe o repositório `team-alpha`.
7. O Vercel detecta o Vite automaticamente. Mantenha estas configurações:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build` (já vem preenchido)
   - **Output Directory**: `dist` (já vem preenchido)
   - **Install Command**: `npm install` (já vem preenchido)
8. **Variáveis de ambiente** (opcional — só se quiser sobrescrever o embed do mapa): em **Environment Variables**, adicione:
   | Name | Value | Onde pegar |
   |------|-------|-----------|
   | `VITE_GOOGLE_MAPS_EMBED_URL` | `https://www.google.com/maps/embed?pb=...` | Google Maps → Compartilhar → Incorporar mapa. Se não preencher, o site usa o endereço da Matriz por padrão. |
9. Clique em **Deploy**. Em ~1 minuto seu site estará no ar em `https://team-alpha.vercel.app` (URL varia conforme o nome do repositório).

Pronto! A partir de agora, toda vez que você fizer `git push` para a `main`, o Vercel refaz o deploy automaticamente.

### Opção B — Deploy via Vercel CLI (rápido, sem GitHub)

1. Instale a CLI do Vercel:
   ```bash
   npm i -g vercel
   ```
2. Faça login:
   ```bash
   vercel login
   ```
3. Na pasta do projeto, rode:
   ```bash
   vercel
   ```
4. Responda às perguntas (confirmar setup, nome do projeto, etc.). O Vercel detecta Vite automaticamente.
5. Para definir a variável de ambiente do mapa (opcional), depois do primeiro deploy:
   ```bash
   vercel env add VITE_GOOGLE_MAPS_EMBED_URL
   ```
   (Se não preencher, o site usa o endereço da Matriz por padrão.)
6. Faça um novo deploy para produção com as variáveis:
   ```bash
   vercel --prod
   ```

### Opção C — Arrastar e soltar (mais simples, sem CI/CD)

1. Na pasta do projeto, rode `npm run build` para gerar a pasta `dist/`.
2. Acesse [vercel.com/new](https://vercel.com/new).
3. Em vez de importar um repositório, **arraste a pasta `dist/` inteira** para a página.
4. O Vercel publica imediatamente. Você recebe uma URL pública.
5. ⚠️ **Atenção**: como o build é feito localmente, se você quiser um embed de mapa diferente do padrão (Matriz), defina `VITE_GOOGLE_MAPS_EMBED_URL` no seu `.env` ANTES do `npm run build`. Para atualizar, refaça o build e re-deploy.

> Desvantagem da Opção C: sem CI/CD, você precisa refazer o upload a cada mudança.

### Configurar domínio próprio (opcional)

Após o deploy, no painel do projeto no Vercel:
1. Vá em **Settings → Domains**.
2. Adicione seu domínio (ex: `teamalpha.com.br`).
3. Siga as instruções para apontar o DNS do seu provedor (geralmente um CNAME para `cname.vercel-dns.com`).
4. Em alguns minutos o SSL é emitido automaticamente.

### Troubleshooting Vercel

| Problema | Solução |
|----------|---------|
| Formulário não envia | O botão abre o WhatsApp em nova aba. Verifique se o navegador não está bloqueando pop-ups. Confirme também que o número `WHATSAPP.geral` em `src/data/contato.js` está correto (com DDI, ex: 5521...). |
| Mapa mostra local errado | O embed padrão usa o endereço da Matriz. Para trocar, defina `VITE_GOOGLE_MAPS_EMBED_URL` no `.env` (ou nas variáveis de ambiente do Vercel). |
| Build falha com erro de versão | O Vercel usa Node 20 por padrão. Se necessário, crie um arquivo `.nvmrc` com `20` na raiz do projeto. |
| Página em branco após deploy | Abra o DevTools (F12) → Console. Geralmente é variável de ambiente faltando ou problema de path. |
| WhatsApp não abre | Os números ainda estão como `5521999999999` (placeholder). Edite `src/data/contato.js` com os números reais. |

---

## Scripts disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Inicia o dev server com hot reload em `http://localhost:5173` |
| `npm run build` | Gera o build de produção em `dist/` |
| `npm run preview` | Pré-visualiza o build de produção localmente |

---

## Identidade visual

| Elemento | Valor |
|----------|-------|
| Cor primária | `#e53e3e` (vermelho) |
| Cor de fundo | `#1a1a1a` (preto) |
| Tipografia títulos | Bebas Neue (Google Fonts) |
| Tipografia corpo | Inter (Google Fonts) |
| Estilo | Dark mode, agressivo mas profissional, sem gradientes excessivos |

---

## Licença

Projeto privado da Team Alpha. Todos os direitos reservados.
