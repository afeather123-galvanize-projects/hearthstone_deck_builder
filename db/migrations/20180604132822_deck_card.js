
exports.up = function(knex, Promise) {
  return knex.schema.createTable('deck_card', (t)=>{
    t.increments('id').primary();
    t.integer('deck_id');
    t.integer('qty');
    t.integer('card_id');
    t.timestamps(true, true);
})
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('deck_card');
};
