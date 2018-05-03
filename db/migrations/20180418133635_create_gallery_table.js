exports.up = function(knex, Promise) {
  return knex.schema.createTable("gallery", function(table) {
    table.increments("gallery_id").primary();
    table.string("author").notNullable();
    table.string("link").notNullable();
    table.text("description").notNullable();
    table
      .integer("user_id")
      .references("user_id")
      .inTable("users")
      .onDelete("cascade");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("gallery");
};
