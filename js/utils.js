'use strict';
// Funções Utilitárias e Integração com WhatsApp
const icon = name => '<i data-lucide="' + name + '" aria-hidden="true"></i>';
const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
}[c]));

function refreshIcons() {
  if (window.lucide) window.lucide.createIcons();
}

function enviarParaWhatsApp(mensagemPersonalizada) {
  const url = 'https://wa.me/' + CONFIG.phone + '?text=' + encodeURIComponent(mensagemPersonalizada);
  window.open(url, '_blank', 'noopener,noreferrer');
}
window.enviarParaWhatsApp = enviarParaWhatsApp;
