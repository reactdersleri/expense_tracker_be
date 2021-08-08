exports.up = function (knex) {
  return knex.schema
    .createTable("user", (table) => {
      table.increments();
      table.string("username", 255).unique().notNullable();
      table.text("password").notNullable();
      table.string("full_name");
      table.string("email").notNullable();
    })
    .createTable("category", (table) => {
      table.increments();
      table.string("name").notNullable();
      table.enu("type", ["expense", "income"]).defaultTo("expense");
      table.string("color").defaultTo("black");
      table.integer("user_id").unsigned();
      table
        .foreign("user_id")
        .references("user.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("record", (table) => {
      table.increments();
      table.string("title").notNullable();
      table.integer("amount").notNullable().unsigned();
      table.integer("category_id").unsigned();
      table
        .foreign("category_id")
        .references("category.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.integer("user_id").unsigned();
      table
        .foreign("user_id")
        .references("user.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .raw(
      `
    CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $$
    BEGIN
     NEW."updated_at"=now(); 
     RETURN NEW;
    END;
    $$ language 'plpgsql';
  `
    )
    .raw(
      `
    CREATE TRIGGER update_user_updated_at BEFORE UPDATE
    ON ?? FOR EACH ROW EXECUTE PROCEDURE 
    update_updated_at_column();
  `,
      ["record"]
    );
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("record")
    .dropTableIfExists("category")
    .dropTableIfExists("user");
};
