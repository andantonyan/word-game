var game;
(function(window, document, game, undefined) {
  var controls = new game.Controls('#container');
  var route = new game.Route();

  controls
    .addPage('home', document.getElementById('home').innerHTML)
    .addPage('game', document.getElementById('game').innerHTML);

  route.navigate();

  route.config({ mode: 'hash'});
  route
    .add(/home/, function () {
      controls.render('home');
    })
    .add(/game/, function() {
      controls.render('game');
    })
    .add(/game/, function() {
      console.log('about');
    })
    .add(/game\/(.*)\/edit\/(.*)/, function() {
      console.log('products', arguments);
    })
    .listen();

  route.navigate('/home');

})(window, document, game || (game = {}));
