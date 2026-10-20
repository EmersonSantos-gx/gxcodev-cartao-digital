'use strict';
// Configurações Globais e Dados dos Componentes (Gxcodev)
// ============================================================================
// 1. CONFIG & DATA STORE (Configurações e Dados da Galeria / Componentes)
// ============================================================================
const CONFIG = {
  name: 'Gxcodev',
  phone: '5582981467042',
  phoneDisplay: '+55 82 98146-7042',
  instagram: 'https://instagram.com/gxcodev.space',
  address: 'R. Álvares Cabral, 71 - Prado, Maceió - AL, 57010-040',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=R.%20%C3%81lvares%20Cabral%2C%2071%20-%20Prado%2C%20Macei%C3%B3%20-%20AL%2C%2057010-040',
  cnpj: '67.069.614/0001-09',
  avatarUrl: 'assets/logo-gxcodev.png',
  shareUrl: ''
};

const PHOTO = {
  dark: 'assets/demos/CelsonLNPRO.png',
  saas: 'assets/demos/demo-saas-landing.jpg',
  finance: 'assets/demos/demo-dashboard-financeiro.jpg',
  gamer: 'assets/demos/demo-ecommerce-gamer.jpg',
  lnpro: 'assets/demos/demo-lnpro-veicular.jpg',
  medical: 'assets/demos/demo-saas-medico.jpg',
  kanban: 'assets/demos/demo-kanban-produtividade.jpg',
  automation: 'assets/demos/demo-ecossistema-automacao.jpg'
};

const models = [
  {
    id: 'dark',
    category: 'Mini Site',
    filter: 'mini',
    name: 'Mini Site / Consultoria Veicular',
    description: 'Sua marca em um único link. Um cartão digital que conecta conteúdo, serviços e conversas.',
    tags: ['100% Responsivo', 'Tailwind CSS', 'WhatsApp'],
    photo: PHOTO.dark,
    previewUrl: 'gxcodev.space/demo/link-in-bio',
    style: 'link',
    headline: 'Seu universo. Um link.',
    demo: 'link'
  },
  {
    id: 'saas',
    category: 'Landing Page',
    filter: 'landing',
    name: 'SaaS · Alta Conversão',
    description: 'Uma apresentação clara do seu produto, com benefícios, planos e chamadas que guiam a decisão.',
    tags: ['Mobile-First', 'Seções estratégicas', 'HTML5'],
    photo: PHOTO.saas,
    previewUrl: 'gxcodev.space/demo/saas-landing',
    style: 'blue',
    headline: 'Menos tarefas. Mais possibilidades.',
    demo: 'landing'
  },
  {
    id: 'finance',
    category: 'Dashboard / Sistema',
    filter: 'system',
    name: 'Dashboard Financeiro & Gestão',
    description: 'Indicadores, receitas e despesas em uma interface organizada para decisões mais simples.',
    tags: ['UI Kit Figma', 'Dados de exemplo', 'Dashboard'],
    photo: PHOTO.finance,
    previewUrl: 'gxcodev.space/demo/finance-app',
    style: '',
    headline: 'Visão geral',
    demo: 'dashboard'
  },
  {
    id: 'gamer',
    category: 'Landing Page',
    filter: 'landing',
    name: 'E-commerce Gamer / Tech',
    description: 'Uma vitrine de produtos com personalidade, categorias e jornada de compra conectada ao WhatsApp.',
    tags: ['Vitrine digital', 'Design Tech', 'Personalizável'],
    photo: PHOTO.gamer,
    previewUrl: 'gxcodev.space/demo/tech-store',
    style: 'blue',
    headline: 'Seu próximo upgrade.',
    demo: 'shop'
  }
];

