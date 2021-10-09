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

// Edit existing goal
router.put("/edit/:goal_id", (req, res, next) => {
  Goals.editGoal(req.params.goal_id, req.body)
    .then(goal => {
      res.json(goal);
    })
    .catch(err => console.log(err));
});

module.exports = router;
