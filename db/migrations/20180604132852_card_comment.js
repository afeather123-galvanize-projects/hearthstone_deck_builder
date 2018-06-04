
exports.up = function(knex, Promise) {
  return knex.schema.createTable('card_comment', (t)=>{
    t.increments('id').primary();
    t.integer('card_id')
      .notNullable()
      .references('id')
      .inTable('card')
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
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('card_comment');
};
