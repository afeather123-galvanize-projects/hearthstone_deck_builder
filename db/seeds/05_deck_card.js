const {num_decks_per_user, num_users} = require('../../config/seedInfo.js');


exports.seed = function(knex, Promise) {
  return knex('deck_card').del()
    .then(function () {
      const num_decks = num_decks_per_user * num_users;
      let cards = [];
      for(let i = 1; i <= num_decks; i++) {
        const start = Math.ceil(Math.random() * 300);
        for (let j = 0; j < 30; j++) {
          const card_in_deck = {
            qty: 1,
            deck_id: i,
            card_id: start + j
          }
          cards.push(card_in_deck);
        }
      }
      return knex('deck_card').insert(cards);
    });
};
