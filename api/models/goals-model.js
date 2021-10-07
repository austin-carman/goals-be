const db = require("../../data/db-config");

async function userGoals(user_id) {
  const goals = await db("goals")
    .where("user_id", user_id);
  return goals;
}

module.exports = {
  userGoals,
};