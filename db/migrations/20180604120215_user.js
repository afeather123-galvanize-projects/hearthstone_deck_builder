
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user', (t)=>{
    t.increments('id').primary();
    t.string('first_name');
    t.string('last_name');
    t.string('email');
    t.string('password');
    t.timestamps(true, true);
})
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user');
};
