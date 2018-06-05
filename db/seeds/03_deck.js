const {num_decks_per_user, num_users} = require('../../config/seedInfo');
const faker = require('faker');

exports.seed = function(knex, Promise) {
  return knex('deck').del()
    .then(function () {
      let decks = [];

      for (let i = 1; i <= num_users; i++) {
        for(let j = 0; j < num_decks_per_user; j++) {
          const deck = {
            user_id: i,
            class_id: Math.ceil(Math.random() * 9),
            deck_name: faker.lorem.words(2),
            desc: faker.lorem.paragraph()
          }
          decks.push(deck);
        }
      }
      return knex('deck').insert(decks);
    });
};
