const db = require("../../data/db-config");

async function getUserGoals(user_id) {
  const data = await db("goals as g")
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

  const removeArrDuplicateItems = (arr) => {// move to helper function file?
    const jsonObj = arr.map(JSON.stringify);
    const uniqueSet = new Set(jsonObj);
    const uniqueArr = Array.from(uniqueSet).map(JSON.parse);
    return uniqueArr;
  };

  const steps = data.map(goal => { // all steps for all goals
    return {
      step_id: goal.step_id,
      step_title: goal.step_title,
      step_notes: goal.step_notes,
      step_completed: goal.step_completed,
      goal_id: goal.goal_id
    };
  });

  const sharedGoal = (goalId) => { // all steps for a single goal
    const allSteps = steps.filter(obj => {
      return obj.goal_id === goalId;
    });
    return allSteps;
  };

  const goals = data.map(goal => {
    return {
      goal_id: goal.goal_id,
      user_id: goal.user_id,
      goal_title: goal.goal_title,
      goal_completed: goal.goal_completed,
      steps: sharedGoal(goal.goal_id)
    };
  });

  const userGoals = removeArrDuplicateItems(goals);

  return userGoals;
}

// Create new goal for specified user
async function newGoal(user_id, goal) {
  const { goal_title, steps } = goal;
  const [addedGoal] = await db("goals")
    .insert({
      user_id: user_id,
      goal_title: goal_title
    },
    [
      "goal_id",
      "user_id",
      "goal_title",
      "goal_completed"
    ]);
  
  const newSteps = steps.map(step => {
    return {...step, goal_id: addedGoal.goal_id};
  });

  const [addedSteps] = await db("steps")
    .insert(
      newSteps, 
      [
        "step_id", 
        "goal_id",
        "step_title",
        "step_notes",
        "step_completed"
      ]
    );

  const userGoal = {
    goal_id: addedGoal.goal_id,
    user_id: addedGoal.user_id,
    goal_title: addedGoal.goal_title,
    goal_completed: addedGoal.goal_completed,
    steps: addedSteps
  };

  return userGoal;
}

module.exports = {
  getUserGoals,
  newGoal
};
