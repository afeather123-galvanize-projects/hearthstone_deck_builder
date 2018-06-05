const {num_users} = require('../../config/seedInfo');
const faker = require('faker');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('card_comment').del()
    .then(function () {
      let card_comments = [];
      for (let i = 1; i < 600; i++) {
        const card_comment = {
          user_id: Math.ceil(Math.random() * num_users),
          card_id: i,
          comment: faker.lorem.lines(2)
        }
        card_comments.push(card_comment);
      }
      return knex('card_comment').insert(card_comments);
    });
};
