const knex = require('../db/knex');

module.exports = {
    show: (req,res) => {
      knex('card').where('id', req.params.id).then(card => {
        res.render('card', {card: card[0]});
      })      
    },
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
    }
}
