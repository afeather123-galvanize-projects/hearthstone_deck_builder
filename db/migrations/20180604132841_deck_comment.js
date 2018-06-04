
exports.up = function(knex, Promise) {
  return knex.schema.createTable('deck_comment', (t)=>{
    t.increments('id').primary();
    t.integer('deck_id')
      .notNullable()
      .references('id')
      .inTable('deck')
      .onDelete('CASCADE')
      .index();
    t.integer('user_id')
      .notNullable()
      .references('id')
      .inTable('user')
      .onDelete('CASCADE')
      .index();
    t.text('comment')
    t.timestamps(true, true);
})
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('deck_comment');
};
