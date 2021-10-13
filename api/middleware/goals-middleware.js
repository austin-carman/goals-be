const Goals = require("../models/goals-model");

const restricted = (req, res, next) => {

};
// check that user_id exists, check that user_id matches user_id of logged in user
const validateUserId =  (req, res, next) => {

};
// check that goal_id exists in db
const validateGoalId =  async (req, res, next) => {
  const { goal_id } = req.params;
  try {
    const goal = await Goals.getGoal(goal_id);
    if (!goal || goal.length === 0) {
      res.json({
        status: 404,
        message: `Could not find goal with id, ${goal_id}`
      });
    } else {
      next();
    }
  }
  catch (err) {
    next(err);
  }
};
// check that step_id exists in db
const validateStepId =  (req, res, next) => {

};
// check req.body has all required, optionals are correct format
const validateNewGoal = (req, res, next) => {

};
// check that req.body has all required, optionals are correct format
const validateEditGoal = (req, res, next) => {

};

module.exports = {
  restricted,
  validateUserId,
  validateGoalId,
  validateStepId,
  validateNewGoal,
  validateEditGoal,
};
