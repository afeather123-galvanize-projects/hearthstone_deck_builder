const knex = require('../db/knex');

module.exports = {
  // show card
    show: (req,res) => {
      knex('card').where('id', req.params.id).then(card => {
        knex('card_comment').where('card_comment.card_id', req.params.id)
        .join('user', 'card_comment.user_id', 'user.id')
        .then(comments =>{

          res.render('card', {card: card[0], card_comments:comments});
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
        res.redirect('/create_card/' + id[0]);
      })
    },

    new_card: (req,res) => {
      res.render('create_card');
    },
    //comment on a card
    comment_on_card: (req, res) => {
      let new_comment = {
        user_id: req.session.user_id,
        card_id: req.params.id,
        comment: req.body.comment
      };
      knex('card_comment')
      .insert(new_comment)
      .then(() => {
        console.log('getting here?');
        res.redirect('/card/' + req.params.id);
      })
    },
    // card search 
    search_on_name:(req, res)=>{
      console.log(req.query);
      if(!req.query.search) {
        knex('card')
        .then(result => {
          res.render('card_search', {cards:result});          
        })
        return;
      }
      knex('card').where('name', 'ilike', `${req.query.search}%`).then((result)=>{
        res.render('card_search', {cards:result});
      })
    }
  }
