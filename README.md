# Site Cartão Cuida Bem, Versão 2

Site estático em HTML, CSS e JavaScript puro. Não precisa de build nem de servidor especial.

## Páginas

| Arquivo | Página |
|---|---|
| `index.html` | Home (com as Dúvidas, âncora `index.html#duvidas`) |
| `sobre.html` | Sobre + Parceiros (âncora `sobre.html#parceiros`) |
| `planos.html` | Conheça os planos |
| `contato.html` | Contato |
| `legal/politica-privacidade.html` | Política de Privacidade (exibe `legal/Politica-Privacidade.pdf`) |
| `404.html` | Página de erro, usada automaticamente pelo GitHub Pages |

## Domínio

Todos os endereços completos (canonical, sitemap, Open Graph, dados estruturados, robots e llms.txt) usam
**`https://www.cartaocuidabem.com.br`**. Se o domínio final for outro, faça um "localizar e substituir" desse
endereço em todos os arquivos `.html`, `.xml` e `.txt` antes de publicar.

No GitHub Pages, configure o domínio em **Settings > Pages > Custom domain** e marque **Enforce HTTPS**.

## Como publicar no GitHub Pages

1. Crie um repositório no GitHub.
2. Envie **todo o conteúdo desta pasta** para a raiz do repositório, mantendo as pastas e o arquivo `.nojekyll`.
3. Vá em **Settings > Pages**, escolha **Deploy from a branch**, branch **main**, pasta **/ (root)** e clique em **Save**.

## Para testar no computador

Abra o `index.html` direto no navegador, ou rode na pasta `python3 -m http.server 8000` e acesse `http://localhost:8000`.

## SEO e indexação (já feito)

- Título e descrição únicos por página, com "Cartão Cuida Bem" e "Uberlândia".
- URL canônica, `robots` e `theme-color` em todas as páginas.
- Open Graph e Twitter Card com imagem própria (`assets/img/og-cartao-cuida-bem.jpg`, 1200×630) para WhatsApp, Instagram, LinkedIn etc.
- Dados estruturados Schema.org (JSON-LD):
  - todas as páginas: `Organization` (nome, razão social, CNPJ, Uberlândia, logo), `WebSite` e `WebPage`;
  - páginas internas: `BreadcrumbList`;
  - Home: `FAQPage` com as 8 perguntas;
  - Conheça os planos: `Service` com os 3 pacotes e faixas de preço.
- `sitemap.xml` e `robots.txt` (com os robôs de IA liberados).
- `llms.txt`: resumo do site em texto puro para assistentes de IA (ChatGPT, Claude, Perplexity e outros).
- Favicons quadrados em 48, 96 e 192 px, `favicon.ico` na raiz e ícone para iPhone.
- Imagens abaixo da dobra com carregamento sob demanda (`loading="lazy"`).

## Segurança (já feito)

- Fontes Poppins servidas pelo próprio site (sem Google Fonts: mais rápido e sem enviar o IP do visitante a terceiros).
- Política de segurança de conteúdo (CSP) via meta tag: só carrega scripts, fontes e imagens do próprio site.
- `Referrer-Policy` e links externos em nova aba com `rel="noopener"`.
- Campo anti-spam invisível (`site_url`) no formulário de contato. Ao integrar o formulário, descarte envios com esse campo preenchido.

**Importante:** ao integrar o formulário (Formspree, RD Station etc.) ou adicionar Google Analytics/Meta Pixel,
inclua os domínios desses serviços na meta tag `Content-Security-Policy` de cada página (`form-action`, `script-src`,
`connect-src`, `img-src`). Sem isso, o navegador bloqueia o serviço. Em servidor Apache, ajuste também a linha
`Content-Security-Policy` do `.htaccess`.

## Desempenho (já feito)

