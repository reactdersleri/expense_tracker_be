exports.up = function (knex) {
  return knex.schema
    .createTable("type", (table) => {
      table.increments();
      table.string("name").notNullable();
      table.string("color").defaultTo("black");
    })
    .createTable("category", (table) => {
      table.increments();
      table.string("name").notNullable();
      table.integer("type_id").unsigned();
      table
        .foreign("type_id")
        .references("type.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("record", (table) => {
      table.increments();
      table.string("title").notNullable();
      table.integer("category_id").unsigned();
      table
        .foreign("category_id")
        .references("category.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.integer("amount").notNullable().unsigned();
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("record")
    .dropTableIfExists("category")
    .dropTableIfExists("type");
};
