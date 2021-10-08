
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("steps").del()
    .then(function () {
      // Inserts seed entries
      return knex("steps").insert([
        {
          goal_id: 1,
          step_title: "Pick 12 books to read",
          step_completed: true
        },
        {
          goal_id: 1,
          step_title: "Read 1 book this month",
          step_notes: "Read 30 minutes/day"
        },
        {
          goal_id: 2,
          step_title: "Create a budget",
        },
      ]);
    });
};
