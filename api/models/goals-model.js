const db = require("../../data/db-config");
const {
  removeArrDuplicateItems,
} = require("../helper-functions/helper-functions");

// Find goal by goal_id
async function getGoal(goal_id) {
  const [goal] = await db("goals").where("goal_id", goal_id);

  return goal;
}

// Find step by step_id
async function getStep(step_id) {
  const [step] = await db("steps").where("step_id", step_id);

  return step;
}

// All goals for specified user
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

  const allSteps = data.map((goal) => {
    // all steps for all goals belonging to user
    return {
      step_id: goal.step_id,
      step_title: goal.step_title,
      step_notes: goal.step_notes,
      step_completed: goal.step_completed,
      goal_id: goal.goal_id,
    };
  });

  const sharedGoal = (goalId) => {
    // all steps for a single goal
    const steps = allSteps.filter((step) => {
      return step.goal_id === goalId && step.step_id !== null;
    });
    const sortedSteps = steps.sort((a, b) => (a.step_id > b.step_id ? 1 : -1));

    return sortedSteps;
  };

  const goals = data.map((goal) => {
    // all goals with steps for that goal
    return {
      goal_id: goal.goal_id,
      user_id: goal.user_id,
      goal_title: goal.goal_title,
      goal_completed: goal.goal_completed,
      steps: sharedGoal(goal.goal_id),
    };
  });

  const userGoals = removeArrDuplicateItems(goals);

  return userGoals;
}

// Create new goal for specified user
async function newGoal(user_id, goal) {
  const { goal_title, steps } = goal;
  const [addedGoal] = await db("goals").insert(
    {
      user_id: user_id,
      goal_title: goal_title,
    },
    ["goal_id", "user_id", "goal_title", "goal_completed"]
  );

  const newSteps = [];
  if (steps) {
    await Promise.all(
      steps.map(async (step) => {
        const [addedStep] = await db("steps").insert(
          { ...step, goal_id: addedGoal.goal_id },
          ["step_id", "goal_id", "step_title", "step_notes", "step_completed"]
        );
        newSteps.push(addedStep);
      })
    );
  }

  const userGoal = {
    goal_id: addedGoal.goal_id,
    user_id: addedGoal.user_id,
    goal_title: addedGoal.goal_title,
    goal_completed: addedGoal.goal_completed,
    steps: newSteps,
  };

  return userGoal;
}

// Keeping for now. Will need to either utilize or remove
// let userGoal = {};
// if (updatedSteps.length > 0) {
//   const sortedSteps = updatedSteps.sort((a, b) => {
//     a.step_id > b.step_id ? 1 : -1;
//   });
//   userGoal = { ...updatedGoal, steps: sortedSteps };
// }

// Edit Step properties (called by updateGoal)
async function updateSteps(goal_id, steps) {
  const updatedSteps = [];
  await Promise.all(
    steps.map(async (step) => {
      const [editedStep] = await db("steps")
        .insert({
          step_title: step.step_title,
          step_completed: step.step_completed,
          step_notes: step.step_notes,
          step_id: step.step_id,
          goal_id: goal_id,
        })
        .onConflict("step_id")
        .merge()
        .returning("*");
      updatedSteps.push(editedStep);
    })
  );

  return updatedSteps;
}

// Edit specific goal (calls updateSteps to update steps)
async function updateGoal(goal_id, goal) {
  const [updatedGoal] = await db("goals")
    .insert({
      goal_title: goal.goal_title,
      goal_completed: goal.goal_completed,
      goal_id: goal_id,
      user_id: goal.user_id,
    })
    .onConflict("goal_id")
    .merge()
    .returning("*");

  const editedSteps = await updateSteps(goal_id, goal.steps);
  updatedGoal.steps = editedSteps;
  return updatedGoal;
}

// Delete specified goal and all associated steps
async function deleteGoal(goal_id) {
  const goal = await db("goals").where("goal_id", goal_id).del([]);

  return goal;
}

// Delete specified step
async function deleteStep(step_id) {
  const step = await db("steps").where("step_id", step_id).del([]);

  return step;
}

module.exports = {
  getGoal,
  getStep,
  getUserGoals,
  newGoal,
  updateGoal,
  deleteGoal,
  deleteStep,
};
