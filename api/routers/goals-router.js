const router = require("express").Router();
const Goals = require("../models/goals-model");

router.get("/:user_id", (req, res, next) => {
  Goals.userGoals(1)
    .then(goals => {
      res.json(goals);
    })
    .catch(err => console.log(err));
});

router.post("/new-goal/:user_id", (req, res, next) => {
  Goals.newGoal(req.params.user_id, req.body)
    .then(goal => {
      res.json(goal);
    })
    .catch(err => console.log(err));
});

module.exports = router;