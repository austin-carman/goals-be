const router = require("express").Router();
const Goals = require("../models/goals-model");

// Get all goals for specified user
router.get("/:user_id", (req, res, next) => {
  Goals.getUserGoals(1)
    .then(goals => {
      res.json(goals);
    })
    .catch(err => console.log(err));
});

// Create a new goal for specified user
router.post("/new-goal/:user_id", (req, res, next) => {
  Goals.newGoal(req.params.user_id, req.body)
    .then(goal => {
      res.json(goal);
    })
    .catch(err => console.log(err));
});

// Edit existing specified goal
router.put("/edit/:goal_id", (req, res, next) => {
  Goals.editGoal(req.params.goal_id, req.body)
    .then(goal => {
      res.json(goal);
    })
    .catch(err => console.log(err));
});

// Delete specified goal and all associated steps
router.delete("/delete-goal/:goal_id", (req, res, next) => {
  Goals.deleteGoal(req.params.goal_id)
    .then(deleted => {
      res.status(200).json(deleted);
    })
    .catch(err => console.log(err));
});

// Delete specified step
router.delete("/delete-step/:step_id", (req, res, next) => {
  Goals.deleteStep(req.params.step_id)
    .then(deleted => {
      res.status(200).json(deleted);
    })
    .catch(err => console.log(err));
});


module.exports = router;
