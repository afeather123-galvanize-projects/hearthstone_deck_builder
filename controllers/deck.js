const knex = require('../db/knex');

module.exports = {
    index: (req,res) => {
      console.log(req.session);
      knex('deck')
      .select('deck.deck_name', 'deck.desc', 'deck.id AS deck_id', 'class.class_name')
      .join('class','deck.class_id', 'class.id')
        .then(decks=>{
          res.render('index',{decks:decks});
        });
    },

    deck_builder: (req,res) => {
      console.log(req.session);
      knex('card')
      .where('class_id', req.params.id)
      .orWhere('class_id', 1)
      .select('img', 'id', 'name', 'mana')
      .orderBy('class_id', 'desc')
      .orderBy('mana', 'asc')
      .then(cards => {
        res.render('deck_builder', {cards: cards, class_id: req.params.id})
      })
    },

    create_deck: (req,res) => {
      console.log(req.session);
      let deck = {
        user_id: req.session.user_id,
        class_id: req.body.class_id,
        deck_name: req.body.deck_name,
        desc: req.body.desc
      }
      knex('deck')
      .insert(deck)
      .returning('id')
      .then(id => {
        console.log(id);
        req.body.list.forEach(card => {
          card.deck_id = id[0];
        });
        knex('deck_card')
        .insert(req.body.list)
        .then(() => {
          res.redirect(`/deck/${id}`);
        })
      })
      
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
    },

    comment_on_deck: (req, res) => {
      let new_comment = {
        user_id: req.session.user_id,
        deck_id: req.params.id,
        comment: req.body.comment
      };
      knex('deck_comment')
      .insert(new_comment)
      .then(() => {
        console.log('getting here?');
        res.redirect('/deck/' + req.params.id);
      })
    }
}
