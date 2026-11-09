/* Cartão Cuida Bem: interações do site (sem dependências) */
(function () {
  'use strict';

  /* Cabeçalho: menu do celular (ícone de 3 traços / X) */
  var menuBotao = document.querySelector('.menu-botao');
  var menuPainel = document.getElementById('menu-principal');
  if (menuBotao && menuPainel) {
    var definirMenu = function (abrir) {
      menuBotao.setAttribute('aria-expanded', abrir ? 'true' : 'false');
      menuBotao.setAttribute('aria-label', abrir ? 'Fechar menu' : 'Abrir menu');
    };
    definirMenu(false);
    menuBotao.addEventListener('click', function () {
      definirMenu(menuBotao.getAttribute('aria-expanded') !== 'true');
    });
    menuPainel.addEventListener('click', function (e) {
      if (e.target.closest('a')) definirMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menuBotao.getAttribute('aria-expanded') === 'true') { definirMenu(false); menuBotao.focus(); }
    });
    window.addEventListener('resize', function () { if (window.innerWidth > 1180) definirMenu(false); });
  }

  /* Cabeçalho: central de atendimento (passar o mouse no computador; tocar no celular) */
  var telBotao = document.querySelector('.tel-topo__icone');
  if (telBotao) {
    var definirTel = function (abrir) { telBotao.setAttribute('aria-expanded', abrir ? 'true' : 'false'); };
    definirTel(false);
    telBotao.addEventListener('click', function () { definirTel(telBotao.getAttribute('aria-expanded') !== 'true'); });
    document.addEventListener('click', function (e) { if (!e.target.closest('.tel-topo')) definirTel(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') definirTel(false); });
  }

  /* Dúvidas frequentes: abre uma pergunta por vez (abrir outra fecha a anterior) */
  var faqBtns = document.querySelectorAll('.faq-btn');
  function definir(btn, abrir) {
    var resposta = btn.parentElement.querySelector('.faq-a');
    btn.setAttribute('aria-expanded', abrir ? 'true' : 'false');
    if (resposta) resposta.hidden = !abrir;
  }
  faqBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var abrir = btn.getAttribute('aria-expanded') !== 'true';
      faqBtns.forEach(function (outro) { if (outro !== btn) definir(outro, false); });
      definir(btn, abrir);
    });
  });

  /* Página de pacotes: alterna mensal/anual e individual/familiar */
  var PRECOS = {
    'Acesso':   { mensal: { individual: ['28,90', '346,80'], familiar: ['33,90', '406,80'] }, anual: { individual: ['26,01', '312,12'], familiar: ['30,51', '366,12'] } },
    'Conecta':  { mensal: { individual: ['43,90', '526,80'], familiar: ['55,90', '670,80'] }, anual: { individual: ['39,51', '474,12'], familiar: ['50,31', '603,72'] } },
    'Conecta+': { mensal: { individual: ['72,90', '874,80'], familiar: ['99,90', '1.198,80'] }, anual: { individual: ['65,61', '787,32'], familiar: ['89,91', '1.078,92'] } }
  };
  var estado = { periodo: 'anual', tipo: 'individual' };
  var botoes = document.querySelectorAll('[data-periodo], [data-tipo]');

  function atualizar() {
    botoes.forEach(function (b) {
      var ativo = b.dataset.periodo ? b.dataset.periodo === estado.periodo : b.dataset.tipo === estado.tipo;
      b.setAttribute('aria-pressed', ativo ? 'true' : 'false');
      b.style.background = ativo ? '#2E2238' : 'transparent';
      b.style.color = ativo ? '#FFFFFF' : '#2E2238';
    });
    var rotulo = (estado.periodo === 'anual' ? 'Assinatura anual' : 'Assinatura mensal') + ' ' + estado.tipo;
    document.querySelectorAll('[data-rotulo]').forEach(function (el) { el.textContent = rotulo; });
    document.querySelectorAll('[data-preco]').forEach(function (el) {
      el.textContent = PRECOS[el.dataset.preco][estado.periodo][estado.tipo][0];
    });
    document.querySelectorAll('[data-total]').forEach(function (el) {
      var ano = PRECOS[el.dataset.total][estado.periodo][estado.tipo][1];
      el.textContent = estado.periodo === 'anual' ? 'R$ ' + ano + ' por ano, em até 12x' : 'Equivale a R$ ' + ano + ' por ano';
    });
  }
  botoes.forEach(function (b) {
    b.addEventListener('click', function () {
      if (b.dataset.periodo) estado.periodo = b.dataset.periodo;
      if (b.dataset.tipo) estado.tipo = b.dataset.tipo;
      atualizar();
    });
  });
  if (botoes.length) atualizar();

  /* Home: abas da seção de serviços (clique e setas do teclado) */
  var svTabs = Array.prototype.slice.call(document.querySelectorAll('.sv-item[data-sv]'));
  function svAtivar(tab, foco) {
    svTabs.forEach(function (t) {
      var ativo = t === tab;
      t.setAttribute('aria-selected', ativo ? 'true' : 'false');
      t.tabIndex = ativo ? 0 : -1;
      var painel = document.getElementById('sv-painel-' + t.dataset.sv);
      if (painel) painel.style.display = ativo ? 'block' : 'none';
    });
    if (foco) tab.focus();
  }
  svTabs.forEach(function (tab, i) {
    tab.tabIndex = tab.getAttribute('aria-selected') === 'true' ? 0 : -1;
    tab.addEventListener('click', function () {
      svAtivar(tab, false);
      /* no celular o painel fica abaixo da lista: leva o visitante até ele */
      var painel = document.getElementById('sv-painel-' + tab.dataset.sv);
      if (painel && window.innerWidth < 1040) {
        var r = painel.getBoundingClientRect();
        if (r.top > window.innerHeight * 0.6) painel.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
      }
    });
    /* no computador (mouse), troca ao passar o mouse, com uma pequena espera
       para não trocar sem querer ao atravessar a lista; no celular, só no toque */
    var espera = null;
    tab.addEventListener('mouseenter', function () {
      if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
      clearTimeout(espera);
      espera = setTimeout(function () { svAtivar(tab, false); }, 120);
    });
    tab.addEventListener('mouseleave', function () { clearTimeout(espera); });
    tab.addEventListener('keydown', function (e) {
      var alvo = null;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') alvo = svTabs[(i + 1) % svTabs.length];
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') alvo = svTabs[(i - 1 + svTabs.length) % svTabs.length];
      if (e.key === 'Home') alvo = svTabs[0];
      if (e.key === 'End') alvo = svTabs[svTabs.length - 1];
      if (alvo) { e.preventDefault(); svAtivar(alvo, true); }
    });
  });

  /* Contato: simula o envio (formulário ainda sem integração) */
  var form = document.getElementById('form-contato');
  var msg = document.getElementById('msg-enviada');
  var novo = document.getElementById('btn-novo');
  if (form && msg) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      form.hidden = true;
      msg.hidden = false;
    });
  }
  if (novo && form && msg) {
    novo.addEventListener('click', function () {
      form.reset();
      msg.hidden = true;
      form.hidden = false;
    });
  }

  /* Âncora vinda de outra página (ex.: sobre.html#rede-credenciada):
     reposiciona depois que fontes e imagens terminam de carregar */
  function irParaAncora() {
    if (!location.hash) return;
    var alvo = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (alvo) alvo.scrollIntoView({ block: 'start' });
  }
  window.addEventListener('load', function () { setTimeout(irParaAncora, 50); });
})();
