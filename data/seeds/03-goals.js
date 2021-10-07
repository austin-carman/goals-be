
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("goals").del()
    .then(function () {
      // Inserts seed entries
      return knex("goals").insert([
        {
          goal_id: 1, 
          user_id: 1, 
          goal_title: "Read 12 books this year",
        },
      ]);
    });
};
