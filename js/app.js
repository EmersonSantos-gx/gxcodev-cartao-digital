'use strict';
const Components = window.GxcodevComponents;

// ============================================================================
// 4. CONTROLADORES DE ESTADO E EVENTOS (App Controllers)
// ============================================================================
function renderModels(filter = 'all') {
  const filtered = models.filter(m => filter === 'all' || m.filter === filter);
  document.getElementById('models-grid').innerHTML = filtered
    .map(m => Components.ModelCard(m, models.indexOf(m)))
    .join('');
  refreshIcons();
}

function renderProjects() {
  document.getElementById('projects-grid').innerHTML = projects
    .map((p, i) => Components.ProjectCard(p, i))
    .join('');
  refreshIcons();
}

function renderExpertise() {
  const grid = document.getElementById('expertise-grid');
  if (grid) {
    grid.innerHTML = expertiseList.map(item => Components.BentoCard(item)).join('');
  }
}

function selectTab(tab) {
  const isModels = tab.id === 'tab-models';
  document.querySelectorAll('[role="tab"]').forEach(t => {
    const selected = t === tab;
    t.setAttribute('aria-selected', selected);
    t.tabIndex = selected ? 0 : -1;
  });
  document.getElementById('panel-models').hidden = !isModels;
  document.getElementById('panel-projects').hidden = isModels;
}

document.querySelectorAll('[role="tab"]').forEach(tab => {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('keydown', e => {
    if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) {
      e.preventDefault();
      const tabs = [...document.querySelectorAll('[role="tab"]')];
      const next = e.key === 'Home' ? tabs[0] : e.key === 'End' ? tabs[1] : tabs[1 - tabs.indexOf(tab)];
      selectTab(next);
      next.focus();
    }
  });
});

document.querySelectorAll('[data-filter]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(b => b.setAttribute('aria-pressed', b === button));
    renderModels(button.dataset.filter);
  });
});

// Controle do Modal Central
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');
let modalTrigger = null;

function openModal(title, content) {
  modalTrigger = document.activeElement;
  document.getElementById('modal-title').textContent = title;
  modalContent.innerHTML = content;
  document.body.style.overflow = 'hidden';
  if (!modal.open) modal.showModal();
  modal.scrollTop = 0;
  refreshIcons();
}

function closeModal() {
  modal.close();
}

modal.addEventListener('close', () => {
  document.body.style.overflow = '';
  if (modalTrigger && modalTrigger.isConnected) modalTrigger.focus();
});

document.getElementById('close-modal').addEventListener('click', closeModal);

modal.addEventListener('click', e => {
  if (e.target === modal) {
    const r = modal.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) {
      closeModal();
    }
  }
});

// Controlador do Simulador em 3 Passos
let simulator = { step: 0, type: '', goal: '', deadline: '', name: '', details: '' };

function startSimulator() {
  simulator = { step: 0, type: '', goal: '', deadline: '', name: '', details: '' };
  openModal('Vamos construir sua ideia.', '');
  renderSimulator();
}

function updateSimNext() {
  const nextBtn = document.getElementById('sim-next');
  if (!nextBtn) return;
  nextBtn.disabled = simulator.step === 0
    ? !simulator.type
    : (!simulator.goal || !simulator.deadline);
}

