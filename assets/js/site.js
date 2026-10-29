/* Cartão Cuida Bem: interações do site (sem dependências) */
(function () {
  'use strict';

  /* Dúvidas frequentes: abre e fecha cada pergunta */
  document.querySelectorAll('.faq-btn').forEach(function (btn) {
    var resposta = btn.parentElement.querySelector('.faq-a');
    btn.addEventListener('click', function () {
      var aberto = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', aberto ? 'false' : 'true');
      if (resposta) resposta.hidden = aberto;
    });
  });

  /* Página de pacotes: alterna mensal/anual e individual/familiar */
  var PRECOS = {
    'Acesso':   { mensal: { individual: ['28,90', '346,80'], familiar: ['33,90', '406,80'] }, anual: { individual: ['26,01', '312,12'], familiar: ['30,51', '366,12'] } },
    'Conecta':  { mensal: { individual: ['43,90', '526,80'], familiar: ['55,90', '670,80'] }, anual: { individual: ['39,51', '474,12'], familiar: ['50,31', '603,72'] } },
    'Conecta+': { mensal: { individual: ['72,90', '874,80'], familiar: ['99,90', '1.198,80'] }, anual: { individual: ['65,61', '787,32'], familiar: ['89,91', '1.078,92'] } }
  };
  var estado = { periodo: 'mensal', tipo: 'individual' };
  var botoes = document.querySelectorAll('[data-periodo], [data-tipo]');

  function atualizar() {
    botoes.forEach(function (b) {
      var ativo = b.dataset.periodo ? b.dataset.periodo === estado.periodo : b.dataset.tipo === estado.tipo;
      b.setAttribute('aria-pressed', ativo ? 'true' : 'false');
      b.style.background = ativo ? '#5F4573' : 'transparent';
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
