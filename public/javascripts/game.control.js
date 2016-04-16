var game;
(function(window, document, game, undefined) {
  function Controls(container) {
    this.container = document.querySelector(container);
    this.pages = {};
  }

  Controls.prototype.addPage = function (name, template) {
    this.pages[name] = template;
    return this;
  };

  Controls.prototype.render = function (name, args) {
    var template = this.pages[name];
    if (!template) return this;

    for (var key in args) {
      var re = new RegExp('{' + key + '}', 'g');
      template = template.replace(re, args[key]);
    }

    this
      .clear()
      .container.innerHTML = template;

    return this;
  };

  Controls.prototype.clear = function () {
    this.container.innerHTML = '';
    return this;
  };

  game.Controls = Controls;
}(window, document, game || (game = {})));
