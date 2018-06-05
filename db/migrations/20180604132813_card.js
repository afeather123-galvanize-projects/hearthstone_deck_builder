
exports.up = function(knex, Promise) {
  return knex.schema.createTable('card', (t)=>{
    t.increments('id').primary();
    t.string('name');
    t.string('type');
    t.integer('attack');
    t.integer('health');
    t.integer('mana');
    t.text('img');
    t.text('description')
    t.integer('class_id')
      .notNullable()
      .references('id')
      .inTable('class')
      .onDelete('CASCADE')
      .index();
    t.timestamps(true, true);
})
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('card');
};
