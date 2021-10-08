
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users").del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          first_name: "Austin", 
          last_name: "Carman",
          username: "abc",
          password: "$2a$08$bVCTwdvkQkLv5KVBhiWM5uHcy3XmskNUz5HnYAqmzUai5WoThT7CC",
        },
      ]);
    });
};
