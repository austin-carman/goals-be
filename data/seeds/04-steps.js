exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("steps")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("steps").insert([
        {
          goal_id: 1,
          step_title: "Pick 12 books to read",
          step_notes: "",
          step_completed: true,
        },
        {
          goal_id: 1,
          step_title: "Invite friends to book club",
          step_notes: "Invite Sam and Ben",
          step_completed: false,
        },
        {
          goal_id: 1,
          step_title: "Read 1 book each month",
          step_notes: "Read 30 minutes/day",
          step_completed: false,
        },
        {
          goal_id: 1,
          step_title: "Meet with book club once/week to discuss chapters read",
          step_notes: "",
          step_completed: false,
        },
        {
          goal_id: 2,
          step_title:
            "Calculate how much is being spent each month in each category",
          step_notes: "",
          step_completed: false,
        },
        {
          goal_id: 2,
          step_title: "Create a budget",
          step_notes:
            "Decide how much I want to spend in each category. Where can I spend less",
          step_completed: false,
        },
        {
          goal_id: 2,
          step_title: "Put $100 into savings each paycheck",
          step_notes: "",
          step_completed: false,
        },
      ]);
    });
};
