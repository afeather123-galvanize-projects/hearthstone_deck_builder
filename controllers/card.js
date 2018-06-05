const knex = require('../db/knex');

module.exports = {
  // show card
    show: (req,res) => {
      knex('card').where('id', req.params.id).then(card => {
        knex('card_comment').where('card_comment.id', req.params.id)
        .join('user', 'card_comment.user_id', 'user.id')
        .then(comment =>{
res.render('card', {card: card[0], card_comments:comment});
        })

      })
    },
    //create card
    createCard: (req, res)=>{
      knex('card').insert({
        type:req.body.type,
        attack:req.body.attack,
        health:req.body.health,
        mana:req.body.mana,
        description:req.body.description
      }).returning('id').then((id)=>{
        res.redirect('/card/' + id[0]);
      })
    },
  }
