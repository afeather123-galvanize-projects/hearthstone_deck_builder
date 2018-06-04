
exports.up = function(knex, Promise) {
  return knex.schema.createTable('card_comment', (t)=>{
    t.increments('id').primary();
    t.integer('card_id');
    t.integer('name_id');
    t.text('comment')
    t.timestamps(true, true);
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('card_comment');
};
