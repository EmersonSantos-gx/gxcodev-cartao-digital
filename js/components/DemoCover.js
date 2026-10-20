'use strict';
// Componente: Moldura Alinhada da Imagem de Demonstração (Card Cover)
window.GxcodevComponents = window.GxcodevComponents || {};

window.GxcodevComponents.DemoCover = function(item, index, itemType = 'model') {
  const num = String(index + 1).padStart(2, '0');
  const urlText = item.previewUrl || ('gxcodev.space/demo/' + item.id);
  return (
    '<div class="cover">' +
      '<span class="category">' + escapeHTML(item.category) + '</span>' +
      '<span class="cover-number">' + num + '</span>' +
      '<div class="demo-window" data-demo-open="' + escapeHTML(item.id) + '" data-demo-type="' + itemType + '" role="button" tabindex="0" aria-label="Abrir demonstração de ' + escapeHTML(item.name) + '">' +
        '<div class="window-bar">' +
          '<span class="window-dots" aria-hidden="true"><i></i><i></i><i></i></span>' +
          '<span class="window-url">' + escapeHTML(urlText) + '</span>' +
          '<span class="window-tag">DEMO</span>' +
        '</div>' +
        '<div class="demo-viewport">' +
          '<img class="demo-img" src="' + item.photo + '" alt="Imagem de demonstração alinhada: ' + escapeHTML(item.name) + '" loading="lazy" width="960" height="540" onerror="this.src=window.avatarFallback">' +
          '<span class="demo-overlay-badge">' + icon('maximize-2') + ' Ampliar Demo</span>' +
        '</div>' +
      '</div>' +
    '</div>'
  );
};
