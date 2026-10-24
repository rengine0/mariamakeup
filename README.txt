MARIA BEAUTY ATELIE - SITE
==========================

COMO ABRIR
  Dê dois cliques em index.html. Funciona direto no navegador.
  (As fontes vêm do Google Fonts, então é preciso internet para ver a tipografia completa.)

COMO COLOCAR NO AR (grátis)
  - Netlify Drop: arraste esta pasta em app.netlify.com/drop
  - GitHub Pages ou Cloudflare Pages também servem.

ESTRUTURA
  index.html     textos, serviços, links
  css/style.css  cores (tokens no topo), layout
  js/main.js     WhatsApp com mensagem pronta e entrada suave ao rolar
  img/           fotos e logotipo

O QUE EDITAR
  - Telefone: no topo de js/main.js (PHONE e PHONE_DISPLAY) e nos links wa.me do index.html
  - Preços e serviços: seção id="servicos" do index.html
  - Endereço e link do Maps: seção id="contato" do index.html
  - Cores: bloco :root no topo de css/style.css (--hot, --pink, --lilac, --cyan)
  - Fotos novas: coloque em img/ e troque o src dentro de .collage no index.html

DESEMPENHO
  Esta versão não tem animações contínuas, partículas, blur nem canvas.
  Só há transições rápidas ao passar o mouse e uma entrada suave das seções ao rolar.
