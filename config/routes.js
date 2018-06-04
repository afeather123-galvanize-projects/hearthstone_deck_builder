const user = require("../controllers/user.js")
const deck = require('../controllers/deck.js')
const card = require("../controllers/card.js")

module.exports = function(app){
  app.get('/', deck.index);
}
