
exports.up = function(knex, Promise) {
  return knex.schema.createTable('deck_card', (t)=>{
    t.increments('id').primary();
    t.integer('deck_id')
      .notNullable()
      .references('id')
      .inTable('deck')
      .onDelete('CASCADE')
      .index();
    t.integer('qty');
    t.integer('card_id')
      .notNullable()
      .references('id')
      .inTable('card')
      .onDelete('CASCADE')
      .index();
    t.timestamps(true, true);
})
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('deck_card');
};
