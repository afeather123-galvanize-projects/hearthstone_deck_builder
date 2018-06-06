const knex = require('../db/knex');

module.exports = {
    index: (req,res) => {
      knex('deck').where('id',req.params.id).then(deck =>{
        knex('deck_comment').where('deck_comment', req.params.id)
        .join('user', 'deck_comment',(user.id))
        .then(comment=>{
          res.render('index',{deck:deck[0], deck_comment:comment});
        });
      })
    },

    deck_builder: (req,res) => {

    },

    show: (req,res) => {
      knex('deck')
      .where('id', req.params.id)
      .first()
      .then(deck => {
        knex('deck_card')
        .where('deck_card.deck_id', req.params.id)
        .join('card', 'deck_card.card_id', 'card.id')
        .then(cards => {
          res.render('deck', {deck: deck, cards: cards})
        })
      })
    }
}
