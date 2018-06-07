const user = require("../controllers/user.js")
const deck = require('../controllers/deck.js')
const card = require("../controllers/card.js")

module.exports = function(app){
  app.get('/', deck.index);
  app.post('/login', user.login);
  app.get('/login', user.login_register);
  app.post('/register', user.register);
  app.post('/card/:id',card.createCard);
  app.get('/card/:id',card.show);
  app.get('/deck/:id', deck.show);
  app.post('/card_comment/:id', card.comment_on_card);
  app.post('/deck_comment/:id', deck.comment_on_deck);
  app.get('/deckbuilder/:id', deck.deck_builder);
  app.get('/edit_deck/:id', deck.edit_deck);
  app.post('/create_deck', deck.create_deck);
  app.get("/card_search", card.search_on_name);
}
