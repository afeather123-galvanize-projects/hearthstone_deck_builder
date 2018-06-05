
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('card_comment').del()
    .then(function () {
      return knex('card_comment').insert([]);
    });
};
