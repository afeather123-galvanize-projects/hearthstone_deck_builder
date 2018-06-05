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
  app.post('/card/:id',card.cardComment);
}
