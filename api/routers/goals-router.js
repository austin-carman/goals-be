const router = require("express").Router();
const Goals = require("../models/goals-model");
const {
  restricted,
  validateUserId,
  validateGoalId,
  validateStepId,
  validateNewGoal,
  validateEditGoal
} = require("../middleware/goals-middleware");

// Get specified goal
router.get("/goal/:goal_id", validateGoalId, (req, res, next) => {
  Goals.getGoal(req.params.goal_id)
    .then(goal => {
      res.json(goal);
    })
    .catch(err => console.log(err));
});

// Get all goals for specified user
router.get("/:user_id", (req, res, next) => { // restricted, validate user_id
  Goals.getUserGoals(req.params.user_id)
    .then(goals => {
      res.json(goals);
    })
    .catch(err => console.log(err));
});

// Create a new goal for specified user
router.post("/new-goal/:user_id", (req, res, next) => { // restricted, validate user_id, validate body
  Goals.newGoal(req.params.user_id, req.body)
    .then(goal => {
      res.json(goal);
    })
    .catch(err => console.log(err));
});

// Edit existing specified goal
router.put("/edit/:goal_id", validateGoalId, (req, res, next) => { // restricted, validate goal_id, validate body
  Goals.editGoal(req.params.goal_id, req.body)
    .then(goal => {
      res.json(goal);
    })
    .catch(err => console.log(err));
});

// Delete specified goal and all associated steps
router.delete("/delete-goal/:goal_id", validateGoalId, (req, res, next) => { // restricted, validate goal_id
  Goals.deleteGoal(req.params.goal_id)
    .then(deleted => {
      res.status(200).json(deleted);
    })
    .catch(err => console.log(err));
});

// Delete specified step
router.delete("/delete-step/:step_id", (req, res, next) => { // restricted, validate step_id
  Goals.deleteStep(req.params.step_id)
    .then(deleted => {
      res.status(200).json(deleted);
    })
    .catch(err => console.log(err));
});


module.exports = router;
