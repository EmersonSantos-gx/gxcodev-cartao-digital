'use strict';
// Componente: Bento Grid de Especialidades
window.GxcodevComponents = window.GxcodevComponents || {};

window.GxcodevComponents.BentoCard = function(item) {
  return (
    '<article class="bento-card">' +
      icon(item.icon) +
      '<h3>' + item.title + '</h3>' +
      '<p>' + escapeHTML(item.desc) + '</p>' +
    '</article>'
  );
};
