
exports.up = function(knex) {
  return knex.schema.createTable("users", (table) => {
      table.increments();
      table.string("username", 40).notNullable().unique().index();
      table.text("password").notNullable;
      table.string("department");
  })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("users");
  
};
