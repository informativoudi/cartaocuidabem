# Site Cartão Cuida Bem (versão para validação)

Site estático em HTML, CSS e JavaScript puro. Não precisa de build nem de servidor especial.

## Páginas

| Arquivo | Página |
|---|---|
| `index.html` | Home |
| `sobre.html` | Sobre + Rede Credenciada (âncora `sobre.html#rede-credenciada`) |
| `planos.html` | Conheça os planos |
| `contato.html` | Contato |

## Como publicar no GitHub Pages

1. Crie um repositório no GitHub (pode ser privado, se o seu plano permitir Pages em repositório privado).
2. Envie **todo o conteúdo desta pasta** para a raiz do repositório, mantendo a pasta `assets/` e o arquivo `.nojekyll`.
   Pelo navegador: botão **Add file > Upload files**, arraste os arquivos e pastas e clique em **Commit changes**.
3. Vá em **Settings > Pages**.
4. Em **Build and deployment**, escolha **Source: Deploy from a branch**, branch **main** e pasta **/ (root)**. Clique em **Save**.
5. Em 1 ou 2 minutos o endereço aparece no topo da mesma tela, no formato `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`.

## Para testar no computador

Abra o `index.html` direto no navegador, ou rode na pasta:

```
python3 -m http.server 8000
```

e acesse `http://localhost:8000`.

## O que funciona

- Navegação entre as 4 páginas, menu, rodapé e botões.
- Link **Rede Credenciada** (menu e rodapé) abre a página Sobre já na seção da rede, de qualquer página.
- Seletores Mensal/Anual e Individual/Familiar atualizam os preços na página de pacotes.
- Dúvidas frequentes abrem e fecham.
- Formulário de contato **simula** o envio (mostra a mensagem de confirmação, mas não envia dados).
- Links de telefone (`tel:`) e WhatsApp (`wa.me`).
- Layout adaptado para celular.

## Pendências antes do site final

- Integrar o formulário a um serviço de envio (ex.: Formspree, RD Station, e-mail da empresa).
- Substituir os campos entre colchetes: e-mail de contato, horário de atendimento, CNPJ, telefones de agendamento da Nexa e do CheckUp e link do marketplace Hocta.
- Trocar os números provisórios: 0800 000 0000 e WhatsApp 34 90000-0000 (link `https://wa.me/5534900000000`).
- Definir links do Instagram, Política de privacidade e Termos de uso (hoje apontam para `#`).

## Estrutura

```
index.html, sobre.html, planos.html, contato.html
assets/css/site.css   estilos base, foco e ajustes para celular
assets/js/site.js     interações (dúvidas, preços, formulário, âncora)
assets/img/           fotos, logos dos parceiros, logo e favicon
.nojekyll             evita processamento do Jekyll no GitHub Pages
```
