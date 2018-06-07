const user = require("../controllers/user.js")
const deck = require('../controllers/deck.js')
const card = require("../controllers/card.js")
const knex = require('../db/knex');

module.exports = function(app){
  app.use(userView);
  app.get('/', deck.index);
  app.post('/login', user.login);
  app.get('/login', user.login_register);
  app.post('/register', user.register);
  app.post('/card/:id',card.createCard);
  app.get('/card/:id',card.show);
  app.get('/deck/:id', deck.show);
  app.get("/card_search", card.search_on_name);
  app.use(authenticateUser);
  app.post('/card_comment/:id', card.comment_on_card);
  app.post('/deck_comment/:id', deck.comment_on_deck);
  app.get('/deckbuilder/:id', deck.deck_builder);
  app.get('/edit_deck/:id', deck.edit_deck);
  app.post('/update_deck/:id', deck.update_deck);
  app.post('/create_deck', deck.create_deck);
//  app.use(authenticateAdmin);
  app.get('/create_card', card.new_card);
  app.post('/create_card', card.createCard);
  app.get('/admin', user.admin_remove);
  app.post('/admin/:id', user.remove_user);
}

function authenticateUser(req, res, next){
  if(!req.session.user_id){
    res.redirect("back");
  }else{
    next();
  }
}

function authenticateAdmin(req, res, next){
  if(!req.session.user_id){
    res.redirect("back");
  }else{
    knex('user')
    .where('id', req.session.user_id)
    .first()
    .then(user => {
      if(user && user.isAdmin) {
        next();
      } else {
        res.redirect("back");
      }
    })
  }
}

function userView(req, res, next) {
  if(req.session.username) {
    res.locals.username = req.session.username;
    res.locals.isAdmin = req.session.isAdmin;
  } else {
    res.locals.isAdmin = false;
    res.locals.username = '';
  }
  next();
}