function renderSimulator() {
  const s = simulator;
  let body =
    '<div class="step-line" aria-hidden="true">' +
      [0, 1, 2].map(n => '<i class="' + (n <= s.step ? 'done' : '') + '"></i>').join('') +
    '</div>' +
    '<div class="step-meta">PASSO 0' + (s.step + 1) + ' / 03 · MENOS DE 2 MINUTOS</div>';

  if (s.step === 0) {
    body +=
      '<h3>Qual é a sua próxima ideia?</h3>' +
      '<p class="help">Escolha a solução que mais combina com o que você precisa.</p>' +
      '<div class="options">' +
        projectTypes.map(t => Components.SimulatorOption(t[1], t[1], t[0], 'type', s.type)).join('') +
      '</div>';
  }

  if (s.step === 1) {
    const goals = [
      ['Vender mais', 'trending-up'],
      ['Apresentar meu negócio', 'sparkles'],
      ['Otimizar processos', 'workflow'],
      ['Validar uma nova ideia', 'lightbulb']
    ];
    const deadlines = ['Nos próximos 30 dias', 'Nos próximos 3 meses', 'Estou pesquisando'];
    body +=
      '<h3>O que você quer alcançar?</h3>' +
      '<p class="help">Isso nos ajuda a entender a prioridade do seu projeto.</p>' +
      '<div class="options">' +
        goals.map(t => Components.SimulatorOption(t[0], t[0], t[1], 'goal', s.goal)).join('') +
      '</div>' +
      '<label class="field-label" for="sim-deadline">Quando pretende começar?</label>' +
      '<select class="input" id="sim-deadline">' +
        '<option value="">Selecione um prazo</option>' +
        deadlines.map(t => '<option ' + (s.deadline === t ? 'selected' : '') + '>' + t + '</option>').join('') +
      '</select>';
  }

  if (s.step === 2) {
    body +=
      '<h3>Pronto para dar o primeiro passo?</h3>' +
      '<p class="help">Revise seu pedido. A proposta e os valores são definidos após uma conversa sobre o escopo.</p>' +
      '<dl class="summary">' +
        '<div><dt>Solução</dt><dd>' + escapeHTML(s.type) + '</dd></div>' +
        '<div><dt>Objetivo</dt><dd>' + escapeHTML(s.goal) + '</dd></div>' +
        '<div><dt>Início</dt><dd>' + escapeHTML(s.deadline) + '</dd></div>' +
      '</dl>' +
      '<label class="field-label" for="sim-name">Seu nome (opcional)</label>' +
      '<input class="input" id="sim-name" autocomplete="name" maxlength="80" placeholder="Como podemos chamar você?" value="' + escapeHTML(s.name) + '">' +
      '<label class="field-label" for="sim-details">Conte um pouco da ideia (opcional)</label>' +
      '<textarea class="input" id="sim-details" maxlength="1000" placeholder="O que você gostaria de criar?">' + escapeHTML(s.details) + '</textarea>' +
      '<p class="example-note">Você revisa e envia a mensagem no WhatsApp. Seus dados não ficam armazenados neste site.</p>';
  }

  const isDisabled = (s.step === 0 && !s.type) || (s.step === 1 && (!s.goal || !s.deadline));
  body +=
    '<div class="form-nav">' +
      (s.step > 0 ? '<button class="btn btn-secondary press" id="sim-back">' + icon('arrow-left') + 'Voltar</button>' : '') +
      '<button class="btn btn-primary press" id="sim-next" ' + (isDisabled ? 'disabled' : '') + '>' +
        (s.step === 2 ? icon('message-circle') + 'Pedir orçamento no WhatsApp' : 'Continuar ' + icon('arrow-right')) +
      '</button>' +
    '</div>';

  modalContent.innerHTML = body;
  refreshIcons();
  modal.scrollTop = 0;

  modalContent.querySelectorAll('[data-choice]').forEach(b => {
    b.addEventListener('click', () => {
      simulator[b.dataset.field] = b.dataset.choice;
      modalContent.querySelectorAll('[data-choice]').forEach(o => o.setAttribute('aria-pressed', o === b));
      updateSimNext();
    });
  });

  const deadline = document.getElementById('sim-deadline');
  if (deadline) {
    deadline.addEventListener('change', () => {
      s.deadline = deadline.value;
      updateSimNext();
    });
  }

  for (const id of ['name', 'details']) {
    const input = document.getElementById('sim-' + id);
    if (input) input.addEventListener('input', () => { s[id] = input.value; });
  }

  const back = document.getElementById('sim-back');
  if (back) {
    back.addEventListener('click', () => {
      s.step--;
      renderSimulator();
      document.getElementById('sim-next').focus();
    });
  }

  document.getElementById('sim-next').addEventListener('click', () => {
    if (s.step < 2) {
      s.step++;
      renderSimulator();
      modalContent.querySelector('button,input,select')?.focus();
    } else {
      enviarParaWhatsApp(
        'Olá Gxcodev! Montei meu pedido no Simulador Rápido.' +
        (s.name ? '\nMeu nome é ' + s.name + '.' : '') +
        '\n\nSolução: ' + s.type +
        '\nObjetivo: ' + s.goal +
        '\nQuando começar: ' + s.deadline +
        (s.details ? '\nMinha ideia: ' + s.details : '') +
        '\n\nGostaria de conversar sobre o escopo e receber um orçamento personalizado.'
      );
    }
  });
}

function openPlans() {
  openModal('Soluções que acompanham você.', Components.PlansModal(plansList));
}

function showDemo(id, isProject = false) {
  const sourceList = isProject ? projects : models;
  const item = sourceList.find(x => x.id === id) || models.find(x => x.id === id) || projects.find(x => x.id === id);
  if (!item) return;
  openModal(item.name, Components.DemoModal(item, isProject));
}