const projects = [
  {
    id: 'lnpro',
    name: 'LN Pro Proteção Veicular',
    category: 'Projeto LN Pro',
    description: 'Landing page e simulador com interface focada em conversão e integração direta via WhatsApp.',
    tags: ['Landing Page', 'Simulador', 'WhatsApp'],
    photo: PHOTO.lnpro,
    previewUrl: 'gxcodev.space/case/ln-pro',
    style: 'blue',
    headline: 'Proteção para seguir em frente.',
    demo: 'landing'
  },
  {
    id: 'medical',
    name: 'Plataforma SaaS de Gestão Médica',
    category: 'Case ilustrativo',
    description: 'Conceito de agenda, pacientes e indicadores em uma experiência que simplifica a rotina da clínica.',
    tags: ['React', 'Supabase', 'Figma'],
    photo: PHOTO.medical,
    previewUrl: 'gxcodev.space/case/med-saas',
    style: '',
    headline: 'Gestão que cuida.',
    demo: 'dashboard'
  },
  {
    id: 'kanban',
    name: 'Dashboard Kanban de Produtividade',
    category: 'Case ilustrativo',
    description: 'Conceito de quadro visual para organizar prioridades, acompanhar tarefas e dar clareza às entregas.',
    tags: ['Next.js', 'Tailwind', 'Figma'],
    photo: PHOTO.kanban,
    previewUrl: 'gxcodev.space/case/kanban-pro',
    style: '',
    headline: 'Do planejamento à entrega.',
    demo: 'dashboard'
  },
  {
    id: 'automation',
    name: 'Ecossistema Digital & Automação',
    category: 'Case ilustrativo',
    description: 'Conceito de integração entre atendimento, fluxos automatizados e painéis para centralizar operações.',
    tags: ['Python', 'React', 'Automação'],
    photo: PHOTO.automation,
    previewUrl: 'gxcodev.space/case/automacao',
    style: 'blue',
    headline: 'Tudo conectado.',
    demo: 'link'
  }
];

const expertiseList = [
  { icon: 'zap', title: 'Vitrine Tecnológica Gxcodev', desc: 'Soluções de ponta a ponta unindo design, código e edições modernas.' },
  { icon: 'pen-tool', title: 'UI/UX &<br>Prototipagem', desc: 'Wireframes e protótipos interativos de alta fidelidade no Figma.' },
  { icon: 'code-xml', title: 'Full-Stack<br>& Sistemas', desc: 'Arquitetura, dashboards e aplicações web pensadas para escalar.' },
  { icon: 'bot', title: 'ChatBOT<br>WhatsApp', desc: 'Automação de processos, assistentes virtuais e fluxos dinâmicos.' },
  { icon: 'smartphone', title: 'Web<br>Mobile-First', desc: 'Experiência fluida direto no navegador. Seu negócio em qualquer tela.' },
  { icon: 'globe-2', title: 'Infraestrutura<br>& Domínios', desc: 'Hospedagem de alta disponibilidade, domínios .com.br e suporte recorrente.' }
];

const plansList = [
  {
    name: 'Desenvolvimento',
    tag: 'DO ZERO AO LANÇAMENTO',
    desc: 'Para tirar sua ideia do papel e criar uma experiência com identidade.',
    items: ['Definição de escopo e jornada', 'Design e desenvolvimento responsivo', 'Integrações conforme a proposta']
  },
  {
    name: 'Manutenção & Evolução',
    tag: 'SEU DIGITAL EM MOVIMENTO',
    desc: 'Para cuidar de um projeto existente e planejar seus próximos passos.',
    items: ['Ajustes e melhorias sob demanda', 'Revisão técnica e suporte contratado', 'Hospedagem e domínio sob consulta']
  },
  {
    name: 'Produtos Digitais',
    tag: 'COMECE COM UM MODELO',
    desc: 'Para personalizar templates, interfaces e materiais com a sua marca.',
    items: ['Mini sites e landing pages', 'UI Kits e protótipos Figma', 'Personalização e edições visuais']
  }
];

const projectTypes = [
  ['pen-tool', 'Protótipo UI/UX Figma'],
  ['code-xml', 'Sistema Web / SaaS'],
  ['smartphone', 'Aplicativo Mobile'],
  ['link', 'Mini Site - Instagram'],
  ['bot', 'ChatBot WhatsApp']
];
