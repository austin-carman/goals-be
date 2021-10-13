const router = require("express").Router();
const Goals = require("../models/goals-model");
const { restricted } = require("../middleware/auth-middleware");
const {
  validateUserId,
  validateGoalId,
  validateStepId,
  validateNewGoal,
  validateNewSteps,
  validateEditGoal,
  validateEditSteps
} = require("../middleware/goals-middleware");

// Get all goals for specified user
router.get("/:user_id", restricted, (req, res, next) => { // validate user_id
  Goals.getUserGoals(req.params.user_id)
    .then(goals => {
      res.json(goals);
    })
    .catch(err => console.log(err));
});

// Create a new goal for specified user
router.post("/new-goal/:user_id", restricted, validateNewGoal, validateNewSteps, (req, res, next) => { // validate user_id
  Goals.newGoal(req.params.user_id, req.body)
    .then(goal => {
      res.json(goal);
    })
    .catch(err => console.log(err));
});

// Edit existing specified goal
router.put("/edit/:goal_id", restricted, validateGoalId, validateEditGoal, validateEditSteps, (req, res, next) => {
  Goals.editGoal(req.params.goal_id, req.body)
    .then(goal => {
      res.json(goal);
    })
    .catch(err => console.log(err));
});

// Delete specified goal and all associated steps
router.delete("/delete-goal/:goal_id", restricted, validateGoalId, (req, res, next) => {
  Goals.deleteGoal(req.params.goal_id)
    .then(deleted => {
      res.status(200).json(deleted);
    })
    .catch(err => console.log(err));
});

// Delete specified step
router.delete("/delete-step/:step_id", restricted, validateStepId, (req, res, next) => {
  Goals.deleteStep(req.params.step_id)
    .then(deleted => {
      res.status(200).json(deleted);
    })
    .catch(err => console.log(err));
});

module.exports = router;
