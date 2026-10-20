'use strict';
// Componentes: Cards da Galeria de Modelos e Projetos Criados
window.GxcodevComponents = window.GxcodevComponents || {};

window.GxcodevComponents.ModelCard = function(model, index) {
  return (
    '<article class="project-card">' +
      window.GxcodevComponents.DemoCover(model, index, 'model') +
      '<div class="card-body">' +
        '<h3>' + escapeHTML(model.name) + '</h3>' +
        '<p class="card-description">' + escapeHTML(model.description) + '</p>' +
        '<div class="techs">' +
          model.tags.map(t => '<span>' + escapeHTML(t) + '</span>').join('') +
        '</div>' +
        '<div class="card-actions">' +
          '<button class="btn btn-secondary press" data-demo="' + escapeHTML(model.id) + '">' +
            icon('eye') + 'Ver Demo' +
          '</button>' +
          '<button class="btn btn-primary press" data-model="' + escapeHTML(model.id) + '">' +
            icon('message-circle') + 'Quero este Modelo' +
          '</button>' +
        '</div>' +
      '</div>' +
    '</article>'
  );
};

window.GxcodevComponents.ProjectCard = function(project, index) {
  return (
    '<article class="project-card">' +
      window.GxcodevComponents.DemoCover(project, index, 'project') +
      '<div class="card-body">' +
        '<h3>' + escapeHTML(project.name) + '</h3>' +
        '<p class="card-description">' + escapeHTML(project.description) + '</p>' +
        '<div class="techs">' +
          project.tags.map(t => '<span>' + escapeHTML(t) + '</span>').join('') +
        '</div>' +
        '<div class="card-actions">' +
          '<button class="btn btn-secondary press" data-demo-project="' + escapeHTML(project.id) + '">' +
            icon('eye') + 'Ver Demo' +
          '</button>' +
          '<button class="btn btn-primary press" data-project="' + escapeHTML(project.id) + '">' +
            icon('message-circle') + 'Quero um projeto semelhante' +
          '</button>' +
        '</div>' +
      '</div>' +
    '</article>'
  );
};
