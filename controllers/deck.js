const knex = require('../db/knex');

module.exports = {
    index: (req,res) => {
      knex('deck')
        .then(decks=>{
          res.render('index',{decks:decks});
        });
    },

    deck_builder: (req,res) => {
<<<<<<< HEAD
      knex('card')
      .where('class_id', req.params.id)
      .orWhere('class_id', 1)
      .select('img', 'id')
      .then(cards => {
        res.render('deck_builder', {cards: cards})
      })
=======
      // knex('cards').where('id').then(card =>{
      //   res.render('deck_builder');
      // })
>>>>>>> 41045dfb12e08d10528404c82e42f70ba303cadc
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
          knex('deck_comment')
          .where('deck_id', req.params.id)
          .join('user', 'deck_comment.user_id', 'user.id')
          .then(comments => {
            res.render('deck', {deck: deck, cards: cards, comments: comments})
          })
        })
      })
    }
}
