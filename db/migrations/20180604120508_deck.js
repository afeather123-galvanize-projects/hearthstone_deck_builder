
exports.up = function(knex, Promise) {
  return knex.schema.createTable('deck', (t)=>{
    t.increments('id').primary();
    t.integer('deck_id');
    t.integer('user_id');
    t.string('deck_name');
    t.string('desc');
    t.timestamps(true, true);
})
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('deck');
};