// Delegação Global de Eventos (Botões & Molduras de Demo)
document.addEventListener('click', e => {
  const demoFrame = e.target.closest('[data-demo-open]');
  if (demoFrame) {
    const isProj = demoFrame.dataset.demoType === 'project';
    showDemo(demoFrame.dataset.demoOpen, isProj);
    return;
  }

  const b = e.target.closest('button');
  if (!b) return;

  if (b.dataset.wa) enviarParaWhatsApp(b.dataset.wa);
  if (b.dataset.open === 'simulator') startSimulator();
  if (b.dataset.open === 'plans') openPlans();
  if (b.dataset.demo) showDemo(b.dataset.demo, false);
  if (b.dataset.demoProject) showDemo(b.dataset.demoProject, true);

  if (b.dataset.model) {
    const m = models.find(x => x.id === b.dataset.model);
    if (m) {
      enviarParaWhatsApp('Olá Gxcodev! Vi na Galeria de Modelos o demonstrativo *' + m.name + '* e tenho interesse em adquirir/personalizar para o meu negócio.');
    }
  }

  if (b.dataset.project) {
    const p = projects.find(x => x.id === b.dataset.project);
    if (p) {
      enviarParaWhatsApp('Olá Gxcodev! Gostei muito do projeto *' + p.name + '* no portfólio de Projetos Criados e gostaria de orçar uma solução semelhante!');
    }
  }

  if (b.dataset.plan) {
    enviarParaWhatsApp('Olá Gxcodev! Gostaria de conhecer o plano de ' + b.dataset.plan + ' e receber uma proposta personalizada.');
  }

  if (b.dataset.demoFeedback) showToast(b.dataset.demoFeedback);

  if (b.dataset.period) {
    modalContent.querySelectorAll('[data-period]').forEach(x => x.classList.toggle('selected', x === b));
    const q = b.dataset.period === 'quarter';
    document.getElementById('demo-revenue').textContent = q ? '78,6k' : '24,8k';
    document.getElementById('demo-cost').textContent = q ? '39,1k' : '12,4k';
    document.getElementById('demo-balance').textContent = q ? '39,5k' : '12,4k';
    modalContent.querySelectorAll('.demo-chart i').forEach((bar, i) => {
      bar.style.height = (q ? [53, 41, 69, 58, 88, 99] : [32, 56, 41, 72, 60, 92])[i] + '%';
    });
  }

  if (b.dataset.product) {
    modalContent.querySelectorAll('[data-product]').forEach(x => x.classList.toggle('selected', x === b));
    document.getElementById('demo-cart').textContent = b.dataset.product + ' selecionado. Exemplo de jornada de compra.';
  }
});

// Suporte a teclado (Enter / Space) nas molduras de imagem de demonstração
document.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') {
    const demoFrame = e.target.closest('[data-demo-open]');
    if (demoFrame) {
      e.preventDefault();
      showDemo(demoFrame.dataset.demoOpen, demoFrame.dataset.demoType === 'project');
    }
  }
});

// Toast Notification
let toastTimer;
function showToast(message) {
  clearTimeout(toastTimer);
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.hidden = false;
  toastTimer = setTimeout(() => { toast.hidden = true; }, 3800);
}

// Salvar Contato (vCard)
document.getElementById('save-contact').addEventListener('click', () => {
  const card = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'N:Gxcodev;;;;',
    'FN:Gxcodev',
    'ORG:Gxcodev',
    'TITLE:Design e Desenvolvimento',
    'TEL;TYPE=CELL,VOICE:' + CONFIG.phoneDisplay,
    'URL:' + CONFIG.instagram,
    'ADR;TYPE=WORK:;;R. Álvares Cabral\, 71 - Prado;Maceió;AL;57010-040;Brasil',
    'NOTE:CNPJ ' + CONFIG.cnpj + ' - UI/UX Designer\, Desenvolvimento e Edições',
    'END:VCARD',
    ''
  ].join('\r\n');
  const url = URL.createObjectURL(new Blob([card], { type: 'text/vcard;charset=utf-8' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Gxcodev.vcf';
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
  showToast('Contato pronto para salvar!');
});

// Compartilhar Cartão Digital
async function copyLink(url) {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(url);
      showToast('Link copiado!');
      return;
    } catch (e) {}
  }
  const input = document.createElement('textarea');
  input.value = url;
  input.style.position = 'fixed';
  input.style.opacity = '0';
  document.body.append(input);
  input.select();
  let copied = false;
  try { copied = document.execCommand('copy'); } catch (e) {}
  input.remove();
  if (copied) {
    showToast('Link copiado!');
  } else {
    openModal(
      'Compartilhe a Gxcodev',
      '<p class="help">Copie o endereço abaixo e envie para quem precisa transformar uma ideia.</p>' +
      '<label class="field-label" for="share-url">Link do cartão digital</label>' +
      '<input id="share-url" class="input" readonly value="' + escapeHTML(url) + '">'
    );
  }
}

document.getElementById('share-card').addEventListener('click', async () => {
  const url = CONFIG.shareUrl || (location.protocol === 'file:' ? '' : location.href.split('#')[0]);
  if (!url) {
    showToast('Hospede este HTML ou configure shareUrl para compartilhar.');
    return;
  }
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Gxcodev | Design & Desenvolvimento',
        text: 'Uma ideia merece uma experiência digital. Conheça a Gxcodev.',
        url
      });
      return;
    } catch (error) {
      if (error.name === 'AbortError') return;
    }
  }
  await copyLink(url);
});

// Inicialização dos Componentes
const profile = document.getElementById('profile-image');
if (profile && profile.complete && profile.naturalWidth === 0) {
  profile.src = window.avatarFallback;
}
renderModels();
renderProjects();
renderExpertise();
window.addEventListener('load', refreshIcons);
