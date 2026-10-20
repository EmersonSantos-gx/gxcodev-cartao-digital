'use strict';
// Componentes: Modais (Demo com Imagem Alinhada, Simulador e Planos)
window.GxcodevComponents = window.GxcodevComponents || {};

window.GxcodevComponents.DemoModal = function(item, isProject = false) {
  const urlText = item.previewUrl || ('gxcodev.space/demo/' + item.id);
  let interactiveStage = '';

  if (item.demo === 'link') {
    interactiveStage =
      '<div class="eyebrow">SUA MARCA AQUI</div>' +
      '<h3>Seu universo.<br>Um único link.</h3>' +
      '<p>Seu conteúdo, seus serviços e suas melhores conexões.</p>' +
      '<div class="demo-list">' +
        '<button data-demo-feedback="Portfólio selecionado">Explorar meu portfólio ↗</button>' +
        '<button data-demo-feedback="Serviços selecionados">Conhecer meus serviços ↗</button>' +
        '<button data-demo-feedback="Contato selecionado">Vamos conversar ↗</button>' +
      '</div>';
  } else if (item.demo === 'landing') {
    interactiveStage =
      '<div class="eyebrow">ALTA CONVERSÃO · SEM COMPLICAÇÃO</div>' +
      '<h3>' + escapeHTML(item.headline || 'Menos tarefas. Mais possibilidades.') + '</h3>' +
      '<p>Conecte sua equipe e dê espaço ao que faz seu negócio crescer.</p>' +
      '<div class="demo-kpis">' +
        '<div><strong>01</strong><small>CENTRALIZE</small></div>' +
        '<div><strong>02</strong><small>ORGANIZE</small></div>' +
        '<div><strong>03</strong><small>EVOLUA</small></div>' +
      '</div>' +
      '<button class="btn btn-primary btn-full press" data-demo-feedback="Prévia: esta ação pode levar ao cadastro ou WhatsApp no seu projeto.">' +
        'Conhecer a solução ' + icon('arrow-right') +
      '</button>';
  } else if (item.demo === 'dashboard') {
    interactiveStage =
      '<div class="eyebrow">VISÃO GERAL · DADOS FICTÍCIOS</div>' +
      '<h3>Suas métricas.<br>Com clareza.</h3>' +
      '<div class="demo-list" style="display:flex">' +
        '<button class="selected" data-period="month">Este mês</button>' +
        '<button data-period="quarter">Trimestre</button>' +
      '</div>' +
      '<div class="demo-kpis">' +
        '<div><strong id="demo-revenue">24,8k</strong><small>RECEITA R$</small></div>' +
        '<div><strong id="demo-cost">12,4k</strong><small>DESPESA R$</small></div>' +
        '<div><strong id="demo-balance">12,4k</strong><small>SALDO R$</small></div>' +
      '</div>' +
      '<div class="demo-chart" aria-label="Gráfico demonstrativo de receitas">' +
        '<i style="height:32%"></i><i style="height:56%"></i><i style="height:41%"></i>' +
        '<i style="height:72%"></i><i style="height:60%"></i><i style="height:92%"></i>' +
      '</div>';
  } else if (item.demo === 'shop') {
    interactiveStage =
      '<div class="eyebrow">TECH STORE · SUA MARCA</div>' +
      '<h3>Seu próximo<br>upgrade.</h3>' +
      '<p>Uma seleção feita para elevar sua experiência.</p>' +
      '<div class="demo-list">' +
        '<button data-product="Teclado mecânico">⌨ Teclado mecânico · Selecionar</button>' +
        '<button data-product="Headset gamer">🎧 Headset gamer · Selecionar</button>' +
        '<button data-product="Mouse de precisão">🖱 Mouse de precisão · Selecionar</button>' +
      '</div>' +
      '<p id="demo-cart" role="status">Selecione um produto para simular o interesse.</p>';
  }

  const ctaButton = isProject
    ? '<button class="btn btn-primary btn-full press" data-project="' + escapeHTML(item.id) + '">' +
        icon('message-circle') + 'Quero um projeto semelhante' +
      '</button>'
    : '<button class="btn btn-primary btn-full press" data-model="' + escapeHTML(item.id) + '">' +
        icon('message-circle') + 'Quero este Modelo' +
      '</button>';

  return (
    '<span class="eyebrow">IMAGEM DE DEMONSTRAÇÃO ALINHADA · PREVIEW HD</span>' +
    '<div class="demo-modal-showcase">' +
      '<div class="window-bar">' +
        '<span class="window-dots" aria-hidden="true"><i></i><i></i><i></i></span>' +
        '<span class="window-url">' + escapeHTML(urlText) + '</span>' +
        '<span class="window-tag">16:9 HD</span>' +
      '</div>' +
      '<div class="demo-modal-viewport">' +
        '<img class="demo-modal-img" src="' + item.photo + '" alt="Demonstração visual de ' + escapeHTML(item.name) + '" width="960" height="540">' +
      '</div>' +
      '<div class="demo-modal-caption">' +
        '<span><strong>✓</strong> Layout Alinhado & Responsivo</span>' +
        '<span>' + escapeHTML(item.category) + '</span>' +
      '</div>' +
    '</div>' +
    '<div class="demo-stage">' + interactiveStage + '</div>' +
    '<p class="help">Prévia de interface com imagem demonstrativa alinhada e dados de exemplo. Textos, cores e integrações são personalizados conforme o projeto.</p>' +
    ctaButton
  );
};

window.GxcodevComponents.SimulatorOption = function(value, label, ico, field, currentVal) {
  return (
    '<button class="option press" data-choice="' + escapeHTML(value) + '" data-field="' + field + '" aria-pressed="' + (currentVal === value) + '">' +
      icon(ico) +
      '<span>' + label + '</span>' +
      '<span class="radio" aria-hidden="true"></span>' +
    '</button>'
  );
};

window.GxcodevComponents.PlansModal = function(plans) {
  return (
    '<p class="help">Do primeiro protótipo à evolução contínua. Todos os planos têm orçamento personalizado.</p>' +
    plans.map(p =>
      '<article class="plan">' +
        '<span class="plan-tag">' + escapeHTML(p.tag) + '</span>' +
        '<h3>' + escapeHTML(p.name) + '</h3>' +
        '<p>' + escapeHTML(p.desc) + '</p>' +
        '<ul>' + p.items.map(i => '<li>' + escapeHTML(i) + '</li>').join('') + '</ul>' +
        '<button class="btn btn-primary btn-full press" data-plan="' + escapeHTML(p.name) + '">' +
          'Conversar sobre este plano ' + icon('arrow-up-right') +
        '</button>' +
      '</article>'
    ).join('')
  );
};
