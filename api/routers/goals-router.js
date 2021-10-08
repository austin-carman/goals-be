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
  res.json("wired");
});

module.exports = router;