- Fotos em WebP, cerca de 40% mais leves que JPG. A imagem de compartilhamento continua em JPG, formato preferido pelas redes sociais.
- Primeira foto de cada página com prioridade de carregamento; as demais carregam sob demanda.
- Script com `defer` e CSS/JS com versão no endereço (`?v=...`): ficam em cache por 1 ano e se renovam sozinhos quando mudam.
- Conteúdo principal em `<main>` e link "Pular para o conteúdo" para quem navega pelo teclado.

## Hospedagem em servidor próprio

O site funciona em qualquer servidor web (Apache, Nginx, IIS) ou no GitHub Pages, sem instalar nada.

**Apache:** o arquivo `.htaccess` (oculto, na raiz) já configura:
- redirecionamento para `https://www.cartaocuidabem.com.br` (HTTPS e www);
- endereços sem `.html` (ex.: `/sobre`) e página 404;
- compressão (Brotli/Gzip) e cache: páginas sempre atualizadas; imagens, fontes, CSS e JS por 1 ano;
- cabeçalhos de segurança: HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy e Permissions-Policy.

O servidor precisa dos módulos `mod_rewrite`, `mod_headers`, `mod_expires` e `mod_deflate` ativos e de `AllowOverride All`.

**Nginx:** equivalente ao `.htaccess`, no bloco `server`:

```
server {
  listen 443 ssl http2;
  server_name www.cartaocuidabem.com.br;
  root /caminho/do/site;
  error_page 404 /404.html;
  location / { try_files $uri $uri.html $uri/ =404; }
  location ~* \.(css|js|webp|png|jpg|woff2|ico)$ { expires 1y; add_header Cache-Control "public, immutable"; }
  location ~ /\. { deny all; }
  gzip on; gzip_types text/css application/javascript application/json image/svg+xml;
  add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
  add_header X-Content-Type-Options "nosniff" always;
  add_header X-Frame-Options "SAMEORIGIN" always;
  add_header Referrer-Policy "strict-origin-when-cross-origin" always;
  add_header Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=(), usb=()" always;
}
server {
  listen 80; listen 443 ssl;
  server_name cartaocuidabem.com.br;
  return 301 https://www.cartaocuidabem.com.br$request_uri;
}
```

## Depois de publicar

1. **Google Search Console** (search.google.com/search-console): adicione o domínio, confirme a propriedade e envie `sitemap.xml`.
2. **Perfil da Empresa no Google** (business.google.com) como "Cartão Cuida Bem", em Uberlândia, com o mesmo site, telefone e horário.
3. **Bing Webmaster Tools**: importe o site do Search Console (alimenta também o Copilot e o ChatGPT Search).
4. Divulgue sempre o nome completo **Cartão Cuida Bem** nas redes sociais, imprensa e parceiros, com link para o site.
5. Quando houver perfis oficiais (Instagram, Facebook, LinkedIn), inclua-os no rodapé e no campo `sameAs` do `Organization`.

## Pendências antes do site final

- Integrar o formulário a um serviço de envio.
- Substituir os campos entre colchetes: e-mail de contato, horário de atendimento e link do marketplace Hocta.
- Trocar os números provisórios: 0800 000 0000 e WhatsApp (34) 90000-0000 (links `https://wa.me/5534900000000` e `web.whatsapp.com/send?phone=5534900000000`).
- Substituir o PDF provisório da Política de Privacidade pelo texto validado pelo jurídico.
- Se usar cookies de análise ou publicidade, incluir banner de consentimento (LGPD).

## Estrutura

```
index.html, sobre.html, planos.html, contato.html, 404.html
legal/                 Política de Privacidade (página + PDF)
assets/css/site.css    estilos e fontes
assets/js/site.js      interações (dúvidas, preços, formulário, âncora)
assets/fonts/          Poppins (woff2)
assets/img/            fotos, logos, ícones e imagem de compartilhamento
favicon.ico, robots.txt, sitemap.xml, llms.txt
.nojekyll              evita processamento do Jekyll no GitHub Pages
.htaccess              configuração para servidores Apache (cache, segurança, redirecionamentos)
```
