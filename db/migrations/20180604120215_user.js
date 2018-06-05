
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user', (t)=>{
    t.increments('id').primary();
    t.string('username');
    t.string('email')
      .unique();
    t.string('password');
    t.timestamps(true, true);
})
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user');
};
