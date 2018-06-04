
exports.up = function(knex, Promise) {
  return knex.schema.createTable('card', (t)=>{
    t.increments('id').primary();
    t.string('type');
    t.integer('attack');
    t.integer('defence');
    t.integer('mana');
    t.integer('health');
    t.string('card_id');
    t.string('class_id');
    t.timestamps(true, true);
})
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('card');
};
