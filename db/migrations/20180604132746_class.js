
exports.up = function(knex, Promise) {
  return knex.schema.createTable('class', (t)=>{
    t.increments();
    t.string('class_name');
    t.timestamps(true, true);
})
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('class');
};
