exports.up = async (knex) => {
  await knex.schema
    .createTable("users", (users) => {
      users.increments("user_id")
      users.string("first_name", 200).notNullable()
      users.string("last_name", 200).notNullable()
      users.string("username", 200).notNullable()
      users.string("password", 200).notNullable()
    })
    .createTable("goals", (goals) => {
      goals.increments("goal_id")
      goals.integer("user_id")
        .references("user_id")
        .inTable("users")
        .notNullable()
        .unsigned()
        .onDelete("CASCADE")
        .onUpdate("CASCADE")
      goals.string("goal_title", 200).notNullable()
      goals.boolean("goal_completed").defaultTo("false")
    })
}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists("users")
}
