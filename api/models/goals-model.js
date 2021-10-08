const db = require("../../data/db-config");

async function userGoals(user_id) {
  const goals = await db("goals as g")
    .leftJoin("steps as s", "g.goal_id", "=", "s.goal_id")
    .select(
      "g.goal_id", 
      "g.user_id", 
      "g.goal_title", 
      "g.goal_completed", 
      "s.step_id", 
      "s.step_title", 
      "s.step_notes",
      "s.step_completed"
    )
    .where("g.user_id", user_id);

  const steps = goals.map(goal => {
    return {
      step_id: goal.step_id,
      step_title: goal.step_title,
      step_notes: goal.step_notes,
      step_completed: goal.step_completed,
      goal_id: goal.goal_id
    };
  });

  const sharedGoal = (goalId) => {
    const allSteps = steps.filter(obj => {
      return obj.goal_id === goalId;
    });
    return allSteps;
  };

  const uniqueGoals = {};

  const userGoals = goals.map(goal => {
    if (!(goal.goal_id in uniqueGoals)) {
      uniqueGoals[goal.goal_id] = true;

      return {
        goal_id: goal.goal_id,
        user_id: goal.user_id,
        goal_title: goal.goal_title,
        goal_completed: goal.goal_completed,
        steps: sharedGoal(goal.goal_id)
      };
    } 
  });

  return userGoals;
}

module.exports = {
  userGoals,
};
