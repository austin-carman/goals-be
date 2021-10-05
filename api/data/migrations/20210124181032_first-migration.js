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
    .createTable("steps", (steps) => {
      steps.increments("step_id")
      steps.integer("goal_id")
        .references("goal_id")
        .inTable("goals")
        .notNullable()
        .unsigned()
        .onDelete("CASCADE")
        .onUpdate("CASCADE")
      steps.string("step_title", 500).notNullable()
      steps.string("step_notes", 500).notNullable()
      steps.boolean("step_completed").defaultTo("false")
    })
}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists("steps")
  await knex.schema.dropTableIfExists("goals")
  await knex.schema.dropTableIfExists("users")
}
