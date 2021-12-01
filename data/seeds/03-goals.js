exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("goals")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("goals").insert([
        {
          user_id: 1,
          goal_title: "Read 12 books this year",
          goal_completed: false,
        },
        {
          user_id: 1,
          goal_title: "Save $1000",
          goal_completed: false,
        },
        {
          user_id: 1,
          goal_title: "Meal Prep",
          goal_completed: true,
        },
      ]);
    });
};
