const {num_decks_per_user, num_users} = require('../../config/seedInfo.js');
const faker = require('faker');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('deck_comment').del()
    .then(function () {
      const num_decks = num_decks_per_user * num_users;
      const deck_comments = [];
      for(let i = 1; i <= num_decks; i++) {
        const deck_comment = {
          deck_id: Math.ceil(Math.random() * num_decks_per_user),
          user_id: Math.ceil(Math.random() * num_users),
          comment: faker.lorem.sentences(2)
        }
        deck_comments.push(deck_comment);
      }
      return knex('deck_comment').insert(deck_comments);
    });
};
